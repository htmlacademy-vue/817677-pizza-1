import resources from "@/common/enums/resources";
import {
  AuthApiService,
  ReadOnlyApiService,
  DoughApiService,
  IngredientsApiService,
  SaucesApiService,
  SizesApiService,
  AddressesApiService,
  OrdersApiService,
  MiscApiService,
} from "@/services/api.service";
import { SET_ENTITY } from "@/store/mutation-types";

export const getFileName = (filePath) =>
  filePath.split("/").pop().split(".")[0];

export const reverseObject = (object) =>
  Object.entries(object).reduce(
    (acc, [key, value]) => ({ ...acc, [value]: key }),
    {}
  );

export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const createResources = (notifier) => {
  return {
    [resources.USER]: new ReadOnlyApiService(resources.USER, notifier),
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.DOUGH]: new DoughApiService(notifier),
    [resources.INGREDIENTS]: new IngredientsApiService(notifier),
    [resources.SAUCES]: new SaucesApiService(notifier),
    [resources.SIZES]: new SizesApiService(notifier),
    [resources.ADDRESSES]: new AddressesApiService(notifier),
    [resources.ORDERS]: new OrdersApiService(notifier),
    [resources.MISC]: new MiscApiService(notifier),
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
  store.commit(SET_ENTITY, {
    module: "Auth",
    entity: "isAuthenticated",
    value: true,
  });
};
