import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Teaser from '../Teaser';

describe('Testing Vacancy > Teaser', () => {
  let wrapper;
  const props = { title: 'Vacancy', subTitle: 'new vacancy' };

  beforeAll(() => {
    wrapper = mount(<Teaser {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Teaser {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a teaser image', () => {
    expect(wrapper.find('[data-test="teaser-image"]')).toHaveLength(1);
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="teaser-title"]')).toHaveLength(1);
  });

  it('should have a sub title', () => {
    expect(wrapper.find('[data-test="teaser-sub-title"]')).toHaveLength(1);
  });

  it('should have a breadcrumb', () => {
    expect(wrapper.find('[data-test="teaser-breadcrumb"]')).toHaveLength(1);
  });
});
