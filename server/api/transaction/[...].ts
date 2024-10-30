import transactionController from "~/app/controllers/transaction.controller";

export default defineEventHandler(async (event) => {
  return transactionController(event);
});
