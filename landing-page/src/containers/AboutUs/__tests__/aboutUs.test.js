import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import preloadAll from 'jest-next-dynamic';

import { Footer, Header } from '../../components';
import AboutUs from '../AboutUs';
import MenuScrollableLayout
  from '../../Careers/components/MenuScrollableLayout';

describe('Testing AboutUs', () => {
  let wrapper;

  beforeAll(async () => {
    // Header and Footer included in AboutUs
    // And they are using dynamic import, see more in Header.js and Footer.js
    // So we need wait for it to load all before we can assert anything
    await preloadAll();
    wrapper = mount(<AboutUs />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<AboutUs />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a Header', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('should have a Footer', () => {
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  describe('Testing Teaser section', () => {
    it('should have a teaser title', () => {
      expect(wrapper.find('[data-test="about-us-teaser-title"]')).toHaveLength(
        1,
      );
    });

    it('should have a teaser description', () => {
      expect(
        wrapper.find('[data-test="about-us-teaser-description"]'),
      ).toHaveLength(1);
    });

    it('should have a teaser image', () => {
      expect(wrapper.find('[data-test="about-us-teaser-image"]')).toHaveLength(
        1,
      );
    });
  });

  describe('Testing AboutUs details section', () => {
    it('should have a MenuScrollableLayout', () => {
      expect(wrapper.find(MenuScrollableLayout)).toHaveLength(1);
    });

    it('should show about-company details', () => {
      expect(
        wrapper.find('[data-test="about-us-details-about-company"]'),
      ).toHaveLength(1);
    });

    it('should show history details', () => {
      expect(
        wrapper.find('[data-test="about-us-details-history-company"]'),
      ).toHaveLength(1);
    });

    it('should show members details', () => {
      expect(
        wrapper.find('[data-test="about-us-details-company-members"]'),
      ).toHaveLength(1);
    });
  });

  describe('Testing Get started section', () => {
    it('should have a title', () => {
      expect(
        wrapper.find('[data-test="about-us-starting-title"]'),
      ).toHaveLength(1);
    });

    it('should have a CTA', () => {
      expect(wrapper.find('[data-test="about-us-starting-cta"]')).toHaveLength(
        1,
      );
    });
  });
});
