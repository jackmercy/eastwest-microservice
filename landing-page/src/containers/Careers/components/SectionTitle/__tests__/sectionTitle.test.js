import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import SectionTitle from '../SectionTitle';

describe('Testing Careers components > SectionTitle', () => {
  const props = {
    id: '123',
    translateId: 'CAREERS.OUR_MISSION.TITLE',
  };

  it('should render match snapshot', () => {
    const wrapper = shallow(<SectionTitle {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
