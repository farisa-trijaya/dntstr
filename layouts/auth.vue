<template>
  <ClientOnly>
    <div
      class="relative h-screen w-full items-center justify-center overflow-y-auto overflow-hidden bg-white dark:bg-gray-800 py-10"
    >
      <div class="relative w-full inline-flex items-center justify-center">
        <div
          class="w-full max-w-lg bg-[#002453] dark:bg-slate-950 space-y-3 rounded-md mx-3 lg:mx-0 md:mx-0 py-5 m-auto"
        >
          <NuxtLink to="/">
            <div
              class="flex w-full h-full items-center justify-center bg-[#002453] dark:bg-slate-950 px-20 py-5 rounded-md"
            >
              <NuxtImg
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK-3Rjv7fjDPf2WbW8KIVU5rN_dsRmAOkc1KZQeVq50sOUpcssKy6bDB0yH3V_nuxEJ6KEb6m3jdkl5gh9IVf2AK1HI8bl9v9y6Zf0TrQtzsML0F7O4PgplMSeMQ4RkQUjQbc40_cgyoaxnIlvpnMxM-1nGVWs9Wc1bMYxqnujKHfL2BG2vsuGwbdFunS7/s16000/logo-footer.png"
                class="h-8 w-auto object-fill ml-5"
              />
            </div>
          </NuxtLink>
          <NuxtPage />
        </div>
      </div>
      <div class="flex items-center text-center justify-center mx-3 py-10">
        <p class="text-sm text-gray-700 dark:text-gray-400">
          Copyright © {{ dayjs().year() }} Dentestore.com. All Rights Reserved.
        </p>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
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
