<template>
  <div
    class="relative mx-5 py-5 px-4 border border-gray-400 dark:border-gray-700"
  >
    <h3 class="text-lg text-gray-100 mb-2">Your temporary password is</h3>
    <code
      class="text-xl text-gray-400 font-semibold cursor-pointer border border-gray-400 rounded-sm px-2 py-1"
      @click="copyCode(tempPassword)"
      >{{ tempPassword }}</code
    >
    <h3 class="text-gray-100 mt-2">
      Copy it,
      <NuxtLink
        to="/auth/login"
        class="text-orange-600 font-semibold hover:underline"
        >log in</NuxtLink
      >, and change it.
    </h3>
    <div
      v-if="isCopy"
      class="absolute top-0 bg-gray-700 py-1.5 px-3 rounded-md shadow-lg shadow-gray-600"
    >
      <p class="text-xs text-gray-50">Code Copied</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

definePageMeta({
  layout: "auth",
  middleware: "auth",
});
useHead({
  title: "Verify Reset Successfully ",
});

const isCopy = ref(false);
const tempPassword = route.fullPath.split(
  "/auth/verify-reset-success?pass="
)[1];

async function copyCode(code: string) {
  try {
    await navigator.clipboard.writeText(code);
    isCopy.value = true;
    setTimeout(() => {
      isCopy.value = false;
    }, 2000);
  } catch (error) {
    alert(`${error}`);
  }
}
</script>

<style scoped></style>
