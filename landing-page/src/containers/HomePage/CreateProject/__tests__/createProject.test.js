import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import CreateProject from '../CreateProject';

describe('Testing HomePage > CreateProject', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<CreateProject />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<CreateProject />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="create-project-title"]')).toHaveLength(1);
  });

  it('should have a description', () => {
    expect(
      wrapper.find('[data-test="create-project-description"]'),
    ).toHaveLength(1);
  });

  it('should have a cover image', () => {
    expect(wrapper.find('[data-test="create-project-image"]')).toHaveLength(1);
  });

  describe('Testing Contact Form', () => {
    it('should have an input first name', () => {
      expect(
        wrapper.find('[data-test="create-project-form-input-first-name"]'),
      ).toHaveLength(1);
    });

    it('should have an input last name', () => {
      expect(
        wrapper.find('[data-test="create-project-form-input-last-name"]'),
      ).toHaveLength(1);
    });

    it('should have an input email address', () => {
      expect(
        wrapper.find('[data-test="create-project-form-input-email-address"]'),
      ).toHaveLength(1);
    });

    it('should have an input phone number', () => {
      expect(
        wrapper.find('[data-test="create-project-form-input-phone-number"]'),
      ).toHaveLength(1);
    });

    it('should have an input company name', () => {
      expect(
        wrapper.find('[data-test="create-project-form-input-company-name"]'),
      ).toHaveLength(1);
    });

    it('should have an input title', () => {
      expect(
        wrapper.find('[data-test="create-project-form-input-title"]'),
      ).toHaveLength(1);
    });

    it('should have a select country', () => {
      expect(
        wrapper.find('[data-test="create-project-form-input-country"]'),
      ).toHaveLength(1);
    });

    it('should have a textarea comment', () => {
      expect(
        wrapper.find('[data-test="create-project-form-textarea-comment"]'),
      ).toHaveLength(1);
    });

    it('should have a button submit', () => {
      expect(
        wrapper.find('[data-test="create-project-form-button-submit"]'),
      ).toHaveLength(1);
    });
  });
});
