import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import TalentLabs from '../TalentLabs';

describe('Testing HomePage > TalentLabs', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<TalentLabs />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<TalentLabs />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a cover image', () => {
    expect(wrapper.find('[data-test="talent-labs-cover-image"]')).toHaveLength(
      1,
    );
  });

  it('should have a logo', () => {
    expect(wrapper.find('[data-test="talent-labs-logo"]')).toHaveLength(1);
  });

  it('should have a description', () => {
    expect(wrapper.find('[data-test="talent-labs-description"]')).toHaveLength(
      1,
    );
  });

  it('should have a CTA button', () => {
    expect(wrapper.find('[data-test="talent-labs-button"]')).toHaveLength(1);
  });
});
