<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :class="{ 'button--disabled': pizzaPrice === 0 }"
      :disabled="pizzaPrice === 0"
    >
      Готовьте!
    </button>
  </div>
</template>
<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    pizzaPrice: {
      type: Number,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped></style>
