import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  UPDATE_PIZZA,
  UPDATE_INGREDIENT_COUNT,
  SET_INGREDIENTS,
  SET_PIZZA_STATE,
} from "@/store/mutation-types";
import pizzaJson from "@/static/pizza.json";
import { normalizePizza, capitalize } from "@/common/helpers";
import { cloneDeep, uniqueId } from "lodash";
import Vue from "vue";

const entity = "builder";
const module = capitalize(entity);
const namespace = { entity, module };

const setupPizzaState = ({ dough, size, sauce }) => ({
  name: "",
  dough,
  size,
  sauce,
  ingredients: [],
});

const setupState = () => ({
  pizza: setupPizzaState({
    dough: {},
    size: {},
    sauce: {},
  }),
  ingredients: [],
});

export default {
  namespaced: true,
  state: setupState(),
  getters: {
    pizzaPrice({ pizza }, getters) {
      const { dough, sauce, size } = pizza;

      return (
        (dough.price + sauce.price + getters.ingredientsPrice) * size.multiplier
      );
    },
    ingredientsPrice({ pizza }) {
      const { ingredients } = pizza;

      if (ingredients.length) {
        return ingredients.reduce((accumulator, ingredient) => {
          const { count, price } = ingredient;

          return accumulator + count * price;
        }, 0);
      }

      return 0;
    },
  },
  mutations: {
    [UPDATE_PIZZA](state, pizza) {
      state.pizza = { ...state.pizza, ...pizza };
    },
    [UPDATE_INGREDIENT_COUNT](state, ingredient) {
      const index = state.pizza.ingredients.findIndex(
        ({ id }) => id === ingredient.id
      );

      if (~index) {
        state.pizza.ingredients.splice(index, 1, ingredient);
      } else {
        state.pizza.ingredients.push(ingredient);
      }
    },
    [SET_PIZZA_STATE](state, data) {
      state.pizza = { ...state.pizza, ...data };
    },
    [SET_INGREDIENTS](state, ingredients) {
      Object.assign(state.ingredients, ingredients);
    },
    resetState(state) {
      Object.assign(
        state.pizza,
        setupPizzaState({
          size: state.builder.sizes[1],
          dough: state.builder.dough[0],
          sauce: state.builder.sauces[0],
        })
      );
      state.ingredients.forEach((ingredient) => {
        Vue.set(ingredient, "count", 0);
      });
    },
  },
  actions: {
    query({ commit }) {
      const { ingredients, sizes, dough, sauces } = normalizePizza(pizzaJson);

      commit(SET_PIZZA_STATE, {
        size: sizes[1],
        dough: dough[0],
        sauce: sauces[0],
      });
      commit(SET_INGREDIENTS, cloneDeep(ingredients));
      commit(
        SET_ENTITY,
        {
          ...namespace,
          value: {
            ingredients,
            sizes,
            dough,
            sauces,
          },
        },
        { root: true }
      );
    },
    post({ commit }, pizza) {
      const data = cloneDeep(pizza);
      commit(
        ADD_ENTITY,
        {
          module: "Cart",
          entity: "mainOrder",
          value: {
            id: uniqueId(),
            count: 1,
            ...data,
          },
        },
        { root: true }
      );
    },
    put({ commit }, ingredient) {
      commit(UPDATE_INGREDIENT_COUNT, ingredient);
      commit(
        UPDATE_ENTITY,
        {
          ...namespace,
          entity: "ingredients",
          value: ingredient,
        },
        { root: true }
      );
    },
  },
};
