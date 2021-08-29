<template>
  <ul class="cart-list sheet">
    <li v-for="pizza in mainOrder" :key="pizza.id" class="cart-list__item">
      <div class="product cart-list__product">
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
              {{ pizza.size.name }}, на
              {{ pizza.dough.name.toLowerCase() }} тесте
            </li>
            <li>Соус: {{ pizza.sauce.name.toLowerCase() }}</li>
            <li>Начинка: {{ ingredients(pizza) }}</li>
          </ul>
        </div>
      </div>

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
import ItemCounter from "@/common/components/ItemCounter";
import { mapActions, mapMutations } from "vuex";
import { UPDATE_PIZZA } from "@/store/mutation-types";

export default {
  name: "CartMainList",
  components: {
    ItemCounter,
  },
  props: {
    mainOrder: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapActions("Cart", ["delete"]),
    ...mapMutations("Builder", [UPDATE_PIZZA]),
    ingredients(pizza) {
      return pizza.ingredients
        .map((ingredient) => ingredient.name.toLowerCase())
        .join(", ");
    },
    changePizza(pizza) {
      this[UPDATE_PIZZA](pizza);
      this.$router.push({ name: "IndexHome" });
    },
    deletePizza(pizza) {
      this.delete(pizza.id);
    },
  },
};
</script>

<style scoped></style>
