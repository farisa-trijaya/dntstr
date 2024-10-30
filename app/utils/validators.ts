import { PrismaClient } from "@prisma/client";
import { H3Event, H3Error } from "h3";
import { getUserByEmail, getUserByUuid } from "./users";
import { verifyPassword } from "./passwords";
import type { User } from "../misc/types";
import * as usersUtils from "../utils/users";

const prisma = new PrismaClient();

export async function validateNewUser(event: H3Event): Promise<H3Error | void> {
  const body = await readBody(event);

  const bodyError = await validateNewUserBody(event);
  if (bodyError) {
    return createError({ statusCode: 400, statusMessage: bodyError });
  }
  if (!validateEmail(body.user.email)) {
    return createError({ statusCode: 400, statusMessage: "Bad email format" });
  }
}
export async function validateNewTransaction(
  event: H3Event
): Promise<H3Error | void> {
  const bodyError = await validateNewTransactionBody(event);
  if (bodyError) {
    return createError({ statusCode: 400, statusMessage: bodyError });
  }
}
export async function validateUserUpdate(
  event: H3Event
): Promise<H3Error | void> {
  // Properties that can be updated in user profile
  const updatableProperties = [
    "first_name",
    "last_name",
    "current_password",
    "new_password",
    "is_active",
    "role",
  ];

  const uuid = event.context.params?.uuid;
  const body = await readBody(event);

  // If no uuid given
  if (!uuid)
    return createError({
      statusCode: 400,
      statusMessage: "Uuid not supplied",
    });

  // If uuid exists, but user does not exist
  if (!(await userExists(uuid)))
    return createError({
      statusCode: 400,
      statusMessage: "User not found",
    });

  // If no updatable properties supplied
  let nothingToUpdate = true;
  for (let i = 0; i < updatableProperties.length; i++) {
    if (updatableProperties[i] in body === true) nothingToUpdate = false;
  }

  if (nothingToUpdate)
    return createError({
      statusCode: 400,
      statusMessage: "No updatable properties supplied",
    });

  // If first_name empty
  if ("first_name" in body && !body.first_name)
    return createError({
      statusCode: 400,
      statusMessage: "first_name must have data",
    });

  // If last_name empty
  if ("last_name" in body && !body.last_name)
    return createError({
      statusCode: 400,
      statusMessage: "last_name must have data",
    });

  // If role empty
  if ("role" in body && !body.role)
    return createError({
      statusCode: 400,
      statusMessage: "role must have data",
    });
}
export async function validateUserProfileUpdate(
  event: H3Event
): Promise<H3Error | void> {
  // Properties that can be updated in user profile
  const updatableProperties = [
    "first_name",
    "last_name",
    "current_password",
    "new_password",
    "is_active",
    "role",
  ];
  const body = await readBody(event);

  // If uuid not provided
  if (!body.uuid)
    return createError({
      statusCode: 400,
      statusMessage: "User uuid not provided",
    });

  // If nothing supplied can be updated
  let nothingToUpdate = true;
  for (let i = 0; i < updatableProperties.length; i++) {
    if (updatableProperties[i] in body === true) nothingToUpdate = false;
  }

  if (nothingToUpdate)
    return createError({
      statusCode: 400,
      statusMessage: "No updatable properties supplied",
    });

  const user = await getUserByUuid(body.uuid);
  // This error really shouldn't happen
  if (!user) {
    console.log("This error should really not be happening!");
    return createError({
      statusCode: 400,
      statusMessage: "User not found",
    });
  }

  // If first name is supplied, but has no value
  if ("first_name" in body === true && body.first_name.trim() === "")
    return createError({
      statusCode: 400,
      statusMessage: "first_name must have a value",
    });

  // If last name is supplied, but has no value
  if ("last_name" in body === true && body.last_name.trim() === "")
    return createError({
      statusCode: 400,
      statusMessage: "last_name must have a value",
    });

  // If either current password or new password is supplied, but not the other one
  if ("new_password" in body === true && "current_password" in body === false)
    return createError({
      statusCode: 400,
      statusMessage: "Both current_password and new_password must be supplied",
    });

  if ("new_password" in body === false && "current_password" in body === true)
    return createError({
      statusCode: 400,
      statusMessage: "Both current_password and new_password must be supplied",
    });

  // If supplied current password does not match password in database
  if ("current_password" in body)
    if (!(await verifyPassword(user.password, body.current_password)))
      return createError({
        statusCode: 400,
        statusMessage: "Wrong current password",
      });

  // If new password is supplied, but fails password strength policy
  if ("new_password" in body === true && !validatePassword(body.new_password))
    return createError({
      statusCode: 400,
      statusMessage: `Poor new password strength. Password must contain at least 6 characters, an upper-case letter, and a lower-case letter, 
      a number, and a non-alphanumeric character.`,
    });
}
export async function validateUserDelete(
  event: H3Event
): Promise<H3Error | void> {
  const uuid = event.context.params?.uuid;

  if (!uuid)
    return createError({
      statusCode: 400,
      statusMessage: "Uuid not supplied",
    });

  // If uuid exists, but user does not exist
  if (!(await userExists(uuid)))
    return createError({
      statusCode: 400,
      statusMessage: "User not found",
    });
}
export async function validateUserLogin(
  event: H3Event
): Promise<H3Error | void> {
  const body = await readBody(event);

  // Check if body contains email, and password
  const bodyError = validateLoginBody(body);
  if (bodyError) {
    return createError({ statusCode: 400, statusMessage: bodyError });
  }

  // Check email is in a valid format
  if (!validateEmail(body.email)) {
    return createError({ statusCode: 400, statusMessage: "Bad email format" });
  }
}
export async function validateUploadAvatar(
  event: H3Event
): Promise<H3Error | void> {
  const mimeType = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/svg",
    ,
    "image/webp",
  ];
  const body = await readMultipartFormData(event);
  if (!mimeType.includes(body?.[0].type as string))
    return createError({
      statusCode: 400,
      statusMessage: "Type file not allowed",
    });
}
export async function validateNewUserBody(event: H3Event) {
  const body = await readBody(event);
  if ("name" in body.user === false) {
    return "'name' is required";
  }

  if ("email" in body.user === false) {
    return "'email' is required";
  }
}
export async function validateNewTransactionBody(event: H3Event) {
  const body = await readBody(event);

  if ("sku" in body.transaction === false) {
    return "'sku' is required";
  }

  if ("orderID" in body.transaction === false) {
    return "'orderID' is required";
  }

  if ("phone" in body.transaction === false) {
    return "'phone' is required";
  }

  if ("country" in body.transaction === false) {
    return "'country' is required";
  }

  if ("state" in body.transaction === false) {
    return "'state' is required";
  }

  if ("city" in body.transaction === false) {
    return "'city' is required";
  }

  if ("address_1" in body.transaction === false) {
    return "'address' is required";
  }

  if ("postal_code" in body.transaction === false) {
    return "'postal code' is required";
  }

  if ("amount" in body.transaction === false) {
    return "'amount' is required";
  }

  if ("quantity" in body.transaction === false) {
    return "'quantity' is required";
  }

  if ("payerID" in body.transaction === false) {
    return "'payerID' is required";
  }

  if ("paymentID" in body.transaction === false) {
    return "'paymentID' is required";
  }

  if ("paymentSource" in body.transaction === false) {
    return "'paymentSource' is required";
  }
}
export async function validateChangePasswordBody(
  event: H3Event,
  user: User
): Promise<H3Error | void> {
  const body = await readBody(event);
  console.log(body);
  if ("currentPassword" in body === false) {
    return createError({
      statusCode: 400,
      statusMessage: "'Current Password' is required",
    });
  }
  if ("password" in body === false) {
    return createError({
      statusCode: 400,
      statusMessage: "'Password' is required",
    });
  }
  if ("confPassword" in body === false) {
    return createError({
      statusCode: 400,
      statusMessage: "'Confirm password' is required",
    });
  }
  if (!validatePassword(body.password)) {
    return createError({
      statusCode: 400,
      statusMessage:
        "Poor new password strength. Password must contain at least 6 characters and spaces are not allowed",
    });
  }
  const checkUser = await usersUtils.getUserByEmail(user.email);
  if (checkUser === null) {
    return createError({ statusCode: 401, statusMessage: "Account not found" });
  }

  const isMatch = body.password === body.confPassword ? true : false;
  if (!isMatch) {
    return createError({
      statusCode: 400,
      statusMessage: "New password and confirm password dont't match",
    });
  }
  if (!(await verifyPassword(checkUser.password, body.currentPassword)))
    return createError({
      statusCode: 400,
      statusMessage: "Wrong current password",
    });
}
export function validateLoginBody(body: Object) {
  if ("email" in body === false) {
    return "'email' is required";
  }

  if ("password" in body === false) {
    return "'password' is required";
  }
}
export function validateEmail(email: string): boolean {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }

  return false;
}
export async function emailExists(email: string): Promise<boolean | H3Error> {
  if (!email) return false;
  let error = null;

  let user = undefined;
  await prisma.users
    .findFirst({
      where: {
        email: email,
      },
    })
    .then(async (result) => {
      user = result;
    })
    .catch(async (e) => {
      console.error(e);
      error = e;
    });

  if (error) {
    console.log("Email error when checking if email exists");
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }
  if (user === null) {
    console.log("User not found");
    return false;
  }
  return true;
}
export async function userExists(uuid: string): Promise<boolean> {
  if (!uuid) return false;

  let user = undefined;

  await prisma.users
    .findFirst({
      where: {
        uuid: uuid,
      },
    })
    .then(async (result) => {
      user = result;
    })
    .catch(async (e) => {
      console.error(e);
    });

  if (user === null) return false;

  return true;
}
export function validatePassword(password: string): boolean {
  // Has at least 8 characters
  if (password.length < 6) return false;

  // Has uppercase letters
  // if (!/[A-Z]/.test(password)) return false;

  // Has lowercase letters
  // if (!/[a-z]/.test(password)) return false;

  // Has numbers
  if (!/\d/.test(password)) return false;

  // Not Allow whitespace
  // if (/^(\S+$)/g.test(password)) return false;

  // Has non-alphanumeric characters
  // if (!/\W/.test(password)) return false;

  return true;
}
export async function validateGetOrderId(orderID: string): Promise<boolean> {
  if (!orderID) {
    return false;
  }
  return true;
}
