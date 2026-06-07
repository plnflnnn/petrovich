import * as XLSX from "xlsx";

export type PriceFileFormat = "csv" | "xls" | "xlsx";

export class PriceMarkupError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PriceMarkupError";
  }
}

/** Known price column headers from supplier price lists (see admin price-markup). */
export const PRICE_COLUMN_NAMES = [
  "цена",
  "price",
  "стоимость",
  "розница",
  "розничная",
  "розничная цена",
  "опт",
  "оптовая",
  "дилер",
  "монтажник",
  "цинк",
  "полиэстер",
  "крым",
  "крым natural",
  "steelart",
  "steelart дерево камень",
  "эконом",
  "0,4",
  "0,45",
  "0,5",
  "0,55",
  "0,65",
  "0,7",
  "0,8",
  "0,9",
  "8017/8017",
  "шт.",
  "шт",
  "м2",
  "м²",
] as const;

const PRICE_COLUMN_NAME_SET = new Set<string>(PRICE_COLUMN_NAMES);

const TIER_PRICE_HEADERS = new Set([
  "дилер",
  "опт",
  "оптовая",
  "монтажник",
  "розница",
  "розничная",
]);

const UNIT_PRICE_HEADERS = new Set(["м2", "м²", "шт.", "шт"]);

const PRICE_HEADER_PREFIXES = [
  "цена",
  "price",
  "стоимость",
  "розничн",
] as const;

const THICKNESS_HEADER_PATTERN = /^0[.,]\d+\*?$/;

function roundPrice(value: number) {
  return Math.round(value * 100) / 100;
}

function normalizeHeader(value: unknown) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .trim()
    .replace(/[\u00a0\u200b\ufeff]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\*+$/, "");
}

function headerSpecMatches(cellValue: unknown, specNormalized: string) {
  return normalizeHeader(cellValue) === specNormalized;
}

function columnHasTierHeader(
  sheet: XLSX.WorkSheet,
  column: number,
  range: XLSX.Range,
  headerEndRow: number,
) {
  for (let row = range.s.r; row <= headerEndRow; row++) {
    const cell = sheet[XLSX.utils.encode_cell({ r: row, c: column })];
    if (cell && TIER_PRICE_HEADERS.has(normalizeHeader(cell.v))) {
      return true;
    }
  }

  return false;
}

function expandColumnsForTierHeader(
  sheet: XLSX.WorkSheet,
  tierColumn: number,
  range: XLSX.Range,
  headerEndRow: number,
) {
  const columns = [tierColumn];

  for (let col = tierColumn + 1; col <= range.e.c; col++) {
    if (columnHasTierHeader(sheet, col, range, headerEndRow)) {
      break;
    }

    columns.push(col);
  }

  return columns;
}

function rowHasTierHeader(
  sheet: XLSX.WorkSheet,
  row: number,
  range: XLSX.Range,
) {
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cell = sheet[XLSX.utils.encode_cell({ r: row, c: col })];
    if (cell && TIER_PRICE_HEADERS.has(normalizeHeader(cell.v))) {
      return true;
    }
  }

  return false;
}

