import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Become from '../Become';

describe('Testing DataLabs components > Become', () => {
  let wrapper;
  const props = {
    title: 'Become us',
    data: [
      {
        key: 'brand-become-01',
        title: 'title 01',
        description: 'decription 01',
        number: 45,
        image: 'image',
        countUpConfigs: { prefix: '', suffix: '+' },
      },
      {
        key: 'brand-become-02',
        title: 'title 02',
        description: 'decription 02',
        number: 145,
        image: 'image',
        countUpConfigs: { prefix: '', suffix: '+' },
      },
      {
        key: 'brand-become-03',
        title: 'title 03',
        description: 'decription 03',
        number: 245,
        image: 'image',
        countUpConfigs: { prefix: '', suffix: '+' },
      },
    ],
  };

  beforeAll(() => {
    wrapper = mount(<Become {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Become {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="become-title"]')).toHaveLength(1);
  });

  it('should have a list items', () => {
    expect(wrapper.find('[data-test="become-list-items"]')).toHaveLength(1);
    expect(wrapper.find('[data-test="become-item"]')).toHaveLength(
      props.data.length,
    );
  });
});
