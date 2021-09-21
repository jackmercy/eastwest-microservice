import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { SectionTitle } from '../../components';
import OurMission from '../OurMission';

describe('Testing Careers > OurMission', () => {
  let wrapper;
  const props = { id: 'our-mission' };

  beforeAll(() => {
    wrapper = mount(<OurMission {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<OurMission {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a SectionTitle', () => {
    expect(wrapper.find(SectionTitle)).toHaveLength(1);
  });
});
