import Link from 'next/link';
import { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Content } from '../../components';

import useStyles from './breadcrumb.styles';

const Breadcrumb = ({ paths }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Content className={classNames('hide-scrollbar', classes.content)}>
        {paths.map((path, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            {path.href ? (
              <Link href={path.href} passHref>
                <a href={path.href} className={classes.link} title={path.label}>
                  {path.label}
                </a>
              </Link>
            ) : (
              <span
                href={path.href}
                className={classes.subLink}
                title={path.label}
              >
                {path.label}
              </span>
            )}
            {index < paths.length - 1 ? (
              <span className={classes.arrow}>
                <i className="icon-caret-right" />
              </span>
            ) : null}
          </Fragment>
        ))}
      </Content>
    </div>
  );
};
Breadcrumb.propTypes = {
  paths: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    }),
  ).isRequired,
};

export default memo(Breadcrumb);
