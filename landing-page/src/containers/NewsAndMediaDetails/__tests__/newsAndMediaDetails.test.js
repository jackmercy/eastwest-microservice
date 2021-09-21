import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import preloadAll from 'jest-next-dynamic';

import { Footer, Header } from '../../components';
import NewsAndMediaDetails from '../NewsAndMediaDetails';
import Breadcrumb from '../Breadcrumb';
import ListRankings from '../../NewsAndMedia/ListRankings';

describe('Testing NewsAndMediaDetails', () => {
  let wrapper;
  const props = {
    data: {
      id: 'abc',
      slug: 'test-new',
      views: 10,
      shares: 10,
      title: 'Some title',
      htmlContent: '<div>hello</div>',
      category: '610752dd1f174b00188e6359',
      thumbnail: 'image url',
      shortDescription: 'some description',
      createdAt: '2021-08-02T04:32:11.666Z',
      updatedAt: '2021-08-03T03:03:13.945Z',
      author: {
        firstName: 'test',
        lastName: '123',
        avatar: 'avatar id',
      },
      tags: [],
    },
    categories: [
      {
        tags: ['Insights'],
        name: 'Insights',
        slug: 'insights',
        shortDescription: 'Insights',
        id: '610752dd1f174b00188e6359',
      },
    ],
    listRankings: [
      {
        id: 'abc1',
        slug: 'test-new',
        title: 'Some title',
        category: '610752dd1f174b00188e6359',
        thumbnail: 'image url',
        shortDescription: 'some description',
      },
      {
        id: 'abc2',
        slug: 'test-new',
        title: 'Some title',
        category: '610752dd1f174b00188e6359',
        thumbnail: 'image url',
        shortDescription: 'some description',
      },
    ],
  };

  beforeAll(async () => {
    // Header and Footer included in AboutUs
    // And they are using dynamic import, see more in Header.js and Footer.js
    // So we need wait for it to load all before we can assert anything
    await preloadAll();
    wrapper = mount(<NewsAndMediaDetails {...props} />);
  });

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify({ views: 10 }));
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<NewsAndMediaDetails {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a Header', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('should have a Footer', () => {
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it('should have a Breadcrumb', () => {
    expect(wrapper.find(Breadcrumb)).toHaveLength(1);
  });

  it('should have a category', () => {
    expect(wrapper.find('[data-test="news-details-category"]')).toHaveLength(1);
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="news-details-title"]')).toHaveLength(1);
  });

  it('should have a author image', () => {
    expect(
      wrapper.find('[data-test="news-details-author-image"]'),
    ).toHaveLength(1);
  });

  it('should have a author name', () => {
    expect(wrapper.find('[data-test="news-details-author-name"]')).toHaveLength(
      1,
    );
  });

  it('should have updated time', () => {
    expect(
      wrapper.find('[data-test="news-details-updated-time"]'),
    ).toHaveLength(1);
  });

  it('should have socials sharing options', () => {
    expect(
      wrapper.find('[data-test="news-details-socials-sharing"]'),
    ).toHaveLength(1);
  });

  it('should have a thumbnail', () => {
    expect(wrapper.find('[data-test="news-details-thumbnail"]')).toHaveLength(
      1,
    );
  });

  it('should have a news content', () => {
    expect(wrapper.find('[data-test="news-details-content"]')).toHaveLength(1);
  });

  it('should have a ListRankings', () => {
    expect(wrapper.find(ListRankings)).toHaveLength(1);
  });
});
