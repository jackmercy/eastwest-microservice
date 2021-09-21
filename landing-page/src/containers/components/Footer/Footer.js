import React, { memo } from 'react';
import { useMediaQuery } from 'react-responsive';

import BREAKPOINTS from '../../../constants/BREAKPOINTS';

import WebFooter from './WebFooter';
import MobileFooter from './MobileFooter';

const Footer = () => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${BREAKPOINTS.maxMd}px)`,
  });

  return !isMobile ? <WebFooter /> : <MobileFooter />;
};

export default memo(Footer);
