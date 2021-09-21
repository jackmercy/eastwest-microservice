import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import preloadAll from 'jest-next-dynamic';

import { Footer, Header } from '../../components';
import TalentLabs from '../TalentLabs';
import Teaser from '../Teaser';
import Technologies from '../Technologies';
import Products from '../Products/Products';
import Partners from '../Partners';
import CreateProject from '../../HomePage/CreateProject';

describe('Testing TalentLabs', () => {
  let wrapper;

  beforeAll(async () => {
    // Header and Footer included in AboutUs
    // And they are using dynamic import, see more in Header.js and Footer.js
    // So we need wait for it to load all before we can assert anything
    await preloadAll();
    wrapper = mount(<TalentLabs />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<TalentLabs />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a Header', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('should have a Footer', () => {
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it('should have a Teaser section', () => {
    expect(wrapper.find(Teaser)).toHaveLength(1);
  });

  it('should have a Technologies section', () => {
    expect(wrapper.find(Technologies)).toHaveLength(1);
  });

  it('should have a Products section', () => {
    expect(wrapper.find(Products)).toHaveLength(1);
  });

  it('should have a Partners section', () => {
    expect(wrapper.find(Partners)).toHaveLength(1);
  });

  it('should have a CreateProject section', () => {
    expect(wrapper.find(CreateProject)).toHaveLength(1);
  });
});
