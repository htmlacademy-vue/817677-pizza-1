<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <template v-if="Object.values(builder).every((item) => item.length)">
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
            <AppInput
              v-model="pizza.name"
              label-text="Название пиццы"
              name="pizza_name"
              placeholder="Введите название пиццы"
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
        </template>
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

import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { UPDATE_PIZZA, RESET_STATE } from "@/store/mutation-types";

export default {
  name: "Builder",
  layout: "AppLayoutDefault",

  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },

  computed: {
    ...mapState("Builder", ["builder", "pizza", "ingredients"]),
    ...mapGetters("Builder", ["pizzaPrice", "ingredientsPrice"]),

    disabledButton() {
      return this.ingredientsPrice === 0 || !this.pizza.name;
    },
  },

  methods: {
    ...mapActions("Cart", {
      updatePizza: "put",
    }),
    ...mapActions("Builder", ["post", "put"]),
    ...mapMutations("Builder", [UPDATE_PIZZA, RESET_STATE]),

    changeIngredientCount(ingredient) {
      this.put(ingredient);
    },

    updatePizzaParams(params) {
      this[UPDATE_PIZZA](params);
    },

    addPizzaToCart() {
      if (this.pizza.id) {
        this.updatePizza({
          ...this.pizza,
          price: this.pizzaPrice,
        });
      } else {
        this.post({
          ...this.pizza,
          price: this.pizzaPrice,
        });
      }
      this[RESET_STATE]();
    },
  },
};
</script>
<style lang="scss" scoped></style>
