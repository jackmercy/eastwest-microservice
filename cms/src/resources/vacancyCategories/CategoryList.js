import React from 'react';
import { Route } from 'react-router';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  CreateButton,
  TopToolbar,
} from 'react-admin';
import { Drawer, Box, Typography, withStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import CategoryCreate from './CategoryCreate';
import CategoryEdit from './CategoryEdit';

const styles = {
  drawerContent: {
    width: 300,
  },
};

const ListActions = ({ basePath }) => (
  <TopToolbar>
    <CreateButton basePath={basePath} />
  </TopToolbar>
);

const Empty = ({ basePath }) => (
  <Box textAlign="center" m={1}>
    <Typography variant="h4" paragraph>
      No departments available
    </Typography>
    <Typography variant="body1">Create one</Typography>
    <CreateButton basePath={basePath} />
  </Box>
);

const CategoryList = ({ classes, ...props }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(push('/vacancy-categories'));
  };

  return (
    <>
      <List
        {...props}
        empty={<Empty />}
        title="List of Departments"
        sort={{ field: 'updatedAt', order: 'DESC' }}
        actions={<ListActions />}
        syncWithLocation={false}
      >
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
        </Datagrid>
      </List>
      <Route path="/vacancy-categories/create">
        {({ match }) => (
          <Drawer open={!!match} onClose={handleClose} anchor="right">
            <CategoryCreate
              onCancel={handleClose}
              className={classes.drawerContent}
              {...props}
            />
          </Drawer>
        )}
      </Route>
      <Route path="/vacancy-categories/:id">
        {({ match }) => {
          const isMatch = match && match.params && match.params.id !== 'create';

          return (
            <Drawer open={!!isMatch} anchor="right" onClose={handleClose}>
              {isMatch ? (
                <CategoryEdit
                  id={match.params.id}
                  onCancel={handleClose}
                  className={classes.drawerContent}
                  {...props}
                />
              ) : null}
            </Drawer>
          );
        }}
      </Route>
    </>
  );
};

export default withStyles(styles)(CategoryList);
