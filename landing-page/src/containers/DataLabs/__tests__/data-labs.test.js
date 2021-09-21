import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import preloadAll from 'jest-next-dynamic';

import { Header, Footer } from '../../components';

import DataLabs from '../DataLabs';
// import Introduction from '../Introduction';

describe('Testing DataLabs', () => {
  let wrapper;

  beforeAll(async () => {
    // Header and Footer included in DataLabs
    // And they are using dynamic import, see more in Header.js and Footer.js
    // So we need wait for it to load all before we can assert anything
    await preloadAll();
    wrapper = mount(<DataLabs />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<DataLabs />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a Header', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('should have a Footer', () => {
    expect(wrapper.find(Footer)).toHaveLength(1);
  });
});
