import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  UPDATE_PIZZA,
  SET_INGREDIENTS,
  RESET_STATE,
} from "@/store/mutation-types";
import { capitalize } from "@/common/helpers";
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
  builder: {
    dough: [],
    sizes: [],
    sauces: [],
    ingredients: [],
  },
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
    ingredientsPrice({ ingredients }) {
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
    [SET_INGREDIENTS](state, ingredients) {
      state.ingredients = ingredients;
    },
    [RESET_STATE](state) {
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
    async query({ commit }) {
      const [ingredients, sizes, dough, sauces] = await Promise.all([
        this.$api.ingredients.query(),
        this.$api.sizes.query(),
        this.$api.dough.query(),
        this.$api.sauces.query(),
      ]);

      commit(UPDATE_PIZZA, {
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
    post({ commit, rootState }, pizza) {
      const data = cloneDeep(pizza);
      const ingredients = cloneDeep(rootState.Builder.ingredients);

      commit(
        ADD_ENTITY,
        {
          module: "Cart",
          entity: "mainOrder",
          value: {
            ...data,
            id: uniqueId(),
            count: 1,
            ingredients,
          },
        },
        { root: true }
      );
    },
    put({ commit }, ingredient) {
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
