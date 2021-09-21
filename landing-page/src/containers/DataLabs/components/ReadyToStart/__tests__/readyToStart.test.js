import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ReadyToStart from '../ReadyToStart';

describe('Testing DataLabs components > ReadyToStart', () => {
  let wrapper;
  const props = { defaultReason: 4 };

  beforeAll(() => {
    wrapper = mount(<ReadyToStart {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<ReadyToStart {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="ready-to-start-title"]')).toHaveLength(1);
  });

  it('should have a button', () => {
    expect(wrapper.find('[data-test="ready-to-start-button"]')).toHaveLength(1);
  });
});
