import type { ItemCart, ShippingInfo } from "~/utils/products";
import { v4 as uuidv4 } from "uuid";

function roundTwoDecimals(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export const useCartStore = defineStore(
  "cart",
  () => {
    const items = ref([] as ItemCart[]);
    const shippingInfo = ref([] as ShippingInfo[]);
    const totalPrice = ref(0);
    const taxTotal = ref(0);
    const shippingTotal = ref(0);
    const grandTotal = ref(0);
    const addToCart = (product: any) => {
      const itemFound = items.value.find(
        (item: any) => item.sku === product.sku
      );
      if (itemFound) {
        itemFound.quantity += 1;
      } else {
        items.value.push({ ...product, quantity: 1 });
      }
      getTotalPrice();
    };
    function removeFromCart(item: any) {
      let itemFound = items.value.find((i) => item.sku == i.sku);
      if (itemFound) {
        items.value = items.value.filter((i) => item.sku !== i.sku);
      }
      getTotalPrice();
    }
    function removeAllFromCart() {
      items.value = [];
      totalPrice.value = 0;
    }
    const getTotalPrice = () => {
      totalPrice.value = 0;
      items.value.map((product) => {
        let quantity = product.quantity;
        let pricePerUnit = product.price;
        totalPrice.value += pricePerUnit * quantity;
        taxTotal.value = roundTwoDecimals(totalPrice.value * 0.05);
        grandTotal.value = roundTwoDecimals(totalPrice.value + taxTotal.value);
      });
    };
    function getItems() {
      return items.value;
    }
    function totalQuantity() {
      return items.value.reduce((acc, product) => acc + product.quantity, 0);
    }
    function isCartExist() {
      if (items.value.length > 0) {
        return true;
      } else {
        return false;
      }
    }
    function addShippingInfo(data: ShippingInfo) {
      shippingInfo.value.push({ ...data, id: uuidv4() });
    }
    function editShippingInfo(id: string, data: any) {
      shippingInfo.value = shippingInfo.value.filter((i) => id !== i.id);
      shippingInfo.value.push({ ...data, id: uuidv4() });
    }
    function removeShippingInfo(id: string) {
      shippingInfo.value = shippingInfo.value.filter((i) => id !== i.id);
    }
    function removeAllShippingInfo() {
      shippingInfo.value = [];
    }
    return {
      items,
      shippingInfo,
      totalPrice,
      taxTotal,
      shippingTotal,
      grandTotal,
      addToCart,
      removeFromCart,
      removeAllFromCart,
      getItems,
      getTotalPrice,
      totalQuantity,
      isCartExist,
      addShippingInfo,
      removeShippingInfo,
      editShippingInfo,
      removeAllShippingInfo,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  }
);
