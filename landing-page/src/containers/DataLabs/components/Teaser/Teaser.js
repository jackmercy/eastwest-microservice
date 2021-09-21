import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import { Content } from '../../../components';
import { Button, Logo } from '../../../../components';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

import useStyles from './teaser.styles';

const Teaser = ({
  image,
  mobileImage,
  purpose,
  description,
  otherText,
  isBrands,
  defaultReason,
}) => {
  const intl = useIntl();
  const router = useRouter();
  const classes = useStyles();
  const isMobile = useMediaQuery({
    query: `(max-width: ${BREAKPOINTS.maxSm}px)`,
  });

  const handleMoreClick = useCallback(() => {
    router.push(
      { pathname: window.location.pathname, query: { isBrands: !isBrands } },
      window.location.pathname,
    );
  }, [router, isBrands]);

  return (
    <div
      className={classes.root}
      style={{ backgroundImage: `url(${isMobile ? mobileImage : image})` }}
      data-test="teaser-cover-image"
    >
      <Content className={classes.contentLayout}>
        <div className={classes.content}>
          <Logo type="data-labs" className={classes.logo} />
          <p className={classes.purpose} data-test="teaser-purpose">
            {purpose}
          </p>
          <p className={classes.description} data-test="teaser-description">
            {description}
          </p>
          <div className={classes.buttonGroup}>
            <Link
              href={`/contact/?defaultReason=${defaultReason}#contact-form`}
              passHref
              as="/contact/#contact-form"
            >
              <Button
                tag="a"
                size="large"
                color="primary"
                keepSizeOnMobile
                className={classes.button}
                dataTest="teaser-button-get-started"
              >
                {intl.formatMessage({ id: 'DATA_LABS.TEASER.BUTTON' })}
              </Button>
            </Link>
            <Button
              tag="a"
              size="large"
              color="tertiary"
              keepSizeOnMobile
              onClick={handleMoreClick}
              className={classes.button}
              dataTest="teaser-button-more"
            >
              {otherText}
              <i className="icon-arrow-right" />
            </Button>
          </div>
        </div>
      </Content>
    </div>
  );
};
Teaser.propTypes = {
  image: PropTypes.string.isRequired,
  mobileImage: PropTypes.string.isRequired,
  purpose: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  otherText: PropTypes.string.isRequired,
  defaultReason: PropTypes.number.isRequired,
  isBrands: PropTypes.bool,
};
Teaser.defaultProps = {
  isBrands: false,
};

export default memo(Teaser);
