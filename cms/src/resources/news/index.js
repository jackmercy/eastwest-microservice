import { LibraryBooks as Icon } from '@material-ui/icons';

import NewsList from './NewsList';
import NewsEdit from './NewsEdit';
import NewsCreate from './NewsCreate';

export default {
  name: 'news',
  list: NewsList,
  create: NewsCreate,
  edit: NewsEdit,
  icon: Icon,
};
