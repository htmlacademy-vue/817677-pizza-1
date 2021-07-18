<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :class="{ 'button--disabled': disabled }"
      :disabled="disabled"
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
    disabled: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped></style>
