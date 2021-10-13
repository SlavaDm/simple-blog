import React from 'react';
import AppRouter from './components/AppRouter/AppRouter';
import Header from './components/Header/Header';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <AppRouter />
    </>
  );
};

export default App;
