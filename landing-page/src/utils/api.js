import { apiService } from '../services';

const prospects = {
  createNewRequest: (body) => apiService.post({ path: 'prospects', body }),
};

const contacts = {
  createNewRequest: (body) => apiService.post({ path: 'contacts', body }),
};

const communityMembers = {
  login: (body) =>
    apiService.post({
      host: 'http://localhost:3408',
      path: 'community-members/login',
      body,
    }),
  createMember: (body) =>
    apiService.post({
      host: 'http://localhost:3408',
      path: 'community-members',
      body,
    }),
};

const news = {
  updatePublicNews: (id, body) =>
    apiService.put({ path: `news/public/${id}`, body }),
  createComment: (newId, body) =>
    apiService.post({ path: `news/${newId}/comments`, body }),
  updateComment: (newId, body) =>
    apiService.post({ path: `news/${newId}/comments`, body }),
  deleteComment: (newId, body) =>
    apiService.post({ path: `news/${newId}/comments`, body }),
};

const vacancies = {
  createNewApplication: (body) =>
    apiService.post({
      path: 'vacancy-applications',
      body,
      options: { keepBody: true, headers: { Accept: 'application/json' } },
    }),
};

const files = {
  getPublicFile: (id) =>
    apiService.get({
      path: `files/public/${id}`,
      options: { returnRaw: true },
    }),
};

export default {
  prospects,
  contacts,
  vacancies,
  news,
  files,
  communityMembers,
};
