import { HowToReg as Icon } from '@material-ui/icons';

import VacancyList from './VacancyList';
import VacancyEdit from './VacancyEdit';
import VacancyCreate from './VacancyCreate';

export default {
  name: 'vacancies',
  list: VacancyList,
  create: VacancyCreate,
  edit: VacancyEdit,
  icon: Icon,
};
