import { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Item from './Item';
import useStyles from './listRankings.styles';

const ListRankings = ({ data, categories, className }) => {
  const classes = useStyles();

  return data && data.length > 0 ? (
    <div className={classNames(classes.root, className)}>
      {data.slice(0, 5).map((item, index) => (
        <Item
          key={item.id}
          index={index + 1}
          data={{
            ...item,
            category: categories.find((c) => c.id === item.category),
          }}
        />
      ))}
    </div>
  ) : null;
};
ListRankings.propTypes = {
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
ListRankings.defaultProps = {
  data: [],
  categories: [],
  className: '',
};

export default memo(ListRankings);
