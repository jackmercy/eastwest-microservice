import { stringify } from 'qs';

import { API_ENDPOINT } from '../../../configs';

export { default } from '../../../src/containers/NewsAndMediaDetails';

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

const getListRankings = async () => {
  const queries = {
    skip: 0,
    limit: 3,
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

const getNewsBySlug = async (slug) => {
  let result;
  try {
    const response = await fetch(`${API_ENDPOINT}/news/slug/${slug}`);
    result = await response.json();
  } catch (error) {
    console.log(`An error occured fetching news by slug ${slug}`);
    console.log(error);
  }

  return result;
};

const getAuthor = async (id) => {
  let result;
  try {
    const response = await fetch(`${API_ENDPOINT}/news-authors/${id}`);
    result = await response.json();
  } catch (error) {
    result = { firstName: '', lastName: '', avatar: '' };
    console.log(`An error occured fetching news author by id ${id}`);
    console.log(error);
  }

  return result;
};

const getComments = async (newsId) => {
  let result;
  const queries = {
    skip: 0,
    limit: 10,
    status: 'approved',
    parent: { $exists: false },
    sort: { createdAt: -1 },
    populate: 'user',
  };
  try {
    console.log(
      `${API_ENDPOINT}/news/${newsId}/comments?${stringify(queries)}`,
    );
    const response = await fetch(
      `${API_ENDPOINT}/news/${newsId}/comments?${stringify(queries)}`,
    );
    result = await response.json();
  } catch (error) {
    result = { count: 0, data: [] };
    console.log(`An error occured fetching comments by news id ${newsId}`);
    console.log(error);
  }

  return result;
};

export const getServerSideProps = async ({ params }) => {
  const [data, categories, listRankings] = await Promise.all([
    getNewsBySlug(params.slug),
    getCategories(),
    getListRankings(),
  ]);

  if (!data) {
    return { notFound: true };
  }

  const [author, comments] = await Promise.all([
    getAuthor(data.author),
    getComments(data.id),
  ]);

  // will be passed to the page component as props
  return {
    props: {
      data: { ...data, author },
      categories: categories.data,
      listRankings: listRankings.data,
      comments: comments.data,
    },
  };
};
