<template>
  <div
    class="relative mx-5 py-5 px-4 border border-gray-400 dark:border-gray-700"
  >
    <AlertMessageBox
      v-if="resetError"
      theme="danger"
      :message="resetError.message"
      :show-close="false"
    />

    <div v-if="!formSent" class="w-full">
      <h1 class="text-xl text-gray-50 font-bold">Forgot Password</h1>
      <form @submit.prevent="onSubmit">
        <div class="relative space-y-1 mt-2">
          <label for="email" class="text-sm text-gray-50 font-semibold"
            >Email Address *</label
          >
          <input
            type="email"
            name="email"
            v-model="email"
            class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
          />
          <div
            v-if="emailError"
            class="text-xs text-red-500 italic mt-1 font-semibold"
          >
            {{ emailError }}
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button
            type="submit"
            class="inline-flex w-full items-center justify-center py-2 bg-orange-600 hover:bg-orange-500 text-sm text-gray-50 font-semibold rounded-sm mt-5"
          >
            Submit
          </button>
          <button
            type="button"
            class="inline-flex w-full items-center justify-center py-2 bg-gray-50 hover:bg-gray-900 text-sm text-gray-900 hover:text-gray-50 font-semibold rounded-sm mt-5"
            @click="goHome()"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    <div v-else class="w-full">
      <AlertMessageBox
        theme="success"
        :show-close="false"
        message="Please check your email for reset instructions. Check your spam folder too."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup";

definePageMeta({
  layout: "auth",
  middleware: "auth",
});
useHead({
  title: "Forgot Password",
});

const { resetPassword } = useCheckout();

const formSent = ref(false);
const resetError = ref(<Error | null>null);

const scheme = Yup.object().shape({
  email: Yup.string().email().required("Email Required"),
});
const { handleSubmit } = useForm({
  validationSchema: scheme,
});
const { value: email, errorMessage: emailError } = useField<string>("email");

const onSubmit = handleSubmit(async (value) => {
  const { email } = value;
  await resetMyPassword(email);
});

async function resetMyPassword(email: string) {
  // validation
  if (!email) {
    resetError.value = {} as Error;
    resetError.value.message = "Missing email address";
    return;
  }

  // For security purposes, this always returns successful
  // Check your server console logs for any errors
  const result = await resetPassword(email);
  console.log("reset form: ", result);
  formSent.value = true;
}

function goHome() {
  navigateTo("/");
}
</script>

<style scoped></style>
