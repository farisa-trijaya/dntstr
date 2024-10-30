import { PrismaClient } from "@prisma/client";
import { H3Error, H3Event } from "h3";
import type { User } from "../misc/types";
import { hashPassword } from "./passwords";
import { validateUserProfileUpdate } from "./validators";

const prisma = new PrismaClient();

export async function getUserByEmail(email: string): Promise<User | null> {
  let user = null;
  await prisma.users
    .findFirst({
      where: {
        email: email,
      },
    })
    .then(async (response) => {
      user = response;
    })
    .catch(async (e) => {
      console.error(e);
    });

  return user;
}
export async function getUserByUuid(uuid: string): Promise<User | null> {
  let user = null;
  await prisma.users
    .findFirst({
      where: {
        uuid: uuid,
      },
    })
    .then(async (response) => {
      user = response;
    })
    .catch(async (e) => {
      console.error(e);
    });

  return user;
}
export async function getUserById(id: number): Promise<User | null> {
  let user = null;
  await prisma.users
    .findFirst({
      where: {
        id: id,
      },
    })
    .then(async (response) => {
      user = response;
    })
    .catch(async (e) => {
      console.error(e);
    });

  return user;
}
export async function updateLastLogin(email: string): Promise<null | User> {
  let result = null;
  await prisma.users
    .update({
      where: {
        email: email,
      },
      data: {
        last_login: new Date(),
      },
    })
    .then(async (response) => {
      result = response;
    })
    .catch(async (e) => {
      console.error(e);
    });

  return result;
}
export async function updateUserProfile(
  event: H3Event
): Promise<User | H3Error> {
  const errorOrVoid = await validateUserProfileUpdate(event);
  if (errorOrVoid instanceof H3Error) return errorOrVoid;

  // After going through validateUserProfileUpdate, supplied values should be clean
  const body = await readBody(event);

  // Properties that user can update in their profile
  let user = {} as User;
  let error = null;

  // Get current user data
  const userDataOrError = await getUserByUuid(body.uuid);
  if (userDataOrError instanceof H3Error) return userDataOrError;
  const userData = userDataOrError as User;

  // Attempt to hash new password, if error, return error
  let newHashedPassword = "";
  if ("new_password" in body === true && "current_password" in body === true) {
    const newHashedPasswordOrError = await hashPassword(body.new_password);
    if (newHashedPasswordOrError instanceof H3Error)
      return newHashedPasswordOrError;
    newHashedPassword = newHashedPasswordOrError as string;
  }

  await prisma.users
    .update({
      where: {
        uuid: body.uuid,
      },
      data: {
        name: body.name ? body.name : userData.name,
        // If we got a new password, update it, otherwise keep old password
        password:
          newHashedPassword.length > 0 ? newHashedPassword : userData.password,
      },
    })
    .then(async (response) => {
      user = response;
    })
    .catch(async (e) => {
      console.error(e);
      error = e;
    });

  // If error, return error
  if (error) return error;

  return user;
}
export async function updateEmailVerifiedTrue(
  email: string
): Promise<H3Error | void> {
  let error = null;

  if (!email) {
    console.log("Error no email provided to update email verified to true");
    return createError({ statusCode: 400, statusMessage: "No email provided" });
  }

  await prisma.users
    .update({
      where: {
        email: email,
      },
      data: {
        email_verified: true,
      },
    })
    .catch(async (e) => {
      console.error(e);
      error = e;
    });

  // If error, return error
  if (error) {
    console.log("Error updating email verified to true");
    return createError({ statusCode: 500, statusMessage: "Password error" });
  }
}
