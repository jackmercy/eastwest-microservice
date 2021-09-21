import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import JoinUs from '../JoinUs';

describe('Testing DataLabs components > JoinUs', () => {
  let wrapper;
  const props = {
    description: 'Something',
    defaultReason: 4,
  };

  beforeAll(() => {
    wrapper = mount(<JoinUs {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<JoinUs {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a description', () => {
    expect(wrapper.find('[data-test="join-us-description"]')).toHaveLength(1);
  });

  it('should have a button get started', () => {
    expect(wrapper.find('[data-test="join-us-cta"]')).toHaveLength(1);
  });
});
