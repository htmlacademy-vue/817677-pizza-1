import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutation-types";
import { capitalize } from "@/common/helpers";

const entity = "profile";
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    addresses: [],
  },
  getters: {},
  actions: {
    async query({ commit }) {
      const addresses = await this.$api.addresses.query();

      commit(
        SET_ENTITY,
        {
          ...namespace,
          entity: "addresses",
          value: addresses,
        },
        { root: true }
      );
    },
    async post({ commit }, address) {
      const newAddress = await this.$api.addresses.post(address);

      commit(
        ADD_ENTITY,
        {
          ...namespace,
          entity: "addresses",
          value: newAddress,
        },
        { root: true }
      );
    },
    async put({ commit }, address) {
      this.$api.addresses.put(address).then(() => {
        commit(
          UPDATE_ENTITY,
          {
            ...namespace,
            entity: "addresses",
            value: address,
          },
          { root: true }
        );
      });
    },
    async delete({ commit }, addressId) {
      this.$api.addresses.delete(addressId).then(() => {
        commit(
          DELETE_ENTITY,
          {
            ...namespace,
            entity: "addresses",
            value: addressId,
          },
          { root: true }
        );
      });
    },
  },
};
