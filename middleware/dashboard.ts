import { callWithNuxt } from "#app";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp();
  const authStore = useAuthStore(nuxtApp.$pinia);
  // const isAdmin = authStore.users?.role === "SUPER_ADMIN" ? true : false

  if (!authStore.isLoggedIn) {
    return callWithNuxt(nuxtApp, navigateTo, ["/"]);
  }
  // if(isAdmin){
  //   return callWithNuxt(nuxtApp, navigateTo, ["/"]);
  // }
  if (to.path !== from.path && import.meta.client) {
    window.scrollTo(0, 0);
  }
});
