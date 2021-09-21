import { memo, useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

import { Content } from '../../components';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

import Tooltip from './Tooltip';
import useStyles from './products.styles';

const Products = () => {
  const intl = useIntl();
  const classes = useStyles();
  const isMobile = useMediaQuery({
    query: `(max-width: ${BREAKPOINTS.maxMd}px)`,
  });
  const [tooltipState, setTooltipState] = useState({
    visible: false,
    activeContent: -1,
  });

  const handleMouseEnter = (activeContent) => {
    setTimeout(() => {
      if (!tooltipState.visible) {
        setTooltipState({ visible: true, activeContent });
      }
    }, 50);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (tooltipState.visible) {
        setTooltipState({ visible: false, activeContent: -1 });
      }
    }, 50);
  };

  // eslint-disable-next-line react/prop-types
  const TooltipContent = ({ title, image }) => (
    <>
      <h2 className={classes.tooltipTitle}>{title}</h2>
      <img
        loading="lazy"
        alt={title}
        src={image}
        className={classes.tooltipImage}
      />
    </>
  );

  const renderTooltipContent = useCallback(() => {
    switch (tooltipState.activeContent) {
      case 1:
        return (
          <TooltipContent
            image="/static/images/talent-labs/progress-01.svg"
            title={intl.formatMessage({
              id: 'TALENT_LABS.PRODUCTS.MODAL.PROGRESS.01.TITLE',
            })}
          />
        );
      case 2:
        return (
          <TooltipContent
            image="/static/images/talent-labs/progress-02.svg"
            title={intl.formatMessage({
              id: 'TALENT_LABS.PRODUCTS.MODAL.PROGRESS.02.TITLE',
            })}
          />
        );
      case 3:
        return (
          <TooltipContent
            image="/static/images/talent-labs/progress-03.svg"
            title={intl.formatMessage({
              id: 'TALENT_LABS.PRODUCTS.MODAL.PROGRESS.03.TITLE',
            })}
          />
        );
      case 4:
        return (
          <TooltipContent
            image="/static/images/talent-labs/progress-04.svg"
            title={intl.formatMessage({
              id: 'TALENT_LABS.PRODUCTS.MODAL.PROGRESS.04.TITLE',
            })}
          />
        );
      default:
        return <span>empty</span>;
    }
  }, [classes, tooltipState, intl]);

  const TooltipPointers = () =>
    (!isMobile ? (
      <>
        <div
          tabIndex="-1"
          role="presentation"
          className={classNames(classes.step, classes.step1)}
          onMouseOver={() => {
            handleMouseEnter(1);
          }}
          onMouseOut={handleMouseLeave}
          onFocus={() => {}}
          onBlur={() => {}}
        />
        <div
          tabIndex="-1"
          role="presentation"
          className={classNames(classes.step, classes.step2)}
          onMouseOver={() => {
            handleMouseEnter(2);
          }}
          onMouseOut={handleMouseLeave}
          onFocus={() => {}}
          onBlur={() => {}}
        />
        <div
          tabIndex="-1"
          role="presentation"
          className={classNames(classes.step, classes.step3)}
          onMouseOver={() => {
            handleMouseEnter(3);
          }}
          onMouseOut={handleMouseLeave}
          onFocus={() => {}}
          onBlur={() => {}}
        />
        <div
          tabIndex="-1"
          role="presentation"
          className={classNames(classes.step, classes.step4)}
          onMouseOver={() => {
            handleMouseEnter(4);
          }}
          onMouseOut={handleMouseLeave}
          onFocus={() => {}}
          onBlur={() => {}}
        />
        <Tooltip
          className={classes.tooltip}
          visible={tooltipState.visible}
          offsetY={10}
        >
          {renderTooltipContent()}
        </Tooltip>
      </>
    ) : null);

  return (
    <Content className={classes.root}>
      <h2 className={classes.title} data-test="products-title">
        {intl.formatMessage({ id: 'TALENT_LABS.PRODUCTS.TITLE' })}
      </h2>
      <p className={classes.description} data-test="products-description">
        {intl.formatMessage({ id: 'TALENT_LABS.PRODUCTS.DESCRIPTION' })}
      </p>
      <img
        alt="products"
        loading="lazy"
        className={classes.productImage}
        src="/static/images/talent-labs/product.png"
        srcSet={[
          '/static/images/talent-labs/product.png 500w',
          '/static/images/talent-labs/product@2x.png 1500w',
          '/static/images/talent-labs/product@3x.png 2000w',
        ].join(', ')}
      />
      <h2
        className={classNames(classes.title, classes.howItWorkTitle)}
        data-test="products-how-it-work-title"
      >
        {intl.formatMessage({ id: 'TALENT_LABS.PRODUCTS.HOW_IT_WORK' })}
      </h2>
      <div onMouseLeave={handleMouseLeave} className={classes.productSteps}>
        <img
          alt="products"
          loading="lazy"
          className={classes.productStepsImage}
          src={
            !isMobile
              ? '/static/images/talent-labs/product-steps.svg'
              : '/static/images/talent-labs/product-steps-mobile.svg'
          }
        />
        <TooltipPointers />
      </div>
    </Content>
  );
};

export default memo(Products);
