<template>
  <div>
    <div class="card dark:border-slate-700 rounded-sm p-5">
      <div v-if="cart.items.length > 0">
        <h3
          class="text-slate-800 dark:text-slate-200 font-semibold text-base uppercase pb-3"
        >
          Your Orders
        </h3>
        <div v-for="(item, index) in cart.items" :key="index">
          <div class="card border dark:border-slate-700 rounded-sm p-5 mb-3">
            <div class="flex sm:flex-col md:flex-row gap-3 items-center">
              <div
                class="md:p-4 p-2 flex-none bg-slate-200 rounded md:h-20 md:w-20 w-16 h-16 rtl:ml-3"
              >
                <img
                  class="w-full h-full object-contain"
                  :src="item.images?.[0]"
                />
              </div>
              <div class="md:text-base text-sm">
                <p
                  class="text-slate-900 dark:text-slate-300 font-medium md:pb-2 pb-1 line-clamp-2"
                >
                  {{ item.name }}
                </p>
                <p class="text-slate-900 dark:text-slate-300 font-medium">
                  <span
                    class="text-slate-500 dark:text-slate-400 font-normal mr-1"
                  >
                    Brand:
                  </span>
                  {{ item.brand }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h3>No result's</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cart = useCartStore();
</script>

<style scoped></style>
