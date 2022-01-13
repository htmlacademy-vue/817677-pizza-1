<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <AppButton
      type="button"
      :disabled="disabled"
      @click="$emit('add-pizza-to-cart')"
    >
      Готовьте!
    </AppButton>
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
