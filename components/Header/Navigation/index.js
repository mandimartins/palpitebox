import React from 'react';
import Link from 'next/link';

function Navigation({ mobile }) {
  return (
    <div className={mobile ? 'navigation-mobile' : 'navigation__container'}>
      <Link href="/sobre">
        <a className={mobile ? 'link-mobile' : 'navigation__item'}>Sobre</a>
      </Link>
      <Link href="/contato">
        <a className={mobile ? 'link-mobile' : 'navigation__item'}>Contato</a>
      </Link>
      <Link href="/pesquisa">
        <a className={mobile ? 'link-mobile' : 'navigation__item'}>Pesquisa</a>
      </Link>
    </div>
  );
}

export default Navigation;
