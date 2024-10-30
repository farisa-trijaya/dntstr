import { H3Event, H3Error } from "h3";
import type {
  JSONResponse,
  Transaction,
  OrderIDUser,
  Session,
} from "~~/app/misc/types";
import * as transactionResources from "../resources/transaction.resources";
import { getUserSession } from "../utils/sessions";

export async function createNewTransactionService(
  event: H3Event
): Promise<JSONResponse> {
  let response = {} as JSONResponse;
  const transactionError = await transactionResources.createNewTransaction(
    event
  );
  if (transactionError instanceof H3Error) {
    response.status = "fail";
    response.error = transactionError;
    return response;
  }
  const data = transactionError as Transaction;
  response.status = "success";
  response.data = {
    data,
  };
  return response;
}
export async function getTransactionByOrderIDService(
  event: H3Event
): Promise<JSONResponse> {
  let response = {} as JSONResponse;
  const findOrderOrError = await transactionResources.getTransactionByOrderID(
    event
  );
  if (findOrderOrError instanceof H3Error) {
    response.status = "fail";
    response.error = findOrderOrError;
    return response;
  }
  const data = findOrderOrError as OrderIDUser;
  response.status = "success";
  response.data = {
    data,
  };
  return response;
}
export async function getAllTransactionUserService(
  event: H3Event
): Promise<JSONResponse> {
  let response = {} as JSONResponse;

  const transaction = await transactionResources.getAllTransactionByUser(event);
  if (transaction instanceof H3Error) {
    response.status = "fail";
    response.error = transaction;
    return response;
  }
  const data = transaction as Transaction;
  response.status = "success";
  response.data = data;
  return response;
}
export async function getAllTransactionService(
  event: H3Event
): Promise<JSONResponse> {
  let response = {} as JSONResponse;
  let sessionOrError = {} as Session | H3Error;

  const getTransaction = await transactionResources.getAllTransaction(event);
  if (getTransaction instanceof H3Error) {
    (response.status = "fail"), (response.error = getTransaction);
    return response;
  }
  const sessionId = getCookie(event, "iam-sid");
  if (sessionId) sessionOrError = await getUserSession(sessionId);

  if (sessionOrError instanceof H3Error) {
    console.log("Error getting user session");
    response.status = "fail";
    response.error = response.error = createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }
  const session = sessionOrError as Session;
  const data = getTransaction as Array<Transaction>;
  response.status = "success";
  response.data = {
    data,
    csrf_token: session.csrf_token,
  };

  return response;
}
