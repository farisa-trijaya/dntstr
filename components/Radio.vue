<template>
  <div>
    <label
      class="flex items-center"
      :class="disabled ? ' cursor-not-allowed opacity-50' : 'cursor-pointer'"
    >
      <input
        type="radio"
        class="hidden"
        :disabled="disabled"
        :name="name"
        @change="onChange"
        :value="value"
        v-model="localValue"
        v-bind="$attrs"
      />

      <span
        :class="
          localValue === value
            ? activeClass +
              ' ring-[6px]  ring-inset ring-offset-2 dark:ring-offset-slate-600  dark:ring-offset-4 border-slate-700'
            : 'border-slate-400 dark:border-slate-600 dark:ring-slate-700'
        "
        class="h-[18px] w-[18px] rounded-full border inline-flex bg-white dark:bg-slate-500 ltr:mr-3 rtl:ml-3 relative transition-all duration-150"
      >
      </span>
      <span
        class="text-slate-500 dark:text-slate-400 text-sm leading-6"
        v-if="label"
      >
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
const inheritAttrs = ref(false);

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  label: {
    type: String,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "checkbox",
  },
  activeClass: {
    type: String,
    default: "ring-slate-500 dark:ring-slate-400",
  },
  value: {
    type: null,
  },
  modelValue: {
    type: null,
  },
});
const ck = ref(props.checked);

const onChange = () => {
  ck.value = !ck.value;
};
const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
</script>

<style scoped></style>
