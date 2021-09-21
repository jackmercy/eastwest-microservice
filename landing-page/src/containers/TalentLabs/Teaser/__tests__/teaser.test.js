import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Teaser from '../Teaser';

describe('Testing TalentLabs > Teaser', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<Teaser />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Teaser />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a cover image', () => {
    expect(wrapper.find('[data-test="teaser-cover-image"]')).toHaveLength(1);
  });

  it('should have a talent labs logo', () => {
    expect(
      wrapper.find('[data-test="teaser-cover-talent-labs-logo"]'),
    ).toHaveLength(1);
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="teaser-title"]')).toHaveLength(1);
  });

  it('should have a description', () => {
    expect(wrapper.find('[data-test="teaser-description"]')).toHaveLength(1);
  });
});
