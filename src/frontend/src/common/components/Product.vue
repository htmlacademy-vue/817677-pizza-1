<template>
  <div
    class="product"
    :class="classes"
  >
    <img
      src="@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="pizza.name"
    />
    <div class="product__text">
      <h2>{{ pizza.name }}</h2>
      <ul>
        <li>
          {{ pizza.size.name }}, на {{ normalizeDoughType(pizza.dough) }} тесте
        </li>
        <li>Соус: {{ pizza.sauce.name.toLowerCase() }}</li>
        <li>Начинка: {{ ingredients(pizza) }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',

  props: {
    pizza: {
      type: Object,
      required: true
    },

    classes: {
      type: [Array, String],
      default: ''
    }
  },

  methods: {
    normalizeDoughType({ name }) {
      return name.toLowerCase().substring(0, name.length - 1) + 'м';
    },

    ingredients(pizza) {
      return pizza.ingredients
        .filter(ingredient => ingredient.count > 0)
        .map(ingredient => ingredient.name.toLowerCase())
        .join(', ');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/product.scss";
</style>
