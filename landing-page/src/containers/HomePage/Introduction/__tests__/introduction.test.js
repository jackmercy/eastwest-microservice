import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Introduction from '../Introduction';

describe('Testing HomePage > Introduction', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<Introduction />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Introduction />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="introduction-title"]')).toHaveLength(1);
  });

  it('should have a video', () => {
    expect(wrapper.find('[data-test="introduction-video"]')).toHaveLength(1);
  });
});
