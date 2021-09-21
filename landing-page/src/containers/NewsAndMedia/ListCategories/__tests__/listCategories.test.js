import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ListCategories from '../ListCategories';

describe('Testing NewsAndMedia > ListCategories', () => {
  let wrapper;
  const props = {
    data: [
      {
        tags: ['Insights'],
        name: 'Insights',
        slug: 'insights',
        shortDescription: 'Insights',
        id: '610752dd1f174b00188e6359',
      },
    ],
    onSearch: jest.fn(),
  };

  beforeAll(() => {
    wrapper = mount(<ListCategories {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<ListCategories {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a list categories', () => {
    expect(wrapper.find('[data-test="list-categories-list"]')).toHaveLength(1);
  });

  // it('should have an input search', () => {
  //   expect(
  //     wrapper.find('[data-test="list-categories-input-search"]'),
  //   ).toHaveLength(1);
  // });
});
