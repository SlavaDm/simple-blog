import React from 'react';
import { Route } from 'react-router';
import { IRoute } from '../../interface/IRoute';
import { publicRoutes } from './Routes';

const AppRouter = () => {
  return publicRoutes.map((route: IRoute) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        render={() => route.component}
        exact={route.exact}
      />
    );
  });
};

export default AppRouter;
