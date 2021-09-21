import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  Toolbar,
  SaveButton,
  Button,
} from 'react-admin';

import { Avatar } from './components';

const CreateToolbar = ({ onCancel, ...props }) => (
  <Toolbar {...props}>
    <SaveButton />
    <Button onClick={onCancel}>
      <span>Cancel</span>
    </Button>
  </Toolbar>
);

const AuthorCreate = ({ onCancel, ...props }) => (
  <Create {...props}>
    <SimpleForm toolbar={<CreateToolbar onCancel={onCancel} />}>
      <Avatar source="avatar" validate={required()} />
      <TextInput source="firstName" validate={required()} />
      <TextInput source="lastName" validate={required()} />
    </SimpleForm>
  </Create>
);

export default AuthorCreate;
