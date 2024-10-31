<template>
  <div
    v-if="themeStore.isLoading"
    class="relative bg-gray-50 dark:bg-slate-900"
  >
    <LoadingSkeleton :row-count="10" />
  </div>
  <div
    v-else
    class="w-full h-full bg-gray-100 dark:bg-slate-900 pb-2 rounded-lg mt-16 md:mt-16 lg:mt-14"
  >
    <div
      class="flex w-full h-16 items-center justify-center m-auto"
      style="
        background-image: url(https://dentestore.com/images/banner.jpg);
        padding: 90px 0 110px 0;
        background-attachment: fixed;
        background-size: 100%;
        position: relative;
      "
    >
      <h1 class="text-3xl text-gray-50 font-semibold uppercase">
        Account Settings
      </h1>
    </div>
    <div
      class="flex flex-col lg:flex-row md:flex-col w-full py-5 px-2 lg:px-5 md:px-2 gap-2 lg:gap-2 md:gap-2"
    >
      <div class="inline-block lg:w-72 p-3">
        <div class="relative py-2 px-2">
          <div class="relative flex items-center justify-center">
            <NuxtImg
              v-if="dataStore.profile?.avatar !== null"
              :src="`/users/${dataStore.profile?.avatar}`"
              alt="user-avatar"
              class="h-12 w-12 object-fill rounded-full"
            />
            <Icon
              v-else
              name="material-symbols:account-circle"
              class="h-12 w-12 text-orange-600"
            />
            <button class="absolute bottom-2 ml-5 h-3 w-3">
              <Icon
                name="mdi:camera-plus"
                class="h-full w-full text-gray-900 dark:text-gray-200"
              />
              <input
                type="file"
                name="images"
                class="absolute -bottom-4 -left-3 opacity-0"
                @change="onAvatarChange"
              />
            </button>
          </div>
          <div class="flex flex-col items-center justify-center">
            <div class="text-lg font-semibold text-gray-900 dark:text-gray-50">
              {{ authStore.users?.name }}
            </div>
            <div class="text-sm text-gray-900 dark:text-gray-50 truncate">
              {{ authStore.users?.email }}
            </div>
          </div>
        </div>
        <div
          class="relative bg-white dark:bg-slate-800 py-2 px-2 rounded-sm mt-2"
        >
          <div
            v-for="menu in sideMenu"
            :key="menu.id"
            :class="`flex w-full items-center gap-2 hover:bg-orange-600 group py-2 px-2 my-2 cursor-pointer ${
              menu.permission
            } ${activeMenu === menu.id ? 'bg-orange-600' : ''}`"
            @click="setActiveMenu(menu.id)"
          >
            <Icon
              :name="menu.icon"
              :class="` group-hover:text-gray-50 ${
                activeMenu === menu.id
                  ? 'text-gray-50 h-8 w-8'
                  : 'h-8 w-8 text-orange-600'
              }`"
            />
            <div
              class="dark:text-gray-50 group-hover:text-gray-50 dark:group-hover:text-gray-50"
              :class="activeMenu === menu.id ? 'text-gray-50' : 'text-gray-900'"
            >
              {{ menu.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="px-3 w-full">
        <DashboardAccountSetting
          v-if="activeMenu === 1 && !dataStore.loadingItem"
          :users="dataStore.profile"
        />
        <DashboardMyOrders
          v-if="activeMenu === 2 && !dataStore.loadingItem"
          :data="dataStore.allUserTransactions"
        />
        <DashboardOrderList
          v-if="activeMenu === 4 && !dataStore.loadingItem"
          :data="dataStore.allTransactions"
        />
        <DashboardSkeletonItem v-if="dataStore.loadingItem" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const themeStore = useThemeSettings();
const authStore = useAuthStore();
const dataStore = useDataStore();
const config = useRuntimeConfig();
const { uploadAvatar } = useCheckout();
const isAdmin = authStore.users?.role === "SUPER_ADMIN" ? true : false;
const activeMenu = ref(1);
const page = ref(1);
const totalRow = ref(3);
const searchValue = ref<string>("");

onMounted(() => {});
onNuxtReady(() => {
  themeStore.disableBottomNav();
  themeStore.closeCollapseMenu();
});

definePageMeta({
  layout: "default",
  middleware: ["dashboard"],
});
useHead({
  title: "My Account",
});

const setActiveMenu = (id: number) => {
  activeMenu.value = id;
};
watchEffect(async () => {
  switch (activeMenu.value) {
    case parseInt("2"):
      dataStore.setLoading(true);
      await dataStore.getAllUsersTransaction();
      // console.log(dataStore.allUserTransactions);
      break;
    case 3:
      break;
    case 4:
      dataStore.setLoading(true);
      await dataStore.getAllTransaction(
        String(page.value),
        String(totalRow.value),
        searchValue.value
      );
      console.log(dataStore.allTransactions);
      break;
    default:
      dataStore.setLoading(true);
      await dataStore.getUsers();
      // console.log(dataStore.profile);
      break;
  }
});

async function onAvatarChange(event: Event) {
  const [file] = (event.target as HTMLInputElement).files as FileList;
  console.log(file);

  await uploadAvatar(file);
}

const sideMenu = [
  {
    id: 1,
    title: "Account Settings",
    icon: "material-symbols:settings-account-box-rounded",
  },
  {
    id: 2,
    title: "My Orders",
    icon: "material-symbols:shopping-cart-rounded",
  },
  {
    id: 3,
    title: "List Users",
    icon: "material-symbols:groups-rounded",
    permission: isAdmin ? "block" : "hidden",
  },
  {
    id: 4,
    title: "List Order",
    icon: "material-symbols:order-approve-outline-sharp",
    permission: isAdmin ? "block" : "hidden",
  },
];
</script>

<style scoped></style>