function isPriceHeader(
  value: unknown,
  sheet: XLSX.WorkSheet,
  row: number,
  range: XLSX.Range,
) {
  const normalized = normalizeHeader(value);
  if (!normalized) {
    return false;
  }

  if (UNIT_PRICE_HEADERS.has(normalized)) {
    for (let headerRow = row - 1; headerRow >= range.s.r && headerRow >= row - 2; headerRow--) {
      if (rowHasTierHeader(sheet, headerRow, range)) {
        return true;
      }
    }

    return false;
  }

  if (TIER_PRICE_HEADERS.has(normalized)) {
    return true;
  }

  if (PRICE_COLUMN_NAME_SET.has(normalized)) {
    return true;
  }

  if (THICKNESS_HEADER_PATTERN.test(normalized)) {
    return true;
  }

  return PRICE_HEADER_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

function parsePriceValue(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return value;
  }

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed || trimmed === "-" || trimmed.includes("%")) {
    return null;
  }

  const normalized = trimmed
    .replace(/\s/g, "")
    .replace(/[₽руб]/gi, "")
    .replace(",", ".");

  if (!normalized) {
    return null;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function findDataStartRow(
  sheet: XLSX.WorkSheet,
  columns: number[],
  firstDataRow: number,
  range: XLSX.Range,
) {
  const maxScanRow = Math.min(firstDataRow + 2, range.e.r);

  for (let row = firstDataRow; row <= maxScanRow; row++) {
    for (const col of columns) {
      const cell = sheet[XLSX.utils.encode_cell({ r: row, c: col })];
      if (
        cell &&
        !isPriceHeader(cell.v, sheet, row, range) &&
        parsePriceValue(cell.v) !== null
      ) {
        return row;
      }
    }
  }

  return firstDataRow;
}

type PriceColumnSpec =
  | { type: "letter"; column: number }
  | { type: "number"; column: number }
  | { type: "header"; header: string };

export function parsePriceColumnSpec(spec: string): PriceColumnSpec {
  const trimmed = spec.trim();

  if (/^[a-zA-Z]+$/.test(trimmed)) {
    return { type: "letter", column: XLSX.utils.decode_col(trimmed.toUpperCase()) };
  }

  if (/^\d+$/.test(trimmed)) {
    const column = Number(trimmed) - 1;

    if (!Number.isInteger(column) || column < 0) {
      throw new PriceMarkupError("Укажите корректный номер колонки");
    }

    return { type: "number", column };
  }

  return { type: "header", header: trimmed };
}

function findDataStartRowForSingleColumn(
  sheet: XLSX.WorkSheet,
  column: number,
  range: XLSX.Range,
  minimumRow = range.s.r,
) {
  for (let row = Math.max(range.s.r, minimumRow); row <= range.e.r; row++) {
    const cell = sheet[XLSX.utils.encode_cell({ r: row, c: column })];
    if (
      cell &&
      !isPriceHeader(cell.v, sheet, row, range) &&
      parsePriceValue(cell.v) !== null
    ) {
      return row;
    }
  }

  return Math.max(range.s.r, minimumRow) + 1;
}

export function splitPriceColumnInput(spec: string) {
  return spec
    .split(/[,;]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function findPriceColumnsBySingleSpec(
  sheet: XLSX.WorkSheet,
  spec: string,
  range: XLSX.Range,
) {
  const parsed = parsePriceColumnSpec(spec);

  if (parsed.type === "letter" || parsed.type === "number") {
    if (parsed.column < range.s.c || parsed.column > range.e.c) {
      return { columns: [], dataStartRow: 0 };
    }

    return {
      columns: [parsed.column],
      dataStartRow: findDataStartRowForSingleColumn(sheet, parsed.column, range),
    };
  }

  const headerNormalized = normalizeHeader(parsed.header);
  const headerEndRow = Math.min(range.s.r + 4, range.e.r);
  const columns = new Set<number>();
  let lastHeaderRow = range.s.r;

  for (let col = range.s.c; col <= range.e.c; col++) {
    for (let row = range.s.r; row <= headerEndRow; row++) {
      const cell = sheet[XLSX.utils.encode_cell({ r: row, c: col })];
      if (cell && headerSpecMatches(cell.v, headerNormalized)) {
        const matchedColumns = TIER_PRICE_HEADERS.has(headerNormalized)
          ? expandColumnsForTierHeader(sheet, col, range, headerEndRow)
          : [col];

        for (const matchedColumn of matchedColumns) {
          columns.add(matchedColumn);
        }

        lastHeaderRow = Math.max(lastHeaderRow, row);
        break;
      }
    }
  }

  if (columns.size === 0) {
    return { columns: [], dataStartRow: 0 };
  }

  const sortedColumns = [...columns].sort((a, b) => a - b);

  return {
    columns: sortedColumns,
    dataStartRow: findDataStartRow(
      sheet,
      sortedColumns,
      lastHeaderRow + 1,
      range,
    ),
  };
}

function findPriceColumnsBySpec(sheet: XLSX.WorkSheet, spec: string) {
  const ref = sheet["!ref"];
  if (!ref) {
    return { columns: [], dataStartRow: 0 };
  }

  const range = XLSX.utils.decode_range(ref);
  const parts = splitPriceColumnInput(spec);

  if (parts.length === 0) {
    return { columns: [], dataStartRow: 0 };
  }

  if (parts.length === 1) {
    return findPriceColumnsBySingleSpec(sheet, parts[0], range);
  }

  const allColumns = new Set<number>();
  let dataStartRow = range.e.r + 1;

  for (const part of parts) {
    const result = findPriceColumnsBySingleSpec(sheet, part, range);
    for (const column of result.columns) {
      allColumns.add(column);
    }
    dataStartRow = Math.min(dataStartRow, result.dataStartRow);
  }

  const sortedColumns = [...allColumns].sort((a, b) => a - b);

  return {
    columns: sortedColumns,
    dataStartRow: findDataStartRow(sheet, sortedColumns, dataStartRow, range),
  };
}

function findPriceColumns(sheet: XLSX.WorkSheet) {
  const ref = sheet["!ref"];
  if (!ref) {
    return { columns: [], dataStartRow: 0 };
  }

  const range = XLSX.utils.decode_range(ref);
  const headerEndRow = Math.min(range.s.r + 4, range.e.r);
  const columns = new Set<number>();
  let lastHeaderRow = range.s.r;

  for (let col = range.s.c; col <= range.e.c; col++) {
    for (let row = range.s.r; row <= headerEndRow; row++) {
      const cell = sheet[XLSX.utils.encode_cell({ r: row, c: col })];
      if (cell && isPriceHeader(cell.v, sheet, row, range)) {
        columns.add(col);
        lastHeaderRow = Math.max(lastHeaderRow, row);
        break;
      }
    }
  }

  const sortedColumns = [...columns].sort((a, b) => a - b);
  const dataStartRow = findDataStartRow(
    sheet,
    sortedColumns,
    lastHeaderRow + 1,
    range,
  );

  return {
    columns: sortedColumns,
    dataStartRow,
  };
}

function applyPriceMarkupToSheet(
  sheet: XLSX.WorkSheet,
  percent: number,
  priceColumn?: string,
) {
  const trimmedColumn = priceColumn?.trim();
  const { columns, dataStartRow } = trimmedColumn
    ? findPriceColumnsBySpec(sheet, trimmedColumn)
    : findPriceColumns(sheet);
  if (columns.length === 0) {
    return 0;
  }

  const ref = sheet["!ref"];
  if (!ref) {
    return 0;
  }

  const range = XLSX.utils.decode_range(ref);
  const multiplier = 1 + percent / 100;
  let updated = 0;

  for (let row = dataStartRow; row <= range.e.r; row++) {
    for (const col of columns) {
      const address = XLSX.utils.encode_cell({ r: row, c: col });
      const cell = sheet[address];
      if (!cell) {
        continue;
      }

      if (isPriceHeader(cell.v, sheet, row, range)) {
        continue;
      }

      const price = parsePriceValue(cell.v);
      if (price === null) {
        continue;
      }

      cell.v = roundPrice(price * multiplier);
      if (cell.t === "n" || typeof price === "number") {
        cell.t = "n";
      }
      cell.w = undefined;
      updated += 1;
    }
  }

  return updated;
}

export function applyPriceMarkupToWorkbook(
  workbook: XLSX.WorkBook,
  percent: number,
  priceColumn?: string,
) {
  let updated = 0;
  const trimmedColumn = priceColumn?.trim();

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      continue;
    }

    updated += applyPriceMarkupToSheet(sheet, percent, trimmedColumn);
  }

  if (updated === 0) {
    throw new PriceMarkupError(
      trimmedColumn
        ? `Колонка «${trimmedColumn}» не найдена или в ней нет цен для обновления. Проверьте название и формат файла.`
        : "Не найдены колонки с ценами или в них нет значений для обновления. Проверьте заголовки и формат файла.",
    );
  }

  return workbook;
}

export function readWorkbookFromBuffer(buffer: ArrayBuffer, format: PriceFileFormat) {
  return XLSX.read(buffer, {
    type: "array",
    cellDates: false,
    raw: format === "csv",
  });
}

function toUint8Array(data: ArrayBuffer | Uint8Array | number[]) {
  if (data instanceof Uint8Array) {
    return data;
  }

  if (data instanceof ArrayBuffer) {
    return new Uint8Array(data);
  }

  return new Uint8Array(data);
}

export function writeWorkbookToBuffer(
  workbook: XLSX.WorkBook,
  format: PriceFileFormat,
) {
  const content = toUint8Array(
    XLSX.write(workbook, {
      type: "array",
      bookType: format,
    }) as ArrayBuffer | Uint8Array | number[],
  );

  if (format !== "csv") {
    return content;
  }

  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  const withBom = new Uint8Array(bom.length + content.length);
  withBom.set(bom);
  withBom.set(content, bom.length);
  return withBom;
}

export function getFileFormat(fileName: string): PriceFileFormat | null {
  const lowerName = fileName.toLowerCase();

  if (lowerName.endsWith(".csv")) {
    return "csv";
  }

  if (lowerName.endsWith(".xlsx")) {
    return "xlsx";
  }

  if (lowerName.endsWith(".xls")) {
    return "xls";
  }

  return null;
}

export function hasExcelExtension(fileName: string) {
  return getFileFormat(fileName) !== null;
}

export function getOutputFileName(
  originalName: string,
  percent: number,
  format: PriceFileFormat,
) {
  const baseName = originalName.replace(/\.[^.]+$/, "");
  return `${baseName}-markup-${percent}.${format}`;
}

export function getContentType(format: PriceFileFormat) {
  switch (format) {
    case "csv":
      return "text/csv; charset=utf-8";
    case "xls":
      return "application/vnd.ms-excel";
    case "xlsx":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  }
}
