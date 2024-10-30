<template>
  <div
    v-if="themeStore.isLoading"
    class="relative bg-gray-50 dark:bg-slate-900"
  >
    <LoadingSkeleton :row-count="10" />
  </div>
  <div
    v-else
    class="w-full h-full bg-gray-100 dark:bg-slate-900 py-2 px-2 lg:px-6 lg:py-6 md:px-6 md:py-6 rounded-lg mt-16 md:mt-16 lg:mt-14"
    :class="
      stepNumber == 2
        ? 'h-screen lg:h-full md:h-full'
        : stepNumber == 1
        ? 'h-screen lg:h-full md:h-full'
        : ''
    "
  >
    <div class="grid grid-cols-5 gap-5">
      <StepBox
        v-for="(steps, i) in stepsArray"
        :key="i"
        :steps="steps"
        :stepNumber="stepNumber"
      />
    </div>
    <div class="mt-8">
      <StepCartStep v-if="stepNumber == 1" />
      <StepShippingInfo v-if="stepNumber == 2" />
      <StepPayment
        v-else-if="stepNumber == 3"
        @order-complete="onOrderComplete"
      />
      <StepInvoiceCart
        v-else-if="stepNumber == 4 || completeTransaction"
        :order-id="orderID"
      />
      <div
        class="flex flex-col md:flex-row md:justify-between md:px-6 py-5 md:py-10 md:mt-8 space-x-0 md:space-x-6"
      >
        <div class="flex">
          <div
            class="flex flex-col items-center md:flex-row md:justify-end md:space-x-5 space-y-3 md:space-y-0 mx-auto w-full md:w-max"
          >
            <template v-if="stepNumber < 4">
              <template v-if="stepNumber <= 3">
                <button
                  v-if="stepNumber > 1 && stepNumber <= 3"
                  @click="stepNumber-- > 1"
                  :disabled="stepNumber === 1"
                  type="button"
                  class="inline-flex px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                >
                  <span> Go Back </span>
                </button>
                <button
                  v-if="stepNumber <= 2 && cart.items.length > 0"
                  @click="
                    () => {
                      stepNumber++ < 2 && stepsArray.step++;
                    }
                  "
                  :disabled="
                    cart.items.length == 0 ||
                    stepNumber === 3 ||
                    (stepNumber === 2 && cart.shippingInfo.length === 0)
                  "
                  type="button"
                  class="inline-flex px-5 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-700 text-sm text-white dark:text-gray-900 dark:hover:text-white font-semibold disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                >
                  <span
                    >{{
                      stepNumber === 1
                        ? "Continue Shipping Info"
                        : stepNumber === 2
                        ? "Continue Payment"
                        : ""
                    }}
                  </span>
                </button>
                <button
                  v-if="stepNumber === 1 && cart.items.length === 0"
                  :disabled="cart.items.length > 0"
                  type="button"
                  class="inline-flex px-5 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                  @click="cart.addToCart(productStore)"
                >
                  <span> Add To Cart </span>
                </button>
              </template>
            </template>
            <NuxtLink to="/" v-else>
              <button
                type="button"
                class="inline-flex px-5 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-700 text-sm text-white dark:text-gray-900 dark:hover:text-white font-semibold disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
              >
                <span> Shop More </span>
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const themeStore = useThemeSettings();
const cart = useCartStore();
const { $fbq } = useNuxtApp();
const config = useRuntimeConfig();
const YOUR_PIXEL_ID = config.public.metaPixel

const stepNumber = ref<number>(1);
const loadErrorConfig = ref(<Error | null>null);
const completeTransaction = ref(false);
const failedTransaction = ref(false);
const orderID = ref<string>("");
// const config = ref(<DataConfig | null>null);

onMounted(() => {
  $fbq("trackSingle", YOUR_PIXEL_ID, 'AddToCart');
});
onNuxtReady(() => {
  themeStore.disableBottomNav();
  themeStore.closeCollapseMenu();
});
definePageMeta({
  layout: "default",
  title: "Cart",
  scrollToTop: true,
});
useHead({
  title: "Cart",
});

function onOrderComplete(orderId: string) {
  completeTransaction.value = true;
  stepNumber.value = 4;
  orderID.value = orderId;
}
function onOrderFailed() {
  failedTransaction.value = true;
}
const stepsArray: any = [
  {
    step: 1,
    icon: "ic:sharp-shopping-cart",
    title: "My Cart",
  },
  {
    step: 2,
    icon: "solar:delivery-linear",
    title: "Shipping Info",
  },
  {
    step: 3,
    icon: "ic:baseline-payment",
    title: "Payment",
  },
  {
    step: 4,
    icon: "ic:outline-check-circle-outline",
    title: "Confirmation",
  },
];
// const stepsArrayOld: any = [
//   {
//     step: 1,
//     icon: "icones:shopping-cart-outline",
//     title: "My Cart",
//   },
//   {
//     step: 2,
//     icon: "icones:delivery-linear",
//     title: "Shipping Info",
//   },
//   {
//     step: 3,
//     icon: "icones:delivery-truck",
//     title: "Delivery Info",
//   },
//   {
//     step: 4,
//     icon: "icones:payment-16-regular",
//     title: "Payment",
//   },
//   {
//     step: 5,
//     icon: "icones:confirm-circle-transition",
//     title: "Confirmation",
//   },
// ];
</script>

<style scoped></style>
