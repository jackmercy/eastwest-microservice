import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Item from '../Item';

describe('Testing NewsAndMedia > ListRankings > Item', () => {
  let wrapper;
  const props = {
    index: 2,
    data: {
      id: 'abc1',
      slug: 'test-new',
      title: 'Some title',
      category: {
        name: 'Technology news',
        slug: 'technology-news',
      },
      thumbnail: 'image url',
    },
  };

  beforeAll(() => {
    wrapper = mount(<Item {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Item {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a thumbnail', () => {
    expect(wrapper.find('[data-test="item-thumbnail"]')).toHaveLength(1);
  });

  it('should have a category', () => {
    expect(wrapper.find('[data-test="item-category"]')).toHaveLength(1);
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="item-title"]')).toHaveLength(1);
  });

  it('should have an index', () => {
    expect(wrapper.find('[data-test="item-index"]')).toHaveLength(1);
  });
});
