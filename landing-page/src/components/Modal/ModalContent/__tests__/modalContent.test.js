import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ModalContent from '../ModalContent';

describe('Testing Modal component > ModalContent', () => {
  it('should render match snapshot', () => {
    const wrapper = shallow(<ModalContent>Content</ModalContent>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
