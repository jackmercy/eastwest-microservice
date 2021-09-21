import React from 'react';
import { Route } from 'react-router';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  CreateButton,
  TopToolbar,
  FunctionField,
} from 'react-admin';
import { Drawer, Box, Typography, withStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import AuthorCreate from './AuthorCreate';
import AuthorEdit from './AuthorEdit';

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
      No authors available
    </Typography>
    <Typography variant="body1">Create one</Typography>
    <CreateButton basePath={basePath} />
  </Box>
);

const AuthorList = ({ classes, ...props }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(push('/news-authors'));
  };

  return (
    <>
      <List
        {...props}
        empty={<Empty />}
        title="List of Authors"
        sort={{ field: 'updatedAt', order: 'DESC' }}
        actions={<ListActions />}
        syncWithLocation={false}
      >
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <FunctionField
            label="Name"
            render={(author) => `${author.firstName} ${author.lastName}`}
          />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
        </Datagrid>
      </List>
      <Route path="/news-authors/create">
        {({ match }) => (
          <Drawer open={!!match} onClose={handleClose} anchor="right">
            <AuthorCreate
              onCancel={handleClose}
              className={classes.drawerContent}
              {...props}
            />
          </Drawer>
        )}
      </Route>
      <Route path="/news-authors/:id">
        {({ match }) => {
          const isMatch = match && match.params && match.params.id !== 'create';

          return (
            <Drawer open={!!isMatch} anchor="right" onClose={handleClose}>
              {isMatch ? (
                <AuthorEdit
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

export default withStyles(styles)(AuthorList);
