import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useStyles from './tooltip.styles';

const Tooltip = ({
  visible,
  offsetX,
  offsetY,
  sideOffset,
  className,
  children,
}) => {
  const ref = useRef();
  const classes = useStyles();
  const [state, setState] = useState({ clientX: 0, clientY: 0 });

  const getMousePosition = useCallback(({ clientX, clientY }) => {
    setState({ clientX, clientY });
  }, []);

  const addListener = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', getMousePosition);
    }
  }, [getMousePosition]);

  const removeListener = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', getMousePosition);
      setState({ clientX: 0, clientY: 0 });
    }
  }, [getMousePosition]);

  useEffect(() => removeListener, []);

  useEffect(() => {
    if (visible) {
      addListener();
    } else {
      removeListener();
    }
  }, [visible]);

  const getTopPosition = () => {
    if (typeof window !== 'undefined' && ref.current) {
      const { height } = ref.current.getBoundingClientRect();
      if (state.clientY > window.innerHeight - height) {
        return state.clientY - height - offsetY;
      }
      return state.clientY + offsetY;
    }

    return state.clientY + offsetY;
  };

  const getLeftPosition = () => {
    if (typeof window !== 'undefined' && ref.current) {
      const { width } = ref.current.getBoundingClientRect();
      if (state.clientX - width / 2 + offsetX - sideOffset < 0) {
        return sideOffset;
      }
      if (
        state.clientX + width / 2 + offsetX + sideOffset >
        window.innerWidth
      ) {
        return window.innerWidth - width - offsetX - sideOffset;
      }

      return state.clientX - width / 2 + offsetX;
    }

    return state.clientX + offsetX;
  };

  return (
    <div
      ref={ref}
      className={classNames(classes.root, className)}
      style={{
        visibility:
          visible &&
          state.clientX !== 0 &&
          state.clientY !== 0 &&
          ref.current !== undefined
            ? 'visible'
            : 'hidden',
        top: getTopPosition(),
        left: getLeftPosition(),
      }}
    >
      {children}
    </div>
  );
};
Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
  offsetX: PropTypes.number,
  offsetY: PropTypes.number,
  // Offset when element got left/right edge
  sideOffset: PropTypes.number,
  className: PropTypes.string,
};
Tooltip.defaultProps = {
  visible: true,
  offsetX: 0,
  offsetY: 0,
  sideOffset: 16,
  className: '',
};

export default memo(Tooltip);
