import React from 'react';
import Link from 'next/link';

function Navigation({ mobile }) {
  return (
    <div className={mobile ? 'navigation-mobile' : 'navigation__container'}>
        <Link href="/">
        <a className={mobile ? 'link-mobile' : 'navigation__item'}>Home</a>
      </Link>
      <Link href="/pesquisa">
        <a className={mobile ? 'link-mobile' : 'navigation__item'}>Pesquisa</a>
      </Link>
    </div>
  );
}

export default Navigation;
