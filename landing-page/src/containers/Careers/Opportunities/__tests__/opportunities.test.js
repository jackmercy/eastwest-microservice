import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { SectionTitle } from '../../components';
import Opportunities from '../Opportunities';

describe('Testing Careers > Opportunities', () => {
  let wrapper;
  const props = { id: 'our-mission' };

  beforeAll(() => {
    wrapper = mount(<Opportunities {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Opportunities {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a SectionTitle', () => {
    expect(wrapper.find(SectionTitle)).toHaveLength(1);
  });
});
