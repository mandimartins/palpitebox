import React from 'react';
import Link from 'next/link'
import useSWR from 'swr'

import SpeakerSvg from '../assets/svg/speaker.svg';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {

  const {data, error} =  useSWR('/api/get-promo',fetcher)

  const showCouponMessage = (data) => {
    return data.showCoupon && <h2 className="suggestion-section__subtitle">
    {data.message}
  </h2> 
  }

  return (
    <main className="home">
      <section className="suggestion-section">
        <h1 className="suggestion-section__title">
          O restaurante X sempre busca por atender melhor os seus clientes, por
          isso, estamos sempre abertos a ouvir a sua opinião.
        </h1>
        {!data ? <p>Carregando...</p> : showCouponMessage(data)}
        <Link href="/pesquisa" >
          <a className="suggestion-section__btn"> 
             Dar opinião/sugestão
          </a>
        </Link>
      
      </section>
      <SpeakerSvg className="speakerImage" />
    </main>
  );
};

export default Index;
