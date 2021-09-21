import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { SectionTitle } from '../../../components';
import MobileCoreValues from '../MobileCoreValues';

describe('Testing Careers > CoreValues > MobileCoreValues', () => {
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
    wrapper = mount(<MobileCoreValues {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<MobileCoreValues {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have number items equal with data input', () => {
    expect(wrapper.find('[data-test="mobile-core-value-item"]')).toHaveLength(
      props.data.length,
    );
  });

  it('each item should have a sub title', () => {
    expect(
      wrapper.find('[data-test="mobile-core-value-sub-title"]'),
    ).toHaveLength(props.data.length);
  });

  it('each item should have SectionTitle', () => {
    expect(wrapper.find(SectionTitle)).toHaveLength(props.data.length);
  });

  it('each item should have a description', () => {
    expect(
      wrapper.find('[data-test="mobile-core-value-description"]'),
    ).toHaveLength(props.data.length);
  });

  it('each item should have a cover image', () => {
    expect(wrapper.find('[data-test="mobile-core-value-image"]')).toHaveLength(
      props.data.length,
    );
  });
});
