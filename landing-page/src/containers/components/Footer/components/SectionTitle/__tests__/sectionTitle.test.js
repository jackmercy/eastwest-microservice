import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import SectionTitle from '../SectionTitle';

describe('Testing Footer > SectionTitle', () => {
  const props = { title: 'Section' };

  it('should render match snapshot', () => {
    const wrapper = shallow(<SectionTitle {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
