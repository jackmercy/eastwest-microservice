import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

import { Content } from '../../../components';

import useStyles from './become.styles';

const Become = ({ title, data }) => {
  const classes = useStyles();
  const [isVisible, setVisibility] = useState(false);

  const handleVisibilityChange = (status) => {
    if (status) {
      setVisibility(status);
    }
  };

  return (
    <div className={classes.root}>
      <Content className={classes.content}>
        <h2 className={classes.title} data-test="become-title">
          {title}
        </h2>
        <div className={classes.listItems} data-test="become-list-items">
          {data.map((item) => (
            <div
              key={item.key}
              className={classes.itemWrapper}
              data-test="become-item"
            >
              <h2 className={classes.itemTitle}>{item.title}</h2>
              <div className={classes.itemGroup}>
                <img
                  alt={item.title}
                  src={item.image}
                  loading="lazy"
                  className={classes.itemImage}
                />
                <p className={classes.itemNumber}>
                  <CountUp
                    end={item.number}
                    start={isVisible ? 0 : null}
                    {...item.countUpConfigs}
                  >
                    {({ countUpRef }) => (
                      <VisibilitySensor
                        onChange={handleVisibilityChange}
                        delayedCall
                      >
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </p>
              </div>
              <p className={classes.itemDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </Content>
    </div>
  );
};
Become.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      countUpConfigs: PropTypes.shape({
        prefix: PropTypes.string,
        suffix: PropTypes.string,
      }).isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default memo(Become);
