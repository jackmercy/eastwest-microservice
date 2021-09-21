import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import MobileImages from '../MobileImages';

describe('Testing HomePage > OurOffice > MobileImages', () => {
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

  it('should render match snapshot', () => {
    const wrapper = shallow(<MobileImages {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
