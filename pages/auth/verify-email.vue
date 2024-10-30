<template>
  <div
    class="relative mx-5 py-5 px-4 border border-gray-400 dark:border-gray-700"
  >
    <AlertMessageBox
      v-if="resetError"
      theme="danger"
      :message="resetError.message"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { verifyEmailToken } = useCheckout();

const resetError = ref(<Error | null>null);

definePageMeta({
  layout: "auth",
  middleware: "auth",
});
useHead({
  title: "Verify Email",
});

// Get token from url parameters
const token = route.query.token as string;
if (!token) navigateTo("/auth/verify-failed");

try {
  const { data, error } = await verifyEmailToken(token);
  // If verification fails, navigate to a verify failed page
  if (error) navigateTo("/auth/verify-failed");
  // If successful, navigate to login page
  if (data) navigateTo(`/auth/login?email_verify=true`);
} catch (e) {
  // If other error, like a server error occurs, show generic error message
  // console.log(e)
  resetError.value = {} as Error;
  resetError.value.message = "Error. Please contact an administrator.";
}
</script>

<style scoped></style>
