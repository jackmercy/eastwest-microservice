import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import HowItWorks from '../HowItWorks';

describe('Testing DataLabs components > HowItWorks', () => {
  let wrapper;
  const props = {
    title: 'How it works',
    description: 'Type something',
    data: [
      {
        key: '1',
        image: 'image',
        icon: 'icon',
        title: 'title',
        description: 'description',
      },
    ],
  };

  beforeAll(() => {
    wrapper = mount(<HowItWorks {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<HowItWorks {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="how-it-works-title"]')).toHaveLength(1);
  });

  it('should have a description', () => {
    expect(wrapper.find('[data-test="how-it-works-description"]')).toHaveLength(
      1,
    );
  });

  it('should show a list items ', () => {
    expect(wrapper.find('[data-test="how-it-works-list-items"]')).toHaveLength(
      1,
    );
    expect(wrapper.find('[data-test="how-it-works-item"]')).toHaveLength(
      props.data.length,
    );
  });
});
