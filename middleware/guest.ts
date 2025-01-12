export default defineNuxtRouteMiddleware(async (to, from) => {
  useNuxtApp().hook("page:finish", () => {
    if (history.state.scroll) {
      setTimeout(() => window.scrollTo(history.state.scroll), 0);
    } else {
      setTimeout(() => window.scrollTo(0, 0), 0);
    }
  });
});
