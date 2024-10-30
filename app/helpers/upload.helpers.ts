import { H3Error, H3Event, type MultiPartData } from "h3";
import path from "path";
import fs, { type PathLike } from "fs";

export async function saveFile(
  event: H3Event,
  imagePath: PathLike
): Promise<String | H3Error> {
  const body = await readMultipartFormData(event);
  const files = body?.[0] as MultiPartData;
  // const size = body?.[0].data.length as number;
  const size = files.data.length as number;
  if (size > 1000000) {
    return createError({
      statusCode: 500,
      statusMessage: "File size must be less than 1mb",
    });
  }
  const ext = path.extname(String(files.filename)).toLowerCase();
  const fileName =
    Math.random()
      .toString(32)
      .substring(2, 2 + 32) + ext;

  const filePath = path.join(process.cwd(), `${imagePath}`, fileName);
  try {
    fs.writeFileSync(filePath, files.data);
  } catch (error) {
    return createError({
      statusCode: 400,
      statusMessage: "Error save file",
    });
  }

  return fileName;
}

export async function deleteFile(
  imagePath: PathLike,
  fileName: string
): Promise<H3Error | void> {
  const filePath = path.join(process.cwd(), `${imagePath}`, fileName);
  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    return createError({
      statusCode: 400,
      statusMessage: "Error change exiting file",
    });
  }
}
