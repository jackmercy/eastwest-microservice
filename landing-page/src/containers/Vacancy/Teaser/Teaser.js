import Link from 'next/link';
import { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { Content } from '../../components';

import useStyles from './teaser.styles';

const Teaser = ({ title, subTitle }) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className={classes.root} data-test="teaser-image">
      <Content className={classes.content}>
        <h1 className={classes.title} data-test="teaser-title">
          {title}
        </h1>
        <p className={classes.subTitle} data-test="teaser-sub-title">
          {subTitle}
        </p>
        <p className={classes.breadcrumb} data-test="teaser-breadcrumb">
          <Link href="/careers" passHref>
            <a href="/careers" className={classes.link}>
              {intl.formatMessage({ id: 'FOOTER.COMPANY.CAREERS' })}
            </a>
          </Link>
          <span className={classes.arrow}>
            <i className="icon-caret-right" />
          </span>
          <span className={classes.subLink}>{title}</span>
        </p>
      </Content>
    </div>
  );
};
Teaser.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default memo(Teaser);
