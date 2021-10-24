import { shallowMount } from "@vue/test-utils";

import AppInput from "@/common/components/AppInput";

describe("AppInput", () => {
  const propsData = {
    labelText: "Label text",
    labelIsHidden: true,
    value: "some text",
    name: "test-name",
    type: "text",
    placeholder: "Some placeholder",
    errorText: "ooops...",
    required: true,
    classes: "",
  };
  const listeners = { input: null };

  // wrapper — тест-обёртка над компонентом.
  let wrapper;

  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = shallowMount(AppInput, options);
  };

  // Перед каждым тестом мы будем заменять click-событие свежей jest-функцией.
  // Это нужно для того, чтобы очистить информацию о вызове в предыдущих тестах.
  beforeEach(() => {
    listeners.input = jest.fn();
  });

  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("raises the input event on input", async () => {
    createComponent({ propsData, listeners });
    await wrapper.find("input").trigger("input");
    expect(listeners.input).toHaveBeenCalled();
  });

  it("input type is text", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");

    expect(input.attributes("type")).toBe("text");
  });

  it("input have new value", () => {
    const value = "some test value";

    propsData.value = value;
    createComponent({ propsData });
    const input = wrapper.find("input").element;

    expect(input.value).toBe(value);
  });

  it("input type is text", () => {
    const typeDate = "date";

    propsData.type = typeDate;
    createComponent({ propsData });
    const input = wrapper.find("input");

    expect(input.attributes("type")).toBe(typeDate);
  });

  it("has text error", () => {
    createComponent({ propsData });
    expect(wrapper.find(".text-field__text").exists()).toBeTruthy();
  });

  it("has not text error", () => {
    propsData.errorText = "";
    createComponent({ propsData });

    expect(wrapper.find(".text-field__text").exists()).toBeFalsy();
  });

  it("emitted input value", async () => {
    createComponent({ propsData, listeners });

    const value = "test";

    wrapper.vm.$emit("input", value);

    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input.length).toBe(1);
    expect(wrapper.emitted().input[0]).toEqual([value]);
  });
});
