<template>
  <section class="flex items-center h-full p-16 bg-gray-50 dark:bg-gray-900">
    <div
      class="container flex flex-col items-center justify-center px-5 mx-auto my-8"
    >
      <div class="max-w-md text-center">
        <h2 class="mb-8 font-extrabold text-9xl dark:text-gray-400">
          <span class="sr-only">Error</span>{{ props.error.statusCode }}
        </h2>
        <p class="text-2xl font-semibold md:text-3xl">
          {{ props.error.statusMessage }}
        </p>
        <p class="mt-4 mb-8 dark:text-gray-600">
          But dont worry, you can find plenty of other things on our homepage.
        </p>
        <button
          class="inline-flex bg-green-600 text-gray-50 px-8 py-3 font-semibold rounded uppercase hover:bg-green-800"
          @click="handleError"
        >
          Back to homepage
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });

useHead({
  link: {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    type: "text/css",
  },
  script: {
    src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
  },
});
</script>
