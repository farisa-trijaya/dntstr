import { PrismaClient } from "@prisma/client";
import { H3Event, H3Error } from "h3";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { randomUUID } from "crypto";
import type { User, Transaction, OrderIDUser } from "../misc/types";
import * as validatorsUtils from "../utils/validators";
import * as passwordUtils from "../utils/passwords";
import * as emailUtils from "../utils/email";
import * as tokensUtils from "../utils/token";
import { getUserByEmail } from "../utils/users";

const config = useRuntimeConfig();
const prisma = new PrismaClient();

export async function createNewTransaction(
  event: H3Event
): Promise<User | Transaction | H3Error> {
  const validationUserError = await validatorsUtils.validateNewUser(event);
  if (validationUserError instanceof H3Error) return validationUserError;

  const validationTransactionError =
    await validatorsUtils.validateNewTransaction(event);
  if (validationTransactionError instanceof H3Error)
    return validationTransactionError;

  const body = await readBody(event);
  const generatePassword = await passwordUtils.generatePassword();

  const hashedPasswordOrError = await passwordUtils.hashPassword(
    generatePassword
  );
  if (hashedPasswordOrError instanceof H3Error) {
    console.log("Error hashing password");
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }
  const hashedPassword = hashedPasswordOrError as string;

  let user = {};
  let registrationError = null;
  let password = null;
  let isExist: boolean = true;
  const existUser = await getUserByEmail(body.user.email);
  if (existUser === null) {
    await prisma.users
      .create({
        data: {
          uuid: passwordUtils.makeUuid(),
          password: hashedPassword,
          verified_purchase: true,
          ...body.user,
        },
      })
      .then(async (response) => {
        user = response;
      })
      .catch(async (e) => {
        console.error(e);
        registrationError = e;
      });
    isExist = false;
    password = generatePassword as string;
  } else {
    user = existUser;
    password = "Use previous Password";
    isExist = true;
  }
  if (registrationError)
    throw createError({
      statusCode: 500,
      statusMessage: "Server error",
    });

  const newUser = user as User;

  let transaction = {};
  let createTransactionError = null;

  await prisma.transactions
    .create({
      data: {
        user_id: newUser.id,
        status: true,
        ...body.transaction,
      },
    })
    .then(async (response) => {
      transaction = response;
    })
    .catch(async (err) => {
      console.log(err);
      createTransactionError = err;
    });

  if (createTransactionError)
    throw createError({
      statusCode: 500,
      statusMessage: "Server error",
    });

  const newTransaction = transaction as Transaction;

  const verifyUser = {
    email: newUser.email,
  };

  const emailVerifyToken = jwt.sign(verifyUser, config.iamVerifyTokenSecret, {
    expiresIn: "24h",
    issuer: "NuxtIam",
    jwtid: passwordUtils.makeUuid(),
  });

  let errorOrSent = null;
  if (isExist) {
    errorOrSent = await emailUtils.sendExitingUserTransaction(
      newUser,
      newTransaction,
      password
    );
  } else {
    errorOrSent = await emailUtils.sendVerifyTransactionEmail(
      newUser,
      newTransaction,
      emailVerifyToken,
      password
    );
  }
  if (errorOrSent instanceof H3Error) return errorOrSent;

  return newTransaction;
}
export async function getTransactionByOrderID(
  event: H3Event
): Promise<OrderIDUser | Transaction | User | H3Error> {
  const orderID = event.context.params?.orderID;

  if (!orderID) {
    return createError({
      statusCode: 400,
      statusMessage: "orderID not supplied",
    });
  }

  let transaction: any = {};
  let errorFindTransaction = null;

  await prisma.transactions
    .findUnique({
      where: {
        orderID: orderID,
      },
    })
    .then(async (result) => {
      transaction = result;
    })
    .catch(async (err) => {
      errorFindTransaction = err;
    });

  if (errorFindTransaction) {
    return createError({
      statusCode: 500,
      statusMessage: "Error getting one transaction",
    });
  }

  let errorFIndUser = null;
  let user = {} as User | null;
  await prisma.users
    .findFirst({
      where: {
        id: transaction.user_id,
      },
    })
    .then(async (response) => {
      user = response;
    })
    .catch(async (err) => {
      errorFIndUser = err;
    });

  if (errorFIndUser) {
    return createError({
      statusCode: 500,
      statusMessage: "Error getting user",
    });
  }

  const data = {
    email: user?.email,
    transaction,
  } as OrderIDUser;

  return data;
}
export async function getAllTransactionByUser(
  event: H3Event
): Promise<Transaction | H3Error> {
  const validateUserToken = await tokensUtils.requestUserToken(event);
  if (validateUserToken instanceof H3Error) return validateUserToken;

  const users = validateUserToken as User;

  let transaction = {} as any;
  let errorFindTransaction = null;

  await prisma.transactions
    .findMany({
      where: {
        user_id: users.id,
      },
    })
    .then(async (response) => {
      transaction = response;
    })
    .catch(async (err) => {
      errorFindTransaction = err;
    });

  if (errorFindTransaction) {
    return createError({
      statusCode: 500,
      statusMessage: "Error getting one transaction",
    });
  }

  const data = transaction as Transaction;
  return data;
}
export async function getAllTransaction(
  event: H3Event
): Promise<Array<Transaction> | H3Error> {
  let transaction = [] as Array<any>;
  let error = null;

  const queryParams = getQuery(event);
  let skip = queryParams.skip as string;
  let take = queryParams.take as string;
  let search = queryParams.search as string;
  console.log(parseInt(search));
  await prisma.transactions
    .findMany({
      skip: parseInt(skip),
      take: parseInt(take),
      where: {
        orderID: {
          contains: search,
        },
      },
      orderBy: {
        name: "asc",
      },
    })
    .then(async (result) => {
      transaction = result;
    })
    .catch(async (e) => {
      console.error(e);
      error = e;
    });

  if (error) {
    return createError({
      statusCode: 500,
      statusMessage: "Error fetching data transaction",
    });
  }
  const data = transaction as Array<Transaction>;
  return data;
}
