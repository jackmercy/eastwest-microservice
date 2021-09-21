import React, { cloneElement } from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  CreateButton,
  TopToolbar,
  ReferenceInput,
  ReferenceField,
  Filter,
  useListContext,
  sanitizeListRestProps,
  BulkDeleteWithConfirmButton,
  SelectInput,
  FunctionField,
} from 'react-admin';
import { Box, Typography } from '@material-ui/core';

import { newsStatuses } from './configs';

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

const ListFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput source="category" reference="news-categories">
      <SelectInput optionValue="id" optionText="name" />
    </ReferenceInput>
    <ReferenceInput source="author" reference="news-authors">
      <SelectInput
        optionValue="id"
        optionText={({ firstName, lastName }) => `${firstName} ${lastName}`}
      />
    </ReferenceInput>
    <SelectInput
      source="status"
      choices={newsStatuses}
      optionValue="value"
      optionText="label"
    />
  </Filter>
);

const Empty = ({ basePath }) => (
  <Box textAlign="center" m={1}>
    <Typography variant="h4" paragraph>
      No news available
    </Typography>
    <Typography variant="body1">Create one</Typography>
    <CreateButton basePath={basePath} />
  </Box>
);

const NewsList = ({ classes, ...props }) => (
  <List
    {...props}
    empty={<Empty />}
    title="List of News"
    sort={{ field: 'updatedAt', order: 'DESC' }}
    actions={<ListActions />}
    filters={<ListFilter />}
    bulkActionButtons={<ListBulkActionButtons />}
  >
    <Datagrid rowClick="edit">
      <TextField source="title" />
      <TextField source="status" />
      <ReferenceField
        label="Category"
        source="category"
        reference="news-categories"
      >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label="Author" source="author" reference="news-authors">
        <FunctionField
          render={(author) => `${author.firstName} ${author.lastName}`}
        />
      </ReferenceField>
      <TextField source="views" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);

export default NewsList;
