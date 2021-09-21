import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Tooltip from '../Tooltip';

describe('Testing TalentLabs > Products > Tooltip', () => {
  const props = {
    children: <span>Some content</span>,
  };

  it('should render match snapshot', () => {
    const wrapper = shallow(<Tooltip {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
