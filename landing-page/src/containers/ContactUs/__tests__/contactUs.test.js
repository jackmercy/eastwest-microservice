import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as redux from 'react-redux';
import preloadAll from 'jest-next-dynamic';

import { Footer, Header } from '../../components';
import ContactUs from '../ContactUs';

describe('Testing ContactUs', () => {
  let wrapper;
  const useSelector = jest.spyOn(redux, 'useSelector');

  beforeAll(async () => {
    // Header and Footer included in AboutUs
    // And they are using dynamic import, see more in Header.js and Footer.js
    // So we need wait for it to load all before we can assert anything
    await preloadAll();
    useSelector.mockImplementation((selector) =>
      selector({
        territories: {
          countries: [
            { id: '238', name: 'Vietnam', code: '84', isoCode: 'VN / VNM' },
          ],
        },
        loading: { status: false },
      }));
    wrapper = mount(<ContactUs />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<ContactUs />);
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
      expect(wrapper.find('[data-test="contact-teaser-title"]')).toHaveLength(
        1,
      );
    });

    it('should have a teaser description', () => {
      expect(
        wrapper.find('[data-test="contact-teaser-description"]'),
      ).toHaveLength(1);
    });

    it('should have a teaser image', () => {
      expect(wrapper.find('[data-test="contact-teaser-image"]')).toHaveLength(
        1,
      );
    });
  });

  describe('Testing Contact Form', () => {
    it('should have a select reason', () => {
      expect(
        wrapper.find('[data-test="contact-form-select-reason"]'),
      ).toHaveLength(1);
    });

    it('should have an input first name', () => {
      expect(
        wrapper.find('[data-test="contact-form-input-first-name"]'),
      ).toHaveLength(1);
    });

    it('should have an input last name', () => {
      expect(
        wrapper.find('[data-test="contact-form-input-last-name"]'),
      ).toHaveLength(1);
    });

    it('should have an input email address', () => {
      expect(
        wrapper.find('[data-test="contact-form-input-email-address"]'),
      ).toHaveLength(1);
    });

    it('should have a select country code', () => {
      expect(
        wrapper.find('[data-test="contact-form-select-phone-code"]'),
      ).toHaveLength(1);
    });

    it('should have an input phone number', () => {
      expect(
        wrapper.find('[data-test="contact-form-input-phone-number"]'),
      ).toHaveLength(1);
    });

    it('should have an input address', () => {
      expect(
        wrapper.find('[data-test="contact-form-input-address"]'),
      ).toHaveLength(1);
    });

    it('should have a select country', () => {
      expect(
        wrapper.find('[data-test="contact-form-select-country"]'),
      ).toHaveLength(1);
    });

    it('should have a select city', () => {
      expect(
        wrapper.find('[data-test="contact-form-select-city"]'),
      ).toHaveLength(1);
    });

    it('should have a textarea comment', () => {
      expect(
        wrapper.find('[data-test="contact-form-textarea-description"]'),
      ).toHaveLength(1);
    });

    it('should have a checkbox privacy policy', () => {
      expect(
        wrapper.find('[data-test="contact-form-checkbox-privacy"]'),
      ).toHaveLength(1);
    });

    it('should have a button submit', () => {
      expect(
        wrapper.find('[data-test="contact-form-button-submit"]'),
      ).toHaveLength(1);
    });
  });

  describe('Testing Contact Information', () => {
    it('should have a cover image', () => {
      expect(wrapper.find('[data-test="contact-info-image"]')).toHaveLength(1);
    });

    it('should have a ireland address', () => {
      expect(
        wrapper.find('[data-test="contact-info-ireland-address"]'),
      ).toHaveLength(1);
    });

    it('should have a vietnam addrss', () => {
      expect(
        wrapper.find('[data-test="contact-info-vietnam-address"]'),
      ).toHaveLength(1);
    });

    it('should have a phone number', () => {
      expect(
        wrapper.find('[data-test="contact-info-phone-number"]'),
      ).toHaveLength(1);
    });

    it('should have a cta create ticket', () => {
      expect(
        wrapper.find('[data-test="contact-info-cta-create-ticket"]'),
      ).toHaveLength(1);
    });

    it('should have a messenger link', () => {
      expect(
        wrapper.find('[data-test="contact-info-link-messenger"]'),
      ).toHaveLength(1);
    });

    it('should have a linkedin link', () => {
      expect(
        wrapper.find('[data-test="contact-info-link-linkedin"]'),
      ).toHaveLength(1);
    });
  });
});
