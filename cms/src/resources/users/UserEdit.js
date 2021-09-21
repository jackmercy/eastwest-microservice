/* eslint-disable */
import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectArrayInput,
  required,
  ReferenceArrayInput,
} from 'react-admin';

const UserEdit = (props) => (
  <>
    <h2>Only readable for now, not support updated</h2>
    <Edit {...props} title={`Edit user ${props.firstName}`}>
      <SimpleForm redirect={false}>
        <TextInput source="firstName" validate={[required()]} disabled />
        <TextInput source="lastName" validate={[required()]} disabled />
        <TextInput source="emailAddress" disabled />
        <ReferenceArrayInput
          label="Roles"
          source="roles"
          reference="roles"
          filterToQuery={() => ({ alias: 'superadmin' })}
        >
          <SelectArrayInput
            optionText="name"
            optionValue="id"
            disabled
            validate={[required()]}
          />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  </>
);

export default UserEdit;
