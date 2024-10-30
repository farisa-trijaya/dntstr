<template>
  <HeadlessTransitionRoot appear :show="props.isOpen" as="template">
    <HeadlessDialog as="div" @close="closeAlert" class="relative z-[999]">
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </HeadlessTransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all border border-gray-500 dark:border-gray-700"
            >
              <div
                class="flex flex-col items-center text-center justify-center py-10"
              >
                <Icon
                  :name="
                    props.types === 'success'
                      ? 'material-symbols:check-circle-outline'
                      : props.types === 'warning'
                      ? 'material-symbols:warning'
                      : props.types === 'error'
                      ? 'material-symbols:cancel-outline-rounded'
                      : 'mingcute:warning-fill'
                  "
                  class="h-20 w-20"
                  :class="
                    props.types === 'success'
                      ? 'text-green-600'
                      : props.types === 'warning'
                      ? 'text-yellow-600'
                      : props.types === 'error'
                      ? 'text-red-600'
                      : 'text-blue-700'
                  "
                />
                <h1
                  class="mt-3 text-xl text-gray-900 dark:text-gray-50 font-semibold capitalize"
                >
                  {{ props.showTypes ? props.types : "" }} {{ props.title }}
                </h1>
                <p class="text-gray-900 dark:text-gray-50 mt-2">
                  {{ props.message }}
                </p>
                <div class="flex items-center justify-center gap-2 mt-5">
                  <button
                    v-if="props.isBtnAction"
                    type="button"
                    class="inline-flex bg-orange-600 hover:bg-orange-400 text-sm text-gray-50 font-semibold px-5 py-3"
                    @click="btnAction"
                  >
                    {{ props.labelActionBtn }}
                  </button>
                  <button
                    type="button"
                    class="inline-flex bg-gray-900 dark:bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-50 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-100 font-semibold px-5 py-3 rounded-md"
                    @click="closeAlert"
                  >
                    Close
                  </button>
                </div>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
const emit = defineEmits(["closeAlert", "btnAction"]);
const props = defineProps({
  isOpen: {
    type: Boolean,
    require: true,
  },
  types: {
    type: String,
    require: true,
    default: "info",
  },
  showTypes: {
    type: Boolean,
    default: true,
  },
  isBtnAction: {
    type: Boolean,
    default: false,
  },
  labelActionBtn: {
    type: String,
    require: true,
    default: "OK",
  },
  title: {
    type: String,
  },
  message: {
    type: String,
  },
});

function closeAlert() {
  emit("closeAlert");
}
function btnAction() {
  emit("btnAction");
}
</script>

<style scoped></style>
