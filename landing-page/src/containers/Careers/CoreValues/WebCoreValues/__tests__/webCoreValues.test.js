import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Slider from 'react-slick';

import WebCoreValues from '../WebCoreValues';

describe('Testing Careers > CoreValues > WebCoreValues', () => {
  let wrapper;
  const props = {
    data: [
      {
        key: 'key-01',
        title: 'title 01',
        titleTranslationId: 'CAREERS.CORE_VALUE.01.TITLE',
        description: 'descriptipn 01',
        image: 'image-01.png',
        srcSet: 'image-01.png 500w',
      },
      {
        key: 'key-02',
        title: 'title 01',
        titleTranslationId: 'CAREERS.CORE_VALUE.02.TITLE',
        description: 'description 02',
        image: 'image-02.png',
        srcSet: 'image-02.png 500w',
      },
    ],
  };

  beforeAll(() => {
    wrapper = mount(<WebCoreValues {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<WebCoreValues {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a Slider', () => {
    expect(wrapper.find(Slider)).toHaveLength(1);
  });
});
