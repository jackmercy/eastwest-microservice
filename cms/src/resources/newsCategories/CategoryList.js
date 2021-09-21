import React, { cloneElement } from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  CreateButton,
  TopToolbar,
  useListContext,
  sanitizeListRestProps,
  BulkDeleteWithConfirmButton,
} from 'react-admin';
import { Box, Typography } from '@material-ui/core';

const ListBulkActionButtons = (props) => (
  <BulkDeleteWithConfirmButton {...props} />
);

const ListActions = (props) => {
  const { className, exporter, filters, maxResults, ...rest } = props;
  const {
    resource,
    displayedFilters,
    filterValues,
    basePath,
    showFilter,
  } = useListContext();
  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters &&
        cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: 'button',
        })}
      <CreateButton basePath={basePath} />
    </TopToolbar>
  );
};

const Empty = ({ basePath }) => (
  <Box textAlign="center" m={1}>
    <Typography variant="h4" paragraph>
      No categories available
    </Typography>
    <Typography variant="body1">Create one</Typography>
    <CreateButton basePath={basePath} />
  </Box>
);

const NewsList = ({ classes, ...props }) => (
  <List
    {...props}
    empty={<Empty />}
    title="List of Categories"
    sort={{ field: 'updatedAt', order: 'DESC' }}
    actions={<ListActions />}
    bulkActionButtons={<ListBulkActionButtons />}
  >
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="slug" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);

export default NewsList;
