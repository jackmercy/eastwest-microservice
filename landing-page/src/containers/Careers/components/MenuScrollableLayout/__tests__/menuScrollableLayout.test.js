import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import MenuScrollableLayout from '../MenuScrollableLayout';

describe('Testing Careers components > MenuScrollableLayout', () => {
  let wrapper;
  const props = {
    id: '123',
    title: 'CAREERS.OUR_MISSION.TITLE',
    menuConfigs: [
      { id: 'id-01', label: 'Menu-01' },
      { id: 'id-02', label: 'Menu-02' },
      { id: 'id-03', label: 'Menu-03' },
    ],
    children: <div>Content</div>,
  };

  beforeAll(() => {
    wrapper = mount(<MenuScrollableLayout {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<MenuScrollableLayout {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a menu', () => {
    expect(
      wrapper.find('[data-test="menu-scrollable-layout-menu"]'),
    ).toHaveLength(1);
  });

  it('should have number of item equal with configs input', () => {
    expect(
      wrapper.find('[data-test="menu-scrollable-layout-menu-item"]'),
    ).toHaveLength(props.menuConfigs.length);
  });
});
