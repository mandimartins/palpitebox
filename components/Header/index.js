import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import Logo from '../../assets/svg/logo.svg';

import Navigation from '../../components/Header/Navigation';

function Header() {
  const [isMenuOpen, setisMenuOpen] = useState(false);

  const toggleMenu = (e) => {
    setisMenuOpen((prevState) => !prevState);
    e.preventDefault();
  };

  return (
    <header className="header">
      <nav className="navigation">
        <Link href="/">
          <a>
            <Logo className="navigation__logo" />
          </a>
        </Link>
        <Navigation />
        <FaBars className="menuIcon" onClick={toggleMenu} />
      </nav>
      {isMenuOpen ? <Navigation mobile={true} /> : false}
    </header>
  );
}

export default Header;
