<template>
  <Swiper
    :style="{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
    }"
    :loop="true"
    :spaceBetween="10"
    :navigation="false"
    :thumbs="{ swiper: thumbsSwiper }"
    :modules="[SwiperNavigation, SwiperThumbs]"
  >
    <SwiperSlide
      v-for="(item, i) in props.product"
      :key="i"
      class="h-96 w-96 cursor-pointer"
    >
      <LazyNuxtImg
        class="h-full w-full object-contain rounded-md transition-all duration-300 group-hover:scale-105"
        :src="item"
        alt=""
      />
    </SwiperSlide>
  </Swiper>
  <div class="flex mt-2">
    <Swiper
      @swiper="setThumbsSwiper"
      :loop="true"
      :spaceBetween="10"
      :slidesPerView="4"
      :freeMode="true"
      :watchSlidesProgress="true"
      :modules="[SwiperNavigation, SwiperThumbs]"
      class="flex w-full"
    >
      <SwiperSlide
        v-for="(item, i) in props.product"
        :key="i"
        class="h-[90px] w-[90px] cursor-pointer"
      >
        <LazyNuxtImg
          class="h-full w-full object-cover rounded-lg"
          :src="item"
          alt="."
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
const thumbsSwiper = ref(null);

const props = defineProps({
  product: Object,
  id: String,
});
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};
</script>

<style lang="scss" scoped></style>
