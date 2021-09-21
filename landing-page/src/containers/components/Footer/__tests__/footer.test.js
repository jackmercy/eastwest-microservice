import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Footer from '../Footer';

describe('Testing layout Footer', () => {
  it('should render match snapshot', () => {
    const wrapper = shallow(<Footer />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
