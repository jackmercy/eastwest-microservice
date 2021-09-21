import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  Toolbar,
  SaveButton,
  Button,
} from 'react-admin';

import { Avatar } from './components';

const EditToolbar = ({ onCancel, ...props }) => (
  <Toolbar {...props}>
    <SaveButton />
    <Button onClick={onCancel}>
      <span>Cancel</span>
    </Button>
  </Toolbar>
);

const AuthorEdit = ({ onCancel, ...props }) => (
  <Edit {...props}>
    <SimpleForm toolbar={<EditToolbar onCancel={onCancel} />}>
      <Avatar source="avatar" validate={required()} />
      <TextInput source="firstName" validate={required()} />
      <TextInput source="lastName" validate={required()} />
    </SimpleForm>
  </Edit>
);

export default AuthorEdit;
