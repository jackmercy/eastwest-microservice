import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import JobDescription from '../JobDescription';

describe('Testing Vacancy > JobDescription', () => {
  let wrapper;
  const props = {
    htmlContent: '<div>content</div>',
    onApply: jest.fn(),
  };

  beforeAll(() => {
    wrapper = mount(<JobDescription {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<JobDescription {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should preview the job', () => {
    expect(wrapper.find('[data-test="job-description-preview"]')).toHaveLength(
      1,
    );
  });

  it('should have a button', () => {
    expect(wrapper.find('[data-test="job-description-button"]')).toHaveLength(
      1,
    );
  });
});
