<template>
  <div class="relative w-full h-14">
    <div
      class="flex flex-col lg:flex-row md:flex-row w-full items-center justify-between bg-[#002453] dark:bg-slate-950 py-4 px-5 border-b border-gray-600 dark:border-gray-700"
    >
      <NuxtImg
        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK-3Rjv7fjDPf2WbW8KIVU5rN_dsRmAOkc1KZQeVq50sOUpcssKy6bDB0yH3V_nuxEJ6KEb6m3jdkl5gh9IVf2AK1HI8bl9v9y6Zf0TrQtzsML0F7O4PgplMSeMQ4RkQUjQbc40_cgyoaxnIlvpnMxM-1nGVWs9Wc1bMYxqnujKHfL2BG2vsuGwbdFunS7/s16000/logo-footer.png"
        class="h-8 w-auto object-fill ml-5"
      />
      <div
        class="flex flex-col lg:flex-row md:flex-row items-center gap-2 mt-2 lg:mt-0 md:mt-0"
      >
        <p
          class="text-sm lg:text-base md:text-base font-semibold text-gray-50 dark:text-gray-100"
        >
          Payment Method
        </p>
        <NuxtImg
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhC7xon26NcXMMzcGT5yahEeC64oaClFke8uWW55GFW4BtAc6wVwKXyqtNODQX2eX8HTtBZdV3HAIqQZG2ZbRquUpcNQqPA1AxsMqn2hnGqXTe5Byw8LhjU-NdoKsvYOZfD8l-fgMBVKpbIq71v4QCkRkV2d5pxZ4R19lhE6kyG4HZ0AuGQ_DSLUiYJnIr6/s16000/Untitled-3.png"
          class="h-8 w-auto object-fill"
        />
      </div>
    </div>
    <div
      class="grid grid-cols-1 lg:grid-cols-10 md:grid-cols-10 w-full justify-center px-10 lg:px-16 md:px-16 pt-5 pb-5 lg:pb-5 md:pb-5 bg-[#002453] dark:bg-slate-950"
    >
      <div
        class="col-span-1 lg:col-span-8 md:col-span-8 w-full justify-center px-5"
      >
        <div class="grid grid-cols-2 space-x-3 w-full justify-center">
          <ul
            v-for="menu in menuFooter"
            :key="menu.id"
            class="w-full list-none space-y-2"
          >
            <li
              v-for="child in menu.child"
              :key="child.name"
              class="text-sm font-bold text-gray-50 cursor-pointer hover:text-red-600"
              @click="child.do()"
            >
              <p>{{ child.name }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="col-span-2 flex flex-col items-center lg:items-end md:items-end w-full px-5 mt-6 lg:mt-0 md:mt-0"
      >
        <p class="text-gray-50">1581 Commerce St. Corona CA 92880</p>
      </div>
    </div>
    <div
      class="flex items-center justify-center bg-[#002453] dark:bg-slate-950 border-t border-gray-600 dark:border-gray-700 pt-4 pb-20 lg:pb-5 md:pb-5"
    >
      <p class="text-xs text-gray-200">
        Copyright © {{ dayjs().year() }} Dentestore.com. All Rights Reserved.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const emit = defineEmits(["openAlertCart"]);
const cartStore = useCartStore();

const menuFooter = [
  {
    id: 1,
    title: "profile",
    child: [
      {
        name: "Home",
        do: function () {
          navigateTo("/");
        },
      },
      {
        name: "Shopping Cart",
        do: function () {
          if (cartStore.items.length > 0) {
            navigateTo("/cart");
          } else {
            emit("openAlertCart");
          }
        },
      },
      {
        name: "Track order",
        do: function () {
          navigateTo("/tracking");
        },
      },
    ],
  },
  {
    id: 2,
    title: "Terms",
    child: [
      {
        name: "About Us",
        do: function () {
          navigateTo("/about");
        },
      },
      {
        name: "Contact Us",
        do: function () {
          navigateTo("/contact");
        },
      },
      {
        name: "Terms and Conditions",
        do: function () {
          navigateTo("/terms");
        },
      },
      {
        name: "Privacy Policy",
        do: function () {
          navigateTo("/privacy-policy");
        },
      },
      {
        name: "Return Policy",
        do: function () {
          navigateTo("/return-policy");
        },
      },
    ],
  },
];
</script>

<style scoped></style>
