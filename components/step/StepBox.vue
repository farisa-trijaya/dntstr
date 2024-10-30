<template>
  <li
    class="flex bg-gray-50 dark:bg-slate-800 items-center justify-center text-center lg:border border-slate-300 dark:border-slate-700 dark:border-b-slate-500 rounded-t lg:border-b-8 rounded-b-lg xl:px-10 xl:py-7 lg:px-3 lg:py-6 transition-all duration-150"
    :class="{
      ' border-b-slate-900 dark:border-b-slate-300 text-slate-900 dark:text-white ':
        stepNumber === props.steps.step,
      ' border-b-slate-300 dark:border-b-slate-500 text-slate-500 ':
        stepNumber < props.steps.step,
      ' border-b-green-500 dark:border-b-green-500  text-green-500 dark:text-green-500 ':
        stepNumber > props.steps.step,
    }"
  >
    <div class="flex flex-col items-center justify-center space-y-3">
      <ClientOnly>
        <Icon class="h-8 w-8" :name="props.steps.icon" />
      </ClientOnly>
      <div class="text-base font-medium lg:block hidden">
        {{ props.steps.step }}. {{ props.steps.title }}
      </div>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({
  steps: {
    type: Object,
    required: true,
  },
  stepNumber: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
