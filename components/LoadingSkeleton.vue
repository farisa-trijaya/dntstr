<template>
  <div
    class="flex h-screen w-full items-center justify-center m-auto bg-gray-50 dark:bg-slate-900 shadow-base p-6 rounded-md"
  >
    <table
      class="animate-pulse w-full border-separate border-spacing-4 table-fixed m-auto"
    >
      <thead>
        <tr>
          <th scope="col">
            <div class="h-4 bg-[#C4C4C4] dark:bg-slate-500"></div>
          </th>
          <th scope="col">
            <div class="h-4 bg-[#C4C4C4] dark:bg-slate-500"></div>
          </th>
          <th scope="col">
            <div class="h-4 bg-[#C4C4C4] dark:bg-slate-500"></div>
          </th>
          <th scope="col">
            <div class="h-4 bg-[#C4C4C4] dark:bg-slate-500"></div>
          </th>
          <th scope="col">
            <div class="h-4 bg-[#C4C4C4] dark:bg-slate-500"></div>
          </th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="(item, i) in rowItems" :key="i">
          <td>
            <div class="h-2 bg-[#C4C4C4] dark:bg-slate-500"></div>
          </td>
          <td>
            <div class="h-2 bg-[#C4C4C4] dark:bg-slate-500"></div>
          </td>
          <td>
            <div class="h-2 bg-[#C4C4C4] dark:bg-slate-500"></div>
          </td>
          <td>
            <div class="h-2 bg-[#C4C4C4] dark:bg-slate-500"></div>
          </td>
          <td>
            <div class="h-2 bg-[#C4C4C4] dark:bg-slate-500"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  tableCount: {
    type: Number,
    default: 0,
  },
  rowCount: {
    type: Number,
    default: 6,
  },
});
const tableItems = computed(() => {
  return Array.from({ length: props.tableCount });
});
const rowItems = computed(() => {
  return Array.from({ length: props.rowCount });
});
</script>

<style lang="scss" scoped></style>
