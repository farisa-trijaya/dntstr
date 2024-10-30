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
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#002453] dark:bg-slate-950 p-6 text-left align-middle shadow-xl transition-all border border-gray-500 dark:border-gray-700"
            >
              <div class="flex items-end justify-end group cursor-pointer">
                <div
                  class="flex items-center rounded-full border border-gray-300 group group-hover:border-red-600"
                  @click="closeAlert"
                >
                  <Icon
                    name="mingcute:close-fill"
                    class="text-gray-300 group-hover:text-red-600"
                  />
                </div>
              </div>
              <div class="flex flex-col items-center py-10">
                <NuxtImg
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK-3Rjv7fjDPf2WbW8KIVU5rN_dsRmAOkc1KZQeVq50sOUpcssKy6bDB0yH3V_nuxEJ6KEb6m3jdkl5gh9IVf2AK1HI8bl9v9y6Zf0TrQtzsML0F7O4PgplMSeMQ4RkQUjQbc40_cgyoaxnIlvpnMxM-1nGVWs9Wc1bMYxqnujKHfL2BG2vsuGwbdFunS7/s16000/logo-footer.png"
                  class="h-8 w-auto object-fill ml-5"
                />
                <div class="relative w-full mt-3">
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
                </div>
                <h1 class="mt-3 text-xl text-gray-50 font-semibold uppercase">
                  Login
                </h1>
                <form @submit.prevent="onSubmit" class="relative w-full">
                  <div class="relative space-y-1 mt-2">
                    <label
                      for="email"
                      class="text-sm text-gray-50 font-semibold"
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
                    <label
                      for="password"
                      class="text-sm text-gray-50 font-semibold"
                      >Password *</label
                    >
                    <input
                      :type="typePassword"
                      name="password"
                      v-model="password"
                      class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
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
                  <button
                    type="submit"
                    class="inline-flex w-full items-center justify-center py-2 bg-orange-600 hover:bg-orange-500 text-sm text-gray-50 font-semibold rounded-sm mt-5"
                  >
                    Sign In
                  </button>
                  <div class="flex items-center justify-center gap-2 mt-2">
                    <input type="checkbox" />
                    <label for="remember" class="text-sm text-gray-200"
                      >Remember Me</label
                    >
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
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import type { User } from "~/app/misc/types";

const emit = defineEmits(["closeAlert"]);
const props = defineProps({
  isOpen: {
    type: Boolean,
    require: true,
  },
});

const authStore = useAuthStore();
const { login, getProfile } = useCheckout();
const getProfileError = ref(<Error | null>null);
const profile = ref(<User>{});
const emailIsVerified = ref(false);
const loginError = ref(<Error | null>null);
const loginSuccess = ref(false);
const typePassword = ref("password");

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

function closeAlert() {
  emit("closeAlert");
}

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
      closeAlert();
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

<style scoped></style>
