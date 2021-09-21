import { stringify } from 'qs';

import { API_ENDPOINT } from '../../configs';

export { default } from '../../src/containers/NewsAndMedia';

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
    console.log('An error occured fetching top news');
    console.log(error);
  }

  return news;
};

const getLatestNews = async (page = 1) => {
  const limit = 5;
  const queries = {
    skip: 3 + limit * (page - 1),
    limit,
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
    console.log('An error occured latest news');
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

export const getServerSideProps = async ({ query }) => {
  const [categories, topNews, latestNews, newsRankings] = await Promise.all([
    getCategories(),
    getTopNews(),
    getLatestNews(query.page),
    getListRankings(),
  ]);

  return {
    // will be passed to the page component as props
    props: {
      totalNews: latestNews.count - 3, // sub 3 outstanding news
      categories: categories.data,
      topNews: topNews.data,
      newsByCategory:
        latestNews.data.length > 0 ? latestNews.data : topNews.data,
      newsRankings: newsRankings.data,
    },
  };
};
