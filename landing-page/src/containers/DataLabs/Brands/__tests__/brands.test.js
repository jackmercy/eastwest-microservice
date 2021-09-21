import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import preloadAll from 'jest-next-dynamic';

import { JoinUs, Teaser, Become, HowItWorks } from '../../components';
import Brands from '../Brands';
import AboutProduct from '../AboutProduct';
import Reviews from '../Reviews';

describe('Testing DataLabs > Brands', () => {
  let wrapper;

  beforeAll(async () => {
    // Teaser included in Brands
    // And they are using dynamic import, see Teaser.js
    // So we need wait for it to load all before we can assert anything
    await preloadAll();
    wrapper = mount(<Brands />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Brands />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have Teaser section', () => {
    expect(wrapper.find(Teaser)).toHaveLength(1);
  });

  it('should have How it works section', () => {
    expect(wrapper.find(HowItWorks)).toHaveLength(1);
  });

  it('should have About Product section', () => {
    expect(wrapper.find(AboutProduct)).toHaveLength(1);
  });

  it('should have Join Us section', () => {
    expect(wrapper.find(JoinUs)).toHaveLength(1);
  });

  it('should have Become Brands section', () => {
    expect(wrapper.find(Become)).toHaveLength(1);
  });

  it('should have Reviews section', () => {
    expect(wrapper.find(Reviews)).toHaveLength(1);
  });
});
