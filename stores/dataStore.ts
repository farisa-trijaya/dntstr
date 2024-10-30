import type { User, Transaction } from "~/app/misc/types";

export const useDataStore = defineStore("data", () => {
  const profile = ref(<User | null>null);
  const allUsers = ref<User[]>([]);
  const transactions = ref(<Transaction | null>null);
  const allTransactions = ref<Transaction[]>([]);
  const allUserTransactions = ref<Transaction[]>([]);
  const getProfileError = ref(<Error | null>null);
  const errorAllTransactions = ref(<Error | null>null);
  const errorAllUserTransactions = ref(<Error | null>null);
  const loadingItem = ref(true);
  const csrfToken = ref<string>("");

  async function getUsers() {
    const { getProfile } = useCheckout();
    const { status, error, data } = await getProfile();
    const authStore = useAuthStore();
    if (error) {
      getProfileError.value = error;
      setLoading(false);
      if (error.message.includes("ReAuthentication failed")) {
        await authStore.logMeOut();
        setLoading(false);
        return;
      }
      return;
    }
    if (status === "success" && data) {
      profile.value = data as User;
      setLoading(false);
    }
  }
  async function getAllUsers() {}
  async function getAllTransaction(
    page: string,
    total: string,
    orderId: string
  ) {
    const { getAllTransactions } = useAdmin();
    const { status, error, data } = await getAllTransactions(
      page,
      total,
      orderId
    );
    if (status === "success") {
      allTransactions.value = structuredClone(data.data);
      csrfToken.value = data.csrf_token;
      setLoading(false);
    } else {
      errorAllTransactions.value = error;
      setLoading(false);
    }
  }
  async function getAllUsersTransaction() {
    const { getAllTransactionUser } = useCheckout();
    const { status, data, error } = await getAllTransactionUser();
    if (error) {
      errorAllUserTransactions.value = error;
      setLoading(false);
      return;
    }
    if (status === "success") {
      allUserTransactions.value = data;
      setLoading(false);
    }
  }
  function setLoading(value: boolean) {
    loadingItem.value = value;
  }
  return {
    profile,
    allUsers,
    transactions,
    allTransactions,
    allUserTransactions,
    getProfileError,
    errorAllTransactions,
    errorAllUserTransactions,
    loadingItem,
    csrfToken,
    getUsers,
    getAllUsers,
    setLoading,
    getAllUsersTransaction,
    getAllTransaction,
  };
});
