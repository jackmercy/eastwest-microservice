import { ContactMail as Icon } from '@material-ui/icons';

import ContactList from './ContactList';
import ContactEdit from './ContactEdit';

export default {
  name: 'contacts',
  list: ContactList,
  edit: ContactEdit,
  icon: Icon,
};
