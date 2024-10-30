import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { H3Error } from "h3";
import { v4 as uuidv4 } from "uuid";
import passwordGenerator from "generate-password";
import crypto from "crypto";
import dayjs from "dayjs";
import { validatePassword } from "./validators";

const prisma = new PrismaClient();

export function makeRandomString32(): string {
  return crypto.randomBytes(32).toString("hex");
}
export async function hashPassword(
  password: string
): Promise<string | H3Error> {
  try {
    return await bcryptjs.hash(password, 12);
  } catch (err) {
    return createError({ statusCode: 500, statusMessage: "Password error" });
  }
}
export function makeUuid(): string {
  return uuidv4();
}
export async function generatePassword(): Promise<string> {
  const password = passwordGenerator.generate({
    length: 20,
    numbers: true,
    symbols: true,
    strict: true,
  });
  return password;
}
export async function generateNewPassword(
  uuid: string
): Promise<H3Error | string> {
  let error = null;

  // Generate secure password consistent with password policy
  const password = passwordGenerator.generate({
    length: 20,
    numbers: true,
    symbols: true,
    strict: true,
  });

  // Check if password passes password policy
  const isValidPassword = validatePassword(password);
  if (!isValidPassword) {
    console.log("Failed to generate valid password");
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }

  // Hash password
  const errorOrHashedPassword = await hashPassword(password);
  if (errorOrHashedPassword instanceof H3Error) {
    console.log("Error hashing password");
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }

  const hashedPassword = errorOrHashedPassword as string;

  // Update database
  await prisma.users
    .update({
      where: {
        uuid: uuid,
      },
      data: {
        password: hashedPassword,
      },
    })
    .catch(async (e) => {
      console.error(e);
      error = e;
    });

  // Check for database errors
  if (error) {
    console.log("Error updating user password");
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }

  console.log("Updated user password");
  return password;
}
export async function verifyPassword(
  hash: string,
  password: string
): Promise<boolean> {
  try {
    const validate = await bcryptjs.compare(password, hash);
    console.log(password);

    if (validate) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}
export async function verifyConfPassword(
  password: string,
  confPassword: string
): Promise<boolean> {
  try {
    const isMatch = password === confPassword ? true : false;
    if (isMatch) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
export function makeRandomInvoice(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  const date = new Date();
  const timestamp = dayjs(date).unix();

  return timestamp.toString().slice(0, 6) + result;
}
