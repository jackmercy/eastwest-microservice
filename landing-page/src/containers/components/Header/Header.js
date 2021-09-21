import { memo } from 'react';
import { useMediaQuery } from 'react-responsive';

import BREAKPOINTS from '../../../constants/BREAKPOINTS';

import WebHeader from './WebHeader';
import MobileHeader from './MobileHeader';

const Header = () => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${BREAKPOINTS.maxMd}px)`,
  });

  return !isMobile ? <WebHeader /> : <MobileHeader />;
};

export default memo(Header);
