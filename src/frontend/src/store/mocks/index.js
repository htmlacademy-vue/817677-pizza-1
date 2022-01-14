import { cloneDeep } from 'lodash';
import { mutations } from '@/store';
import VuexPlugins from '@/plugins/vuexPlugins';
import modules from '@/store/modules';
import Vuex from 'vuex';

const setupState = () => ({});

export const generateMockStore = actions => {
  const modulesCopy = cloneDeep(modules);
  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }

  return new Vuex.Store({
    state: setupState(),
    mutations,
    modules: modulesCopy,
    plugins: [VuexPlugins]
  });
};
