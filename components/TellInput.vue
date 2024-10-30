<template>
  <div class="relative space-y-1 mt-2">
    <label
      v-if="props.label"
      :for="props.name"
      :class="`${classLabel} text-sm text-gray-900 dark:text-gray-50 font-semibold`"
      >{{ props.label }}</label
    >
    <div>
      <HeadlessMenu
        as="div"
        v-slot="{ open }"
        class="relative w-full inline-block text-left"
      >
        <div class="grid grid-cols-12 w-full">
          <HeadlessMenuButton
            class="col-span-2 inline-flex items-center justify-center gap-1 bg-gray-200 dark:bg-gray-600 w-full text-sm font-semibold text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-500"
            @click="open"
          >
            <NuxtImg
              :src="
                selectedFlag === undefined
                  ? `https://country-code-au6g.vercel.app/${defaultCountries.image}`
                  : `https://country-code-au6g.vercel.app/${selectedFlag}`
              "
              :alt="
                selectedCode === undefined
                  ? defaultCountries.code
                  : selectedCode
              "
              class="h-5 w-5"
            />
            {{
              selectedCode === undefined
                ? defaultCountries.dial_code
                : selectedCode
            }}
          </HeadlessMenuButton>
          <input
            type="text"
            :name="name"
            id="phone"
            :value="modelValue"
            class="col-span-10 inline-flex items-center justify-between w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
            :placeholder="placeholder"
            @change="onChange(($event.target as HTMLInputElement).value)"
            @click="onInput()"
            @keydown="onKeyDown($event)"
          />
        </div>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <HeadlessMenuItems
            v-show="open"
            class="absolute right-0 mt-2 w-full h-72 origin-top-right divide-y rounded-md bg-gray-50 dark:bg-gray-900 shadow-lg ring-1 ring-black/5 focus:outline-none z-[999] overflow-y-auto overflow-hidden"
          >
            <div class="px-1 py-1">
              <div class="relative w-full px-2 py-2">
                <input
                  type="text"
                  v-model="searchValue"
                  class="inline-flex w-full py-2 px-3 text-sm text-gray-900 dark:text-gray-50 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-md"
                  placeholder="Search name Or dial code"
                />
              </div>
              <div v-for="items in countryFilter" :key="items.code">
                <HeadlessMenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active
                        ? 'bg-orange-600 text-white'
                        : 'text-gray-900 dark:text-gray-50',
                      'group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm',
                    ]"
                    @click="onSelected(items)"
                  >
                    <NuxtImg
                      :src="
                        'https://country-code-au6g.vercel.app/' + items.image
                      "
                      :alt="items.name"
                      :active="active"
                      class="h-5 w-5"
                    />
                    <span>{{ items.dial_code }}</span>
                    <span>{{ items.name }}</span>
                  </button>
                </HeadlessMenuItem>
              </div>
            </div>
          </HeadlessMenuItems>
        </transition>
      </HeadlessMenu>
    </div>
    <div v-if="error" class="text-xs text-red-500 italic mt-1 font-semibold">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import countryTellCode from "~/utils/countryTellCode.json";

type ITell = {
  dial_code: string;
  image: string;
};
const selectedCode = ref<string>();
const selectedFlag = ref<string>();
const searchValue = ref<string>("");

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  placeholder: {
    type: String,
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
      "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
  },
  name: {
    type: String,
  },
  modelValue: {
    // type: String,
    default: "",
  },
  error: {
    type: String,
  },
  defaultCountries: {
    type: Object,
    default: () => {},
  },
});

const countryFilter = computed(() =>
  countryTellCode
    ? countryTellCode.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||
          item.dial_code.toLowerCase().includes(searchValue.value.toLowerCase())
      )
    : countryTellCode
);

function onSelected(item: ITell) {
  selectedCode.value = item.dial_code;
  selectedFlag.value = item.image;
  emit("update:modelValue", "");
}
function onChange(value: string) {
  value.replace(/^[0-9]+$/, "");
  if (selectedCode.value === undefined) {
    emit(
      "update:modelValue",
      props.defaultCountries.dial_code.replace("+", "") + value
    );
  } else {
    emit("update:modelValue", selectedCode.value.replace("+", "") + value);
  }
}
function onInput() {
  emit("update:modelValue", "");
}
function onKeyDown(event: KeyboardEvent) {
  if (event.key.length !== 1) return;
  if (/\s/g.test(event.key)) {
    event.preventDefault();
  }
  if (/^[A-Za-z\s]+$/.test(event.key)) {
    event.preventDefault();
  }
}
</script>

<style scoped></style>
