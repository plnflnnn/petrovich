import {
  getContentType,
  readWorkbookFromBuffer,
  writeWorkbookToBuffer,
  type PriceFileFormat,
} from "@/lib/admin/price-markup";
import {
  type ConverterFormat,
} from "@/lib/admin/file-converter";
import { createPdfParser } from "@/lib/admin/pdf-parse-server";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import fontkit from "@pdf-lib/fontkit";
import mammoth from "mammoth";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PDFDocument, type PDFPage, type PDFFont } from "pdf-lib";
import * as XLSX from "xlsx";

const SPREADSHEET_FORMATS = new Set<ConverterFormat>(["csv", "xlsx", "xls"]);
const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024;

export class FileConverterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FileConverterError";
  }
}

function normalizeRows(rows: string[][]): string[][] {
  if (rows.length === 0) {
    throw new FileConverterError("Файл не содержит данных для конвертации");
  }

  const maxCols = Math.max(...rows.map((row) => row.length), 1);

  return rows.map((row) => {
    const normalized = row.map((cell) => String(cell ?? "").trim());
    while (normalized.length < maxCols) {
      normalized.push("");
    }
    return normalized;
  });
}

function stripHtml(value: string): string {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function parseHtmlTables(html: string): string[][] {
  const tables: string[][][] = [];
  const tableMatches = html.matchAll(/<table[\s\S]*?<\/table>/gi);

  for (const tableMatch of tableMatches) {
    const tableRows: string[][] = [];
    const rowMatches = tableMatch[0].matchAll(/<tr[\s\S]*?<\/tr>/gi);

    for (const rowMatch of rowMatches) {
      const cells: string[] = [];
      const cellMatches = rowMatch[0].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi);

      for (const cellMatch of cellMatches) {
        cells.push(stripHtml(cellMatch[1] ?? ""));
      }

      if (cells.some((cell) => cell.length > 0)) {
        tableRows.push(cells);
      }
    }

    if (tableRows.length > 0) {
      tables.push(tableRows);
    }
  }

  if (tables.length === 0) {
    return [];
  }

  return tables.sort((left, right) => {
    const leftCells = left.reduce((sum, row) => sum + row.length, 0);
    const rightCells = right.reduce((sum, row) => sum + row.length, 0);
    return rightCells - leftCells;
  })[0]!;
}

function parseTextLines(text: string): string[][] {
  const cleaned = text
    .replace(/^--\s*\d+\s+of\s+\d+\s*--$/gm, "")
    .trim();

  const lines = cleaned
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return [];
  }

  return lines.map((line) => {
    if (line.includes("\t")) {
      return line.split("\t").map((cell) => cell.trim());
    }

    if (line.includes(";")) {
      return line.split(";").map((cell) => cell.trim());
    }

    const spaced = line.split(/\s{2,}/).map((cell) => cell.trim()).filter(Boolean);
    return spaced.length > 1 ? spaced : [line];
  });
}

function scorePdfRows(rows: string[][]): number {
  if (rows.length === 0) {
    return Number.NEGATIVE_INFINITY;
  }

  const colCounts = rows.map(
    (row) => row.filter((cell) => cell.trim()).length || row.length,
  );
  const expectedCols = colCounts[0] ?? 0;

  if (expectedCols < 2) {
    return -200;
  }

  const matching = colCounts.filter((count) => count === expectedCols).length;
  const consistency = matching / rows.length;
  const fragments = rows.filter((row) => {
    const joined = row.join("").trim();
    return joined.length <= 2 || row.length === 1;
  }).length;

  return consistency * 300 + expectedCols * 10 - fragments * 25;
}

function mergeWrappedPdfRows(rows: string[][]): string[][] {
  if (rows.length <= 1) {
    return rows;
  }

  const expectedCols = Math.max(
    rows[0]?.filter((cell) => cell.trim()).length ?? 0,
    rows[0]?.length ?? 0,
  );

  if (expectedCols < 2) {
    return rows;
  }

  const merged: string[][] = [];

  function looksLikeNewRow(row: string[]): boolean {
    const filled = row.filter((cell) => cell.trim());
    if (filled.length >= expectedCols - 1) {
      return true;
    }

    const first = row[0]?.trim() ?? "";
    return /^\d+$/.test(first);
  }

  for (const row of rows) {
    if (merged.length === 0 || looksLikeNewRow(row)) {
      merged.push(row.map((cell) => cell.trim()));
      continue;
    }

    const previous = merged[merged.length - 1]!;

    if (row.length === 1) {
      const lastIndex = Math.max(previous.length - 1, 0);
      previous[lastIndex] = `${previous[lastIndex] ?? ""} ${row[0] ?? ""}`.trim();
      continue;
    }

    row.forEach((cell, index) => {
      const value = cell.trim();
      if (!value) {
        return;
      }

      if (index < previous.length) {
        previous[index] = `${previous[index] ?? ""} ${value}`.trim();
      } else {
        previous.push(value);
      }
    });
  }

  return merged;
}

