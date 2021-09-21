/**
 *
 * https://github.com/haibui2207/my-react-app/blob/master/src/utils/scrollToElement.js
 *
 */

import { isEdge, isFirefox, isIE } from './browsers';

const defaultScrollOffset = 0;
const defaultScrollOptions = { behavior: 'smooth' };

const getElementOffsetTop = (id, horizontal = false) => {
  const element = document.getElementById(id);

  if (!element) {
    return null;
  }

  // Currently this app using scroll horizontal so
  // if using scroll vertical change left to top
  const bodyRect = document.body.getBoundingClientRect()[
    horizontal ? 'left' : 'top'
  ];
  const elementRect = element.getBoundingClientRect()[
    horizontal ? 'left' : 'top'
  ];

  return elementRect - bodyRect;
};

const smoothScrollForOldBrowsers = (offsetPosition, horizontal = false) => {
  const { pageXOffset, pageYOffset } = window;
  const offset = horizontal ? pageXOffset : pageYOffset;

  const distance = Math.max(0, offsetPosition) - offset;
  const startTime = new Date().getTime();
  const defaultDuration = 999;
  const duration = Math.min(Math.abs(distance), defaultDuration);

  const timer = setInterval(() => {
    const speed = Math.min(1, (new Date().getTime() - startTime) / duration);
    const nextPosition = Math.max(
      0,
      Math.floor(
        offset +
          distance *
            (speed < 0.5 ? 2 * speed ** 2 : speed * (4 - speed * 2) - 1),
      ),
    );

    window.scrollTo(0, nextPosition);
    if (Math.floor(offsetPosition) === nextPosition) {
      clearInterval(timer);
    }
  }, 10);
};

const defaultOptions = {
  offset: defaultScrollOffset,
  options: defaultScrollOptions,
  horizontal: false,
};

const scrollToElement = (id, configs) => {
  const { offset, options, horizontal } = { ...defaultOptions, ...configs };
  const elementPosition = getElementOffsetTop(id, horizontal);

  if (elementPosition === null) return;

  const maxScrollOffset =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight -
    1;
  const offsetPosition = Math.min(elementPosition - offset, maxScrollOffset);

  if (isIE() || isEdge() || isFirefox()) {
    smoothScrollForOldBrowsers(offsetPosition, horizontal);
  } else {
    window.scrollTo({
      ...options,
      top: offsetPosition,
    });
  }
};

export default scrollToElement;
