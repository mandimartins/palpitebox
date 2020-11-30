import React from 'react';
import useSWR from 'swr'

import SpeakerSvg from '../assets/svg/speaker.svg';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {

  const {data, error} =  useSWR('/api/get-promo',fetcher)

  return (
    <main className="home">
      <section className="suggestion-section">
        <h1 className="suggestion-section__title">
          O restaurante X sempre busca por atender melhor os seus clientes, por
          isso, estamos sempre abertos a ouvir a sua opinião.
        </h1>
        <button className="suggestion-section__btn">
          Dar opinião ou sugestão
        </button>

        {!data && <p>Carregando...</p>}
        {data && <h2 className="suggestion-section__subtitle">
          {data.message}
          {/* Ao dar sua opinião e/ou sugestão ganhe 10% na sua próxima compra. */}
        </h2> }
      </section>
      <SpeakerSvg className="speakerImage" />
    </main>
  );
};

export default Index;
