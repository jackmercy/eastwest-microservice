import React, { useState, memo, useRef, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { updateIntl } from 'react-intl-redux';

import intlMessages from '../../../../../intl';
import { storageUtil } from '../../../../../utils';
import { useOnClickOutside } from '../../../../../hooks';
import SectionTitle from '../SectionTitle';

import useStyles from './switchLanguages.styles';

const SwitchLanguages = () => {
  const ref = useRef();
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const languages = useMemo(
    () => ({
      en: {
        key: 'en',
        title: intl.formatMessage({ id: 'LANGUAGE.EN' }),
      },
      // vi: {
      //   key: 'vi',
      //   title: intl.formatMessage({ id: 'LANGUAGE.VI' }),
      // },
    }),
    [],
  );
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    // MVP disabled
    // setOpenMenu(!openMenu);
  };

  const handleItemClick = (locale) => {
    if (locale !== intl.locale) {
      storageUtil.setLocale(locale);
      dispatch(
        updateIntl({
          locale,
          messages: intlMessages[locale],
        }),
      );
    }
    setOpenMenu(false);
  };

  useOnClickOutside(ref, () => {
    setOpenMenu(false);
  });

  return (
    <div className={classes.root}>
      <SectionTitle
        title={intl.formatMessage({ id: 'FOOTER.SWITCH_LANGUAGES.TITLE' })}
        dataTest="switch-languages-title"
      />
      <div className={classes.content} ref={ref}>
        <span
          role="presentation"
          onClick={toggleMenu}
          className={classes.toggleButton}
          data-test="switch-languages-toggle-button"
        >
          <i className="icon-global" />
          {languages[intl.locale].title}
          <i className="icon-triangle-down" />
        </span>
        {openMenu ? (
          <ul className={classes.menu} data-test="switch-languages-menu">
            {Object.values(languages).map((item) => (
              <li
                key={`switch-language-${item.key}`}
                role="presentation"
                className={classes.menuItem}
                onClick={() => handleItemClick(item.key)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default memo(SwitchLanguages);
