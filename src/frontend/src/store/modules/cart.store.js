import {
  SET_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  UPDATE_MAIN_ORDER,
  UPDATE_PRICE,
  UPDATE_SUB_ORDER_COUNT,
  SET_SUB_ORDER,
  SET_ADDRESS,
} from "@/store/mutation-types";
import miscJson from "@/static/misc.json";
import { normalizeMisc, capitalize } from "@/common/helpers";
import { uniqueId } from "lodash";
import Vue from "vue";

const entity = "cart";
const module = capitalize(entity);
const namespace = { entity, module };

const setupState = () => ({
  mainOrder: [],
  subOrder: [],
  address: {
    test: 1,
    tel: "",
    street: "",
    house: "",
    apartment: "",
  },
});

export default {
  namespaced: true,
  state: setupState(),
  getters: {
    fullPrice({ mainOrder, subOrder }) {
      const priceMainOrder = mainOrder.reduce(
        (acc, { price, count }) => acc + price * count,
        0
      );
      const priceSubOrder = subOrder.reduce(
        (acc, { price, count }) => acc + price * count,
        0
      );

      return priceMainOrder + priceSubOrder;
    },
  },
  mutations: {
    [UPDATE_MAIN_ORDER](state, pizza) {
      const ingredients = pizza.ingredients.filter(
        (ingredient) => ingredient.count > 0
      );

      state.mainOrder.push({
        ...pizza,
        id: uniqueId(),
        ingredients,
      });
    },
    [SET_SUB_ORDER](state, data) {
      state.subOrder = data;
    },
    [UPDATE_PRICE](state, data) {
      state.price = data;
    },
    [UPDATE_SUB_ORDER_COUNT](state, { id, value }) {
      const foundOrder = state.subOrder.find((order) => order.id === id);

      foundOrder.count = value;
    },
    [SET_ADDRESS](state, address) {
      state.address = { ...state.address, ...address };
    },
    resetState(state) {
      Object.assign(state, setupState());
      state.subOrder.forEach((order) => {
        Vue.set(order, "count", 0);
      });
    },
  },
  actions: {
    query({ commit }) {
      const data = normalizeMisc(miscJson);

      commit(SET_SUB_ORDER, data);
      commit(
        SET_ENTITY,
        {
          ...namespace,
          entity: "misc",
          value: data,
        },
        { root: true }
      );
    },
    put({ commit }, pizza) {
      commit(
        UPDATE_ENTITY,
        {
          ...namespace,
          entity: "mainOrder",
          value: pizza,
        },
        { root: true }
      );
    },
    delete({ commit }, { id }) {
      commit(
        DELETE_ENTITY,
        {
          ...namespace,
          entity: "mainOrder",
          id,
        },
        { root: true }
      );
    },
  },
};
