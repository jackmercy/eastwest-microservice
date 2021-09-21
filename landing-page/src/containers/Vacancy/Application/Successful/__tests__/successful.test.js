import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Successful from '../Successful';

describe('Testing Vacancy > Application > Successful', () => {
  let wrapper;
  const props = { onBack: jest.fn() };

  beforeAll(() => {
    wrapper = mount(<Successful {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Successful {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="successful-title"]')).toHaveLength(1);
  });

  it('should have a description', () => {
    expect(wrapper.find('[data-test="successful-description"]')).toHaveLength(
      1,
    );
  });

  it('should have a back button', () => {
    expect(wrapper.find('[data-test="successful-back-button"]')).toHaveLength(
      1,
    );
  });

  it('should have a more button', () => {
    expect(wrapper.find('[data-test="successful-more-button"]')).toHaveLength(
      1,
    );
  });
});
