<template>
  <ul class="cart-list sheet">
    <li
      v-for="pizza in mainOrder"
      :key="pizza.id"
      class="cart-list__item"
    >
      <Product
        :pizza="pizza"
        classes="cart-list__product"
      />

      <ItemCounter
        counter-classes="additional-list__counter"
        counter-color="orange"
        :counter-value="pizza.count"
        @change-counter-value="
          ($event) =>
            $emit('change-pizza-count', {
              ...pizza,
              count: $event,
            })
        "
      />

      <div class="cart-list__price">
        <b>{{ pizza.price }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          class="cart-list__edit"
          @click="changePizza(pizza)"
        >
          Изменить
        </button>
        <button
          type="button"
          class="cart-list__edit"
          @click="deletePizza(pizza)"
        >
          Удалить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import Product from '@/common/components/Product';
import { mapActions, mapMutations } from 'vuex';
import { UPDATE_PIZZA, SET_INGREDIENTS } from '@/store/mutation-types';

export default {
  name: 'CartMainList',

  components: {
    Product
  },

  props: {
    mainOrder: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    ...mapActions('Cart', ['delete']),
    ...mapMutations('Builder', [UPDATE_PIZZA, SET_INGREDIENTS]),

    changePizza(pizza) {
      this[UPDATE_PIZZA](pizza);
      this[SET_INGREDIENTS](pizza.ingredients);
      this.$router.push({ name: 'Builder' });
    },

    deletePizza(pizza) {
      this.delete(pizza.id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/cart-list.scss";
</style>
