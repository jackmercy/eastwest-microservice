import Link from 'next/link';
import { memo, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';

import { API_ENDPOINT } from '../../../../../configs';

import useStyles from './item.styles';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const Item = ({ data, dataTest, className }) => {
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
    <div className={classNames(classes.root, className)} data-test={dataTest}>
      <div className={classes.thumbnailWrapper}>
        <Link href={href.details} passHref>
          <a href={href.details}>
            <img
              ref={imgRef}
              className={classes.thumbnail}
              alt={data.title}
              src={`${API_ENDPOINT}/files/public/${data.thumbnail}`}
              onError={() => {
                if (imgRef.current) {
                  imgRef.current.src =
                    '/static/images/logo/east-west-no-text.svg';
                }
              }}
              loading="lazy"
              data-test="item-thumbnail"
            />
          </a>
        </Link>
      </div>
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
              maxLine="3"
              ellipsis="..."
              trimRight
              basedOn="words"
            />
          </a>
        </Link>
        <div className={classes.description} data-test="item-description">
          <ResponsiveEllipsis
            text={data.shortDescription}
            maxLine="4"
            ellipsis="..."
            trimRight
            basedOn="words"
          />
        </div>
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
    shortDescription: PropTypes.string.isRequired,
  }).isRequired,
  dataTest: PropTypes.string,
  className: PropTypes.string,
};
Item.defaultProps = { dataTest: '', className: '' };

export default memo(Item);
