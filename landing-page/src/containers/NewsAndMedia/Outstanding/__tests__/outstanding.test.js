import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Outstanding from '../Outstanding';

describe('Testing NewsAndMedia > Outstanding', () => {
  let wrapper;
  const props = {
    data: [
      {
        id: 'abc',
        slug: 'test-new',
        title: 'Some title',
        category: '610752dd1f174b00188e6359',
        thumbnail: 'image url',
        shortDescription: 'some description',
      },
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
    wrapper = mount(<Outstanding {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Outstanding {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a main item', () => {
    expect(wrapper.find('[data-test="outstanding-main-item"]')).toHaveLength(1);
  });

  it('should have 2 sub items', () => {
    expect(wrapper.find('[data-test="outstanding-sub-item"]')).toHaveLength(2);
  });
});
