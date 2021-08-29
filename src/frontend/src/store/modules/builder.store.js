import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  UPDATE_PIZZA,
  UPDATE_INGREDIENT_COUNT,
  SET_INGREDIENTS,
} from "@/store/mutation-types";
import pizzaJson from "@/static/pizza.json";
import { normalizePizza, capitalize } from "@/common/helpers";
import { cloneDeep, uniqueId } from "lodash";
import Vue from "vue";

const entity = "builder";
const module = capitalize(entity);
const namespace = { entity, module };

const setupPizzaState = () => ({
  name: "",
  dough: {
    name: "Тонкое",
    value: "light",
    price: 300,
  },
  size: {
    name: "23 см",
    value: "normal",
    multiplier: 1,
  },
  sauce: {
    name: "Томатный",
    value: "tomato",
    price: 50,
  },
  ingredients: [],
  price: 0,
});

const setupState = () => ({
  pizza: setupPizzaState(),
  ingredients: [],
});

export default {
  namespaced: true,
  state: setupState(),
  getters: {},
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
    [SET_INGREDIENTS](state, ingredients) {
      Object.assign(state.ingredients, ingredients);
    },
    resetState(state) {
      Object.assign(state.pizza, setupPizzaState());
      // абсолютно не догоняю как обнулить count. После обнуленяи счетчик перестает работать.
      // Но начинает работать, если в input что то ввести.
      state.ingredients.forEach((ingredient) => {
        Vue.set(ingredient, "count", 0);
      });
    },
  },
  actions: {
    query({ commit }) {
      const data = normalizePizza(pizzaJson);

      commit(SET_INGREDIENTS, cloneDeep(data.ingredients));
      commit(
        SET_ENTITY,
        {
          ...namespace,
          value: data,
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
