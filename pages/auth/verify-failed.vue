<template>
  <div
    class="relative mx-5 py-5 px-4 border border-gray-400 dark:border-gray-700"
  >
    <AlertMessageBox
      theme="danger"
      message="Verification failed. Link expired or other error."
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: "auth",
});
useHead({
  title: "Verify Failed",
});
</script>

<style scoped></style>
