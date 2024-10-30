<template>
  <div
    class="grid grid-cols-12 px-2 py-2 mb-3 rounded-md"
    :class="
      props.theme === 'danger'
        ? 'bg-red-600 bg-opacity-50'
        : props.theme === 'success'
        ? 'bg-green-600'
        : props.theme === 'info'
        ? 'bg-blue-600'
        : ''
    "
  >
    <div class="col-span-11 inline-flex items-center justify-center">
      <p class="text-xs text-gray-50 italic capitalize">
        {{ props.message }}
      </p>
    </div>
    <div
      v-if="showClose"
      class="col-span-1 inline-flex items-center justify-end"
    >
      <Icon
        name="mi:circle-error"
        class="h-5 w-5 text-gray-50 cursor-pointer"
        @click="closeMessage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["closeMessage"]);
const props = defineProps({
  message: String,
  theme: {
    validator(value: string) {
      return [
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "danger",
        "light",
        "dark",
      ].includes(value);
    },
    default: "danger",
  },
  showClose: {
    type: Boolean,
    default: false,
  },
});
function closeMessage() {
  emit("closeMessage");
}
</script>

<style scoped></style>
