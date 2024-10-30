<template>
  <div class="fixed top-0 w-full bg-[#002453] dark:bg-slate-950 z-50">
    <header class="flex flex-row justify-between w-full py-2 h-14">
      <div class="flex items-center justify-start h-full px-0 md:px-5 lg:px-10">
        <NuxtLink to="/">
          <div
            class="flex shrink-0 ml-4 md:ml-0 text-white mr-auto md:mr-10 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
          >
            <NuxtImg
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK-3Rjv7fjDPf2WbW8KIVU5rN_dsRmAOkc1KZQeVq50sOUpcssKy6bDB0yH3V_nuxEJ6KEb6m3jdkl5gh9IVf2AK1HI8bl9v9y6Zf0TrQtzsML0F7O4PgplMSeMQ4RkQUjQbc40_cgyoaxnIlvpnMxM-1nGVWs9Wc1bMYxqnujKHfL2BG2vsuGwbdFunS7/s16000/logo-footer.png"
              alt="logo"
              class="w-full h-8 object-fill"
            />
          </div>
        </NuxtLink>
      </div>
      <div
        class="flex items-center justify-between h-full gap-3 px-3 lg:px-10 md:px-5"
      >
        <div class="relative">
          <div class="flex items-center" @click="changeColor">
            <Icon
              v-if="colorMode.preference === 'dark'"
              name="material-symbols:sunny-outline"
              class="h-6 w-6 text-gray-50 cursor-pointer hover:text-red-600"
            />
            <Icon
              v-else
              name="material-symbols-light:dark-mode"
              class="h-6 w-6 text-gray-50 cursor-pointer hover:text-red-600"
            />
          </div>
        </div>
        <div class="relative hidden lg:block md:block">
          <div class="flex items-center">
            <Icon
              name="ic:baseline-shopping-cart"
              class="h-6 w-6 text-gray-50 cursor-pointer hover:text-red-600"
              @click="goToCart"
            />
          </div>
          <div
            v-if="cartStore.isCartExist()"
            class="absolute -top-2 right-0 inline-flex bg-green-600 text-gray-50 text-xs rounded-full px-1"
          >
            {{ cartStore.totalQuantity() }}
          </div>
        </div>
        <div
          v-if="authStore.isLoggedIn"
          class="hidden lg:flex md:flex h-6 w-6 items-center justify-center group cursor-pointer"
          @mouseover="openMenuDesktop = true"
          @mouseleave="openMenuDesktop = false"
        >
          <Icon
            name="material-symbols-light:account-circle"
            class="w-full h-full text-gray-50 group-hover:text-red-600"
          />
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <ul
              v-show="openMenuDesktop"
              class="absolute inline-flex flex-col items-center justify-center top-10 py-2 right-10 px-4 w-52 rounded bg-white dark:bg-slate-950 z-50 space-y-2"
            >
              <div class="relative">
                <NuxtLink to="/dashboard/account">
                  <div
                    class="text-sm text-black dark:text-gray-50 hover:text-red-600 font-bold"
                  >
                    Your Account
                  </div>
                </NuxtLink>
              </div>
              <div class="relative">
                <div
                  class="text-sm text-black dark:text-gray-50 hover:text-red-600 font-bold"
                  @click="authStore.logMeOut()"
                >
                  Logout
                </div>
              </div>
            </ul>
          </transition>
        </div>
        <NuxtLink to="/auth/login">
          <div
            v-if="!authStore.isLoggedIn"
            class="hidden lg:flex md:flex h-6 w-6 items-center justify-center group cursor-pointer"
          >
            <Icon
              name="uil:signin"
              class="w-full h-full text-gray-50 group-hover:text-red-600"
            />
          </div>
        </NuxtLink>
        <div
          v-if="themeStore.collapseMenu"
          class="flex lg:hidden md:hidden h-6 w-6 items-center justify-center border border-gray-50 p-0.5 hover:border-red-600 group"
          @click="themeStore.closeCollapseMenu()"
        >
          <Icon
            name="ic:baseline-close"
            class="w-full h-full text-gray-50 group-hover:text-red-600"
          />
        </div>
        <div
          v-else
          class="flex lg:hidden md:hidden h-6 w-6 items-center justify-center border border-gray-50 p-0.5 hover:border-red-600 group"
          @click="themeStore.openCollapseMenu()"
        >
          <Icon
            name="ic:sharp-menu"
            class="w-full h-full text-gray-50 group-hover:text-red-600"
          />
        </div>
      </div>
    </header>
    <TransitionExpand appear>
      <div
        v-if="themeStore.collapseMenu"
        ref="expanded"
        class="flex lg:hidden md:hidden flex-col w-full rounded-lg px-3 pb-3"
      >
        <div
          class="flex flex-col items-center justify-center bg-[#0c203a] dark:bg-slate-800 px-5 py-1"
        >
          <NuxtLink to="/">
            <div class="text-sm text-gray-50 hover:text-red-600 font-bold mt-2">
              Home
            </div>
          </NuxtLink>
          <NuxtLink to="/auth/login">
            <div
              v-if="!authStore.isLoggedIn"
              class="text-sm text-gray-50 hover:text-red-600 font-bold mt-2"
              :class="authStore.isLoggedIn ? 'hidden' : 'block'"
            >
              Signin
            </div>
          </NuxtLink>
          <NuxtLink to="/dashboard/account">
            <div
              v-if="authStore.isLoggedIn"
              class="text-sm text-gray-50 hover:text-red-600 font-bold mt-2"
              :class="!authStore.isLoggedIn ? 'hidden' : 'block'"
            >
              Account
            </div>
          </NuxtLink>
          <div
            v-if="authStore.isLoggedIn"
            class="text-sm text-gray-50 hover:text-red-600 font-bold mt-2 cursor-pointer"
            :class="!authStore.isLoggedIn ? 'hidden' : 'block'"
            @click="authStore.logMeOut()"
          >
            Logout
          </div>
          <NuxtLink to="/about">
            <div class="text-sm text-gray-50 hover:text-red-600 font-bold mt-2">
              About Us
            </div>
          </NuxtLink>
          <NuxtLink to="/contact">
            <div class="text-sm text-gray-50 hover:text-red-600 font-bold mt-2">
              Contact Us
            </div>
          </NuxtLink>
          <NuxtLink to="/">
            <div class="text-sm text-gray-50 hover:text-red-600 font-bold mt-2">
              Shopping Cart
            </div>
          </NuxtLink>
          <NuxtLink to="/tracking">
            <div class="text-sm text-gray-50 hover:text-red-600 font-bold mt-2">
              Track order
            </div>
          </NuxtLink>
        </div>
      </div>
    </TransitionExpand>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "#imports";

const emit = defineEmits(["openAlertCart"]);

const expanded = ref(null);
const colorMode = useColorMode();
const cartStore = useCartStore();
const themeStore = useThemeSettings();
const authStore = useAuthStore();
const openMenuDesktop = ref(false);

onClickOutside(expanded, (event) => themeStore.closeCollapseMenu());

const changeColor = () => {
  colorMode.preference = colorMode.preference === "light" ? "dark" : "light";
};

function openAlertCart() {
  emit("openAlertCart");
}
function goToCart() {
  if (cartStore.items.length > 0) {
    navigateTo("/cart");
  } else {
    openAlertCart();
  }
}
</script>

<style scoped></style>
