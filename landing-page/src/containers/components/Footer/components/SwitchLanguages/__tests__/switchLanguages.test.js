import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import SwitchLanguages from '../SwitchLanguages';

describe('Testing Footer > SwitchLanguages', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<SwitchLanguages />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<SwitchLanguages />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="switch-languages-title"]')).toHaveLength(
      1,
    );
  });

  it('should have a toggle button', () => {
    expect(
      wrapper.find('[data-test="switch-languages-toggle-button"]'),
    ).toHaveLength(1);
  });

  // MVP hidden
  // describe('Testing menu', () => {
  //   beforeAll(() => {
  //     wrapper
  //       .find('[data-test="switch-languages-toggle-button"]')
  //       .simulate('click');
  //   });

  //   it('should show menu when click toggle button', () => {
  //     expect(wrapper.find('[data-test="switch-languages-menu"]')).toHaveLength(
  //       1,
  //     );
  //   });

  //   it('menu should support 1 languages', () => {
  //     expect(
  //       wrapper.find('[data-test="switch-languages-menu"]').children(),
  //     ).toHaveLength(1);
  //   });
  // });
});
