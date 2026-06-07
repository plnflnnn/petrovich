import { isConverterFormat } from "@/lib/admin/file-converter";
import {
  assertConverterFileSize,
  convertFileBuffer,
  FileConverterError,
  getConverterContentType,
  getConverterOutputFileName,
} from "@/lib/admin/file-converter-server";
import { getAdminSession } from "@/lib/auth/session";
import { NextResponse } from "next/server";

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
  const sourceFormatValue = formData.get("sourceFormat");
  const targetFormatValue = formData.get("targetFormat");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Выберите файл" }, { status: 400 });
  }

  if (
    typeof sourceFormatValue !== "string" ||
    !isConverterFormat(sourceFormatValue)
  ) {
    return NextResponse.json(
      { error: "Выберите исходный формат файла" },
      { status: 400 },
    );
  }

  if (
    typeof targetFormatValue !== "string" ||
    !isConverterFormat(targetFormatValue)
  ) {
    return NextResponse.json(
      { error: "Выберите формат для конвертации" },
      { status: 400 },
    );
  }

  if (sourceFormatValue === targetFormatValue) {
    return NextResponse.json(
      { error: "Формат назначения должен отличаться от исходного" },
      { status: 400 },
    );
  }

  try {
    assertConverterFileSize(file.size);

    const buffer = await file.arrayBuffer();
    const outputBuffer = await convertFileBuffer(
      buffer,
      sourceFormatValue,
      targetFormatValue,
    );
    const outputFileName = getConverterOutputFileName(
      file.name,
      targetFormatValue,
    );

    return new NextResponse(Uint8Array.from(outputBuffer), {
      headers: {
        "Content-Type": getConverterContentType(targetFormatValue),
        "Content-Disposition": `attachment; filename="${outputFileName}"`,
      },
    });
  } catch (error) {
    if (error instanceof FileConverterError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }

    console.error("[admin/file-converter] failed:", error);
    return NextResponse.json(
      { error: "Не удалось конвертировать файл" },
      { status: 422 },
    );
  }
}
