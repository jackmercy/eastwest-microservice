import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Technologies from '../Technologies';

describe('Testing TalentLabs > Technologies', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<Technologies />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Technologies />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="technologies-title"]')).toHaveLength(1);
  });

  it('should have a description', () => {
    expect(wrapper.find('[data-test="technologies-description"]')).toHaveLength(1);
  });
});
