import React from 'react';
import { Admin, Resource, defaultTheme } from 'react-admin';
import { createMuiTheme } from '@material-ui/core/styles';

import { Layout } from './layout';
import { authProvider, dataProvider } from './providers';
import {
  users,
  prospects,
  contacts,
  vacancies,
  vacancyCategories,
  vacancyApplications,
  news,
  newsAuthors,
  newsCategories,
} from './resources';

const customTheme = createMuiTheme({
  ...defaultTheme,
  typography: {
    htmlFontSize: 16,
    fontFamily: ['"Source Sans Pro"', 'sans-serif'].join(','),
  },
  palette: {
    primary: { 500: '#C80030' },
  },
});

const App = () => (
  <Admin
    layout={Layout}
    authProvider={authProvider}
    dataProvider={dataProvider}
    theme={customTheme}
  >
    <Resource {...users} />
    <Resource {...prospects} />
    <Resource {...contacts} />
    <Resource {...vacancies} />
    <Resource {...vacancyCategories} />
    <Resource {...vacancyApplications} />
    <Resource {...news} />
    <Resource {...newsAuthors} />
    <Resource {...newsCategories} />
    <Resource name="roles" />
  </Admin>
);

export default App;
