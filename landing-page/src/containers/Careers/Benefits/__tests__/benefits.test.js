import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { SectionTitle } from '../../components';
import Benefits from '../Benefits';

describe('Testing Careers > Benefits', () => {
  let wrapper;
  const props = { id: 'benefits' };

  beforeAll(() => {
    wrapper = mount(<Benefits {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Benefits {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a SectionTitle', () => {
    expect(wrapper.find(SectionTitle)).toHaveLength(1);
  });

  it('should have a link to talent-labs', () => {
    expect(
      wrapper.find('[data-test="our-office-link-talent-labs"]'),
    ).toHaveLength(1);
  });

  it('should have a link to internship-program', () => {
    expect(
      wrapper.find('[data-test="our-office-link-internship-program"]'),
    ).toHaveLength(1);
  });
});
