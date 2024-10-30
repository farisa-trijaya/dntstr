<template>
  <div class="relative space-y-1 mt-2 z-[999]">
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
        <div>
          <HeadlessMenuButton
            class="inline-flex items-center justify-between w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
          >
            {{ selectedOption === undefined ? placeholder : selectedOption }}
            <Icon
              name="mdi:chevron-down"
              class="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
              :class="open ? 'rotate-180 duration-200' : ''"
            />
          </HeadlessMenuButton>
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
            class="absolute right-0 mt-2 w-full h-72 origin-top-right divide-y rounded-md bg-gray-50 dark:bg-gray-900 shadow-lg ring-1 ring-black/5 focus:outline-none overflow-y-auto overflow-hidden z-[999]"
          >
            <div class="px-1 py-1">
              <div class="relative w-full px-2 py-2">
                <input
                  type="text"
                  v-model="searchValue"
                  class="inline-flex w-full py-2 px-3 text-sm text-gray-900 dark:text-gray-50 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-md"
                  placeholder="Search"
                />
              </div>
              <div v-for="items in countryFilter" :key="items.code">
                <HeadlessMenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active
                        ? 'bg-orange-600 text-white'
                        : 'text-gray-900 dark:text-gray-50',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                    @click="onSelected(items)"
                  >
                    <NuxtImg
                      :src="`https://country-code-au6g.vercel.app/${items.image}`"
                      :alt="items.name"
                      :active="active"
                      class="mr-2 h-5 w-5 text-violet-400"
                    />
                    {{ items.name }}
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

const selectedOption = ref<string>();
const searchValue = ref<string>("");
const countryTellData = ref([] as any[]);

const emit = defineEmits(["update:modelValue", "setDefaultCountry"]);
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
});

onMounted(async () => {
  countryTellData.value = countryTellCode;
});

const countryFilter = computed(() =>
  countryTellData
    ? countryTellData.value.filter((item) =>
        item.name.toLowerCase().includes(searchValue.value.toLowerCase())
      )
    : countryTellData
);

function onSelected(items: any) {
  selectedOption.value = items.name;
  emit("update:modelValue", items.name);
  setDefaultCountry(items);
}
function setDefaultCountry(items: object) {
  emit("setDefaultCountry", items);
}
</script>

<style scoped></style>
