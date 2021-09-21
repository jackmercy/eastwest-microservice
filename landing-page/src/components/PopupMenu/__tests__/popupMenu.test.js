import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import PopupMenu from '../PopupMenu';

describe('Testing PopupMenu component', () => {
  const props = {
    show: true,
    list: [
      { key: 'item1', label: 'Item 1' },
      { key: 'item2', label: 'Item 3' },
    ],
  };

  it('should render match snapshot', () => {
    const wrapper = shallow(<PopupMenu {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render item match with props list', () => {
    const wrapper = mount(<PopupMenu {...props} />);
    expect(wrapper.find('[data-test="popup-menu-menu-item"]')).toHaveLength(
      props.list.length,
    );
  });
});
