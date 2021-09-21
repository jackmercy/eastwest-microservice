import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { FieldLabel, FieldInput } from '../../components';
import InputSearch from '../InputSearch';

describe('Testing Input component > InputSearch', () => {
  let wrapper;
  const props = {
    label: 'Search',
    name: 'search',
    error: 'some error',
    onSearch: jest.fn(),
  };

  beforeAll(() => {
    wrapper = mount(<InputSearch {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<InputSearch {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a FieldLabel', () => {
    expect(wrapper.find(FieldLabel)).toHaveLength(1);
  });

  it('should have a FieldInput', () => {
    expect(wrapper.find(FieldInput)).toHaveLength(1);
  });

  it('should have a search icon', () => {
    expect(
      wrapper.find('[data-test="component-input-search-icon"]'),
    ).toHaveLength(1);
  });
});
