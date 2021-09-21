import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import {
  Register,
  CopyRight,
  SummaryInfo,
  SwitchLanguages,
} from '../../components';
import MobileFooter from '../MobileFooter';

describe('Testing Footer > MobileFooter', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<MobileFooter />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<MobileFooter />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have SummaryInfo', () => {
    expect(wrapper.find(SummaryInfo)).toHaveLength(1);
  });

  it('should have some product urls', () => {
    expect(wrapper.find('[data-test="footer-product"]')).toHaveLength(2);
  });

  it('should have some page urls', () => {
    expect(wrapper.find('[data-test="footer-page"]')).toHaveLength(3);
  });

  // MVP hidden
  // it('should have some other urls', () => {
  //   expect(wrapper.find('[data-test="footer-other"]')).toHaveLength(3);
  // });

  it('should have a SwitchLanguages', () => {
    expect(wrapper.find(SwitchLanguages)).toHaveLength(1);
  });

  it('should have a Register', () => {
    expect(wrapper.find(Register)).toHaveLength(1);
  });

  it('should have a CopyRight', () => {
    expect(wrapper.find(CopyRight)).toHaveLength(1);
  });
});
