import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import preloadAll from 'jest-next-dynamic';

import { Footer, Header } from '../../components';
import Content from '../Content';
import Terms from '../Terms';

describe('Testing Terms', () => {
  let wrapper;

  beforeAll(async () => {
    // Header and Footer included in AboutUs
    // And they are using dynamic import, see more in Header.js and Footer.js
    // So we need wait for it to load all before we can assert anything
    await preloadAll();
    wrapper = mount(<Terms />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Terms />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a Header', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('should have a Footer', () => {
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it('should have a Terms Content', () => {
    expect(wrapper.find(Content)).toHaveLength(1);
  });

  describe('Testing Teaser section', () => {
    it('should have a teaser title', () => {
      expect(wrapper.find('[data-test="terms-teaser-title"]')).toHaveLength(
        1,
      );
    });

    it('should have a teaser image', () => {
      expect(wrapper.find('[data-test="terms-teaser-image"]')).toHaveLength(
        1,
      );
    });
  });
});
