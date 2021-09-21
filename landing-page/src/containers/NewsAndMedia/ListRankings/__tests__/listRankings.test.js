import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Item from '../Item';
import ListRankings from '../ListRankings';

describe('Testing NewsAndMedia > ListRankings', () => {
  let wrapper;
  const props = {
    data: [
      {
        id: 'abc',
        slug: 'test-new',
        title: 'Some title',
        category: '610752dd1f174b00188e6359',
        thumbnail: 'image url',
      },
    ],
    categories: [
      {
        tags: ['Insights'],
        name: 'Insights',
        slug: 'insights',
        shortDescription: 'Insights',
        id: '610752dd1f174b00188e6359',
      },
    ],
  };

  beforeAll(() => {
    wrapper = mount(<ListRankings {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<ListRankings {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have some items', () => {
    expect(wrapper.find(Item)).toHaveLength(props.data.length);
  });
});
