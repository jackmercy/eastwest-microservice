import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import preloadAll from 'jest-next-dynamic';

import Support from '../Support';

describe('Testing Support', () => {
  beforeAll(async () => {
    // Header and Footer included in HomePage
    // And they are using dynamic import, see more in Header.js and Footer.js
    // So we need wait for it to load all before we can assert anything
    await preloadAll();
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Support />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
