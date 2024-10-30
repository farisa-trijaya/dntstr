<template>
  <HeadlessTransitionRoot appear :show="props.isOpen" as="template">
    <HeadlessDialog as="div" @close="onClose" class="relative z-[999]">
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
              <div class="relative w-full items-center py-10">
                <form @submit.prevent="onSubmit">
                  <div class="relative w-full space-y-1 mt-2">
                    <label
                      for="full_name"
                      class="text-sm text-gray-900 dark:text-gray-50 font-semibold"
                      >Full Name *</label
                    >
                    <input
                      type="text"
                      name="full_name"
                      v-model="full_name"
                      class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
                      placeholder="Full Name"
                    />
                    <div
                      v-if="fullNameError"
                      class="text-xs text-red-500 italic mt-1 font-semibold"
                    >
                      {{ fullNameError }}
                    </div>
                  </div>
                  <div class="relative w-full space-y-1 mt-2">
                    <label
                      for="email"
                      class="text-sm text-gray-900 dark:text-gray-50 font-semibold"
                      >Email *</label
                    >
                    <input
                      type="email"
                      name="email"
                      v-model="email"
                      class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
                      placeholder="Email"
                    />
                    <div
                      v-if="emailError"
                      class="text-xs text-red-500 italic mt-1 font-semibold"
                    >
                      {{ emailError }}
                    </div>
                  </div>
                  <div class="relative w-full space-y-1 mt-2">
                    <label
                      for="phone"
                      class="text-sm text-gray-900 dark:text-gray-50 font-semibold"
                      >Phone *</label
                    >
                    <input
                      type="text"
                      name="phone"
                      v-model="phone"
                      class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
                      placeholder="Phone and Country Code"
                    />
                    <div
                      v-if="phoneError"
                      class="text-xs text-red-500 italic mt-1 font-semibold"
                    >
                      {{ phoneError }}
                    </div>
                  </div>
                  <div class="relative w-full space-y-1 mt-2">
                    <label
                      for="address_1"
                      class="text-sm text-gray-900 dark:text-gray-50 font-semibold"
                      >Address Line 1 *</label
                    >
                    <textarea
                      :rows="1"
                      name="address_1"
                      v-model="address_1"
                      class="inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
                      placeholder="Address Line 1"
                    />
                    <div
                      v-if="address1Error"
                      class="text-xs text-red-500 italic mt-1 font-semibold"
                    >
                      {{ address1Error }}
                    </div>
                  </div>
                  <div class="relative w-full space-y-1 mt-2">
                    <label
                      for="address_2"
                      class="text-sm text-gray-900 dark:text-gray-50 font-semibold"
                      >Address Line 2 <i class="font-normal">(option)</i></label
                    >
                    <textarea
                      :rows="1"
                      name="address_2"
                      v-model="address_2"
                      class="inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
                      placeholder="Address Line 2 (option)"
                    />
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <div class="relative space-y-1 mt-2">
                      <label
                        for="country"
                        class="text-sm text-gray-900 dark:text-gray-50 font-semibold"
                        >Country *</label
                      >
                      <select
                        name="country"
                        v-model="country"
                        class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm placeholder:text-gray-900 dark:placeholder:text-gray-50"
                        required
                      >
                        <option value="" disabled>- Select Country -</option>
                        <option
                          v-for="item in countryFlag"
                          :key="item.code"
                          :value="item.code"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                      <div
                        v-if="countryError"
                        class="text-xs text-red-500 italic mt-1 font-semibold"
                      >
                        {{ countryError }}
                      </div>
                    </div>
                    <div class="relative space-y-1 mt-2">
                      <label
                        for="state"
                        class="text-sm text-gray-900 dark:text-gray-50 font-semibold"
                        >State *</label
                      >
                      <input
                        type="text"
                        name="state"
                        v-model="state"
                        class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
                        placeholder="State"
                      />
                      <div
                        v-if="stateError"
                        class="text-xs text-red-500 italic mt-1 font-semibold"
                      >
                        {{ stateError }}
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <div class="relative space-y-1 mt-2">
                      <label
                        for="city"
                        class="text-sm text-gray-900 dark:text-gray-50 font-semibold"
                        >City *</label
                      >
                      <input
                        type="text"
                        name="city"
                        v-model="city"
                        class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
                        placeholder="City"
                      />
                      <div
                        v-if="cityError"
                        class="text-xs text-red-500 italic mt-1 font-semibold"
                      >
                        {{ cityError }}
                      </div>
                    </div>
                    <div class="relative space-y-1 mt-2">
                      <label
                        for="postal_code"
                        class="text-sm text-gray-900 dark:text-gray-50 font-semibold"
                        >Postal Code *</label
                      >
                      <input
                        type="text"
                        name="postal_code"
                        v-model="postal_code"
                        class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
                        placeholder="Postal Code"
                      />
                      <div
                        v-if="PostalCodeError"
                        class="text-xs text-red-500 italic mt-1 font-semibold"
                      >
                        {{ PostalCodeError }}
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center justify-center gap-2 mt-5">
                    <button
                      type="submit"
                      class="inline-flex bg-orange-600 hover:bg-orange-400 text-sm text-gray-50 font-semibold px-5 py-3"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      class="inline-flex bg-gray-900 dark:bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-50 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-100 font-semibold px-5 py-3 rounded-md"
                      @click="onClose"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import type { ShippingInfo } from "~/utils/products";
