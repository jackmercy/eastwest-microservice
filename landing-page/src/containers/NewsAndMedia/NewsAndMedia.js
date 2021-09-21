import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { SEO } from '../../components';
import { scrollToElement } from '../../utils';
import { DEFAULT_SEO, LANDING_PAGE_DOMAIN } from '../../../configs';
import { Layout, Header, Footer, Content } from '../components';

import Outstanding from './Outstanding';
import ListNews from './ListNews';
import ListRankings from './ListRankings';
import ListCategories from './ListCategories';
import useStyles from './newsAndMedia.styles';

const NewsAndMedia = ({
  totalNews,
  categories,
  topNews,
  newsByCategory,
  newsRankings,
}) => {
  const intl = useIntl();
  const router = useRouter();
  const classes = useStyles();
  const seo = useMemo(() => {
    const category = categories.find((c) => c.slug === router.query?.category);
    if (category) {
      return {
        title: `${DEFAULT_SEO.PAGES.NEWS_AND_MEDIA.title} - ${category.name}`,
        description: category.shortDescription,
        url: `${LANDING_PAGE_DOMAIN}/${router.asPath}`,
        keywords: category.tags.join(', '),
      };
    }

    return DEFAULT_SEO.PAGES.NEWS_AND_MEDIA;
  }, [router, categories]);

  useEffect(() => {
    if (router.query?.category) {
      setTimeout(() => {
        scrollToElement('list-categories');
      }, 200);
    }
  }, [router.query]);

  const handleSearch = useCallback(() => {}, []);

  return (
    <Layout>
      <SEO {...seo} />
      <Header />
      <Outstanding data={topNews} categories={categories} />
      <Content className={classes.content}>
        <h2 className={classes.title}>
          {intl.formatMessage({ id: 'NEWS.TITLE' })}
        </h2>
        <ListCategories
          data={categories}
          onSearch={handleSearch}
          className={classes.listCategories}
        />
        <ListNews
          totalNews={totalNews}
          data={newsByCategory}
          categories={categories}
          className={classes.listNews}
        />
        <ListRankings
          data={newsRankings}
          categories={categories}
          className={classes.listRankings}
        />
      </Content>
      <Footer />
    </Layout>
  );
};
const newsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
);
NewsAndMedia.propTypes = {
  totalNews: PropTypes.number,
  categories: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired }),
  ),
  topNews: newsPropTypes,
  newsByCategory: newsPropTypes,
  newsRankings: newsPropTypes,
};
NewsAndMedia.defaultProps = {
  totalNews: 0,
  topNews: [],
  categories: [],
  newsRankings: [],
  newsByCategory: [],
};

export default memo(NewsAndMedia);