function pickBestPdfRows(candidates: string[][][]): string[][] {
  let best = candidates[0] ?? [];
  let bestScore = scorePdfRows(best);

  for (const candidate of candidates.slice(1)) {
    const score = scorePdfRows(candidate);
    if (score > bestScore) {
      best = candidate;
      bestScore = score;
    }
  }

  return mergeWrappedPdfRows(best);
}

function workbookToRows(buffer: ArrayBuffer, format: PriceFileFormat): string[][] {
  const workbook = readWorkbookFromBuffer(buffer, format);
  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    throw new FileConverterError("В файле Excel нет листов с данными");
  }

  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
    raw: false,
  }) as string[][];

  return normalizeRows(
    rows.map((row) => row.map((cell) => String(cell ?? ""))),
  );
}

async function readDocxRows(buffer: ArrayBuffer): Promise<string[][]> {
  const result = await mammoth.convertToHtml({
    buffer: Buffer.from(buffer),
  });

  const tableRows = parseHtmlTables(result.value);
  if (tableRows.length > 0) {
    return normalizeRows(tableRows);
  }

  const text = stripHtml(result.value);
  const lines = parseTextLines(text);

  if (lines.length === 0) {
    throw new FileConverterError(
      "Не удалось извлечь таблицу из Word. Убедитесь, что данные оформлены таблицей или строками.",
    );
  }

  return normalizeRows(lines);
}

async function readPdfRows(buffer: ArrayBuffer): Promise<string[][]> {
  const parser = createPdfParser(buffer);
  const candidates: string[][][] = [];

  try {
    const tableResult = await parser.getTable();

    for (const table of tableResult.mergedTables) {
      if (table.length > 0) {
        candidates.push(
          table.map((row) => row.map((cell) => String(cell ?? "").trim())),
        );
      }
    }

    for (const page of tableResult.pages) {
      for (const table of page.tables) {
        if (table.length > 0) {
          candidates.push(
            table.map((row) => row.map((cell) => String(cell ?? "").trim())),
          );
        }
      }
    }

    for (const cellThreshold of [4, 7, 12, 18, 26, 36]) {
      const textResult = await parser.getText({
        cellSeparator: "\t",
        cellThreshold,
        lineEnforce: true,
        pageJoiner: "",
      });
      const rows = parseTextLines(textResult.text);

      if (rows.length > 0) {
        candidates.push(rows);
      }
    }

    const best = pickBestPdfRows(candidates);

    if (best.length === 0) {
      throw new FileConverterError(
        "Не удалось извлечь данные из PDF. Попробуйте другой исходный формат.",
      );
    }

    return normalizeRows(best);
  } finally {
    await parser.destroy();
  }
}

async function readRowsFromBuffer(
  buffer: ArrayBuffer,
  format: ConverterFormat,
): Promise<string[][]> {
  if (SPREADSHEET_FORMATS.has(format)) {
    return workbookToRows(buffer, format as PriceFileFormat);
  }

  if (format === "docx") {
    return readDocxRows(buffer);
  }

  return readPdfRows(buffer);
}

function rowsToSpreadsheetBuffer(
  rows: string[][],
  format: PriceFileFormat,
): Uint8Array {
  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  return writeWorkbookToBuffer(workbook, format);
}

async function rowsToDocxBuffer(rows: string[][]): Promise<Uint8Array> {
  const table = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: rows.map(
      (row) =>
        new TableRow({
          children: row.map(
            (cell) =>
              new TableCell({
                children: [
                  new Paragraph({
                    children: [new TextRun(cell || " ")],
                  }),
                ],
              }),
          ),
        }),
    ),
  });

  const document = new Document({
    sections: [{ children: [table] }],
  });

  const buffer = await Packer.toBuffer(document);
  return new Uint8Array(buffer);
}

function truncateCellText(
  text: string,
  maxWidth: number,
  font: PDFFont,
  fontSize: number,
): string {
  const value = text.trim() || " ";

  if (font.widthOfTextAtSize(value, fontSize) <= maxWidth) {
    return value;
  }

  let truncated = value;
  const ellipsis = "…";

  while (
    truncated.length > 0 &&
    font.widthOfTextAtSize(`${truncated}${ellipsis}`, fontSize) > maxWidth
  ) {
    truncated = truncated.slice(0, -1);
  }

  return truncated ? `${truncated}${ellipsis}` : ellipsis;
}

