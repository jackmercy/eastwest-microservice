import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import CreateTicket from '../CreateTicket';

describe('Testing CreateTicket', () => {
  it('should render match snapshot', () => {
    const wrapper = shallow(<CreateTicket />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
