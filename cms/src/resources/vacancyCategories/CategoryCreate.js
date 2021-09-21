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

const CreateToolbar = ({ onCancel, ...props }) => (
  <Toolbar {...props}>
    <SaveButton />
    <Button onClick={onCancel}>
      <span>Cancel</span>
    </Button>
  </Toolbar>
);

const CategoryCreate = ({ onCancel, ...props }) => (
  <Create {...props}>
    <SimpleForm toolbar={<CreateToolbar onCancel={onCancel} />}>
      <TextInput source="name" validate={required()} />
    </SimpleForm>
  </Create>
);

export default CategoryCreate;
