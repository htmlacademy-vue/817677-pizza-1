import { SET_ENTITY, UPDATE_AUTH } from "@/store/mutation-types";
import { capitalize } from "@/common/helpers";

const entity = "auth";
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    isAuth: false,
  },
  getters: {},
  mutations: {
    [UPDATE_AUTH](state, isAuth) {
      state.isAuth = isAuth;
    },
  },
  actions: {
    query({ commit }) {
      //  Заглушка
      const authToken = "123";
      const isAuth = authToken.length > 0;

      commit(UPDATE_AUTH, isAuth);

      commit(
        SET_ENTITY,
        {
          ...namespace,
          value: {
            authToken,
          },
        },
        { root: true }
      );
    },
  },
};
