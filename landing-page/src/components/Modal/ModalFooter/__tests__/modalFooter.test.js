import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ModalFooter from '../ModalFooter';

describe('Testing Modal component > ModalFooter', () => {
  it('should render match snapshot', () => {
    const wrapper = shallow(
      <ModalFooter
        cancelButtonProps={{ children: 'Cancel', onClick: jest.fn() }}
        submitButtonProps={{ children: 'Submit', onClick: jest.fn() }}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a button cancel', () => {
    const wrapper = mount(
      <ModalFooter
        cancelButtonProps={{ children: 'Cancel', onClick: jest.fn() }}
      />,
    );
    expect(
      wrapper.find('[data-test="modal-footer-button-cancel"]').hostNodes(),
    ).toHaveLength(1);
  });

  it('should have a button submit', () => {
    const wrapper = mount(
      <ModalFooter
        submitButtonProps={{ children: 'Submit', onClick: jest.fn() }}
      />,
    );
    expect(
      wrapper.find('[data-test="modal-footer-button-submit"]').hostNodes(),
    ).toHaveLength(1);
  });
});
