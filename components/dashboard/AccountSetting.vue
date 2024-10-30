<template>
  <div class="flex flex-col w-full h-full">
    <h1 class="text-lg text-gray-900 dark:text-gray-50 font-semibold">
      Account Setting
    </h1>
    <div
      v-if="dataStore.getProfileError"
      class="flex flex-col w-full h-72 items-center justify-center bg-white dark:bg-gray-800 rounded-md py-2 px-5 mt-3"
    >
      <div class="m-auto">
        <div
          class="flex flex-col items-center justify-center py-2 px-10 border border-orange-600 rounded-sm"
        >
          <div class="text-orange-600">
            {{ dataStore.getProfileError.message }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="relative w-full bg-white dark:bg-gray-800 rounded-md py-2 px-3 lg:px-5 md:px-3 mt-3"
    >
      <h2 class="text-orange-600 dark:text-orange-500 font-semibold">
        Account Information
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-1 w-full py-2">
        <div class="col-span-1 lg:col-span-9 md:col-span-1 w-full">
          <div class="grid grid-cols-12">
            <div class="col-span-5 lg:col-span-3 md:col-span-5 items-center">
              <div class="text-sm text-gray-900 dark:text-gray-50">
                Full Name
              </div>
              <div class="text-sm text-gray-900 dark:text-gray-50">Email</div>
              <div class="text-sm text-gray-900 dark:text-gray-50">
                Verified Email
              </div>
              <div class="text-sm text-gray-900 dark:text-gray-50">
                Verified Purchase
              </div>
              <div class="text-sm text-gray-900 dark:text-gray-50">
                Account Status
              </div>
            </div>
            <div class="col-span-7 lg:col-span-9 md:col-span-7 items-center">
              <div class="text-sm text-gray-900 dark:text-gray-50">
                :
                <span class="text-orange-600 dark:text-orange-500">{{
                  props.users?.name
                }}</span>
              </div>
              <div class="text-sm text-gray-900 dark:text-gray-50 truncate">
                :
                <span class="text-orange-600 dark:text-orange-500">{{
                  props.users?.email
                }}</span>
              </div>
              <div class="text-sm text-gray-900 dark:text-gray-50">
                :
                <span class="text-orange-600 dark:text-orange-500">{{
                  props.users?.email_verified ? "Verified" : "Not Verified"
                }}</span>
              </div>
              <div class="text-sm text-gray-900 dark:text-gray-50">
                :
                <span class="text-orange-600 dark:text-orange-500">{{
                  props.users?.verified_purchase ? "Verified" : "Not Verified"
                }}</span>
              </div>
              <div class="text-sm text-gray-900 dark:text-gray-50">
                :
                <span class="text-orange-600 dark:text-orange-500">{{
                  props.users?.is_active ? "Active" : "Disable"
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-span-1 lg:col-span-3 md:col-span-1 flex w-full items-center justify-center mt-5 lg:mt-0 md:mt-5"
        >
          <button
            v-if="!openForm"
            class="inline-flex items-center gap-2 py-2 px-10 lg:px-10 md:px-10 text-nowrap border border-orange-600 dark:border-orange-500 hover:bg-orange-600 rounded-sm group mt-2 lg:mt-0 md:mt-2"
            @click="openForm = true"
          >
            <Icon
              name="material-symbols:edit-square-outline"
              class="text-orange-600 dark:text-orange-500 group-hover:text-white"
            />
            <span
              class="text-sm text-orange-600 dark:text-orange-500 font-semibold group-hover:text-white"
            >
              Change Password</span
            >
          </button>
        </div>
      </div>
      <AlertMessageBox
        v-if="errorChangePassword"
        theme="danger"
        :message="errorChangePassword.message"
        :show-close="true"
        @close-message="errorChangePassword = null"
      />
      <AlertMessageBox
        v-if="changePasswordSuccess"
        theme="success"
        message="Success Change Password"
        :show-close="true"
        @close-message="changePasswordSuccess = false"
      />
      <div v-if="openForm" class="relative inline-flex flex-col w-full py-2">
        <form @submit.prevent="onSubmit">
          <div class="relative space-y-1 mt-2">
            <label
              for="currentPassword"
              class="text-sm text-gray-900 dark:text-gray-50 font-semibold"
              >Current Password *</label
            >
            <input
              :type="typeCurrentPassword"
              name="currentPassword"
              v-model="currentPassword"
              class="inline-flex w-full items-center text-sm text-gray-900 dark:text-gray-50 ps-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
            />

            <Icon
              :name="
                typeCurrentPassword === 'password'
                  ? 'ic:outline-remove-red-eye'
                  : 'mdi:eye-off-outline'
              "
              class="absolute top-8 right-2 h-6 w-6 cursor-pointer text-gray-900 dark:text-gray-50"
              @click="toggleCurrentPassword"
            />

            <div
              v-if="currentPasswordError"
              class="text-xs text-red-500 italic mt-1 font-semibold"
            >
              {{ currentPasswordError }}
            </div>
          </div>
          <div class="relative space-y-1 mt-2">
            <label
              for="password"
              class="text-sm text-gray-900 dark:text-gray-50 font-semibold"
              >New Password *</label
            >
            <input
              :type="typePassword"
              name="password"
              v-model="password"
              class="inline-flex w-full items-center text-sm text-gray-900 dark:text-gray-50 ps-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
            />

            <Icon
              :name="
                typePassword === 'password'
                  ? 'ic:outline-remove-red-eye'
                  : 'mdi:eye-off-outline'
              "
              class="absolute top-8 right-2 h-6 w-6 cursor-pointer text-gray-900 dark:text-gray-50"
              @click="togglePassword"
            />

            <div
              v-if="passwordError"
              class="text-xs text-red-500 italic mt-1 font-semibold"
            >
              {{ passwordError }}
            </div>
          </div>
          <div class="relative space-y-1 mt-2">
            <label
              for="confPassword"
              class="text-sm text-gray-900 dark:text-gray-50 font-semibold"
              >Confirm New Password *</label
            >
            <input
              :type="typeConfPassword"
              name="confPassword"
              v-model="confPassword"
              class="inline-flex w-full items-center text-sm text-gray-900 dark:text-gray-50 ps-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
            />

            <Icon
              :name="
                typeConfPassword === 'password'
                  ? 'ic:outline-remove-red-eye'
                  : 'mdi:eye-off-outline'
              "
              class="absolute top-8 right-2 h-6 w-6 cursor-pointer text-gray-900 dark:text-gray-50"
              @click="toggleConfPassword"
            />

            <div
              v-if="confPasswordError"
              class="text-xs text-red-500 italic mt-1 font-semibold"
            >
              {{ confPasswordError }}
            </div>
          </div>
          <div class="flex items-center w-full gap-2">
            <button
              type="submit"
              class="inline-flex w-full items-center justify-center py-2 bg-orange-600 hover:bg-orange-500 text-sm text-gray-50 font-semibold rounded-sm mt-5 uppercase"
            >
              Submit
            </button>
            <button
              type="button"
              class="inline-flex w-full items-center justify-center py-2 bg-gray-900 dark:bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-900 text-sm text-gray-50 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-50 font-semibold rounded-sm mt-5 uppercase"
              @click="openForm = false"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import type { ChangePassword, User } from "~/app/misc/types";

const props = defineProps({
  users: {
    type: Object as PropType<User | null>,
    required: true,
  },
});

const dataStore = useDataStore();
const { changePassword } = useCheckout();
const typeCurrentPassword = ref("password");
const typePassword = ref("password");
const typeConfPassword = ref("password");
const openForm = ref(false);
const errorChangePassword = ref(<Error | null>null);
const changePasswordSuccess = ref(false);

const scheme = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Password Required")
    .matches(/^(\S+$)/g, "Columns are not allowed to contain spaces"),
  password: Yup.string()
    .required("This field is required")
    .matches(/^(\S+$)/g, "Password is not allowed to contain whitespace"),
  confPassword: Yup.string()
    .required("This field is required")
    .oneOf([Yup.ref("password")], "This column must be the same as Password."),
});
const { handleSubmit } = useForm({
  validationSchema: scheme,
});
const { value: currentPassword, errorMessage: currentPasswordError } =
  useField<string>("currentPassword");
const { value: password, errorMessage: passwordError } =
  useField<string>("password");
const { value: confPassword, errorMessage: confPasswordError } =
  useField<string>("confPassword");

const onSubmit = handleSubmit(async (value) => {
  const values = value as ChangePassword;
  await updatePassword(values);
});

function toggleCurrentPassword() {
  if (typeCurrentPassword.value === "password") {
    typeCurrentPassword.value = "text";
  } else {
    typeCurrentPassword.value = "password";
  }
}
function togglePassword() {
  if (typePassword.value === "password") {
    typePassword.value = "text";
  } else {
    typePassword.value = "password";
  }
}
function toggleConfPassword() {
  if (typeConfPassword.value === "password") {
    typeConfPassword.value = "text";
  } else {
    typeConfPassword.value = "password";
  }
}
async function updatePassword(value: ChangePassword) {
  const { status, error } = await changePassword(value);
  if (status === "fail") {
    errorChangePassword.value = error;
    return;
  }
  if (status === "success") {
    changePasswordSuccess.value = true;
    openForm.value = false;
    setTimeout(() => {
      changePasswordSuccess.value = false;
    }, 2000);
  }
}
</script>

<style scoped></style>
