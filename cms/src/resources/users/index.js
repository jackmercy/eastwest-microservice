import { Group as Icon } from '@material-ui/icons';

import UserList from './UserList';
import UserEdit from './UserEdit';

export default {
  name: 'users',
  list: UserList,
  edit: UserEdit,
  icon: Icon,
};
