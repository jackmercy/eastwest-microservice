import { memo } from 'react';
import PropTypes from 'prop-types';

import { Content } from '../../components';

import Item from './Item';
import useStyles from './outstanding.styles';

const Outstanding = ({ data, categories }) => {
  const classes = useStyles();

  return data && data.length > 0 ? (
    <Content className={classes.root}>
      <div className={classes.main}>
        <Item
          data={{
            ...data[0],
            category: categories.find((c) => c.id === data[0]?.category),
          }}
          main
          className={classes.mainItem}
          dataTest="outstanding-main-item"
        />
      </div>
      <div className={classes.others}>
        {data.slice(1, 3).map((item) => (
          <Item
            key={item.id}
            data={{
              ...item,
              category: categories.find((c) => c.id === item.category),
            }}
            className={classes.otherItem}
            size="small"
            dataTest="outstanding-sub-item"
          />
        ))}
      </div>
    </Content>
  ) : null;
};
Outstanding.propTypes = {
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
};
Outstanding.defaultProps = {
  data: [],
  categories: [],
};

export default memo(Outstanding);
