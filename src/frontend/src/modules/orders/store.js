import { SET_ENTITY, DELETE_ENTITY } from '@/store/mutation-types';
import { capitalize } from '@/common/helpers';
import { cloneDeep } from 'lodash';

const entity = 'orders';
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    orders: []
  },
  getters: {},
  mutations: {},
  actions: {
    async query({ commit }) {
      const orders = await this.$api.orders.query();

      commit(
        SET_ENTITY,
        {
          ...namespace,
          value: orders
        },
        { root: true }
      );
    },
    async put({ commit }, { mainOrder, misc, address }) {
      commit(
        SET_ENTITY,
        {
          module: 'Cart',
          entity: 'mainOrder',
          value: cloneDeep(mainOrder)
        },
        { root: true }
      );
      commit(
        SET_ENTITY,
        {
          module: 'Cart',
          entity: 'misc',
          value: cloneDeep(misc)
        },
        { root: true }
      );
      commit(
        SET_ENTITY,
        {
          module: 'Cart',
          entity: 'address',
          value: cloneDeep(address)
        },
        { root: true }
      );
    },
    async delete({ commit }, id) {
      await this.$api.orders.delete(id);
      await commit(
        DELETE_ENTITY,
        {
          ...namespace,
          id
        },
        { root: true }
      );
    }
  }
};
