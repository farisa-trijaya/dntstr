import { PrismaClient } from "@prisma/client";
import { H3Event, H3Error, type MultiPartData } from "h3";
import type { User, ChangePassword } from "~~/app/misc/types";
import * as validators from "~~/app/utils/validators";
import * as uploadHelper from "../helpers/upload.helpers";
import * as tokensUtils from "../utils/token";
import * as usersUtils from "../utils/users";
import * as passwordsUtils from "../utils/passwords";

const prisma = new PrismaClient();

export async function getAllUsers(
  event: H3Event
): Promise<Array<User> | H3Error> {
  let users = [] as Array<User>;
  let error = null;
  // Get query parameters from url
  const queryParams = getQuery(event);
  // Pagination variables
  let skip = queryParams.skip as string;
  let take = queryParams.take as string;

  await prisma.users
    .findMany({
      skip: Number.isInteger(skip) ? parseInt(skip) : 0,
      take: Number.isInteger(take) ? parseInt(take) : 100,
    })
    .then(async (result) => {
      users = result;
    })
    .catch(async (e) => {
      console.error(e);
      error = e;
    });

  // Return error or users
  if (error) {
    console.log("Error retrieving users");
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }

  return users;
}
export async function showUser(event: H3Event): Promise<User | H3Error> {
  const uuid = event.context.params?.uuid;

  if (!uuid) {
    console.log("Missing user uuid");
    return createError({
      statusCode: 400,
      statusMessage: "Missing user uuid",
    });
  }

  let error = null;
  let user = {} as User | null;

  await prisma.users
    .findUnique({
      where: {
        uuid: uuid,
      },
    })
    .then(async (result) => {
      user = result;
    })
    .catch(async (e) => {
      console.error(e);
      error = e;
    });

  // If error, return error
  if (error) {
    console.log("Error getting one user");
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }

  // Prisma returns empty object if user not found, so check if user has email
  if (user && "email" in user === false) {
    return createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }

  // Because Prisma can return null for user, we have to check for null before returning user
  if (user === null)
    return createError({
      statusCode: 404,
      statusMessage: "User not found",
    });

  return user;
}
export async function updateUser(event: H3Event): Promise<User | H3Error> {
  const errorOrVoid = await validators.validateUserUpdate(event);
  if (errorOrVoid instanceof H3Error) return errorOrVoid;

  // Get parameters
  const body = await readBody(event);

  // Get uuid from event context
  const uuid = event.context.params?.uuid;

  if (!uuid) {
    console.log("Missing user uuid");
    return createError({
      statusCode: 400,
      statusMessage: "Missing user uuid",
    });
  }

  let user = {} as User;
  let error = null;

  // Remove uuid and id from body so they cannot be updated accidentally
  delete body.uuid;
  delete body.id;

  // Remove csrf_token because it's not in user schema
  delete body.csrf_token;

  await prisma.users
    .update({
      where: {
        uuid: uuid,
      },
      data: body,
    })
    .then(async (response) => {
      user = response;
    })
    .catch(async (e) => {
      console.error(e);
      error = e;
    });

  // If error, return error
  if (error)
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });

  return user;
}
export async function destroyUser(event: H3Event): Promise<boolean | H3Error> {
  console.log("Got in destroyUser");
  const errorOrVoid = await validators.validateUserDelete(event);
  if (errorOrVoid instanceof H3Error) return errorOrVoid;

  const uuid = event.context.params?.uuid;

  if (!uuid) {
    console.log("Missing user uuid");
    return createError({
      statusCode: 400,
      statusMessage: "Missing user uuid",
    });
  }

  let user = {} as User;
  let error = null;

  await prisma.users
    .delete({
      where: {
        uuid: uuid,
      },
    })
    .then(async (result) => {
      user = result;
    })
    .catch(async (e) => {
      console.error(e);
      error = e;
    });
  // If we encounter an error, return error
  if (error) {
    console.log("Error deleting user");
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }
  // If we have a user, return the boolean
  if (user) return true;
  // otherwise return false (which shouldn't happen)
  else return false;
}
export async function uploadAvatar(event: H3Event): Promise<User | H3Error> {
  const validateUserToken = await tokensUtils.requestUserToken(event);
  if (validateUserToken instanceof H3Error) return validateUserToken;

  const users = validateUserToken as User;

  const validUpload = await validators.validateUploadAvatar(event);
  if (validUpload instanceof H3Error) return validUpload;

  let findUser = {} as User | null;
  let errorFindUser = null;

  await prisma.users
    .findUnique({
      where: {
        uuid: users.uuid,
      },
    })
    .then(async (response) => {
      findUser = response;
    })
    .catch(async (err) => {
      errorFindUser = err;
    });

  if (errorFindUser) {
    return createError({
      statusCode: 500,
      statusMessage: "Forbidden",
    });
  }
  const existUser = findUser as User;

  if (findUser && existUser.avatar !== null) {
    const deleteFile = await uploadHelper.deleteFile(
      "public/users",
      String(existUser.avatar)
    );
    if (deleteFile instanceof H3Error) return deleteFile;
  }
  const saveFIle = await uploadHelper.saveFile(event, "public/users");
  if (saveFIle instanceof H3Error) return saveFIle;

  let updateUser = {} as User | null;
  let errorUpdateUser = null;
  await prisma.users
    .update({
      where: {
        uuid: existUser.uuid,
      },
      data: {
        avatar: saveFIle as string,
      },
    })
    .then(async (response) => {
      updateUser = response;
    })
    .catch(async (err) => {
      errorUpdateUser = err;
    });

  if (errorUpdateUser) {
    return createError({
      statusCode: 500,
      statusMessage: "Error Updating Images",
    });
  }

  const data = updateUser as User;
  data.password = "[hidden]";

  return data;
}
export async function changePassword(event: H3Event): Promise<User | H3Error> {
  const requestAccessToken = await tokensUtils.requestUserToken(event);
  if (requestAccessToken instanceof H3Error) return requestAccessToken;

  const token = requestAccessToken as User;
  const body = (await readBody(event)) as ChangePassword;

  const validatePassword = await validators.validateChangePasswordBody(
    event,
    token
  );
  if (validatePassword instanceof H3Error) return validatePassword;

  const hasPasswordOrError = await passwordsUtils.hashPassword(body.password);
  if (hasPasswordOrError instanceof H3Error) return hasPasswordOrError;

  let users = {} as User | null;
  let updateError = null;
  await prisma.users
    .update({
      where: {
        uuid: token.uuid,
      },
      data: {
        password: hasPasswordOrError as string,
      },
    })
    .then(async (response) => {
      users = response;
    })
    .catch((error) => {
      updateError = error;
    });

  if (updateError) {
    createError({
      status: 403,
      statusMessage: "Error updating password",
    });
  }

  const data = users as User;
  data.password = "[hidden]";

  return data;
}
