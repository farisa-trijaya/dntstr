<template>
  <div class="inline-block">
    <div
      v-for="i in maxStars"
      :key="i"
      @click="setRating(i)"
      @mouseover="hoverRating(i)"
      @mouseleave="resetHover"
      :class="[
        'inline-block text-lg cursor-pointer m-0.5 text-yellow-100',
        i <= (isHovered ? hoverValue : rating) ? 'text-yellow-600' : '',
      ]"
    >
      ★
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["ratingData"]);
const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  maxStars: {
    type: Number,
    default: 5,
  },
});
const rating = ref(props.value);
const isHovered = ref(false);
const hoverValue = ref(0);

const setRating = (newRating: number) => {
  rating.value = newRating;
  emit("ratingData", newRating);
};
const hoverRating = (value: number) => {
  if (isHovered.value) {
    hoverValue.value = value;
  }
};
const resetHover = () => {
  hoverValue.value = 0;
};
</script>

<style scoped></style>
