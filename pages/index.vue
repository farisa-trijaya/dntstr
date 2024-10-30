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
  >
    <div
      class="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-12 w-full lg:space-x-6 md:space-x-6"
    >
      <div class="col-span-1 lg:col-span-4 md:col-span-4 w-full">
        <ThumbSlider :product="productStore.images" />
      </div>
      <div class="col-span-1 lg:col-span-8 md:col-span-8 mt-3 lg:mt-0 md:mt-0">
        <div class="space-y-1">
          <h1
            class="text-xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100"
          >
            {{ productStore.name }}
          </h1>
          <ClientOnly>
            <div
              class="flex items-center text-slate-900 dark:text-slate-300 font-normal text-sm lg:text-base space-x-1.5 rtl:space-x-reverse"
            >
              <Icon name="line-md:star-filled" class="text-yellow-400" />
              <Icon name="line-md:star-filled" class="text-yellow-400" />
              <Icon name="line-md:star-filled" class="text-yellow-400" />
              <Icon name="line-md:star-filled" class="text-yellow-400" />
              <Icon name="line-md:star-filled" class="text-yellow-400" />
              <span
                class="pl-2 text-slate-900 dark:text-gray-400 font-semibold"
              >
                (789 reviews)
              </span>
            </div>
          </ClientOnly>
          <div class="flex items-center space-x-2 rtl:space-x-reverse">
            <div class="font-normal text-gray-900 dark:text-slate-300">
              Brand:
            </div>
            <div
              class="font-bold text-slate-950 dark:text-slate-300 capitalize"
            >
              {{ productStore.brand }}
            </div>
          </div>
          <div class="flex items-center space-x-2 rtl:space-x-reverse">
            <div
              class="font-normal text-sm lg:text-base text-slate-900 dark:text-slate-300"
            >
              Available:
            </div>
            <div class="font-bold text-slate-950 dark:text-slate-300">
              In Stock
            </div>
          </div>
          <div class="text-slate-950 dark:text-slate-200">
            {{ productStore.shortDesc }}
          </div>
        </div>
        <div class="flex flex-col space-y-1 py-2 !mt-0">
          <div class="flex flex-col space-y-3">
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
              <div class="font-normal text-slate-900 dark:text-slate-300">
                Size:
              </div>
              <div class="font-semibold text-slate-950 dark:text-slate-300">
                {{ size }}
              </div>
            </div>
            <div
              class="flex items-center space-x-4 rtl:space-x-reverse mb-4 h-6"
            >
              <label v-for="(list, i) in sizes" :key="i">
                <input
                  type="radio"
                  name="size"
                  :value="list.code"
                  @change="setSize(list.code)"
                  class="hidden h-7 w-7"
                />
                <div
                  :style="{ backgroundColor: list.code }"
                  class="h-7 w-7"
                  :class="{
                    'ring-red-700 ring-2 dark:ring-slate-50 dark:bg-gray-700':
                      list.code === size,
                    'ring-slate-300 bg-gray-50 dark:ring-slate-700 dark:bg-gray-900':
                      list.code !== size,
                    'ring-1': true,
                    'dark:text-slate-300 text-gray-900': true,
                    'dark:ring-red-900': list.code === size,
                    'ring-offset-2': true,
                    flex: true,
                    'justify-center': true,
                    'items-center': true,
                    'ring-offset-white dark:ring-offset-slate-900': true,
                    'cursor-pointer': true,
                    'dark:ring-offset-transparent': true,
                    'rounded-sm': true,
                  }"
                >
                  {{ list.code }}
                </div>
              </label>
            </div>
          </div>
        </div>
        <div
          class="w-full border-t mt-2 mb-1 border-slate-300 dark:border-slate-600"
        ></div>

        <div class="overflow-x-auto">
          <div class="inline-block max-w-full align-middle">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <tbody class="bg-gray-100 dark:bg-slate-900">
                  <tr>
                    <td
                      class="table-td py-1 pl-0 font-normal text-slate-900 dark:text-slate-300"
                    >
                      Price:
                    </td>
                    <td
                      class="table-td py-1 px-8 space-x-3 rtl:space-x-reverse"
                    >
                      <span
                        class="text-slate-950 dark:text-slate-300 font-bold text-xl lg:text-2xl md:text-2xl"
                      >
                        ${{ productStore.price }}
                      </span>
                      <del
                        class="text-red-600 dark:text-red-400 font-semibold text-sm lg:text-lg md:text-lg"
                      >
                        {{ productStore.oldPrice }}
                      </del>
                      <Badge
                        class="font-normal text-[10px] bg-blue-600 text-white"
                      >
                        <span>{{ productStore.percent }}</span>
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="table-td py-1 pl-0 font-normal text-slate-900 dark:text-slate-300"
                    >
                      Quantity:
                    </td>
                    <td class="table-td py-2 px-8">
                      <CounterButton
                        :product="productStore"
                        v-if="
                          cartStore.items.find(
                            (item: any) => item.sku == productStore.sku
                          )
                        "
                      />
                      <span v-else>
                        <div
                          class="flex space-x-4 rtl:space-x-reverse items-center cursor-not-allowed"
                        >
                          <div
                            class="flex-1 h-8 flex border border-1 border-slate-400 delay-150 ease-in-out dark:border-slate-600 divide-x-[1px] rtl:divide-x-reverse text-sm font-normal divide-slate-500 dark:divide-slate-600 rounded cursor-not-allowed"
                          >
                            <button
                              type="button"
                              class="flex-none px-2 dark:text-white text-slate-900 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700 cursor-not-allowed opacity-50"
                            >
                              <Icon name="ic:baseline-minus" />
                            </button>

                            <div
                              class="flex-1 w-[62px] text-center text-slate-500 dark:text-slate-300 flex items-center justify-center cursor-not-allowed"
                            >
                              0
                            </div>
                            <button
                              type="button"
                              class="flex-none px-2 cursor-not-allowed opacity-50 text-slate-900 hover:bg-slate-900 hover:text-white dark:text-white dark:hover:bg-slate-700 rtl:dark:hover:rounded-l ltr:dark:hover:rounded-r"
                            >
                              <Icon name="ic:baseline-plus" />
                            </button>
                          </div>
                        </div>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="table-td py-1 pl-0 font-normal lg:text-base text-slate-900 dark:text-slate-300"
                    >
                      Total Price:
                    </td>
                    <td
                      v-if="
                        cartStore.items.find((item: any) => item.sku === productStore.sku)
                      "
                      class="table-td py-2 px-8 text-slate-950 dark:text-slate-200 font-bold text-xl lg:text-2xl md:text-2xl"
                    >
                      ${{ cartStore.totalPrice }}
                    </td>
                    <td
                      v-else
                      class="table-td py-2 px-8 text-slate-900 dark:text-slate-300 font-semibold text-xl lg:text-2xl md:text-2xl"
                    >
                      ${{ productStore.price }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse pb-5"
        >
          <button
            type="button"
            @click="cartStore.addToCart(productStore)"
            :disabled="
              cartStore.items.find((item) => item.sku === productStore.sku)
                ? true
                : false
            "
            class="inline-flex bg-green-600 text-sm font-semibold text-gray-50 gap-2 px-10 py-2 items-center justify-center rounded-sm hover:bg-green-800"
            :class="cartStore.items.find((item: any) => item.sku === productStore.sku) ? 'cursor-not-allowed' : ''"
          >
            <Icon name="ic:outline-shopping-bag" class="h-5 w-5" />
            Add To Cart
          </button>
          <button
            type="button"
            class="inline-flex bg-gray-900 dark:bg-gray-50 text-sm font-semibold text-gray-50 dark:text-gray-950 gap-2 px-14 py-2 items-center justify-center rounded-sm hover:bg-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            @click="buyNow(productStore)"
          >
            {{ cartStore.items.length > 0 ? "View Cart" : "Buy Now" }}
          </button>
        </div>
        <div
          class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-3 rtl:space-x-reverse"
        >
          <p class="font-normal text-slate-950 dark:text-slate-300">
            Share to:
          </p>
          <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <button
              type="button"
              class="border p-2 border-slate-500 rounded h-8 w-8 flex justify-center items-center"
              @click="toggleShare('whatsapp')"
            >
              <img class="w-full h-full" src="/icons/whatsapp.svg" />
            </button>
            <button
              type="button"
              class="border p-2 border-slate-500 rounded h-8 w-8 flex justify-center items-center"
              @click="toggleShare('facebook')"
            >
              <img class="w-full h-full" src="/icons/facebook.svg" />
            </button>
            <button
              type="button"
              class="border p-2 border-slate-500 rounded h-8 w-8 flex justify-center items-center"
              @click="toggleShare('twitter')"
            >
              <img class="w-full h-full" src="/icons/twitter.svg" />
            </button>
            <button
              type="button"
              class="border p-2 border-slate-500 rounded h-8 w-8 flex justify-center items-center"
              @click="toggleShare('linkedin')"
            >
              <img class="w-full h-full" src="/icons/linkedin.svg" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="space-y-5 mt-5">
      <DescriptionProduct />
      <ReviewProduct
        :reviews="reviewStore"
        @open-alert="openAlert"
        :create-review="createReview"
        @close-create-review="createReview = false"
      />
    </div>
    <LoginDialog
      v-if="modalAlert"
      :is-open="modalAlert"
      @close-alert="closeAlert"
    />
  </div>
</template>

<script setup lang="ts">
import { reviewStore, productStore, type ItemCart } from "~/utils/products";

const themeStore = useThemeSettings();
const authStore = useAuthStore();
const config = useRuntimeConfig();
const cartStore = useCartStore();
const { $fbq } = useNuxtApp();
const size = ref("S");
const modalAlert = ref(false);
const createReview = ref(false);
const YOUR_PIXEL_ID = config.public.metapixel.ads01

onMounted(() => {
  themeStore.enableBottomNav();
  themeStore.closeCollapseMenu();
  $fbq("trackSingle", YOUR_PIXEL_ID, "ViewContent");
});

definePageMeta({
  layout: "default",
  title: "Home",
  scrollToTop: true,
});

const setSize = (newSize: string) => {
  size.value = newSize;
};
function buyNow(value: any) {
  if (cartStore.items.length > 0) {
    navigateTo("/cart");
  } else {
    cartStore.addToCart(value);
    navigateTo("/cart");
  }
}
function openAlert() {
  if (authStore.isLoggedIn) {
    createReview.value = true;
  } else {
    modalAlert.value = true;
  }
}
function closeAlert() {
  modalAlert.value = false;
}
function toggleShare(name: string) {
  switch (name) {
    case "whatsapp":
      window.open(
        `https://api.whatsapp.com/send?text=${String(config.public.publicUrl)}`,
        "_blank"
      );
      break;
    case "facebook":
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${config.public.publicUrl}`,
        "_blank"
      );
      break;
    case "twitter":
      window.open(
        `https://twitter.com/share?url=${config.public.publicUrl}`,
        "_blank"
      );
      break;
    default:
      window.open(
        `http://www.linkedin.com/shareArticle?mini=true&url=${config.public.publicUrl}`,
        "_blank"
      );
      break;
  }
}
const sizes = [
  { code: "S" },
  { code: "M" },
  { code: "L" },
  { code: "XL" },
  { code: "XXL" },
];
</script>

<style scoped></style>
