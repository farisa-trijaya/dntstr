import { useAuthStore } from "~/stores/authStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp();
  const authStore = useAuthStore(nuxtApp.$pinia);
  // console.log("to", to);
  // console.log("from", from);
  setTimeout(() => {
    const isAuth = authStore.isLoggedIn;
    if (to.path.startsWith("/auth/")) {
      if (isAuth) {
        return navigateTo("/");
      }
      return;
    }
    if (to.path !== from.path && import.meta.client) {
      window.scrollTo(0, 0);
    }
  });
});
