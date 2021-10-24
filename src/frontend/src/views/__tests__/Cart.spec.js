import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import {
  ADD_ENTITY,
  SET_ENTITY,
  UPDATE_MISC_COUNT,
  RESET_STATE,
} from "@/store/mutation-types";
import mainOrderJson from "@/__tests__/fixtures/mainOrder.json";
import ItemCounter from "@/common/components/ItemCounter";
import AppInput from "@/common/components/AppInput";
import misc from "@/static/misc.json";
import Cart from "@/views/Cart.vue";
import Vuex from "vuex";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();

localVue.component("ItemCounter", ItemCounter);
localVue.component("AppInput", AppInput);

// Добавляем в него Vuex.
localVue.use(Vuex);

const createCart = (store) => {
  store.commit(ADD_ENTITY, {
    module: "Cart",
    entity: "mainOrder",
    value: mainOrderJson[0],
  });
  store.commit(
    SET_ENTITY,
    {
      module: "Cart",
      entity: "misc",
      value: misc.map((miscItem) => {
        return {
          ...miscItem,
          count: 0,
        };
      }),
    },
    { root: true }
  );
};

describe("Cart", () => {
  // Заглушка вместо реального router-view
  const stubs = ["router-link"];

  // Переменные, которые будут переопределяться заново для каждого теста
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Cart, options);
  };

  // Перед каждым тестом заменяем хранилище на новое,
  // а также его действия свежими jest-функциями.
  beforeEach(() => {
    actions = {
      Cart: {
        query: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
      },
      Profile: {
        query: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  // Удаляем тест-обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("displays form", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.find(".layout-form").exists()).toBeTruthy();
  });

  it("displays empty state", () => {
    createComponent({ localVue, store, stubs });

    expect(wrapper.find(".cart__empty").exists()).toBeTruthy();
    expect(wrapper.find(".cart__additional").exists()).toBeFalsy();
    expect(wrapper.find(".cart__form").exists()).toBeFalsy();
    expect(wrapper.find(".footer").exists()).toBeFalsy();
  });

  it("displays cart with orders", () => {
    createCart(store);
    createComponent({ localVue, store, stubs });

    expect(wrapper.find(".cart__empty").exists()).toBeFalsy();
    expect(wrapper.find(".cart__additional").exists()).toBeTruthy();
    expect(wrapper.find(".cart__form").exists()).toBeTruthy();
    expect(wrapper.find(".footer").exists()).toBeTruthy();
  });

  it("change pizza count", async () => {
    createCart(store);
    createComponent({ localVue, store, stubs });

    const cartListItem = wrapper.find(".cart-list__item");
    const plusBtn = cartListItem.find("[data-test='plus-btn']");
    const minusBtn = cartListItem.find("[data-test='minus-btn']");

    await plusBtn.trigger("click");
    expect(actions.Cart.put).toHaveBeenCalled();

    await minusBtn.trigger("click");
    expect(actions.Cart.put).toHaveBeenCalled();
  });

  // it("change pizza count: delete if one pizza", async () => {
  //   createCart(store);
  //   createComponent({ localVue, store, stubs });
  //
  //   const cartListItem = wrapper.find(".cart-list__item");
  //   const minusBtn = cartListItem.find("[data-test='minus-btn']");
  //
  //   await minusBtn.trigger("click");
  //   expect(actions.Cart.delete).toHaveBeenCalled();
  // });

  it("change misc count", async () => {
    createCart(store);
    createComponent({ localVue, store, stubs });

    const spyOnMutation = jest.spyOn(wrapper.vm, UPDATE_MISC_COUNT);
    const additionalListItem = wrapper.find(".additional-list__item");
    const plusBtn = additionalListItem.find("[data-test='plus-btn']");
    const minusBtn = additionalListItem.find("[data-test='minus-btn']");

    await plusBtn.trigger("click");
    expect(spyOnMutation).toHaveBeenCalled();

    await minusBtn.trigger("click");
    expect(spyOnMutation).toHaveBeenCalled();
  });

  it("place an order", async () => {
    createCart(store);
    createComponent({ localVue, store, stubs });

    // const spyOnMutation = jest.spyOn(wrapper.vm, RESET_STATE);
    const submit = wrapper.find(".footer__submit [type='submit']");
    await submit.trigger("click");

    expect(actions.Cart.post).toHaveBeenCalled();
    // expect(spyOnMutation).toHaveBeenCalled();
    // expect(wrapper.find(".layout-form").exists()).toBeFalsy();
  });
});

// Список элементов для тестирования
/*
<form v-if="!showPopup" className="layout-form">
<div v-if="!hasOrders" className="sheet cart__empty">
<div v-if="hasOrders" class="cart__additional">
<div v-if="hasOrders" class="cart__form">
<section v-if="hasOrders" class="footer">
@change-pizza-count="changePizzaCount"
@change-misc-count="changeMiscCount"
@change-address="changeAddress"
@click.prevent="placeAnOrder"
...mapActions("Cart", ["post", "put", "delete"]),
...mapMutations("Cart", [UPDATE_MISC_COUNT, SET_ADDRESS, RESET_STATE]),
 */

// Данные из тест-хранилища
/*
...mapState("Cart", ["mainOrder", "misc", "address"]),
...mapState("Profile", ["addresses"]),
...mapGetters("Cart", ["fullPrice"]),
...mapState(["Auth"])
 */
