import { useRouter } from 'next/router';
import { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import ReactPaginate from 'react-paginate';

import Item from './Item';
import useStyles from './listNews.styles';

const ITEM_PER_PAGE = 5;

const ListNews = ({ data, categories, totalNews, className }) => {
  const intl = useIntl();
  const classes = useStyles();
  const router = useRouter();
  const currentPage = useMemo(() => router.query?.page - 1 || 0, [router]);

  const handlePageChange = useCallback(
    ({ selected }) => {
      router.push({
        pathname: window.location.pathname,
        query: { page: selected + 1 },
      });
    },
    [router],
  );

  return data && data.length > 0 ? (
    <div className={classNames(classes.root, className)}>
      {data.slice(0, ITEM_PER_PAGE).map((item) => (
        <Item
          key={item.id}
          data={{
            ...item,
            category: categories.find((c) => c.id === item.category),
          }}
          dataTest="list-news-item"
        />
      ))}
      {totalNews > ITEM_PER_PAGE ? (
        <ReactPaginate
          previousLabel={intl.formatMessage({ id: 'NEWS.PAGINATION.BACK' })}
          nextLabel={intl.formatMessage({ id: 'NEWS.PAGINATION.NEXT' })}
          breakLabel="..."
          pageCount={Math.ceil(totalNews / ITEM_PER_PAGE)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          forcePage={currentPage}
          onPageChange={handlePageChange}
          containerClassName={classes.paginationContainer}
          activeLinkClassName={classes.paginationActiveLink}
          pageClassName={classes.paginationButton}
          previousClassName={classes.paginationButton}
          nextClassName={classes.paginationButton}
          previousLinkClassName={classes.paginationLink}
          nextLinkClassName={classes.paginationLink}
          pageLinkClassName={classes.paginationLink}
        />
      ) : null}
    </div>
  ) : (
    <p className={classNames(classes.empty, className)}>
      {intl.formatMessage({ id: 'NEWS.EMPTY' })}
    </p>
  );
};
ListNews.propTypes = {
  totalNews: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
    }),
  ),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
  className: PropTypes.string,
};
ListNews.defaultProps = {
  data: [],
  categories: [],
  className: '',
};

export default memo(ListNews);
