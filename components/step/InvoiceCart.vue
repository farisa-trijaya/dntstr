<template>
  <div class="p-6">
    <div class="text-center mb-8">
      <h4 class="text-slate-900 dark:text-slate-300 text-2xl font-medium pb-4">
        Thank You for Your Order!
      </h4>
      <p class="text-slate-900 dark:text-slate-300 text-base font-normal">
        A copy or your order summary has been sent to
        <span
          class="dark:text-slate-400 text-base font-medium ml-1 cursor-pointer"
        >
          {{ orderData?.email }}
        </span>
      </p>
    </div>
    <div
      class="py-12 text-center lg:text-2xl text-xl font-normal text-slate-900 dark:text-slate-300"
    >
      Order Code:
      <span class="lg:text-2xl text-xl font-medium">
        {{ orderData?.transaction.orderID }}
      </span>
    </div>
    <div class="border dark:border-slate-700 p-3 lg:p-6 rounded">
      <p
        class="text-slate-900 dark:text-slate-300 text-base font-medium pb-3 border-b dark:border-slate-700 mb-4"
      >
        Order Summary
      </p>
      <div
        class="grid grid-cols-12 md:space-x-3 lg:space-x-5 space-y-3 md:space-y-0 overflow-auto"
      >
        <div class="flex-none col-span-12 md:col-span-6">
          <div class="flex space-x-1 md:space-x-3 rtl:space-x-reverse">
            <div
              class="font-medium md:text-sm text-xs text-slate-900 dark:text-slate-300 space-y-3 min-w-[110px]"
            >
              <p>Order Date:</p>
              <p>Name:</p>
              <p>Email:</p>
              <p>Shipping address:</p>
            </div>
            <div
              class="font-normal md:text-sm text-xs text-slate-900 dark:text-slate-300 space-y-3 min-w-[110px]"
            >
              <p>{{ getDateNow(orderData?.transaction.date_created) }}</p>
              <p>{{ orderData?.transaction.name }}</p>
              <p>{{ orderData?.email }}</p>
              <p>
                {{ orderData?.transaction.address_1 }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex-none col-span-12 md:col-span-6">
          <div class="flex space-x-1 md:space-x-3 rtl:space-x-reverse">
            <div
              class="font-medium md:text-sm text-xs text-slate-900 dark:text-slate-300 space-y-3 min-w-[110px]"
            >
              <p>Order Status:</p>
              <p>Total order amount:</p>
              <p>Shipping:</p>
              <p>Payment method:</p>
            </div>
            <div
              class="font-normal md:text-sm text-xs text-slate-900 dark:text-slate-300 space-y-3 min-w-[110px]"
            >
              <p>
                {{ orderData?.transaction?.status ? "Completed" : "Pending" }}
              </p>
              <p>${{ orderData?.transaction?.amount }}</p>
              <p>Flat shipping rate</p>
              <p>{{ orderData?.transaction?.paymentSource }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import type { OrderIDUser } from "~/app/misc/types";

const props = defineProps({
  orderId: {
    type: String,
    required: true,
  },
});

const cart = useCartStore();
const { getTransactionByOrderID } = useCheckout();
const orderData = ref(<OrderIDUser | null>null);
const errorData = ref(<Error | null>null);

onMounted(async () => {
  await getTransaction();
});

function getDateNow(date: string) {
  return dayjs(date).format("dddd, MMMM D, YYYY h:mm A");
}
async function getTransaction() {
  const { data, error } = await getTransactionByOrderID(props.orderId);
  if (error) {
    errorData.value = error;
  }
  orderData.value = data.data;
}
</script>

<style scoped></style>
