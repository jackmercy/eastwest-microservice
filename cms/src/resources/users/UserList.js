import React from 'react';
import { List, Datagrid, TextField, DateField, EmailField } from 'react-admin';

const UserList = (props) => (
  <List {...props} title="List of Members" bulkActionButtons={false}>
    <Datagrid rowClick="edit">
      <TextField source="firstName" />
      <TextField source="lastName" />
      <EmailField source="emailAddress" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);

export default UserList;
