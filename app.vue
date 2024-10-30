<template>
  <div>
    <NuxtLoadingIndicator :height="5" :throttle="0" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
onMounted(async () => {
  window.scrollTo(0, 0);
});
</script>
