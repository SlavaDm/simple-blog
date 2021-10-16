import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { IRoute } from '../../interface/IRoute';
import { publicRoutes } from './Routes';

/**
 * The component with the routes of the app.
 * @returns component with routes.
 */
const AppRouter: React.FC = () => {
  return (
    <div className="wrapper">
      <Switch>
        {publicRoutes.map((route: IRoute) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              render={() => route.component}
              exact={route.exact}
            />
          );
        })}
        <Redirect to="/posts" />)
      </Switch>
    </div>
  );
};

export default React.memo(AppRouter);
