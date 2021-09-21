import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ReactPaginate from 'react-paginate';

import Item from '../Item';
import ListNews from '../ListNews';

describe('Testing NewsAndMedia > ListNews', () => {
  let wrapper;
  const props = {
    totalNews: 10,
    data: [
      {
        id: 'abc',
        slug: 'test-new',
        title: 'Some title',
        category: '610752dd1f174b00188e6359',
        thumbnail: 'image url',
        shortDescription: 'short description',
      },
      {
        id: 'abc2',
        slug: 'test-new',
        title: 'Some title',
        category: '610752dd1f174b00188e6359',
        thumbnail: 'image url',
        shortDescription: 'short description',
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
    pagination: {
      perPage: 1,
      pageCount: 10,
      onChange: jest.fn(),
    },
  };

  beforeAll(() => {
    wrapper = mount(<ListNews {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<ListNews {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a pagination', () => {
    expect(wrapper.find(ReactPaginate)).toHaveLength(1);
  });

  it('should have some items', () => {
    expect(wrapper.find(Item)).toHaveLength(props.data.length);
  });
});
