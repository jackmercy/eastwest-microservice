import { API_ENDPOINT } from '../../configs';

export { default } from '../../src/containers/Vacancy';

const getVacancyBySlug = async (slug) => {
  let result;
  try {
    const response = await fetch(`${API_ENDPOINT}/vacancies/slug/${slug}`);
    result = await response.json();
  } catch (error) {
    console.log(`An error occured fetching vacancy by slug ${slug}`);
    console.log(error);
  }

  return result;
};

export const getServerSideProps = async ({ params }) => {
  const data = await getVacancyBySlug(params.slug);

  if (!data) {
    return { notFound: true };
  }

  // will be passed to the page component as props
  return { props: { data } };
};
