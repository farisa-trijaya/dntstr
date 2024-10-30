<template>
  <div class="flex flex-col w-full h-full">
    <h1 class="text-lg text-gray-900 dark:text-gray-50 font-semibold">
      Users Orders
    </h1>
    <div
      class="h-[680px] lg:h-[520px] md:h-[730px] overflow-y-auto overflow-hidden mt-3"
    >
      <div
        class="relative w-full bg-white dark:bg-gray-800 rounded-md py-3 px-3 lg:px-5 md:px-3 mt-3 overflow-x-auto overflow-hidden"
      >
        <div class="grid grid-cols-1 w-full py-2">
          <div class="card">
            <Toolbar>
              <template #start>
                <Button
                  label="Export"
                  icon="pi pi-upload"
                  severity="secondary"
                />
              </template>
            </Toolbar>
            <DataTable
              ref="dt"
              v-model:filters="filters"
              :value="props.data"
              dataKey="id"
              :paginator="true"
              :rows="10"
              filterDisplay="row"
              :loading="dataStore.loadingItem"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              :rowsPerPageOptions="[5, 10, 25]"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
              :globalFilterFields="[
                'name',
                'orderID',
                'amount',
                'paymentSource',
                'status',
                'date_created',
              ]"
            >
              <template #header>
                <div class="flex justify-end">
                  <IconField>
                    <InputIcon>
                      <i class="pi pi-search" />
                    </InputIcon>
                    <InputText
                      v-model="filters['global'].value"
                      placeholder="Keyword Search"
                    />
                  </IconField>
                </div>
              </template>
              <template #empty> No items found. </template>
              <template #loading> Loading items data. Please wait. </template>
              <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by name" />
                </template>
            </Column>
            </DataTable>
          </div>
        </div>
        <div class="col-span-1 flex items-center justify-center mt-5">
          <!-- Bottom -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import type { Transaction } from "~/app/misc/types";
import { FilterMatchMode } from "@primevue/core/api";

const props = defineProps({
  data: {
    type: Array as PropType<Array<Transaction>>,
    required: true,
  },
  page: {
    type: Number,
    default: 1,
  },
});

const dataStore = useDataStore();
const currentPage = ref<number>(props.page);
const dt = ref();
const toast = useToast();
const loading = ref(true);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  orderID: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  verified: { value: null, matchMode: FilterMatchMode.EQUALS },
});
const statuses = ref([true, false]);

onMounted(() => {});

function formatTime(date: string) {
  // return dayjs(date).format("dddd, MMMM D, YYYY h:mm A");
  return dayjs(date).format("DD-MM-YYYY h:mm A");
}
</script>
<style lang="css">
/* @import "~/assets/css/primevue/datatable.css";
@import "~/assets/css/primevue/paginator.css"; */
</style>
