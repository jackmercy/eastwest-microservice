import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Application from '../Application';

describe('Testing Vacancy > Application', () => {
  let wrapper;
  const props = { vacancyId: '123' };

  beforeAll(() => {
    wrapper = mount(<Application {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Application {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have an input avatar', () => {
    expect(wrapper.find('[data-test="application-input-avatar"]')).toHaveLength(
      1,
    );
  });

  it('should have an input first name', () => {
    expect(
      wrapper.find('[data-test="application-input-first-name"]'),
    ).toHaveLength(1);
  });

  it('should have an input last name', () => {
    expect(
      wrapper.find('[data-test="application-input-last-name"]'),
    ).toHaveLength(1);
  });

  it('should have an input email address', () => {
    expect(
      wrapper.find('[data-test="application-input-email-address"]'),
    ).toHaveLength(1);
  });

  it('should have a select country code', () => {
    expect(
      wrapper.find('[data-test="application-select-phone-code"]'),
    ).toHaveLength(1);
  });

  it('should have an input phone number', () => {
    expect(
      wrapper.find('[data-test="application-input-phone-number"]'),
    ).toHaveLength(1);
  });

  it('should have an input address', () => {
    expect(
      wrapper.find('[data-test="application-input-address"]'),
    ).toHaveLength(1);
  });

  it('should have an input linkedin profile', () => {
    expect(
      wrapper.find('[data-test="application-input-linkedin"]'),
    ).toHaveLength(1);
  });

  it('should have an input address', () => {
    expect(
      wrapper.find('[data-test="application-input-resumes"]'),
    ).toHaveLength(1);
  });

  it('should have a checkbox privacy policy', () => {
    expect(
      wrapper.find('[data-test="application-checkbox-privacy"]'),
    ).toHaveLength(1);
  });

  it('should have a button submit', () => {
    expect(
      wrapper.find('[data-test="application-button-submit"]'),
    ).toHaveLength(1);
  });
});
