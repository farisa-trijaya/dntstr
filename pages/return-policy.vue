<template>
  <div
    v-if="themeStore.isLoading"
    class="relative bg-gray-50 dark:bg-slate-900"
  >
    <LoadingSkeleton :row-count="10" />
  </div>
  <div
    v-else
    class="w-full h-full bg-gray-100 dark:bg-slate-900 pb-2 lg:pb-6 md:pb-6 rounded-lg mt-16 md:mt-16 lg:mt-14"
  >
    <div
      class="flex w-full h-16 text-center items-center justify-center m-auto"
      style="
        background-image: url(https://dentestore.com/images/banner.jpg);
        padding: 90px 0 110px 0;
        background-attachment: fixed;
        background-size: 100%;
        position: relative;
      "
    >
      <h1 class="text-3xl text-gray-50 font-semibold uppercase">
        DELIVERY AND RETURN POLICY
      </h1>
    </div>
    <div class="flex flex-col w-full px-5 py-5 text-start space-y-3">
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          SHIPPING AND HANDLING
        </h4>
        <ul
          class="list-disc w-full space-y-1 text-sm text-black dark:text-gray-50 px-5"
        >
          <li>
            DENTESTORE.COM will NOT deal or provide any services or products to
            any of OFAC (Office of Foreign Assets Control) sanctions countries
            in accordance with the law of U.S.
          </li>
          <li>
            Multiple orders/shipments may result in multiple postings to the
            cardholder’s monthly statement.
          </li>
          <li>
            Orders placed before 05:00 PM Saturday to Wednesday will be
            processed next day and orders placed after 05:00 PM on Thursday will
            not be processed until Sunday mornings.
          </li>
          <li>
            The time duration for the shipment to reach the customer is 2-3
            working days.
          </li>
          <li>
            Delivery Method: we dispatch orders with one of the local courier
            services.
          </li>
          <li>Delivery Fees: standard price of USD 25/- up to 5 Kilogram.</li>
          <li>
            Extra shipping weight: USD 2/- extra charge for each additional
            kilogram above 5 kilograms.
          </li>
          <li>
            Please note that there may be added charges for heavy or hazardous
            items and extra delivery fees incurred due to incorrect/incomplete
            shipping addresses and second attempt charges will also apply.
          </li>
          <li>
            Extra delivery fees incurred due to delivering in remote areas.
          </li>
          <li>
            There will normally be no shipping charge for orders exceeding USD
            5,000.00/-
          </li>
          <li>
            Out of stock items on back order will be sent on to you
            automatically as soon as we receive them.
          </li>
          <li>No additional delivery charges apply to items on back order.</li>
        </ul>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          CANCELLATION
        </h4>
        <ul
          class="list-disc w-full space-y-1 text-sm text-black dark:text-gray-50 px-5"
        >
          <li>
            Customers can cancel their order within 24 hours via "My Orders"
            page; refunds will be made back to the payment solution used
            initially by the customer.
          </li>
          <li>
            If you change your mind after 24 hours and before receiving your
            item, just call us to cancel your order and we will process the
            refund along with any shipping fees applied.
          </li>
        </ul>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">RETRUN</h4>
        <ul
          class="list-disc w-full space-y-1 text-sm text-black dark:text-gray-50 px-5"
        >
          <li>
            Returns forms with full instructions are included with all
            deliveries.
          </li>
          <li>We accept returns within 48 hours of receipt.</li>
          <li>
            We can only accept returns of products that have not been tampered
            with, are sealed and remain in the original packaging.
          </li>
          <li>
            If the item you have received is damaged, defective or not as
            described on the website, we will endeavor to send you another or
            you will receive a full refund along with any shipping fees applied.
          </li>
          <li>
            If your purchase is counterfeit, you will receive a full refund
            along with any shipping fees paid.
          </li>
          <li>
            Damaged, defective, counterfeit or wrong products need to be
            reported within 24 hours of receipt to receive credit.
          </li>
          <li>
            Please note that we reserve the right to refuse any returned
            shipments if the product has been used or tampered with.
          </li>
          <li>
            All goods are to be returned at customers’ expense, except in the
            case of faulty, damaged, defective or not as described on the
            website.
          </li>
          <li>
            Refunds will be done only through the Original Mode of Payment.
          </li>
          <li>
            There are a few certain scenarios where it is difficult for us to
            support returns :
          </li>
          <ul
            class="list-decimal w-full space-y-1 text-sm text-black dark:text-gray-50 px-8"
          >
            <li>Return request is made outside the specified time frame.</li>
            <li>
              Product is used, damaged, or is not in the same condition as you
              received it.
            </li>
            <li>The product is not on the Non-Returnable list.</li>
            <li>Any consumable item which has been used or installed.</li>
            <li>
              Products with tampered, broken seal or missing serial numbers.
            </li>
            <li>
              Anything missing from the package you've received including
              leaflet, labels, catalogue, original packing, freebies and
              accessories.
            </li>
            <li>Badly stored products.</li>
          </ul>
        </ul>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          HOW CAN I RETURN AN UNWANTED ITEM?
        </h4>
        <ul
          class="list-decimal w-full space-y-1 text-sm text-black dark:text-gray-50 px-5"
        >
          <li>
            If all these conditions are met, please notify our support team.
          </li>
          <li>We’ll schedule a pick-up by one of our courier services.</li>
          <li>
            Please pack the item in its original state and packaging and hand
            over the package to the courier representative.
          </li>
          <li>
            Once we receive the returned item, we will inspect it and process
            the refund along with any shipping fees incurred if applicable.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const themeStore = useThemeSettings();

onNuxtReady(() => {
  themeStore.enableBottomNav();
  themeStore.closeCollapseMenu();
});
useHead({
  title: "Delivery And Return Policy",
});
</script>

<style scoped></style>
