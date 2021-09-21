import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Modal from '../Modal';

describe('Testing Modal component', () => {
  const props = { open: true, toggle: jest.fn() };

  it('should render match snapshot', () => {
    const wrapper = shallow(<Modal {...props}>Modal content</Modal>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
