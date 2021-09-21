import Link from 'next/link';
import { memo, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import { SectionTitle } from '../components';

import useStyles from './opportunities.styles';

const Opportunities = ({ id, categories, vacancies }) => {
  const intl = useIntl();
  const classes = useStyles();
  const [activatedTab, setActiveTab] = useState({
    index: 0,
    category: undefined,
  });
  const displayedVacancies = useMemo(
    () =>
      vacancies.data.filter((vacancy) =>
        (activatedTab.category
          ? activatedTab.category === vacancy.category
          : vacancy)),
    [activatedTab, vacancies],
  );

  return (
    <>
      <SectionTitle
        id={id}
        translateId="CAREERS.OPPORTUNITIES.TITLE"
        className={classes.sectionTitle}
      />
      <p className={classes.description}>
        {intl.formatMessage({ id: 'CAREERS.OPPORTUNITIES.DESCRIPTION' })}
      </p>
      <ul className={classNames('hide-scrollbar', classes.tabs)}>
        <li
          role="presentation"
          className={classNames(
            classes.tab,
            activatedTab.index === 0 && 'active',
          )}
          onClick={() => {
            setActiveTab({ index: 0, category: undefined });
          }}
        >
          {intl.formatMessage(
            { id: 'CAREERS.OPPORTUNITIES.TABS.ALL' },
            { count: vacancies.count },
          )}
        </li>
        {categories.data.map((item, index) => {
          const count = vacancies.data.filter(
            (vacancy) => item.id === vacancy.category,
          ).length;

          return count > 0 ? (
            <li
              key={item.id}
              role="presentation"
              className={classNames(
                classes.tab,
                activatedTab.index === index + 1 && 'active',
              )}
              onClick={() => {
                setActiveTab({ index: index + 1, category: item.id });
              }}
            >
              {`${item.name} (${count})`}
            </li>
          ) : null;
        })}
      </ul>
      <div className={classNames('custom-scrollbar', classes.content)}>
        {displayedVacancies.map((item) => (
          <div key={item.id} className={classes.vacancy}>
            <Link href={`/vacancy/${item.slug}`} passHref>
              <a href="/#" className={classes.vacancyTitle}>
                {item.title}
                <i className="icon-arrow-right" />
              </a>
            </Link>
            <p className={classes.vacancyDescription}>{item.subTitle}</p>
          </div>
        ))}
      </div>
    </>
  );
};
Opportunities.propTypes = {
  id: PropTypes.string.isRequired,
  categories: PropTypes.shape({
    count: PropTypes.number,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ),
  }),
  vacancies: PropTypes.shape({
    count: PropTypes.number,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        subTitle: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
      }),
    ),
  }),
};
Opportunities.defaultProps = {
  categories: { count: 0, data: [] },
  vacancies: { count: 0, data: [] },
};

export default memo(Opportunities);
