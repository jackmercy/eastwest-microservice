import React from 'react';
import { List, Datagrid, TextField, DateField, EmailField } from 'react-admin';

const ContactList = (props) => (
  <List
    {...props}
    title="List of Contacts"
    sort={{ field: 'createdAt', order: 'DESC' }}
  >
    <Datagrid rowClick="edit">
      <TextField source="firstName" />
      <TextField source="lastName" />
      <EmailField source="emailAddress" />
      <TextField source="phoneNumber" />
      <TextField source="reason" />
      {/* <TextField source="title" /> */}
      {/* <TextField source="country" />
      <TextField source="description" /> */}
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);

export default ContactList;
