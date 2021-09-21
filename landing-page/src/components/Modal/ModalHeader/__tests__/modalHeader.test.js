import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ModalHeader from '../ModalHeader';

describe('Testing Modal component > ModalHeader', () => {
  let wrapper;
  const props = { title: 'Modal header', toggle: jest.fn() };

  beforeAll(() => {
    wrapper = mount(<ModalHeader {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<ModalHeader {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a title', () => {
    expect(
      wrapper.find('[data-test="component-modal-header-title"]'),
    ).toHaveLength(1);
  });

  it('should have a button close', () => {
    expect(
      wrapper.find('[data-test="component-modal-header-button-close"]'),
    ).toHaveLength(1);
  });
});
