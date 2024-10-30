<template>
  <div>
    <div class="bg-white dark:bg-slate-800">
      <div class="rounded p-5 space-y-5">
        <div
          v-if="cartStore.shippingInfo.length > 0"
          v-for="items in cartStore.shippingInfo"
          :key="items.id"
          class="flex items-center gap-2 w-full"
        >
          <div class="flex flex-col items-center space-y-4">
            <Icon
              name="material-symbols:edit-square-outline"
              class="text-gray-900 dark:text-gray-100 h-4 w-4 font-bold cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-500"
              @click="openEditShipping(items)"
            />
            <Icon
              name="material-symbols:delete-forever-outline"
              class="text-red-600 dark:text-red-500 h-4 w-4 font-bold cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-200"
              @click="cartStore.removeShippingInfo(items.id)"
            />
          </div>
          <label
            class="flex w-full items-start gap-3 border dark:border-slate-700 rounded p-5"
          >
            <div
              class="flex flex-start -mt-1 space-x-3 md:space-x-5 rtl:space-x-reverse"
            >
              <div
                class="w-max md:min-w-[110px] md:text-base text-xs text-slate-500 dark:text-slate-400 space-y-1.5"
              >
                <p>Full Name:</p>
                <p>Address:</p>
                <p>Email:</p>
                <p>Phone:</p>
                <p>City:</p>
                <p>State:</p>
                <p>Country:</p>
                <p>Postal Code:</p>
              </div>
              <div
                class="md:text-base text-xs text-slate-900 dark:text-slate-300 space-y-1.5"
              >
                <p>{{ items.full_name }}</p>
                <p>
                  {{
                    items.address_1 +
                    " " +
                    `${items.address_2 !== undefined ? items.address_2 : ""}`
                  }}
                </p>
                <p>{{ items.email }}</p>
                <p>{{ items.phone }}</p>
                <p>{{ items.city }}</p>
                <p>{{ items.state }}</p>
                <p>{{ items.country }}</p>
                <p>{{ items.postal_code }}</p>
              </div>
            </div>
          </label>
        </div>
        <button
          v-else
          @click="openAddShipping"
          class="w-full flex flex-col justify-center items-center font-normal text-slate-800 dark:text-slate-300 p-5 space-y-3 border dark:border-slate-700 rounded bg-slate-100 dark:bg-slate-800"
        >
          <Icon name="ic:round-plus" class="h-6 w-6" />
          <span>Add New Address</span>
        </button>
      </div>
    </div>
    <AddShippingInfo :is-open="openModal" @on-close="closeAddShipping" />
    <StepEditShippingInfo
      v-if="openEditModal"
      :is-open="openEditModal"
      @on-close="closeEditShipping"
      :data="dataShipping"
    />
  </div>
</template>

<script setup lang="ts">
import type { ShippingInfo } from "~/utils/products";

const cartStore = useCartStore();
const openModal = ref(false);
const openEditModal = ref(false);
const dataShipping = ref() as any;

const openAddShipping = () => {
  openModal.value = true;
};
const closeAddShipping = () => {
  openModal.value = false;
};
const openEditShipping = (data: ShippingInfo) => {
  openEditModal.value = true;
  dataShipping.value = data;
};
const closeEditShipping = () => {
  openEditModal.value = false;
};
</script>

<style scoped></style>
