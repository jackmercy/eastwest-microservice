import { API_ENDPOINT } from '../configs';

export default {
  admins: {
    login: `${API_ENDPOINT}/admins/login`,
  },
  files: {
    private: `${API_ENDPOINT}/files`,
    public: `${API_ENDPOINT}/files/public`,
  },
};
