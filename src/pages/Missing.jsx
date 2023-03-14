import React from 'react';
import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <main className="missing">
      <section className="section">
        <div className="container">
          <h2>Сторінку не знайдено</h2>
          <p>
            <Link to="/">Відвідайте нашу домашню сторінку</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Missing;
