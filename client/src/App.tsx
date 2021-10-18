import React from 'react';

import AppRouter from './components/AppRouter/AppRouter';
import Header from './components/Header/Header';

/**
 * The component with header and routes of the app.
 * @returns component with all app.
 */
const App: React.FC = () => {
  return (
    <>
      <Header />
      <AppRouter />
    </>
  );
};

export default React.memo(App);
