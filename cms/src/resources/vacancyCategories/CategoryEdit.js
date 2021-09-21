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

const EditToolbar = ({ onCancel, ...props }) => (
  <Toolbar {...props}>
    <SaveButton />
    <Button onClick={onCancel}>
      <span>Cancel</span>
    </Button>
  </Toolbar>
);

const CategoryEdit = ({ onCancel, ...props }) => (
  <Edit {...props}>
    <SimpleForm toolbar={<EditToolbar onCancel={onCancel} />}>
      <TextInput source="name" validate={required()} />
    </SimpleForm>
  </Edit>
);

export default CategoryEdit;
