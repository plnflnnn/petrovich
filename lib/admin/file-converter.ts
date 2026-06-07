export const CONVERTER_FORMATS = ["csv", "xlsx", "xls", "docx", "pdf"] as const;

export type ConverterFormat = (typeof CONVERTER_FORMATS)[number];

export const CONVERTER_FORMAT_LABELS: Record<ConverterFormat, string> = {
  csv: "CSV",
  xlsx: "Excel (.xlsx)",
  xls: "Excel (.xls)",
  docx: "Word (.docx)",
  pdf: "PDF",
};

const FORMAT_EXTENSIONS: Record<ConverterFormat, string> = {
  csv: ".csv",
  xlsx: ".xlsx",
  xls: ".xls",
  docx: ".docx",
  pdf: ".pdf",
};

export function getConverterExtension(format: ConverterFormat): string {
  return FORMAT_EXTENSIONS[format];
}

export function fileNameMatchesFormat(
  fileName: string,
  format: ConverterFormat,
): boolean {
  return fileName.toLowerCase().endsWith(FORMAT_EXTENSIONS[format]);
}

export function isConverterFormat(value: string): value is ConverterFormat {
  return (CONVERTER_FORMATS as readonly string[]).includes(value);
}
