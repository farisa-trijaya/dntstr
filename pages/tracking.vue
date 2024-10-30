<template>
  <div
    v-if="themeStore.isLoading"
    class="relative bg-gray-50 dark:bg-slate-900"
  >
    <LoadingSkeleton :row-count="10" />
  </div>
  <div
    v-else
    class="w-full h-screen bg-gray-100 dark:bg-slate-900 pb-2 lg:pb-6 md:pb-6 rounded-lg mt-16 md:mt-16 lg:mt-14"
  >
    <div
      class="flex w-full h-16 items-center justify-center m-auto"
      style="
        background-image: url(https://5.imimg.com/data5/SELLER/Default/2023/10/349824855/DS/YE/MJ/81036715/international-courier-service.png);
        padding: 90px 0 110px 0;
        background-attachment: fixed;
        background-size: 100%;
        position: relative;
      "
    >
      <h1 class="text-3xl text-gray-900 font-semibold uppercase">
        Track Order
      </h1>
    </div>
    <div class="flex flex-col w-full px-5 py-5 text-start space-y-4 mt-5">
      <div
        class="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-12 items-center justify-center space-y-5 lg:space-y-0 md:space-y-0"
      >
        <div class="col-span-1 lg:col-span-2 md:col-span-2">
          <div class="flex justify-center">
            <h3 class="text-gray-900 dark:text-gray-50 font-semibold">
              Order Number
            </h3>
          </div>
        </div>
        <div class="col-span-1 lg:col-span-8 md:col-span-8">
          <form @submit.prevent="">
            <input
              type="text"
              name="order_number"
              class="w-full py-2 bg-white dark:bg-gray-700 rounded-md border border-gray-400 dark:border-gray-500 hover:outline-none hover:ring-0 focus:outline-none focus:ring-0 text-sm text-gray-900 dark:text-gray-50 px-3"
            />
          </form>
        </div>
        <div class="col-span-1 lg:col-span-2 md:col-span-2 flex justify-center">
          <button
            class="inline-flex bg-orange-600 hover:bg-orange-500 text-sm font-semibold text-gray-50 px-5 py-2 rounded-sm"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const themeStore = useThemeSettings();

onNuxtReady(() => {
  themeStore.enableBottomNav();
  themeStore.closeCollapseMenu();
});

useHead({
  title: "Track Order",
});
</script>

<style scoped></style>
