import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import preloadAll from 'jest-next-dynamic';

import { Footer, Header } from '../../components';
import NewsAndMedia from '../NewsAndMedia';
import Outstanding from '../Outstanding';
import ListNews from '../ListNews';
import ListCategories from '../ListCategories';
import ListRankings from '../ListRankings';

describe('Testing NewsAndMedia', () => {
  let wrapper;
  const props = {
    totalNews: 10,
    categories: [
      {
        tags: ['Insights'],
        name: 'Insights',
        slug: 'insights',
        shortDescription: 'Insights',
        id: '610752dd1f174b00188e6359',
      },
    ],
    topNews: [
      {
        tags: [],
        title: 'title 1',
        slug: 'test-new-news',
        category: '610752dd1f174b00188e6359',
        author: '610752fc1f174b00188e635a',
        shortDescription: 'short description',
        htmlContent: '<p>Test 1</p>',
        thumbnail: '61075fb6c8e8db00182e1819',
        id: '61075fb61f174b00188e635b',
      },
    ],
    newsByCategory: [
      {
        tags: [],
        title: 'title 1',
        slug: 'test-new-news',
        category: '610752dd1f174b00188e6359',
        author: '610752fc1f174b00188e635a',
        shortDescription: 'short description',
        htmlContent: '<p>Test 1</p>',
        thumbnail: '61075fb6c8e8db00182e1819',
        id: '61075fb61f174b00188e635b',
      },
    ],
    newsRankings: [
      {
        tags: [],
        title: 'title 1',
        slug: 'test-new-news',
        category: '610752dd1f174b00188e6359',
        author: '610752fc1f174b00188e635a',
        shortDescription: 'short description',
        htmlContent: '<p>Test 1</p>',
        thumbnail: '61075fb6c8e8db00182e1819',
        id: '61075fb61f174b00188e635b',
      },
    ],
  };

  beforeAll(async () => {
    // Header and Footer included in Careers
    // And they are using dynamic import, see more in Header.js and Footer.js
    // So we need wait for it to load all before we can assert anything
    await preloadAll();
    wrapper = mount(<NewsAndMedia {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<NewsAndMedia {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a Header', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('should have a Footer', () => {
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it('should have Outstanding section', () => {
    expect(wrapper.find(Outstanding)).toHaveLength(1);
  });

  it('should have ListCategories section', () => {
    expect(wrapper.find(ListCategories)).toHaveLength(1);
  });

  it('should have ListNews section', () => {
    expect(wrapper.find(ListNews)).toHaveLength(1);
  });

  it('should have ListRankings section', () => {
    expect(wrapper.find(ListRankings)).toHaveLength(1);
  });
});
