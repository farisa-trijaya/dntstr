<template>
  <div class="flex space-x-4 rtl:space-x-reverse items-center">
    <div
      class="flex-1 h-8 flex border border-1 border-slate-900 delay-150 ease-in-out dark:border-slate-600 divide-x-[1px] rtl:divide-x-reverse text-sm font-normal divide-slate-900 dark:divide-slate-600 rounded"
    >
      <ClientOnly>
        <button
          @click="decrement"
          :disabled="cartProduct.quantity === 1"
          type="button"
          class="flex-none px-2 dark:text-white text-slate-900 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="ic:baseline-minus" />
        </button>
      </ClientOnly>
      <div
        class="flex-1 w-[62px] text-center text-slate-900 dark:text-slate-300 flex items-center justify-center"
      >
        {{ cartProduct.quantity }}
      </div>
      <ClientOnly>
        <button
          @click="increment"
          :disabled="cartProduct.quantity === 10"
          type="button"
          class="flex-none px-2 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900 hover:bg-slate-900 hover:text-white dark:text-white dark:hover:bg-slate-700 rtl:dark:hover:rounded-l ltr:dark:hover:rounded-r"
        >
          <Icon name="ic:outline-plus" />
        </button>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
const increment = () => cartStore.addToCart(cartProduct);
const decrement = () => {
  cartProduct?.quantity === 1 ? "" : cartProduct.quantity--;
  cartStore.getTotalPrice();
};

const cartProduct = cartStore.items.find(
  (item) => item.sku == props.product.sku
) as ItemCart;
</script>

<style scoped></style>
