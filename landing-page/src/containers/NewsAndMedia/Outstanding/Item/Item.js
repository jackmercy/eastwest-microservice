import Link from 'next/link';
import { memo, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';

import { API_ENDPOINT } from '../../../../../configs';

import useStyles from './item.styles';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const Item = ({ data, size, main, dataTest, className }) => {
  const imgRef = useRef();
  const classes = useStyles();
  const href = useMemo(
    () => ({
      category: `/news-and-media/${data.category.slug}`,
      details: `/news-and-media/${data.category.slug}/${data.slug}`,
    }),
    [data],
  );

  return (
    <div
      className={classNames(classes.root, size, main && 'main', className)}
      data-test={dataTest}
    >
      <Link href={href.details} passHref>
        <a href={href.details}>
          <img
            ref={imgRef}
            className={classes.thumbnail}
            alt={data.title}
            src={`${API_ENDPOINT}/files/public/${data.thumbnail}`}
            onError={() => {
              if (imgRef.current) {
                imgRef.current.src = '/static/images/logo/east-west.svg';
              }
            }}
            data-test="item-thumbnail"
            loading="lazy"
          />
        </a>
      </Link>
      <div className={classes.content}>
        <Link href={href.category} passHref>
          <a
            href={href.category}
            className={classes.category}
            data-test="item-category"
          >
            {data.category.name}
          </a>
        </Link>
        <Link href={href.details} passHref>
          <a
            href={href.details}
            className={classes.title}
            title={data.title}
            data-test="item-title"
          >
            <ResponsiveEllipsis
              text={data.title}
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="words"
            />
          </a>
        </Link>
      </div>
    </div>
  );
};
Item.propTypes = {
  data: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }).isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
  size: PropTypes.oneOf(['medium', 'small']),
  main: PropTypes.bool,
  dataTest: PropTypes.string,
  className: PropTypes.string,
};
Item.defaultProps = {
  main: false,
  size: 'medium',
  dataTest: '',
  className: '',
};

export default memo(Item);
