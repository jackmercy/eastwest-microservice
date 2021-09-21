import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import SummaryInfo from '../SummaryInfo';

describe('Testing Footer > SummaryInfo', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<SummaryInfo />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<SummaryInfo />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a logo', () => {
    expect(wrapper.find('[data-test="summary-info-logo"]')).toHaveLength(1);
  });

  it('should have a description', () => {
    expect(wrapper.find('[data-test="summary-info-description"]')).toHaveLength(
      1,
    );
  });
});
