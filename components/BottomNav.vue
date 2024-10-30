<template>
  <div class="relative w-full lg:hidden md:hidden">
    <div class="fixed bottom-0 w-full h-14 z-50">
      <div class="grid grid-cols-10 w-full h-full items-center justify-center">
        <div
          class="col-span-5 flex h-full items-center justify-center bg-green-900 hover:bg-green-700"
          @click="cartStore.addToCart(productStore)"
        >
          <div class="flex gap-2">
            <Icon
              name="material-symbols:shopping-bag-outline"
              class="h-5 w-5 text-gray-50"
            />
            <p class="text-sm font-semibold text-gray-50">Add To Cart</p>
          </div>
        </div>
        <div
          class="col-span-5 flex h-full items-center justify-center bg-blue-800 hover:bg-blue-600"
          @click="buyNow(productStore)"
        >
          <div class="flex">
            <p class="text-sm font-semibold text-gray-50">Buy Now</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { productStore } from "#imports";

const cartStore = useCartStore();

function buyNow(value: any) {
  if (cartStore.items.length > 0) {
    navigateTo("/cart");
  } else {
    cartStore.addToCart(value);
    navigateTo("/cart");
  }
}
</script>

<style scoped></style>
