import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import preloadAll from 'jest-next-dynamic';

import { Footer, Header } from '../../components';
import Careers from '../Careers';
import Teaser from '../Teaser';
import OurMission from '../OurMission';
import CoreValues from '../CoreValues';
import Benefits from '../Benefits';

describe('Testing Careers', () => {
  let wrapper;

  beforeAll(async () => {
    // Header and Footer included in Careers
    // And they are using dynamic import, see more in Header.js and Footer.js
    // So we need wait for it to load all before we can assert anything
    await preloadAll();
    wrapper = mount(<Careers />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Careers />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a Header', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('should have a Footer', () => {
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it('should have Teaser section', () => {
    expect(wrapper.find(Teaser)).toHaveLength(1);
  });

  it('should have OurMission section', () => {
    expect(wrapper.find(OurMission)).toHaveLength(1);
  });

  it('should have CoreValues section', () => {
    expect(wrapper.find(CoreValues)).toHaveLength(1);
  });

  it('should have Benefits section', () => {
    expect(wrapper.find(Benefits)).toHaveLength(1);
  });
});
