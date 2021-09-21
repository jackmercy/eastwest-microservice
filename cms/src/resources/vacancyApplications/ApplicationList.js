import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EmailField,
} from 'react-admin';

const ApplicationList = (props) => (
  <List
    {...props}
    title="List of Vacancy applications"
    sort={{ field: 'createdAt', order: 'DESC' }}
  >
    <Datagrid rowClick="edit">
      <TextField source="firstName" />
      <TextField source="lastName" />
      <EmailField source="emailAddress" />
      <TextField source="phoneNumber" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);

export default ApplicationList;
