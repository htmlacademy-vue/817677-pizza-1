import { shallowMount } from '@vue/test-utils';

import RadioButton from '@/common/components/RadioButton';

describe('RadioButton', () => {
  const propsData = {
    name: 'test',
    value: 'test',
    checked: false
  };

  const listeners = { change: null };

  let wrapper;

  const createComponent = options => {
    wrapper = shallowMount(RadioButton, options);
  };

  beforeEach(() => {
    listeners.change = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('raises the input event on change', async () => {
    createComponent({ propsData, listeners });
    await wrapper.find('input').trigger('change');
    expect(listeners.change).toHaveBeenCalled();
  });

  it('check input value: unchecked', async () => {
    propsData.checked = false;
    createComponent({ propsData, listeners });

    expect(wrapper.find('input').element.checked).toBeFalsy();
  });

  it('check input value: checked', async () => {
    propsData.checked = true;
    createComponent({ propsData, listeners });

    expect(wrapper.find('input').element.checked).toBeTruthy();
  });

  it('emitted input value', async () => {
    createComponent({ propsData, listeners });

    const input = wrapper.find('input');

    await input.trigger('change');

    expect(wrapper.emitted().change).toBeTruthy();
  });
});
