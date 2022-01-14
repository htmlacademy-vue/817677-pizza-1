import { capitalize } from '../helpers';

describe('capitalize', () => {
  it('capitalize text', () => {
    expect(capitalize('capitalize')).toBe('Capitalize');
  });
});
