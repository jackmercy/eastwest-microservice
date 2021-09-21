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
} from 'react-admin';
import { Box, Typography } from '@material-ui/core';

import { vacancyTypes, vacancyStatuses } from './configs';

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
    <ReferenceInput source="category" reference="vacancy-categories">
      <SelectInput optionValue="id" optionText="name" />
    </ReferenceInput>
    <SelectInput
      source="type"
      choices={vacancyTypes}
      optionValue="value"
      optionText="label"
    />
    <SelectInput
      source="status"
      choices={vacancyStatuses}
      optionValue="value"
      optionText="label"
    />
  </Filter>
);

const Empty = ({ basePath }) => (
  <Box textAlign="center" m={1}>
    <Typography variant="h4" paragraph>
      No vacancy available
    </Typography>
    <Typography variant="body1">Create one</Typography>
    <CreateButton basePath={basePath} />
  </Box>
);

const VacancyList = ({ classes, ...props }) => (
  <List
    {...props}
    empty={<Empty />}
    title="List of Vacancies"
    sort={{ field: 'updatedAt', order: 'DESC' }}
    actions={<ListActions />}
    filters={<ListFilter />}
    bulkActionButtons={<ListBulkActionButtons />}
  >
    <Datagrid rowClick="edit">
      <TextField source="title" />
      <TextField source="slug" />
      <TextField source="type" />
      <TextField source="status" />
      <ReferenceField
        label="Department"
        source="category"
        reference="vacancy-categories"
      >
        <TextField source="name" />
      </ReferenceField>
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);

export default VacancyList;
