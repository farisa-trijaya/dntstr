<template>
  <div
    v-if="themeStore.isLoading"
    class="relative bg-gray-50 dark:bg-slate-900"
  >
    <LoadingSkeleton :row-count="10" />
    <slot />
  </div>
  <div v-else class="relative bg-gray-50 dark:bg-slate-900">
    <Header @open-alert-cart="openAlertCart" />
    <div
      class="flex flex-col w-full h-full overflow-y-auto overflow-hidden bg-white px-2 py-2 lg:px-4 lg:py-4 md:px-4 md:py-4 dark:bg-gray-800"
    >
      <NuxtPage />
    </div>
    <Footer @open-alert-cart="openAlertCart" />
    <div v-if="themeStore.isBottomNav">
      <BottomNav />
    </div>
    <div
      v-if="themeStore.isBottomNav"
      class="fixed inline-flex bottom-14 right-2 items-center lg:hidden md:hidden"
    >
      <div class="relative">
        <ClientOnly>
          <Icon
            name="material-symbols:shopping-cart-rounded"
            class="h-10 w-10 text-[#183a66] dark:text-gray-50 hover:text-red-600"
            @click="goToCart"
          />
        </ClientOnly>
        <div
          v-if="cartStore.isCartExist()"
          class="absolute inline-flex -top-2 right-2 items-center text-center justify-center px-1.5 py-0.5 bg-green-600 rounded-full"
        >
          <p class="text-xs font-bold text-gray-50">
            {{ cartStore.totalQuantity() }}
          </p>
        </div>
      </div>
    </div>
    <AlertModal
      :is-open="foundCart"
      @close-alert="closeAlertCart"
      :isBtnAction="false"
      :show-types="false"
      message="There are no items in the cart yet. Please add items to the cart."
    />
  </div>
</template>

<script lang="ts" setup>
const themeStore = useThemeSettings();
const cartStore = useCartStore();
const authStore = useAuthStore();
const config = useRuntimeConfig();
const foundCart = ref(false);
const { $fbq } = useNuxtApp();
const YOUR_PIXEL_ID = config.public.metaPixel

onBeforeMount(async () => {
  await authStore.checkLoggedIn();
  $fbq("init", YOUR_PIXEL_ID);
});

onMounted(async () => {
  window.scrollTo(0, 0);
  await nextTick();
  themeStore.disableLoading();
});

function openAlertCart() {
  foundCart.value = true;
}
function closeAlertCart() {
  foundCart.value = false;
}
function goToCart() {
  if (cartStore.items.length > 0) {
    navigateTo("/cart");
  } else {
    openAlertCart();
  }
}
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
