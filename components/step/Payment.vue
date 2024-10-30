<template>
  <div class="h-auto rounded-sm">
    <AlertMessageBox
      v-if="errorPayment"
      theme="danger"
      message="Failed to process payment, Please try again"
      :show-close="true"
      @close-message="errorPayment = false"
    />
    <div v-else class="grid grid-cols-12 gap-5">
      <div class="lg:col-span-5 col-span-12">
        <h3
          class="text-slate-950 dark:text-slate-300 font-medium text-base pb-3"
        >
          Summary
        </h3>
        <div class="card border dark:border-slate-700 rounded-sm p-4">
          <div>
            <ul
              class="divide-y gap-8 divide-slate-300 dark:divide-slate-600 pb-8"
            >
              <li class="text-xs pb-3">
                <div class="flex justify-between">
                  <p>Product</p>
                  <p>Total</p>
                </div>
              </li>

              <li
                v-for="(item, index) in cart.items"
                :key="index"
                class="text-xs text-slate-950 dark:text-slate-300 py-2"
              >
                <div class="flex justify-between gap-3 pb-1">
                  <p class="text-sm line-clamp-2">
                    {{ item.name }}
                  </p>
                  <p class="text-slate-950 dark:text-slate-300 font-medium">
                    x{{ item.quantity }}
                  </p>
                </div>
              </li>

              <li class="text-xs py-2 space-y-2">
                <div class="flex justify-between gap-3">
                  <p class="text-slate-950 dark:text-slate-300 font-medium">
                    Total
                  </p>
                  <p class="text-slate-950 dark:text-slate-300 font-medium">
                    ${{ cart.totalPrice }}
                  </p>
                </div>
                <div class="flex justify-between gap-3">
                  <p class="text-slate-950 dark:text-slate-300 font-medium">
                    Tax
                  </p>
                  <p class="text-slate-950 dark:text-slate-300 font-medium">
                    ${{ cart.taxTotal }}
                  </p>
                </div>
                <div class="flex justify-between gap-3">
                  <p class="text-slate-950 dark:text-slate-300 font-medium">
                    Shipping Costs
                  </p>
                  <p class="text-slate-950 dark:text-slate-300 font-medium">
                    ${{ cart.shippingTotal }}
                  </p>
                </div>
              </li>
              <li class="text-xs py-2">
                <div class="flex justify-between gap-3">
                  <p class="text-slate-950 dark:text-slate-300 font-medium">
                    Total
                  </p>
                  <p class="text-slate-950 dark:text-slate-300 font-medium">
                    ${{ cart.grandTotal }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="lg:col-span-7 col-span-12">
        <h3
          class="text-slate-900 dark:text-slate-300 font-medium text-base pb-3"
        >
          Select a Payment Option
        </h3>
        <div
          class="card border dark:border-slate-700 rounded-sm p-5"
          :style="{
            backgroundColor: '#fff',
          }"
        >
          <div id="paypal-checkout" />
        </div>

        <div class="flex items-center text-base text-gray-500 mt-3 gap-4 px-2">
          <CheckBox active checked />
          <p class="text-slate-900 dark:text-slate-300 font-medium">
            I agree to the terms and conditions, Return Policy & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadScript } from "@paypal/paypal-js";
import type { User, Transaction, responseData } from "~/utils/products";

const emit = defineEmits(["orderComplete", "orderFailed"]);
const cart = useCartStore();
const config = useRuntimeConfig();
const { createTransaction } = useCheckout();
const errorPayment = ref(false);
const { $fbq } = useNuxtApp();
const YOUR_PIXEL_ID = config.public.metaPixel

onMounted(() => {
  loadScript({ clientId: config.public.clientId }).then((paypal) => {
    if (paypal && paypal.Buttons) {
      paypal
        ?.Buttons({
          createOrder: createOrder,
          onApprove: onApprove,
          onError: () => {
            errorPayment.value = true;
          },
        })
        .render("#paypal-checkout");
    }
  });
});

function createOrder(data: any, action: any) {
  console.log(data);
  return action.order.create({
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: cart.grandTotal,
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: cart.totalPrice,
            },
            shipping: {
              currency_code: "USD",
              value: cart.shippingTotal,
            },
            tax_total: {
              currency_code: "USD",
              value: cart.taxTotal,
            },
          },
        },
        // items: [
        //   {
        //     name: "Dental Implant Model Removable",
        //     sku: cart.items[0].sku,
        //     description:
        //       "Dental Implant Model Removable Interior Mandibular OverDenture",
        //     category: cart.items[0].brand,
        //     quantity: cart.totalQuantity(),
        //     unit_amount: {
        //       currency_code: "USD",
        //       value: cart.items[0].price,
        //     },
        //   },
        // ],
        shipping: {
          name: {
            full_name: cart.shippingInfo[0].full_name,
          },
          type: "SHIPPING",
          address: {
            address_line_1: cart.shippingInfo[0].address_1,
            address_line_2:
              cart.shippingInfo[0].address_2 !== undefined
                ? cart.shippingInfo[0].address_2
                : "",
            country_code: cart.shippingInfo[0].country,
            postal_code: cart.shippingInfo[0].postal_code,
            admin_area_2: cart.shippingInfo[0].city,
            admin_area_1: cart.shippingInfo[0].state,
          },
        },
      },
    ],
  });
}
function onApprove(data: any, action: any) {
  return action.order.capture().then(async () => {
    const value = data as responseData;
    emit("orderComplete", value.orderID);
    $fbq("trackSingle", YOUR_PIXEL_ID, 'CompleteRegistration');
    await transactionCreate(value);
    cart.removeAllFromCart();
    cart.removeAllShippingInfo();
  });
}

async function transactionCreate(data: responseData) {
  const user = {
    name: cart.shippingInfo[0].full_name,
    email: cart.shippingInfo[0].email,
  } as User;
  const transaction = {
    sku: cart.items[0].sku,
    orderID: data.orderID,
    name: cart.shippingInfo[0].full_name,
    phone: cart.shippingInfo[0].phone,
    country: cart.shippingInfo[0].country,
    state: cart.shippingInfo[0].state,
    city: cart.shippingInfo[0].city,
    postal_code: cart.shippingInfo[0].postal_code,
    address_1: cart.shippingInfo[0].address_1,
    address_2: cart.shippingInfo[0].address_2,
    amount: cart.grandTotal,
    quantity: cart.totalQuantity(),
    payerID: data.payerID,
    paymentID: data.paymentID,
    paymentSource: data.paymentSource,
  } as Transaction;
  await createTransaction(user, transaction);
}
</script>

<style scoped></style>
