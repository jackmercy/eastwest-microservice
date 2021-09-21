/**
 * Referrence
 * https://github.com/marmelab/react-admin/blob/master/packages/ra-data-json-server/src/index.ts
 *
 * We custom some function like query params, actions, ... to match with our REST API design
 */
import { stringify } from 'qs';
import { fetchUtils } from 'react-admin';
import { serialize } from 'object-to-formdata';

/**
 * @function mappingResource
 * @param {*} resource
 * @description mapping resouce name with custom api path
 */
const mappingResource = (resource) => {
  switch (resource) {
    // Sample: will call api /news-categories instead of /categories
    // case 'categories':
    //   return 'news-categories';

    default:
      return resource;
  }
};

export default (apiUrl, httpClient = fetchUtils.fetchJson) => ({
  getList: (resource, params = {}) => {
    const { page, perPage } = params.pagination || { page: 1, perPage: 20 };
    const { field, order } = params.sort || {
      field: 'createdAt',
      order: 'DESC',
    };
    const query = {
      ...fetchUtils.flattenObject(params.filter),
      sort: { [field]: order === 'ASC' ? 1 : -1 },
      skip: (page - 1) * perPage,
      limit: page * perPage,
    };
    const url = `${apiUrl}/${mappingResource(resource)}?${stringify(query)}`;

    return httpClient(url).then(({ json }) => ({
      data: json.data,
      total: json.count,
    }));
  },

  getOne: (resource, params = {}) =>
    httpClient(`${apiUrl}/${mappingResource(resource)}/${params.id}`).then(
      ({ json }) => ({
        data: json,
      }),
    ),

  getMany: (resource, params = {}) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${mappingResource(resource)}/${id}`, {
          method: 'GET',
        }).then(({ json }) => json)),
    ).then((data) => ({ data })),

  getManyReference: (resource, params = {}) => {
    const { page, perPage } = params.pagination || { page: 1, perPage: 20 };
    const { field, order } = params.sort || {
      field: 'createdAt',
      order: 'DESC',
    };
    const query = {
      ...fetchUtils.flattenObject(params.filter),
      [params.target]: params.id,
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
    };
    const url = `${apiUrl}/${mappingResource(resource)}?${stringify(query)}`;

    return httpClient(url).then(({ json }) => ({
      data: json.data,
      total: json.count,
    }));
  },

  update: (resource, params = {}) => {
    const hasFile = Object.values(params.data).some(
      (value) => value instanceof File,
    );

    return httpClient(`${apiUrl}/${mappingResource(resource)}/${params.id}`, {
      method: 'PUT',
      body: hasFile ? serialize(params.data) : JSON.stringify(params.data),
    })
      .then(({ json }) => ({ data: json }))
      .catch((error) => {
        const errorObj = JSON.parse(JSON.stringify(error));
        return Promise.reject(errorObj?.body?.error?.msg || error.message);
      });
  },

  // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
  updateMany: (resource, params = {}) => {
    // TODO recheck flow this function
    const hasFile = Object.values(params.data).some(
      (value) => value instanceof File,
    );

    return Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${mappingResource(resource)}/${id}`, {
          method: 'PUT',
          body: hasFile ? serialize(params.data) : JSON.stringify(params.data),
        })),
    )
      .then((responses) => ({ data: responses.map(({ json }) => json.id) }))
      .catch((error) => {
        const errorObj = JSON.parse(JSON.stringify(error));
        return Promise.reject(errorObj?.body?.error?.msg || error.message);
      });
  },

  create: (resource, params = {}) => {
    const hasFile = Object.values(params.data).some(
      (value) => value instanceof File,
    );

    return httpClient(`${apiUrl}/${mappingResource(resource)}`, {
      method: 'POST',
      body: hasFile ? serialize(params.data) : JSON.stringify(params.data),
    })
      .then(({ json }) => ({
        data: { ...json },
      }))
      .catch((error) => {
        const errorObj = JSON.parse(JSON.stringify(error));
        return Promise.reject(errorObj?.body?.error?.msg || error.message);
      });
  },

  delete: (resource, params = {}) =>
    httpClient(`${apiUrl}/${mappingResource(resource)}/${params.id}`, {
      method: 'DELETE',
    })
      .then(() => ({ data: { id: params.id } }))
      .catch((error) => {
        const errorObj = JSON.parse(JSON.stringify(error));
        return Promise.reject(errorObj?.body?.error?.msg || error.message);
      }),

  // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  deleteMany: (resource, params = {}) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${mappingResource(resource)}/${id}`, {
          method: 'DELETE',
        })),
    )
      .then(() => ({ data: params.ids }))
      .catch((error) => {
        const errorObj = JSON.parse(JSON.stringify(error));
        return Promise.reject(errorObj?.body?.error?.msg || error.message);
      }),
});
