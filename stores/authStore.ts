import type { User } from "~/app/misc/types";
import { skipHydrate } from "pinia";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const users = ref(<User | null>null);
    const isLoggedIn = ref(false);
    const updateCount = ref(0);
    const registrationEmail = ref("");

    const setUser = (user: User) => {
      users.value = user;
    };
    const getUser = computed(() => {
      return users.value;
    });
    const removeUser = () => {
      users.value = null;
    };
    const setIsLoggedIn = (value: boolean) => {
      isLoggedIn.value = value;
    };
    const setUpdateCount = () => {
      updateCount.value++;
    };
    const setRegisterEmail = (value: string) => {
      registrationEmail.value = value;
    };
    const removeRegisterEmail = () => {
      registrationEmail.value = "";
    };
    const checkLoggedIn = async () => {
      const { isAuthenticated } = useCheckout();
      const isLogin = await isAuthenticated();
      if (!isLogin) {
        removeUser();
        setIsLoggedIn(false);
        await logMeOut();
      }
    };
    const logMeOut = async () => {
      const { logout } = useCheckout();
      const { status } = await logout();
      if (status === "success") {
        removeUser();
        setIsLoggedIn(false);
        return navigateTo("/");
      }
    };
    return {
      users: skipHydrate(users),
      isLoggedIn,
      updateCount,
      registrationEmail,
      setUser,
      getUser,
      removeUser,
      setIsLoggedIn,
      setUpdateCount,
      setRegisterEmail,
      removeRegisterEmail,
      checkLoggedIn,
      logMeOut,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  }
);
