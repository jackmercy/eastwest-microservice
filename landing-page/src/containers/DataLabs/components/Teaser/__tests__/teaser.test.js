import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Logo } from '../../../../../components';
import Teaser from '../Teaser';

describe('Testing DataLabs components > Teaser', () => {
  let wrapper;
  const props = {
    image: '/static/images/data-labs/influencers/teaser.png',
    mobileImage: '/static/images/data-labs/influencers/teaser-mobile.png',
    purpose: 'nothing',
    description: 'something',
    otherText: 'more',
    defaultReason: 5,
  };

  beforeAll(() => {
    wrapper = mount(<Teaser {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Teaser {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a cover image', () => {
    expect(wrapper.find('[data-test="teaser-cover-image"]')).toHaveLength(1);
  });

  it('should have a logo', () => {
    expect(wrapper.find(Logo)).toHaveLength(1);
  });

  it('should have a purpose of teaser', () => {
    expect(wrapper.find('[data-test="teaser-purpose"]')).toHaveLength(1);
  });

  it('should have a description', () => {
    expect(wrapper.find('[data-test="teaser-description"]')).toHaveLength(1);
  });

  it('should have a button get started', () => {
    expect(
      wrapper.find('[data-test="teaser-button-get-started"]'),
    ).toHaveLength(1);
  });

  it('should have a button learn more', () => {
    expect(wrapper.find('[data-test="teaser-button-more"]')).toHaveLength(1);
  });
});