import countryFlag from "~/utils/countryFlag.json";

const emit = defineEmits(["onClose"]);
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  data: {
    type: Object as PropType<ShippingInfo>,
    required: true,
  },
});
onMounted(() => {});
const cart = useCartStore();

const scheme = Yup.object().shape({
  full_name: Yup.string()
    .required("This field is required")
    .min(3, "Please enter the correct name"),
  email: Yup.string().email().required("This field is required"),
  phone: Yup.string()
    .required("This field is required")
    .matches(/^[0-9]+$/, "Please enter the correct phone number."),
  country: Yup.string().required("This field is required"),
  state: Yup.string().required("This field is required"),
  city: Yup.string().required("This field is required"),
  address_1: Yup.string()
    .required("This field is required.")
    .test(
      "len",
      "Address must contain between 10 - 300 characters",
      (val: any) => {
        if (val === undefined) {
          return true;
        }
        return val.length === 0 || (val.length >= 10 && val.length <= 300);
      }
    ),
  postal_code: Yup.string()
    .matches(/^\S*$/, "Whitespace is not allowed")
    .required("This field is required"),
});

const shippingData = {
  full_name: props.data.full_name,
  email: props.data.email,
  phone: props.data.phone,
  address_1: props.data.address_1,
  address_2: props.data.address_2,
  state: props.data.state,
  city: props.data.city,
  country: props.data.country,
  postal_code: props.data.postal_code,
};
const { handleSubmit } = useForm({
  validationSchema: scheme,
  initialValues: shippingData,
});
const { value: full_name, errorMessage: fullNameError } =
  useField<string>("full_name");
const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: phone, errorMessage: phoneError } = useField<string>("phone");
const { value: address_1, errorMessage: address1Error } =
  useField<string>("address_1");
const { value: address_2 } = useField<string>("address_2");
const { value: state, errorMessage: stateError } = useField<string>("state");
const { value: city, errorMessage: cityError } = useField<string>("city");
const { value: country, errorMessage: countryError } =
  useField<string>("country");
const { value: postal_code, errorMessage: PostalCodeError } =
  useField<string>("postal_code");

const onSubmit = handleSubmit(async (value) => {
  cart.editShippingInfo(props.data.id, value);
  onClose();
});
function onClose() {
  emit("onClose");
}
</script>

<style scoped></style>
