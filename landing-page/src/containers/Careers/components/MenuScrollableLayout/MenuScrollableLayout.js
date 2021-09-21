import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { scrollToElement } from '../../../../utils';
import { useEventListener } from '../../../../hooks';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

import useStyles from './menuScrollableLayout.styles';

const MenuScrollableLayout = ({
  menuConfigs,
  children,
  className,
  menuClassName,
  contentClassName,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const ids = useMemo(() => menuConfigs.map((item) => item.id), [menuConfigs]);
  const savingIdRects = useRef([
    // eslint-disable-next-line prefer-spread
    ...Array.apply(null, Array(ids.length)).map(() => ({
      offset: 0,
      limitUp: 0,
      limitDown: 0,
    })),
  ]);
  const [activatedMenu, setActiveMenu] = useState(ids[0]);

  useEffect(() => {
    setTimeout(() => {
      if (window.innerWidth > BREAKPOINTS.maxMd) {
        ids.forEach((id, index) => {
          const element = document.getElementById(id);
          if (element) {
            const offset = element.offsetTop;
            savingIdRects.current[index].offset = offset;

            if (index === 0) {
              savingIdRects.current[index].limitUp = 0;
            } else {
              const limit =
                savingIdRects.current[index - 1].offset +
                (offset - savingIdRects.current[index - 1].offset) / 2;
              savingIdRects.current[index - 1].limitDown = limit;
              savingIdRects.current[index].limitUp = limit;
            }
            if (index === ids.length - 1) {
              const { body, documentElement: html } = document;
              const height = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight,
              );
              savingIdRects.current[index].limitDown = height;
            }
          }
        });
      }
    }, 500);
  }, []);

  useEventListener(
    'scroll',
    () => {
      let activated = activatedMenu;
      savingIdRects.current.forEach((item, index) => {
        if (window.scrollY >= item.limitUp && window.scrollY < item.limitDown) {
          activated = ids[index];
        }
      });
      if (activated !== activatedMenu) {
        setActiveMenu(activated);
      }
    },
    true,
  );

  const handleScrollToId = useCallback((e, id) => {
    e.preventDefault();
    window.history.pushState({}, '', `${router.pathname}#${id}`);
    scrollToElement(id);
  }, []);

  return (
    <div className={classNames(classes.root, className)}>
      <ul
        className={classNames(classes.menu, menuClassName)}
        data-test="menu-scrollable-layout-menu"
      >
        {menuConfigs.map((item) => (
          <li
            key={item.id}
            className={classes.menuItem}
            data-test="menu-scrollable-layout-menu-item"
          >
            <Link href={`${router.pathname}#${item.id}`} passHref>
              <a
                href={`${router.pathname}#${item.id}`}
                className={classNames(classes.menuLink, {
                  active: item.id === activatedMenu,
                })}
                onClick={(e) => handleScrollToId(e, item.id)}
              >
                {item.label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <div className={classNames(classes.content, contentClassName)}>
        {children}
      </div>
    </div>
  );
};
MenuScrollableLayout.propTypes = {
  menuConfigs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  menuClassName: PropTypes.string,
  contentClassName: PropTypes.string,
};
MenuScrollableLayout.defaultProps = {
  className: '',
  menuClassName: '',
  contentClassName: '',
};

export default memo(MenuScrollableLayout);
