import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Slider from 'react-slick';

import CustomCarousel from '../CustomCarousel';

describe('Testing DataLabs > Brands > Reviews > CustomCarousel', () => {
  let wrapper;
  const props = {
    data: [
      {
        name: 'Ninh Lương',
        review:
          // eslint-disable-next-line max-len
          'Our business relies entirly on the feedback of consumers. We print and develop packaging for product in every day use. Understanding exactly what the end consumers needs are, allows us to better develop solutions for our clients and literally gives us the edge over our competitors.',
        avatar: '/static/images/logo/east-west-no-text.svg',
      },
    ],
  };

  beforeAll(() => {
    wrapper = mount(<CustomCarousel {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<CustomCarousel {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have Slider', () => {
    expect(wrapper.find(Slider)).toHaveLength(1);
  });

  it('should have a custom prev button', () => {
    expect(
      wrapper.find('[data-test="custom-carousel-button-prev"]'),
    ).toHaveLength(1);
  });

  it('should have a custom next button', () => {
    expect(
      wrapper.find('[data-test="custom-carousel-button-next"]'),
    ).toHaveLength(1);
  });
});
