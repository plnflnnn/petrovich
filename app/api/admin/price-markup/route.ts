import {
  applyPriceMarkupToWorkbook,
  getContentType,
  getFileFormat,
  getOutputFileName,
  hasExcelExtension,
  PriceMarkupError,
  readWorkbookFromBuffer,
  writeWorkbookToBuffer,
} from "@/lib/admin/price-markup";
import { getAdminSession } from "@/lib/auth/session";
import { NextResponse } from "next/server";

function parsePercent(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 1000) {
    return null;
  }

  return parsed;
}

export async function POST(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Некорректный запрос" },
      { status: 400 },
    );
  }

  const file = formData.get("file");
  const percent = parsePercent(formData.get("percent"));
  const priceColumnValue = formData.get("priceColumn");
  const priceColumn =
    typeof priceColumnValue === "string" ? priceColumnValue.trim() : "";

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json(
      { error: "Выберите файл Excel" },
      { status: 400 },
    );
  }

  if (!hasExcelExtension(file.name)) {
    return NextResponse.json(
      { error: "Поддерживаются только файлы Excel (.xlsx, .xls, .csv)" },
      { status: 400 },
    );
  }

  if (percent === null) {
    return NextResponse.json(
      { error: "Укажите корректный процент наценки" },
      { status: 400 },
    );
  }

  const format = getFileFormat(file.name);

  if (!format) {
    return NextResponse.json(
      { error: "Поддерживаются только файлы Excel (.xlsx, .xls, .csv)" },
      { status: 400 },
    );
  }

  try {
    const buffer = await file.arrayBuffer();
    const workbook = readWorkbookFromBuffer(buffer, format);
    applyPriceMarkupToWorkbook(workbook, percent, priceColumn || undefined);
    const outputBuffer = writeWorkbookToBuffer(workbook, format);
    const outputFileName = getOutputFileName(file.name, percent, format);

    return new NextResponse(Uint8Array.from(outputBuffer), {
      headers: {
        "Content-Type": getContentType(format),
        "Content-Disposition": `attachment; filename="${outputFileName}"`,
      },
    });
  } catch (error) {
    if (error instanceof PriceMarkupError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }

    return NextResponse.json(
      { error: "Не удалось обработать файл. Проверьте формат Excel." },
      { status: 422 },
    );
  }
}
