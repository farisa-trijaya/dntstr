<template>
  <div class="flex flex-col w-full h-full">
    <h1 class="text-lg text-gray-900 dark:text-gray-50 font-semibold">
      My Orders
    </h1>
    <div
      class="h-[680px] lg:h-[520px] md:h-[730px] overflow-y-auto overflow-hidden mt-3"
    >
      <div
        v-for="item in props.data"
        class="relative w-full bg-white dark:bg-gray-800 rounded-md py-2 px-3 lg:px-5 md:px-3 mt-3"
      >
        <div
          class="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-1 w-full py-2"
        >
          <div class="col-span-1 lg:col-span-9 md:col-span-1 w-full">
            <div class="grid grid-cols-12">
              <div class="col-span-5 lg:col-span-3 md:col-span-5 items-center">
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  Order ID
                </div>
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  Recipient's name
                </div>
                <div class="text-sm text-gray-900 dark:text-gray-50">Phone</div>
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  Amount
                </div>
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  Quantity
                </div>
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  Payment Methods
                </div>
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  Address
                </div>
                <div class="text-sm text-gray-900 dark:text-gray-50">City</div>
                <div class="text-sm text-gray-900 dark:text-gray-50">State</div>
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  Country
                </div>
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  Postal Code
                </div>
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  Payment Status
                </div>
              </div>
              <div class="col-span-7 lg:col-span-9 md:col-span-7 items-center">
                <div
                  class="text-sm text-gray-900 dark:text-gray-50 uppercase font-semibold"
                >
                  :
                  <span class="text-orange-600 dark:text-orange-500">{{
                    item.orderID
                  }}</span>
                </div>
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  :
                  <span class="text-orange-600 dark:text-orange-500">{{
                    item.name
                  }}</span>
                </div>
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  :
                  <span class="text-orange-600 dark:text-orange-500">{{
                    item.phone
                  }}</span>
                </div>
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  :
                  <span class="text-orange-600 dark:text-orange-500"
                    >${{ item.amount }}</span
                  >
                </div>
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  :
                  <span class="text-orange-600 dark:text-orange-500">{{
                    item.quantity
                  }}</span>
                </div>
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  :
                  <span class="text-orange-600 dark:text-orange-500">{{
                    item.paymentSource
                  }}</span>
                </div>
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  :
                  <span class="text-orange-600 dark:text-orange-500">{{
                    item.address_1
                  }}</span>
                </div>
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  :
                  <span class="text-orange-600 dark:text-orange-500">{{
                    item.city
                  }}</span>
                </div>
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  :
                  <span class="text-orange-600 dark:text-orange-500">{{
                    item.state
                  }}</span>
                </div>
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  :
                  <span class="text-orange-600 dark:text-orange-500">{{
                    item.country
                  }}</span>
                </div>
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  :
                  <span class="text-orange-600 dark:text-orange-500">{{
                    item.postal_code
                  }}</span>
                </div>
                <div class="text-sm text-gray-900 dark:text-gray-50">
                  :
                  <span class="text-orange-600 dark:text-orange-500">{{
                    item.status ? "Approved" : "Pending"
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-span-1 lg:col-span-3 md:col-span-1 flex w-full items-center justify-center mt-5 lg:mt-0 md:mt-5"
          >
            <button
              class="inline-flex items-center gap-2 py-2 px-10 lg:px-10 md:px-10 text-nowrap border border-orange-600 dark:border-orange-500 hover:bg-orange-600 rounded-sm group mt-2 lg:mt-0 md:mt-2"
            >
              <Icon
                name="material-symbols:eye-tracking-outline"
                class="text-orange-600 dark:text-orange-500 group-hover:text-white"
              />
              <span
                class="text-sm text-orange-600 dark:text-orange-500 font-semibold group-hover:text-white"
              >
                Track Order</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from "~/app/misc/types";

const props = defineProps({
  data: {
    type: Array as PropType<Array<Transaction>>,
    require: true,
  },
});
</script>

<style scoped></style>
