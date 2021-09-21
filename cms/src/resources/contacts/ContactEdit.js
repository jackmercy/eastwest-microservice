/* eslint-disable */
import React from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  EmailField,
  TopToolbar,
  DeleteWithConfirmButton,
  ListButton,
} from 'react-admin';
import { ArrowBack } from '@material-ui/icons';

const Actions = ({ basePath, data, resource, ...props }) => {
  console.log(data);

  return (
    <TopToolbar>
      <ListButton
        label="Back to List Contacts"
        basePath={basePath}
        icon={<ArrowBack />}
      />
      <DeleteWithConfirmButton
        basePath={basePath}
        record={data}
        resource={resource}
        confirmTitle="Confirm delete"
        confirmContent="Are you sure when delete this record?"
      />
    </TopToolbar>
  );
};

const ContactEdit = (props) => (
  <Show {...props} actions={<Actions />}>
    <SimpleShowLayout>
      <TextField source="firstName" />
      <TextField source="lastName" />
      <EmailField source="emailAddress" />
      <TextField source="phoneNumber" />
      <TextField source="reason" />
      <TextField source="address" />
      <TextField source="city" />
      <TextField source="country" />
      <TextField source="description" />
      <DateField source="createdAt" showTime />
    </SimpleShowLayout>
  </Show>
);

export default ContactEdit;
