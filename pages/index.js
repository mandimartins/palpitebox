import React from 'react';

import SpeakerSvg from '../assets/svg/speaker.svg';

const Index = () => {
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
        <h2 className="suggestion-section__subtitle">
          Ao dar sua opinião e/ou sugestão ganhe 10% na sua próxima compra.
        </h2>
      </section>
      <SpeakerSvg className="speakerImage" />
    </main>
  );
};

export default Index;
