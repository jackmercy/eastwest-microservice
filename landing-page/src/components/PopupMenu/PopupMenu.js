import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useStyles from './popupMenu.styles';

const PopupMenu = forwardRef(
  ({ show, className, itemClassName, list, menuPosition }, ref) => {
    const classes = useStyles();

    return show ? (
      <ul
        ref={ref}
        className={classNames(classes.menu, menuPosition, className)}
      >
        {list.map((item) => (
          <li
            data-test="popup-menu-menu-item"
            key={item.key}
            // role="presentation"
            className={classNames(classes.menuItem, itemClassName)}
            // onClick={(e) => {
            //   e.preventDefault();
            //   e.stopPropagation();
            //   console.log('????');
            // }}
            // onClick={item.onClick}
          >
            {item.label}
          </li>
        ))}
      </ul>
    ) : null;
  },
);
PopupMenu.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      onClick: PropTypes.func,
    }),
  ).isRequired,
  menuPosition: PropTypes.oneOf(['left', 'right']),
  show: PropTypes.bool,
  className: PropTypes.string,
  itemClassName: PropTypes.string,
};
PopupMenu.defaultProps = {
  show: false,
  menuPosition: 'left',
  className: '',
  itemClassName: '',
};

export default memo(PopupMenu);
