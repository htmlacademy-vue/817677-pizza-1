<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <BuilderDoughSelector
            :dough="builder.dough"
            :dough-type="pizza.dough.value"
            @change-dough="updatePizzaParams({ dough: $event })"
          />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector
            :sizes="builder.sizes"
            :selected-size="pizza.size.value"
            @change-size="updatePizzaParams({ size: $event })"
          />
        </div>

        <div class="content__ingridients">
          <BuilderIngredientsSelector
            :sauces="builder.sauces"
            :ingredients="ingredients"
            :selected-sauce="pizza.sauce.value"
            @change-sauce="updatePizzaParams({ sauce: $event })"
            @change-ingredient-count="changeIngredientCount"
          />
        </div>

        <div class="content__pizza">
          <TextField
            label-text="Название пиццы"
            name="pizza_name"
            placeholder="Введите название пиццы"
            v-model="pizza.name"
            @input="updatePizzaParams({ name: $event })"
          />

          <div class="content__constructor">
            <BuilderPizzaView
              :dough="pizza.dough.value"
              :size="pizza.size.value"
              :sauce="pizza.sauce.value"
              :ingredients="ingredients"
              @change-ingredient-count="changeIngredientCount"
            />
          </div>

          <BuilderPriceCounter
            :pizza-price="pizzaPrice"
            :disabled="disabledButton"
            @add-pizza-to-cart="addPizzaToCart"
          />
        </div>
      </div>
    </form>
  </main>
</template>
<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import TextField from "@/common/components/TextField";

import { mapState, mapMutations, mapActions } from "vuex";
import {
  UPDATE_PIZZA,
  ADD_MAIN_ORDER,
  UPDATE_INGREDIENT_COUNT,
} from "@/store/mutation-types";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    TextField,
  },
  computed: {
    ...mapState("Builder", ["builder", "pizza", "ingredients"]),
    doughPrice() {
      const { price } = this.builder.dough.find(
        (dough) => dough.value === this.pizza.dough.value
      );

      return price;
    },
    saucesPrice() {
      const { price } = this.builder.sauces.find(
        (sauce) => sauce.value === this.pizza.sauce.value
      );

      return price;
    },
    ingredientsPrice() {
      const { ingredients } = this.pizza;

      if (ingredients.length) {
        return ingredients.reduce((accumulator, ingredient) => {
          const { count, price } = ingredient;

          return accumulator + count * price;
        }, 0);
      }

      return 0;
    },
    sizePrice() {
      const size = this.builder.sizes.find(
        (size) => size.value === this.pizza.size.value
      );

      return size.multiplier;
    },
    pizzaPrice() {
      return (
        (this.doughPrice + this.saucesPrice + this.ingredientsPrice) *
        this.sizePrice
      );
    },
    disabledButton() {
      return this.ingredientsPrice === 0 || !this.pizza.name;
    },
  },
  mounted() {
    this[UPDATE_PIZZA]({ price: this.pizzaPrice });
  },
  watch: {
    pizzaPrice(newPrice, oldPrice) {
      if (newPrice === oldPrice) {
        return;
      }

      this[UPDATE_PIZZA]({ price: newPrice });
    },
  },
  methods: {
    ...mapActions("Builder", ["post", "put"]),
    ...mapMutations("Cart", [ADD_MAIN_ORDER]),
    ...mapMutations("Builder", [
      UPDATE_PIZZA,
      UPDATE_INGREDIENT_COUNT,
      "resetState",
    ]),
    changeIngredientCount(ingredient) {
      this.put(ingredient);
    },
    updatePizzaParams(params) {
      this[UPDATE_PIZZA](params);
    },
    addPizzaToCart() {
      this.post(this.pizza);
      this.resetState();
    },
  },
};
</script>
<style lang="scss" scoped></style>
