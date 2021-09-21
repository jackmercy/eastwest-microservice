/* eslint-disable no-unused-vars */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

import { InputSearch } from '../../../components';
import { useOnClickOutside } from '../../../hooks';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

import useStyles from './listCategories.styles';

const ListCategories = ({ data, onSearch, className }) => {
  const intl = useIntl();
  const router = useRouter();
  const moreRef = useRef();
  const classes = useStyles();
  const isMobile = useMediaQuery({
    query: `(max-width: ${BREAKPOINTS.maxMd}px)`,
  });
  const [activeCategory, setActiveCategory] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const categoriesDisplayed = useMemo(() => (isMobile ? 100 : 5), [isMobile]);
  const listCategories = useMemo(
    () => [
      { id: '', name: intl.formatMessage({ id: 'NEWS.CATEGORY.LATEST' }) },
      ...data,
    ],
    [intl],
  );
  const moreCategories = useMemo(
    () => listCategories.slice(categoriesDisplayed),
    [listCategories, categoriesDisplayed],
  );

  useEffect(() => {
    const index = data.findIndex((c) => c.slug === router.query?.category);
    setActiveCategory(index + 1);
  }, [router, data]);

  const handleMoreClick = useCallback(() => {
    setOpenPopup(!openPopup);
  }, [openPopup]);

  useOnClickOutside(moreRef, () => {
    setOpenPopup(false);
  });

  const renderSlug = useCallback(
    (slug) => (slug ? `/news-and-media/${slug}` : '/news-and-media'),
    [],
  );

  return (
    <div id="list-categories" className={classNames(classes.root, className)}>
      <ul
        className={classNames('hide-scrollbar', classes.list)}
        data-test="list-categories-list"
      >
        {listCategories.slice(0, categoriesDisplayed).map((item, index) => (
          <li
            key={item.id}
            className={classNames(
              classes.listItem,
              activeCategory === index && 'active',
            )}
          >
            <Link href={renderSlug(item.slug)} passHref>
              <a href={renderSlug(item.slug)} className={classes.link}>
                {item.name}
              </a>
            </Link>
          </li>
        ))}
        {!isMobile && moreCategories.length > 0 ? (
          <li
            ref={moreRef}
            role="presentation"
            className={classNames(
              classes.listItem,
              classes.moreItems,
              openPopup && 'open',
              activeCategory >= categoriesDisplayed && 'active',
            )}
            onClick={handleMoreClick}
          >
            {intl.formatMessage({ id: 'NEWS.CATEGORY.MORE' })}
            <i className="icon-triangle-down" />
            {openPopup ? (
              <ul className={classNames('custom-scrollbar', classes.popupList)}>
                {moreCategories.map((item, index) => (
                  <li
                    key={item.id}
                    className={classNames(
                      classes.popupListItem,
                      activeCategory === categoriesDisplayed + index &&
                        'active',
                    )}
                  >
                    <Link href={renderSlug(item.slug)} passHref>
                      <a href={renderSlug(item.slug)} className={classes.link}>
                        {item.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ) : null}
      </ul>
      {/* MVP hidden */}
      {/* <InputSearch
        size="small"
        onSearch={onSearch}
        className={classes.inputSearch}
        inputClassName={classes.inputClassName}
        placeholder={intl.formatMessage({ id: 'NEWS.SEARCH' })}
        dataTest="list-categories-input-search"
      /> */}
    </div>
  );
};
ListCategories.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }),
  ),
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
};
ListCategories.defaultProps = {
  data: [],
  className: '',
};

export default memo(ListCategories);
