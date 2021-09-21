import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Partners from '../Partners';

describe('Testing TalentLabs > Partners', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<Partners />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Partners />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="partners-title"]')).toHaveLength(1);
  });
});
