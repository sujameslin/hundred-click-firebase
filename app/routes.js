import React from 'react'
import {
  View, Text, TouchableHighlight
} from 'react-native'

import toList from './utils/toList'
import appStyles from './styles/app';

import Home from './views/Home';

import Database, { Routes as DatabaseRoutes } from './views/Database';
import Authentication, { Routes as AuthRoutes } from './views/Authentication';

import HundredBox from './views/HundredBox';

export type Route = {
  key: String,
  Component: Object,
  title: String
};

export const exampleRoutes = {
  'auth': {
    route: {
      title: 'Authentication',
      Component: Authentication
    },
    children: AuthRoutes
  },
  'database': {
    route: {
      title: 'Database',
      Component: Database
    },
    children: DatabaseRoutes
  },
  'hundredbox': {
    route: {
      title: 'Hundred Boxes',
      Component: HundredBox
    }
  }
};

export const routes = toList({
  ...exampleRoutes,
  'home': {
    route: {
      title: 'Home',
      Component: Home,
      headerStyle: {},
    },
    children: {}
  },
});

export default routes;
