<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <BuilderDoughSelector
            :dough="builder.dough"
            :dough-type="pizza.dough"
            @change-dough="updatePizzaParams({ dough: $event })"
          />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector
            :sizes="builder.sizes"
            :selected-size="pizza.size"
            @change-size="updatePizzaParams({ size: $event })"
          />
        </div>

        <div class="content__ingridients">
          <BuilderIngredientsSelector
            :sauces="builder.sauces"
            :ingredients="pizza.ingredients"
            :selected-sauce="pizza.sauce"
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
              :dough="pizza.dough"
              :size="pizza.size"
              :sauce="pizza.sauce"
              :ingredients="pizza.ingredients"
              @change-ingredient-count="changeIngredientCount"
            />
          </div>

          <BuilderPriceCounter
            :pizza-price="pizzaPrice"
            :disabled="disabledButton"
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

import { mapState, mapMutations } from "vuex";
import { UPDATE_PIZZA } from "@/store/mutation-types";

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
    ...mapState("Builder", ["builder", "pizza"]),
    doughPrice() {
      const { price } = this.builder.dough.find(
        (dough) => dough.value === this.pizza.dough
      );

      return price;
    },
    saucesPrice() {
      const { price } = this.builder.sauces.find(
        (sauce) => sauce.value === this.pizza.sauce
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
      const { sizes } = this.builder;
      const size = sizes.find((size) => size.value === this.pizza.size);

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
  methods: {
    ...mapMutations("Builder", [UPDATE_PIZZA]),
    changeIngredientCount(ingredient) {
      const ingredients = this.pizza.ingredients.map(
        ({ value, count, price, name }) => {
          let innerCount = count;

          if (ingredient.value === value) {
            innerCount = ingredient.count;
          }

          return {
            name,
            value,
            count: innerCount,
            price,
          };
        }
      );

      this.updatePizzaParams({ ingredients });
    },
    updatePizzaParams(params) {
      this[UPDATE_PIZZA](params);
    },
  },
};
</script>
<style lang="scss" scoped></style>
