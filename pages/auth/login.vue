<template>
  <div
    class="relative mx-5 py-5 px-4 border border-gray-400 dark:border-gray-700"
  >
    <AlertMessageBox
      v-if="loginError"
      theme="danger"
      :message="loginError.message"
      :show-close="true"
      @close-message="loginError = null"
    />
    <AlertMessageBox
      v-if="getProfileError"
      theme="danger"
      :message="getProfileError.message"
      :show-close="true"
      @close-message="getProfileError = null"
    />
    <AlertMessageBox
      v-if="loginSuccess"
      theme="success"
      message="Success Login"
      :show-close="true"
      @close-message="loginSuccess = false"
    />

    <h1 class="text-xl text-gray-50 font-bold">Sign In</h1>
    <form @submit.prevent="onSubmit">
      <div class="relative space-y-1 mt-2">
        <label for="email" class="text-sm text-gray-50 font-semibold"
          >Email Address *</label
        >
        <input
          type="text"
          name="email"
          v-model="email"
          class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
          required
        />
        <div
          v-if="emailError"
          class="text-xs text-red-500 italic mt-1 font-semibold"
        >
          {{ emailError }}
        </div>
      </div>
      <div class="relative space-y-1 mt-2">
        <label for="password" class="text-sm text-gray-50 font-semibold"
          >Password *</label
        >
        <input
          :type="typePassword"
          name="password"
          v-model="password"
          class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
        />
        <ClientOnly>
          <Icon
            :name="
              typePassword === 'password'
                ? 'ic:outline-remove-red-eye'
                : 'mdi:eye-off-outline'
            "
            class="absolute top-8 right-2 h-6 w-6 cursor-pointer text-gray-900 dark:text-gray-50"
            @click="togglePassword"
          />
        </ClientOnly>
        <div
          v-if="passwordError"
          class="text-xs text-red-500 italic mt-1 font-semibold"
        >
          {{ passwordError }}
        </div>
      </div>
      <button
        class="inline-flex w-full items-center justify-center py-2 bg-orange-600 hover:bg-orange-500 text-sm text-gray-50 font-semibold rounded-sm mt-5"
      >
        SIgn In
      </button>
      <div class="flex items-center justify-center gap-2 mt-2">
        <input type="checkbox" />
        <label for="remember" class="text-sm text-gray-200">Remember Me</label>
      </div>
    </form>
    <div class="flex items-center justify-center gap-2 mt-2">
      <NuxtLink to="/auth/forgot">
        <p
          class="text-sm font-semibold text-orange-500 hover:underline cursor-pointer"
        >
          Forgot your password?
        </p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import type { User } from "~/app/misc/types";

definePageMeta({
  layout: "auth",
  middleware: "auth",
});

const themeStore = useThemeSettings();
const authStore = useAuthStore();
const config = useRuntimeConfig();
const typePassword = ref("password");
const regexPattern = new RegExp("true");

const loginError = ref(<Error | null>null);
const loginSuccess = ref(false);

const { login, getProfile } = useCheckout();

const getProfileError = ref(<Error | null>null);
// User profile
const profile = ref(<User>{});
// Check email verification
const emailIsVerified = ref(false);

onNuxtReady(() => {
  themeStore.disableBottomNav();
  themeStore.closeCollapseMenu();
});
useHead({
  title: "Login",
});

const scheme = Yup.object().shape({
  email: Yup.string().email().required("Email Required"),
  password: Yup.string()
    .required("Password Required")
    .matches(/^(\S+$)/g, "Columns are not allowed to contain spaces"),
});

const { handleSubmit } = useForm({
  validationSchema: scheme,
});

const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");

const onSubmit = handleSubmit(async (value) => {
  const { email, password } = value;
  await loginUser(email, password);
});

async function loginUser(email: string, password: string) {
  const { status, error } = await login(email, password);
  if (status === "fail") {
    loginError.value = error;
    // console.error(error);
    if (error.message === "account is not verified") {
      authStore.setRegisterEmail(email);
      setTimeout(() => {
        navigateTo("/auth/verify-registration");
      }, 1000);
    }
    return;
  }
  if (status === "success") await loginSuccessful();
}
async function loginSuccessful() {
  const { status, error, data } = await getProfile();
  if (error) {
    console.log("error: ", error);
    getProfileError.value = error;
    return;
  }

  if (status === "success" && data) {
    profile.value = data as User;
    // Check email verification status
    emailIsVerified.value = data.email_verified;
    // Store user profile
    authStore.setUser(profile.value);
    authStore.setIsLoggedIn(true);
    authStore.setUpdateCount();

    loginSuccess.value = true;
    setTimeout(() => {
      navigateTo("/");
    }, 300);
  }
}
function togglePassword() {
  if (typePassword.value === "password") {
    typePassword.value = "text";
  } else {
    typePassword.value = "password";
  }
}
</script>
