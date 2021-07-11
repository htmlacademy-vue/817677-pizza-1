<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <BuilderDoughSelector
            :dough="pizzaData.dough"
            :dough-type="pizza.dough"
            @change-dough="pizza.dough = $event"
          />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector
            :sizes="pizzaData.sizes"
            :selected-size="pizza.size"
            @change-size="pizza.size = $event"
          />
        </div>

        <div class="content__ingridients">
          <BuilderIngredientsSelector
            :sauces="pizzaData.sauces"
            :ingredients="pizzaData.ingredients"
            :selected-sauce="pizza.sauce"
            @change-sauce="pizza.sauce = $event"
            @change-ingredient-count="addIngredient"
          />
        </div>

        <div class="content__pizza">
          <TextField
            label-text="Название пиццы"
            name="pizza_name"
            placeholder="Введите название пиццы"
            :value="pizza.name"
            @input="pizza.name = $event"
          />

          <div class="content__constructor">
            <BuilderPizzaView
              :dough="pizza.dough"
              :size="pizza.size"
              :sauce="pizza.sauce"
              :ingredients="pizza.ingredients"
            />
          </div>

          <BuilderPriceCounter :pizza-price="pizzaPrice" />
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

import pizza from "@/static/pizza.json";
import { normalizePizza } from "@/common/helpers";

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
  data() {
    return {
      pizzaData: normalizePizza(pizza),
      pizza: {
        name: "",
        dough: "light",
        size: "normal",
        sauce: "tomato",
        ingredients: {},
      },
    };
  },
  computed: {
    doughPrice() {
      console.log(this.pizzaData);
      const { price } = this.pizzaData.dough.find(
        (dough) => dough.value === this.pizza.dough
      );

      return price;
    },
    saucesPrice() {
      const { price } = this.pizzaData.sauces.find(
        (sauce) => sauce.value === this.pizza.sauce
      );

      return price;
    },
    ingredientsPrice() {
      const ingredients = Object.keys(this.pizza.ingredients);

      if (ingredients.length) {
        return ingredients.reduce((result, ingredient) => {
          const { count, price } = this.pizza.ingredients[ingredient];

          return result + count * price;
        }, 0);
      }

      return 0;
    },
    sizePrice() {
      const { sizes } = this.pizzaData;
      const size = sizes.find((size) => size.value === this.pizza.size);

      return size.multiplier;
    },
    pizzaPrice() {
      return (
        this.doughPrice * this.sizePrice +
        this.saucesPrice +
        this.ingredientsPrice
      );
    },
  },
  methods: {
    addIngredient(ingredient) {
      const [key] = Object.keys(ingredient);
      const [{ count, price }] = Object.values(ingredient);

      if (count === 0) {
        this.$delete(this.pizza.ingredients, key);
        return;
      }

      this.$set(this.pizza.ingredients, [key], {
        count,
        price,
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
