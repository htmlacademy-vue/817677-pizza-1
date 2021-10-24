import {
  SET_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  UPDATE_MISC_COUNT,
  SET_ADDRESS,
  RESET_ADDRESS,
  RESET_STATE,
} from "@/store/mutation-types";
import { capitalize } from "@/common/helpers";
import Vue from "vue";
import { cloneDeep } from "lodash";

const entity = "cart";
const module = capitalize(entity);
const namespace = { entity, module };

export const setupState = () => ({
  mainOrder: [],
  misc: [],
  address: null,
});

export default {
  namespaced: true,
  state: setupState(),
  getters: {
    fullPrice({ mainOrder, misc }) {
      const priceMainOrder = mainOrder.reduce(
        (acc, { price, count }) => acc + price * count,
        0
      );
      const priceMisc = misc.reduce(
        (acc, { price, count }) => acc + price * count,
        0
      );

      return priceMainOrder + priceMisc;
    },
  },
  mutations: {
    [RESET_ADDRESS](state) {
      state.address = null;
    },
    [UPDATE_MISC_COUNT](state, { id, value }) {
      const foundOrder = state.misc.find((order) => order.id === id);

      foundOrder.count = value;
    },
    [SET_ADDRESS](state, address) {
      state.address = address;
    },
    [RESET_STATE](state) {
      Object.assign(state, {
        mainOrder: [],
        address: null,
      });
      state.misc.forEach((order) => {
        Vue.set(order, "count", 0);
      });
    },
  },
  actions: {
    async query({ commit }) {
      const misc = await this.$api.misc.query();

      commit(
        SET_ENTITY,
        {
          ...namespace,
          entity: "misc",
          value: misc,
        },
        { root: true }
      );
    },
    async post({ rootState }) {
      const { user } = rootState.Auth;
      const { misc, mainOrder: pizzas, address } = rootState.Cart;

      return await this.$api.orders.post({
        user,
        pizzas,
        misc,
        address,
      });
    },
    put({ commit }, pizza) {
      commit(
        UPDATE_ENTITY,
        {
          ...namespace,
          entity: "mainOrder",
          value: cloneDeep(pizza),
        },
        { root: true }
      );
    },
    delete({ commit }, id) {
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
