import React from 'react';
import { Link } from 'react-router-dom';
import s from './Header.module.scss';

/**
 * Header of the app with route-links.
 * @returns Header component.
 */
const Header: React.FC = () => {
  return (
    <header className={s.header}>
      <nav className={s['header-navigation']}>
        <Link to="posts">Posts</Link>
        <Link to="images">Images</Link>
      </nav>
    </header>
  );
};

export default React.memo(Header);
