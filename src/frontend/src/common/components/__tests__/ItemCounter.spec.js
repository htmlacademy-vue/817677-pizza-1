import { shallowMount } from "@vue/test-utils";

import ItemCounter from "@/common/components/ItemCounter";

describe("ItemCounter", () => {
  const propsData = {
    counterClasses: "",
    counterValue: 3,
    maxCounterValue: 5,
  };
  const listeners = { click: null };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(ItemCounter, options);
  };

  beforeEach(() => {
    listeners.input = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("value before click on plus", async () => {
    createComponent({ propsData });
    await wrapper.find("[data-test='plus-btn']").trigger("click");

    expect(wrapper.find("input").element.value).toBe("4");
  });

  it("value before click on minus", async () => {
    createComponent({ propsData });
    await wrapper.find("[data-test='minus-btn']").trigger("click");

    expect(wrapper.find("input").element.value).toBe("2");
  });

  it("plus is disabled", async () => {
    propsData.counterValue = 5;
    createComponent({ propsData });

    const plus = wrapper.find("[data-test='plus-btn']");
    const input = wrapper.find("input");

    await wrapper.find("[data-test='plus-btn']").trigger("click");

    expect(plus.attributes("disabled")).toBeTruthy();
    expect(input.element.value).toBe("5");
  });

  it("minus is disabled", async () => {
    propsData.counterValue = 0;
    createComponent({ propsData });

    const minus = wrapper.find("[data-test='minus-btn']");
    const input = wrapper.find("input");

    await minus.trigger("click");

    expect(minus.attributes("disabled")).toBeTruthy();
    expect(input.element.value).toBe("0");
  });
});
