import "pdf-parse/worker";
import { CanvasFactory } from "pdf-parse/worker";
import { PDFParse } from "pdf-parse";

export function createPdfParser(data: ArrayBuffer): PDFParse {
  return new PDFParse({ data, CanvasFactory });
}