function calculateColumnWidths(
  rows: string[][],
  pageWidth: number,
  font: PDFFont,
  fontSize: number,
  cellPadding: number,
): number[] {
  const colCount = Math.max(...rows.map((row) => row.length), 1);
  const minColWidth = 36;
  const maxColWidth = Math.max(pageWidth * 0.4, minColWidth);

  const naturalWidths = Array.from({ length: colCount }, (_, colIndex) => {
    let widest = minColWidth;

    for (const row of rows) {
      const cell = String(row[colIndex] ?? "").slice(0, 200);
      const width =
        font.widthOfTextAtSize(cell, fontSize) + cellPadding * 2;
      widest = Math.max(widest, Math.min(width, maxColWidth));
    }

    return widest;
  });

  const total = naturalWidths.reduce((sum, width) => sum + width, 0);

  if (total <= pageWidth) {
    const extra = pageWidth - total;
    return naturalWidths.map((width) => width + (width / total) * extra);
  }

  const scale = pageWidth / total;
  return naturalWidths.map((width) =>
    Math.max(minColWidth, width * scale),
  );
}

function columnOffsets(widths: number[]): number[] {
  const offsets: number[] = [];
  let current = 0;

  for (const width of widths) {
    offsets.push(current);
    current += width;
  }

  return offsets;
}

async function rowsToPdfBuffer(rows: string[][]): Promise<Uint8Array> {
  const fontPath = join(
    process.cwd(),
    "node_modules/dejavu-fonts-ttf/ttf/DejaVuSans.ttf",
  );

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const font = await pdfDoc.embedFont(readFileSync(fontPath));
  const fontSize = 7;
  const lineHeight = 10;
  const cellPadding = 4;
  const rowGap = 2;
  const margin = 28;
  const pageSize: [number, number] = [842, 595];
  const pageWidth = pageSize[0] - margin * 2;
  const colWidths = calculateColumnWidths(
    rows,
    pageWidth,
    font,
    fontSize,
    cellPadding,
  );
  const colOffsets = columnOffsets(colWidths);

  let page = pdfDoc.addPage(pageSize);
  let y = pageSize[1] - margin;

  function addPage(): PDFPage {
    page = pdfDoc.addPage(pageSize);
    y = pageSize[1] - margin;
    return page;
  }

  for (const row of rows) {
    const rowHeight = lineHeight + cellPadding * 2 + rowGap;

    if (y - rowHeight < margin) {
      addPage();
    }

    const textY = y - cellPadding - fontSize;

    colWidths.forEach((width, index) => {
      const text = truncateCellText(
        String(row[index] ?? ""),
        width - cellPadding * 2,
        font,
        fontSize,
      );

      page.drawText(text, {
        x: margin + colOffsets[index]! + cellPadding,
        y: textY,
        size: fontSize,
        font,
      });
    });

    y -= rowHeight;
  }

  const bytes = await pdfDoc.save();
  return new Uint8Array(bytes);
}

export async function convertFileBuffer(
  buffer: ArrayBuffer,
  sourceFormat: ConverterFormat,
  targetFormat: ConverterFormat,
): Promise<Uint8Array> {
  if (sourceFormat === targetFormat) {
    throw new FileConverterError("Выберите другой формат для конвертации");
  }

  const rows = await readRowsFromBuffer(buffer, sourceFormat);

  if (SPREADSHEET_FORMATS.has(targetFormat)) {
    return rowsToSpreadsheetBuffer(rows, targetFormat as PriceFileFormat);
  }

  if (targetFormat === "docx") {
    return rowsToDocxBuffer(rows);
  }

  return rowsToPdfBuffer(rows);
}

export function getConverterContentType(format: ConverterFormat): string {
  if (SPREADSHEET_FORMATS.has(format)) {
    return getContentType(format as PriceFileFormat);
  }

  if (format === "docx") {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }

  return "application/pdf";
}

export function getConverterOutputFileName(
  originalName: string,
  targetFormat: ConverterFormat,
): string {
  const baseName = originalName.replace(/\.[^.]+$/, "") || "converted";
  return `${baseName}.${targetFormat}`;
}

export function assertConverterFileSize(size: number) {
  if (size > MAX_FILE_SIZE_BYTES) {
    throw new FileConverterError("Файл слишком большой. Максимальный размер — 15 МБ");
  }
}
