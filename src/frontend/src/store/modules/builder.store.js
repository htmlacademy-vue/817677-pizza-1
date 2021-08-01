import { SET_ENTITY, UPDATE_PIZZA } from "@/store/mutation-types";
import pizzaJson from "@/static/pizza.json";
import { normalizePizza, capitalize } from "@/common/helpers";

const entity = "builder";
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    pizza: {
      name: "",
      dough: "light",
      size: "normal",
      sauce: "tomato",
      ingredients: [],
    },
  },
  getters: {},
  mutations: {
    [UPDATE_PIZZA](state, pizza) {
      state.pizza = { ...state.pizza, ...pizza };
    },
  },
  actions: {
    query({ commit }) {
      const data = normalizePizza(pizzaJson);

      commit(UPDATE_PIZZA, { ingredients: data.ingredients });

      commit(
        SET_ENTITY,
        {
          ...namespace,
          value: data,
        },
        { root: true }
      );
    },
  },
};
