import { List as Icon } from '@material-ui/icons';

import CategoryList from './CategoryList';
import CategoryEdit from './CategoryEdit';
import CategoryCreate from './CategoryCreate';

export default {
  name: 'news-categories',
  list: CategoryList,
  edit: CategoryEdit,
  create: CategoryCreate,
  icon: Icon,
};
