import { stringify } from 'qs';

import { API_ENDPOINT } from '../../../configs';

export { default } from '../../../src/containers/NewsAndMedia';

const getCategories = async () => {
  const queries = {
    skip: 0,
    limit: 100,
    // lanuage: 'en', // TODO enable later
    sort: { name: 1 },
  };
  let categories;
  try {
    const response = await fetch(
      `${API_ENDPOINT}/news-categories?${stringify(queries)}`,
    );
    categories = await response.json();
  } catch (error) {
    categories = { count: 0, data: [] };
    console.log('An error occured fetching news categories');
    console.log(error);
  }

  return categories;
};

const getTopNews = async () => {
  const queries = {
    skip: 0,
    limit: 3,
    status: 'public',
    // lanuage: 'en', // TODO enable later
    sort: { updatedAt: -1 },
  };
  let news;
  try {
    const response = await fetch(`${API_ENDPOINT}/news?${stringify(queries)}`);
    news = await response.json();
  } catch (error) {
    news = { count: 0, data: [] };
    console.log('An error occured fetching news');
    console.log(error);
  }

  return news;
};

const getNewsByCategory = async (categoryId, page = 1) => {
  const limit = 5;
  const queries = {
    skip: limit * (page - 1),
    limit,
    status: 'public',
    // lanuage: 'en', // TODO enable later
    sort: { updatedAt: -1 },
    category: categoryId,
  };
  let news;
  try {
    const response = await fetch(`${API_ENDPOINT}/news?${stringify(queries)}`);
    news = await response.json();
  } catch (error) {
    news = { count: 0, data: [] };
    console.log(`An error occured fetching news by category id: ${categoryId}`);
    console.log(error);
  }

  return news;
};

const getListRankings = async () => {
  const queries = {
    skip: 0,
    limit: 5,
    status: 'public',
    // lanuage: 'en', // TODO enable later
    sort: { views: -1, likes: -1, shares: -1, comments: -1 },
  };
  let news;
  try {
    const response = await fetch(`${API_ENDPOINT}/news?${stringify(queries)}`);
    news = await response.json();
  } catch (error) {
    news = { count: 0, data: [] };
    console.log('An error occured fetching news rankings');
    console.log(error);
  }

  return news;
};

export const getServerSideProps = async ({ params, query }) => {
  const [categories, topNews, newsRankings] = await Promise.all([
    getCategories(),
    getTopNews(),
    getListRankings(),
  ]);
  const category = categories.data.find((c) => c.slug === params.category);
  const newsByCategory = await getNewsByCategory(category.id, query.page);

  return {
    // will be passed to the page component as props
    props: {
      totalNews: newsByCategory.count,
      categories: categories.data,
      topNews: topNews.data,
      newsByCategory: newsByCategory.data,
      newsRankings: newsRankings.data,
    },
  };
};
