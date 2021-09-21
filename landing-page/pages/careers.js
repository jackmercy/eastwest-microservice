import { stringify } from 'qs';

import { API_ENDPOINT } from '../configs';

export { default } from '../src/containers/Careers';

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
      `${API_ENDPOINT}/vacancy-categories?${stringify(queries)}`,
    );
    categories = await response.json();
  } catch (error) {
    categories = { count: 0, data: [] };
    console.log('An error occured fetching vacancy categories');
    console.log(error);
  }

  return categories;
};

const getVacancies = async () => {
  const queries = {
    skip: 0,
    limit: 100,
    status: 'public',
    // lanuage: 'en', // TODO enable later
    sort: { title: 1 },
  };
  let vacancies;
  try {
    const response = await fetch(
      `${API_ENDPOINT}/vacancies?${stringify(queries)}`,
    );
    vacancies = await response.json();
  } catch (error) {
    vacancies = { count: 0, data: [] };
    console.log('An error occured fetching vacancies');
    console.log(error);
  }

  return vacancies;
};

export const getServerSideProps = async () => {
  const categories = await getCategories();
  const vacancies = await getVacancies();

  return {
    // will be passed to the page component as props
    props: { categories, vacancies },
  };
};
