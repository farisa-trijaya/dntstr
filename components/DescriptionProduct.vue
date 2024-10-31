<template>
  <div class="border border-1 dark:border-slate-700 rounded py-3 px-3">
    <HeadlessTabGroup>
      <HeadlessTabList class="lg:space-x-8 md:space-x-4 space-x-0">
        <HeadlessTab
          v-slot="{ selected }"
          as="template"
          v-for="(item, i) in buttons"
          :key="i"
        >
          <button
            :class="[
              selected
                ? 'text-slate-950 dark:text-slate-300 before:w-full'
                : 'text-slate-500 before:w-0 dark:text-slate-500',
            ]"
            class="text-lg lg:text-xl font-medium mb-7 capitalize ring-0 focus:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-slate-900 dark:before:bg-slate-300 before:-translate-x-1/2"
          >
            {{ item.title }}
          </button>
        </HeadlessTab>
        <HeadlessTabPanels>
          <HeadlessTabPanel>
            <div class="text-slate-950 dark:text-slate-300 font-normal">
              <div>{{ productStore.description }}</div>
              <div class="mt-3 font-bold">Feature :</div>
              <ul class="mt-1 list-disc ml-5">
                <li class="text-slate-950 dark:text-slate-300">
                  Clear Upper and Lower-4 Implants
                </li>
                <li class="text-slate-950 dark:text-slate-300">
                  Clear acrylic Upper and Lower jaw base allows view of implants
                </li>
                <li class="text-slate-950 dark:text-slate-300">
                  4 generic implants with removable superior overdenture by
                  locators connection
                </li>
                <li class="text-slate-950 dark:text-slate-300">
                  Good for explaining the overdenture functioning
                </li>
                <li class="text-slate-950 dark:text-slate-300">
                  For demonstration purpose use.
                </li>
              </ul>
              <div class="mt-3 font-bold">Specification :</div>
              <ul class="mt-1 list-none">
                <li class="text-slate-950 dark:text-slate-300">
                  Material: lithium disilicate ceramic
                </li>
                <li class="text-slate-950 dark:text-slate-300">
                  Size: as picture show
                </li>
                <li class="text-slate-950 dark:text-slate-300">
                  Color: as picture show
                </li>
              </ul>

              <div class="mt-3 font-bold">Advantage :</div>
              <ul class="mt-1 list-disc ml-5">
                <li class="text-slate-950 dark:text-slate-300">
                  Dental veneer lasts up to 15 years.
                </li>
                <li class="text-slate-950 dark:text-slate-300">
                  Its longevity depends on the care and attention you give to
                  all your teeth
                </li>
                <li class="text-slate-950 dark:text-slate-300">
                  Dental veneer is highly durable
                </li>
                <li class="text-slate-950 dark:text-slate-300">
                  It comes in thin layer
                </li>
                <li class="text-slate-950 dark:text-slate-300">
                  It prevents the need for drilling the teeth
                </li>
                <li class="text-slate-950 dark:text-slate-300">
                  Looks natural, like your own teeth.
                </li>
              </ul>
              <div class="mt-3 font-bold">Note :</div>
              <ul class="mt-1 list-decimal ml-5">
                <li class="text-slate-950 dark:text-slate-300">
                  Due to the different monitor and light effect, the actual
                  color of the item might be slightly different from the color
                  showed on the pictures. Thank you!
                </li>
                <li class="text-slate-950 dark:text-slate-300">
                  Please allow slight measuring deviation due to manual
                  measurement.
                </li>
              </ul>
              <div class="flex items-center w-full mt-3">
                <div class="h-44 w-60">
                  <iframe src="https://drive.google.com/file/d/1W-2orIWXeNEuQRFoMMoAerm0UPaOyGSs/preview" width="640" height="480" allow="autoplay"></iframe>
                </div>
                <div class="relative w-full px-5 lg:px-32">
                  <div class="bg-gray-800 h-2 w-full rounded-full">
                    <div class="progress" :style="`width: ${progress}%;`"></div>
                  </div>
                </div>
              </div>
            </div>
          </HeadlessTabPanel>
          <HeadlessTabPanel>
            <div class="text-slate-950 dark:text-slate-300 font-normal">
              <div class="mt-3 font-bold">Advantage :</div>
              <ul class="mt-1 list-disc ml-5">
                <li class="text-slate-950 dark:text-slate-300">
                  Dental veneer lasts up to 15 years.
                </li>
                <li class="text-slate-950 dark:text-slate-300">
                  Its longevity depends on the care and attention you give to
                  all your teeth
                </li>
                <li class="text-slate-950 dark:text-slate-300">
                  Dental veneer is highly durable
                </li>
                <li class="text-slate-950 dark:text-slate-300">
                  It comes in thin layer
                </li>
                <li class="text-slate-950 dark:text-slate-300">
                  It prevents the need for drilling the teeth
                </li>
                <li class="text-slate-950 dark:text-slate-300">
                  Looks natural, like your own teeth.
                </li>
              </ul>
            </div>
          </HeadlessTabPanel>
        </HeadlessTabPanels>
      </HeadlessTabList>
    </HeadlessTabGroup>
  </div>
</template>

<script setup lang="ts">
import { productStore } from "#imports";

const progress = ref(0);
const progressVideo = ref(0);

onMounted(async () => {
  play();
});

const play = () => {
  let interval = setInterval(() => {
    progress.value = 5;
    if (progress.value >= 100) {
      clearInterval(interval);
    }
  }, 1000);
};
const buttons = [
  {
    title: "Description",
  },
  {
    title: "Other Product Videos",
  },
];
</script>

<style scoped>
@keyframes progress {
  0% {
    @apply bg-red-500;
  }
  50% {
    @apply bg-red-600;
  }
  75% {
    @apply bg-red-700;
  }
  100% {
    @apply bg-red-800;
  }
}
@-webkit-keyframes progress {
  0% {
    @apply bg-red-500;
  }
  50% {
    @apply bg-red-600;
  }
  75% {
    @apply bg-red-700;
  }
  100% {
    @apply bg-red-800;
  }
}
.progress {
  @apply h-full w-full rounded-full transition-all ease-in-out duration-150;
  animation: progress 2s infinite linear;
}
</style>
