import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import preloadAll from 'jest-next-dynamic';

import { Teaser, JoinUs, Become, HowItWorks } from '../../components';
import Influencers from '../Influencers';
import Reviews from '../Reviews';

describe('Testing DataLabs > Influencers', () => {
  let wrapper;

  beforeAll(async () => {
    // Teaser included in Influencers
    // And they are using dynamic import, Teaser.js
    // So we need wait for it to load all before we can assert anything
    await preloadAll();
    wrapper = mount(<Influencers />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Influencers />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have Teaser section', () => {
    expect(wrapper.find(Teaser)).toHaveLength(1);
  });

  it('should have How it works section', () => {
    expect(wrapper.find(HowItWorks)).toHaveLength(1);
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
