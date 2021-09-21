/* eslint-disable */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ChromeReaderMode as LabelIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  AccountTree as AccountTreeIcon,
  List as ListIcon,
  HowToReg as HowToRegIcon,
  Assessment as AssessmentIcon,
  PersonOutline as PersonOutlineIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  Forum as ForumIcon,
  ConfirmationNumber as ConfirmationNumberIcon,
  LibraryBooks as LibraryBooksIcon,
  Web as WebIcon,
  LiveHelp as LiveHelpIcon,
  Apps as AppsIcon,
} from '@material-ui/icons';
import { useMediaQuery, Box } from '@material-ui/core';
import { MenuItemLink } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import {
  users,
  prospects,
  vacancies,
  vacancyCategories,
  news,
  newsAuthors,
  newsCategories,
} from '../resources';

import SubMenu from './SubMenu';

const useStyles = makeStyles((theme) => ({
  box: {
    paddingBottom: '3rem',
    '& > * + *:not(.MuiCollapse-container)': { marginTop: '1rem' },
  },
}));

const configs = [
  {
    isSubmenu: true,
    subMenuState: 'menuCMS',
    label: 'News and Media',
    icon: <LibraryBooksIcon />,
    children: [
      { to: '/news', label: 'Articles', icon: <news.icon /> },
      { to: '/news-authors', label: 'Authors', icon: <newsAuthors.icon /> },
      {
        to: '/news-categories',
        label: 'Categories',
        icon: <newsCategories.icon />,
      },
    ],
  },
  {
    isSubmenu: false,
    to: '/page',
    label: 'Page',
    icon: <WebIcon />,
  },
  {
    isSubmenu: true,
    subMenuState: 'menuCarrers',
    label: 'Careers',
    icon: <HowToRegIcon />,
    children: [
      { to: '/vacancies', label: 'Vacancies', icon: <vacancies.icon /> },
      {
        to: '/vacancy-categories',
        label: 'Departments',
        icon: <vacancyCategories.icon />,
      },
      { to: '/vacancy-applications', label: 'Application', icon: <AppsIcon /> },
    ],
  },
  {
    isSubmenu: true,
    subMenuState: 'menuSupport',
    label: 'Support',
    icon: <LiveHelpIcon />,
    children: [
      {
        to: '/support/articles',
        label: 'Articles',
        icon: <LibraryBooksIcon />,
      },
      { to: '/support/categories', label: 'Categories', icon: <ListIcon /> },
    ],
  },
  {
    isSubmenu: true,
    subMenuState: 'menuUserManagement',
    label: 'User Management',
    icon: <users.icon />,
    children: [
      { to: '/users', label: 'Members', icon: <users.icon /> },
      // { to: '/roles', label: 'Roles', icon: <LabelIcon /> },
      { to: '/permissions', label: 'Permissions', icon: <AccountTreeIcon /> },
    ],
  },
  {
    isSubmenu: true,
    subMenuState: 'menuContacts',
    label: 'Contacts',
    icon: <PersonOutlineIcon />,
    children: [
      { to: '/contacts', label: 'Users', icon: <PersonOutlineIcon /> },
      { to: '/prospects', label: 'Prospects', icon: <prospects.icon /> },
      {
        to: '/subscribers',
        label: 'Subscribers',
        icon: <RecordVoiceOverIcon />,
      },
    ],
  },
  {
    isSubmenu: true,
    subMenuState: 'menuIntercom',
    label: 'Intercom',
    icon: <ForumIcon />,
    children: [
      { to: '/tickets', label: 'Tickets', icon: <ConfirmationNumberIcon /> },
    ],
  },
  {
    isSubmenu: true,
    subMenuState: 'menuLogs',
    label: 'Log',
    icon: <AssessmentIcon />,
    children: [
      { to: '/logs', label: 'Activity logs', icon: <AssessmentIcon /> },
    ],
  },
  {
    isSubmenu: true,
    subMenuState: 'menuSettings',
    label: 'Settings',
    icon: <SettingsIcon />,
    children: [
      { to: '/settings/general', label: 'General', icon: <SettingsIcon /> },
      {
        to: '/settings/integrations',
        label: 'Integrations',
        icon: <DashboardIcon />,
      },
    ],
  },
];

const Menu = ({ onMenuClick, logout, dense = false }) => {
  const [state, setState] = useState({
    menuCMS: true,
    menuCarrers: true,
    menuSupport: true,
    menuUserManagement: true,
    menuContacts: true,
    menuIntercom: true,
    menuLogs: true,
    menuSettings: true,
  });
  const classes = useStyles();
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  const open = useSelector((state) => state.admin.ui.sidebarOpen);
  useSelector((state) => state.theme); // force rerender on theme change

  const handleToggle = (menu) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  const renderMenuItem = ({ key, to, label, icon }) => (
    <MenuItemLink
      key={key}
      to={to}
      primaryText={label}
      leftIcon={icon}
      onClick={onMenuClick}
      sidebarIsOpen={open}
      dense={dense}
    />
  );

  return (
    <Box mt={1} className={classes.box}>
      {configs.map((item) =>
        item.isSubmenu ? (
          <SubMenu
            key={item.label}
            dense={dense}
            name={item.label}
            icon={item.icon}
            sidebarIsOpen={open}
            isOpen={true}
            isOpen={state[item.subMenuState]}
            handleToggle={() => handleToggle(item.subMenuState)}
          >
            {item.children.map((child) =>
              renderMenuItem({
                key: `${item.label}-${child.label}`,
                to: child.to,
                label: child.label,
                icon: child.icon,
              }),
            )}
          </SubMenu>
        ) : (
          renderMenuItem({
            key: item.label,
            to: item.to,
            label: item.label,
            icon: item.icon,
          })
        ),
      )}
      {isXSmall && logout}
    </Box>
  );
};

export default Menu;
