<template>
  <div
    class="fromGroup relative"
    :class="`${props.error ? 'has-error' : ''}  ${
      props.horizontal ? 'flex' : ''
    }  ${props.validate ? 'is-valid' : ''} `"
  >
    <label
      v-if="props.label"
      :class="`${props.classLabel} inline-block input-label `"
      :for="props.name"
    >
      {{ props.label }}</label
    >
    <div class="relative">
      <select
        :name="props.name"
        :class="`${props.classInput} input-control block w-full focus:outline-none min-h-[40px] `"
        :value="props.modelValue"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        :error="props.error"
        :id="props.name"
        :readonly="props.isReadonly"
        :disabled="props.disabled"
        :validate="props.validate"
        :formatter="props.formatter"
        :size="props.size"
        :multiple="props.multiple"
      >
        <option value="" disabled selected>{{ props.placeholder }}</option>
        <template v-if="!$slots.default && props.options">
          <option
            v-for="(item, index) in props.options"
            :value="item.value"
            :key="index"
          >
            {{ item.label }}
          </option>
        </template>
        <slot v-if="$slots.default"></slot>
      </select>
    </div>

    <span
      v-if="props.error"
      class="mt-2"
      :class="
        props.msgTooltip
          ? ' inline-block bg-red-500 text-white text-[10px] px-2 py-1 rounded'
          : ' text-red-500 block text-sm'
      "
      >{{ props.error }}</span
    >
    <span
      v-if="props.validate"
      class="mt-2"
      :class="
        props.msgTooltip
          ? ' inline-block bg-green-500 text-white text-[10px] px-2 py-1 rounded'
          : ' text-green-500 block text-sm'
      "
      >{{ props.validate }}</span
    >
    <span
      class="block text-gray-500 font-light leading-4 text-xs mt-2"
      v-if="props.description"
      >{{ props.description }}</span
    >
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  placeholder: {
    type: String,
    default: "Select Option",
  },
  label: {
    type: String,
  },
  classLabel: {
    type: String,
    default: " ",
  },
  classInput: {
    type: String,
    default:
      "w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300",
  },
  name: {
    type: String,
  },
  modelValue: {
    // type: String || Array,
    default: "",
  },
  error: {
    type: String,
  },

  isReadonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  horizontal: {
    type: Boolean,
    default: false,
  },
  validate: {
    type: String,
  },
  msgTooltip: {
    type: Boolean,
    default: false,
  },
  formatter: {
    type: Function,
    default: (value: any) => value,
  },
  description: {
    type: String,
  },
  size: {
    type: String,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<Array<any>>,
    default: () => [
      {
        value: "",
        label: "Select Option",
      },
      {
        value: "",
        label: "Select Option2",
      },
    ],
  },
});
</script>
<style lang="scss" scoped>
select {
  @apply appearance-none bg-[url('https://api.iconify.design/akar-icons/chevron-down.svg')] bg-no-repeat bg-right;
  background-position-x: 98%;
}
[dir="rtl"] select {
  background-position-x: 2%;
}
option {
  @apply capitalize;
}
.dark {
  select {
    @apply bg-[url('https://api.iconify.design/heroicons/chevron-down-solid.svg?color=white')];
  }
}
</style>
