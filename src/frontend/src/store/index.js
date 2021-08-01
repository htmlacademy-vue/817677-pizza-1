import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import { SET_ENTITY } from "@/store/mutation-types";

Vue.use(Vuex);

const setupState = () => ({});

const state = setupState();

const actions = {
  async init({ dispatch }) {
    dispatch("Builder/query");
  },
};

const mutations = {
  [SET_ENTITY](state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules,
});
