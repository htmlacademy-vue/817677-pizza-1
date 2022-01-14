import { reverseObject } from '../helpers';

describe('reverseObject', () => {
  it('object is reversed', () => {
    const testObject = {
      option1: 'value1',
      option2: 'value2'
    };

    const reversedObject = {
      value1: 'option1',
      value2: 'option2'
    };

    expect(reverseObject(testObject)).toEqual(reversedObject);
  });
});
