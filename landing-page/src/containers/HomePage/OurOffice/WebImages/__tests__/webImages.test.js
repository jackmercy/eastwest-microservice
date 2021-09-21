import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import WebImages from '../WebImages';

describe('Testing HomePage > OurOffice > WebImages', () => {
  let wrapper;
  const props = {
    images: [
      {
        key: 'cover-1',
        src: '/static/images/homepage/office-01.png',
        srcSet: [
          '/static/images/homepage/office-01.png 500w',
          '/static/images/homepage/office-01@2x.png 1500w',
          '/static/images/homepage/office-01@3x.png 2000w',
        ].join(', '),
      },
      {
        key: 'cover-2',
        src: '/static/images/homepage/office-02.png',
        srcSet: [
          '/static/images/homepage/office-02.png 500w',
          '/static/images/homepage/office-02@2x.png 1500w',
          '/static/images/homepage/office-02@3x.png 2000w',
        ].join(', '),
      },
    ],
  };

  beforeAll(() => {
    wrapper = mount(<WebImages {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<WebImages {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have some images', () => {
    expect(wrapper.find('[data-test="web-images-image"]')).toHaveLength(
      props.images.length,
    );
  });
});
