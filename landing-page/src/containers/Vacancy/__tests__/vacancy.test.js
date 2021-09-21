import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import preloadAll from 'jest-next-dynamic';

import { Footer, Header } from '../../components';
import Teaser from '../Teaser';
import Vacancy from '../Vacancy';

describe('Testing Vacancy', () => {
  let wrapper;
  const props = {
    data: {
      id: '123',
      title: 'Vacancy',
      subTitle: 'new vacancy',
      htmlContent: '<div>Content</div>',
      shortDescription: 'short description',
      tags: [],
    },
  };

  beforeAll(async () => {
    // Header and Footer included in AboutUs
    // And they are using dynamic import, see more in Header.js and Footer.js
    // So we need wait for it to load all before we can assert anything
    await preloadAll();
    wrapper = mount(<Vacancy {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Vacancy {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a Header', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('should have a Header', () => {
    expect(wrapper.find(Teaser)).toHaveLength(1);
  });

  it('should have a Footer', () => {
    expect(wrapper.find(Footer)).toHaveLength(1);
  });
});
