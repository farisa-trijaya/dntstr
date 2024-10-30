<template>
  <div class="border border-1 dark:border-slate-700 rounded py-3 px-4 mt-3">
    <h6
      class="text-slate-900 dark:text-slate-300 pb-6 text-lg lg:text-xl md:text-xl"
    >
      Reviews & Ratings
    </h6>
    <div class="space-y-12">
      <div v-if="successSend" class="relative w-full py-5">
        <div class="flex items-center justify-center">
          <h1 class="text-xl font-bold text-gray-900 dark:text-gray-50">
            Thank You
          </h1>
        </div>
        <div class="flex items-center justify-center">
          <Icon
            name="line-md:emoji-smile-filled"
            class="text-gray-900 dark:text-gray-50"
          />
        </div>
      </div>
      <div
        v-if="createReview"
        class="relative w-full py-5"
        :class="successSend ? 'hidden' : 'block'"
      >
        <form @submit.prevent="onSubmit">
          <div class="relative w-full space-y-3">
            <label
              for="message"
              class="text-sm text-gray-900 dark:text-gray-50 font-semibold"
              >Message *</label
            >
            <textarea
              :rows="6"
              name="messages"
              v-model="messages"
              class="w-full inline-flex py-2 px-3 text-sm text-gray-900 dark:text-gray-50 bg-gray-50 dark:bg-gray-700 hover:outline-none focus:outline-none hover:ring-0 focus:ring-0 border border-gray-400 dark:border-gray-500 rounded-md"
            />
            <div
              v-if="messagesError"
              class="text-xs text-red-500 italic mt-1 font-semibold"
            >
              {{ messagesError }}
            </div>
          </div>
          <div
            class="flex flex-col w-full space-y-1 items-center justify-center mt-2"
          >
            <label
              for="rating"
              class="text-sm text-gray-900 dark:text-gray-50 font-semibold"
              >Rate it *</label
            >
            <vue3StarRatings
              v-model="rating"
              :starSize="20"
              inactiveColor="#6d6d6d"
            />
            <div
              v-if="ratingError"
              class="text-xs text-red-500 italic mt-1 font-semibold"
            >
              {{ ratingError }}
            </div>
          </div>
          <div class="flex items-center justify-center gap-3 mt-3">
            <button
              type="submit"
              class="inline-flex px-12 py-3 text-sm text-gray-50 font-semibold bg-yellow-600 hover:bg-yellow-400 rounded-md"
            >
              Submit
            </button>
            <button
              type="button"
              class="inline-flex px-12 py-3 text-sm text-gray-50 hover:text-gray-900 dark:text-gray-900 dark:hover:text-gray-50 font-semibold bg-gray-900 dark:bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md"
              @click="closeCreateReview"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div
        v-else
        class="bg-gray-300 dark:bg-slate-700 p-6 rounded-md grid grid-cols-12"
        :class="successSend ? 'hidden' : 'block'"
      >
        <div
          class="col-span-12 items-center md:col-span-6 flex space-x-3 justify-center md:justify-start rtl:space-x-reverse order-2 md:order-1 mt-3 md:mt-0"
        >
          <div class="font-medium items-center flex">
            <p class="text-slate-900 dark:text-slate-300 text-base lg:text-lg">
              4.8
            </p>
            <p class="text-slate-900 dark:text-slate-300 text-sm lg:text-base">
              /5
            </p>
          </div>
          <div
            class="flex flex-col sm:flex-row sm:items-center md:justify-start text-slate-900 dark:text-slate-300 font-normal text-sm lg:text-base"
          >
            <div class="flex items-center space-x-1.5">
              <Icon name="line-md:star-filled" class="text-yellow-400" />
              <Icon name="line-md:star-filled" class="text-yellow-400" />
              <Icon name="line-md:star-filled" class="text-yellow-400" />
              <Icon name="line-md:star-filled" class="text-yellow-400" />
              <Icon name="line-md:star-filled" class="text-yellow-400" />
            </div>
            <div class="text-slate-900 dark:text-slate-300">(789 reviews)</div>
          </div>
        </div>
        <div
          class="col-span-12 md:col-span-6 flex justify-center md:justify-end items-center order-1 md:order-2"
        >
          <button
            type="button"
            class="bg-yellow-500 hover:bg-yellow-400 text-white rounded px-6 py-3 text-sm lg:text-base"
            @click="openAlert"
          >
            Rate this product
          </button>
        </div>
      </div>
      <div class="flex flex-col space-x-3 space-y-3 items-center">
        <div v-for="item in props.reviews" :key="item.sku" class="flex gap-3">
          <div
            class="h-14 w-14 rounded-full object-cover bg-white ring-1 overflow-hidden flex-none"
          >
            <NuxtImg class="h-full w-full object-contain" :src="item.avatar" />
          </div>
          <div>
            <div>
              <div
                class="text-slate-900 dark:text-slate-300 font-medium text-sm lg:text-base pb-1"
              >
                {{ item.name }}
              </div>
              <div
                class="text-slate-500 dark:text-slate-400 font-normal text-xs pb-1"
              >
                {{ item.date }}
              </div>
              <div
                class="flex items-center text-slate-900 dark:text-slate-300 font-normal text-sm lg:text-base space-x-1.5 rtl:space-x-reverse pb-3"
              >
                <Icon name="line-md:star-filled" class="text-yellow-400" />
                <Icon name="line-md:star-filled" class="text-yellow-400" />
                <Icon name="line-md:star-filled" class="text-yellow-400" />
                <Icon name="line-md:star-filled" class="text-yellow-400" />
                <Icon name="line-md:star-filled" class="text-yellow-400" />
              </div>
              <div
                class="pb-4 text-sm lg:text-base text-slate-500 dark:text-slate-400"
              >
                {{ item.reviews }}
              </div>
              <div class="flex space-x-2 rtl:space-x-reverse pb-3">
                <p
                  class="font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400"
                >
                  Info:
                </p>
                <p class="font-medium text-sm lg:text-base text-[#10B26C]">
                  Verified Purchase
                </p>
              </div>
            </div>
            <div class="grid grid-cols-12">
              <div v-if="item.images" class="col-span-12 mb-3">
                <div class="flex space-x-2 rtl:space-x-reverse mb-9">
                  <div
                    v-for="(items, i) in item.images"
                    :key="i"
                    class="h-[90px] w-[90px] rounded bg-slate-100 p-1 overflow-hidden"
                  >
                    <NuxtImg
                      class="h-full w-full object-cover"
                      :src="items"
                      alt="."
                    />
                  </div>
                </div>
              </div>
              <div
                class="col-span-12 flex justify-end dark:text-slate-400 space-x-4 rtl:space-x-reverse"
              >
                <p class="flex items-center space-x-2 rtl:space-x-reverse">
                  <span class="cursor-pointer">
                    <Icon name="material-symbols:thumb-up-outline" />
                  </span>
                  <span>{{ item.like }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import vue3StarRatings from "vue3-star-ratings";

const emit = defineEmits(["openAlert", "closeCreateReview"]);
const props = defineProps({
  reviews: {
    type: Object,
    required: true,
  },
  createReview: {
    type: Boolean,
  },
});
const successSend = ref(false);

const scheme = Yup.object().shape({
  messages: Yup.string()
    .required("This field is required.")
    .test(
      "len",
      "Messages must contain between 15 - 300 characters",
      (val: any) => {
        if (val === undefined) {
          return true;
        }
        return val.length === 0 || (val.length >= 20 && val.length <= 300);
      }
    ),
  rating: Yup.number().required("This field is required."),
});
const { handleSubmit } = useForm({
  validationSchema: scheme,
});
const { value: messages, errorMessage: messagesError } =
  useField<string>("messages");
const { value: rating, errorMessage: ratingError } = useField<number>("rating");

const onSubmit = handleSubmit(async (value) => {
  // console.log(value);
  successSend.value = true;
  setTimeout(() => {
    successSend.value = false;
    closeCreateReview();
  }, 2000);
});

function openAlert() {
  emit("openAlert");
}
function closeCreateReview() {
  emit("closeCreateReview");
}
// const isOpenCreate = computed({
//   get() {
//     return props.createReview;
//   },
//   set(newValue: boolean) {
//     emit("update:createReview", newValue);
//   },
// });
</script>

<style scoped></style>
