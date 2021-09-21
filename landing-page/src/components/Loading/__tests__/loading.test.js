import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Loading from '../Loading';

describe('Testing Loading component', () => {
  const props = { ariaHideApp: false, open: true };

  it('should render match snapshot', () => {
    const wrapper = shallow(<Loading {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a loading gift', () => {
    const wrapper = mount(<Loading {...props} />);
    expect(wrapper.find('[data-test="component-loading-gif"]')).toHaveLength(
      1,
    );
  });
});
