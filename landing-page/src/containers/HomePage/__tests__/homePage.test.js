import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import preloadAll from 'jest-next-dynamic';

import { Footer, Header } from '../../components';
import HomePage from '../HomePage';
import Teaser from '../Teaser';
import TalentLabs from '../TalentLabs';
import AboutUs from '../AboutUs';
import Partners from '../Partners';
// import Introduction from '../Introduction';
import OurOffice from '../OurOffice';
import ContactUs from '../ContactUs';
import CreateProject from '../CreateProject';

describe('Testing HomePage', () => {
  let wrapper;

  beforeAll(async () => {
    // Header and Footer included in HomePage
    // And they are using dynamic import, see more in Header.js and Footer.js
    // So we need wait for it to load all before we can assert anything
    await preloadAll();
    wrapper = mount(<HomePage />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<HomePage />);
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

  it('should have a TalentLabs section', () => {
    expect(wrapper.find(TalentLabs)).toHaveLength(1);
  });

  it('should have a AboutUs section', () => {
    expect(wrapper.find(AboutUs)).toHaveLength(1);
  });

  it('should have a Partners section', () => {
    expect(wrapper.find(Partners)).toHaveLength(1);
  });

  // it('should have a Introduction section', () => {
  //   expect(wrapper.find(Introduction)).toHaveLength(1);
  // });

  it('should have a OurOffice section', () => {
    expect(wrapper.find(OurOffice)).toHaveLength(1);
  });

  it('should have a ContactUs section', () => {
    expect(wrapper.find(ContactUs)).toHaveLength(1);
  });

  it('should have a CreateProject section', () => {
    expect(wrapper.find(CreateProject)).toHaveLength(1);
  });
});
