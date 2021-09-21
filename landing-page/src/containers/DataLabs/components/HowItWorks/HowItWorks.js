import { memo } from 'react';
import PropTypes from 'prop-types';

import { Content } from '../../../components';

import useStyles from './howItWorks.styles';

const HowItWorks = ({ title, description, data }) => {
  const classes = useStyles();

  return (
    <Content className={classes.content}>
      <h2 className={classes.title} data-test="how-it-works-title">
        {title}
      </h2>
      <p className={classes.description} data-test="how-it-works-description">
        {description}
      </p>
      <div className={classes.listItems} data-test="how-it-works-list-items">
        {data.map((item) => (
          <div
            key={item.key}
            className={classes.itemWrapper}
            data-test="how-it-works-item"
          >
            <div className={classes.itemInfoWrapper}>
              <img
                alt={item.title}
                src={item.icon}
                className={classes.itemIcon}
              />
              <div>
                <h2 className={classes.itemTitle}>{item.title}</h2>
                <p className={classes.itemDescription}>{item.description}</p>
              </div>
            </div>
            <img
              alt={item.title}
              src={item.image}
              className={classes.itemImage}
            />
          </div>
        ))}
      </div>
    </Content>
  );
};
HowItWorks.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default memo(HowItWorks);
