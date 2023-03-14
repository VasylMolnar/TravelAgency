import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Team = () => {
  return (
    <section className="section team">
      <div className="container">
        <h2 className="title">Наша команда</h2>
        <ul className="team__ul">
          <li className="team__li">
            <figure>
              <picture>
                <source
                  srcSet={require('../../img/team/Igor-480.jpg')}
                  media="(max-width: 767px)"
                />
                <source
                  srcSet={require('../../img/team/Igor-768.jpg')}
                  media="(max-width: 1199px)"
                />
                <source
                  srcSet={require('../../img/team/Igor.jpg')}
                  media="(min-width: 1200px)"
                />
                <img
                  src={require('../../img/team/Igor-480.jpg')}
                  alt="Ігор Дем'яненко"
                />
              </picture>

              <figcaption className="figcaption">
                Ігор Дем'яненко
                <p className="figcaption_p">Директор фірми </p>
                <div className="footer_link">
                  <ul className="footer_ul">
                    <li className="item">
                      <a
                        href="https://www.instagram.com"
                        className="social__networks"
                      >
                        <InstagramIcon className="icon-team icon-footer" />
                      </a>
                    </li>
                    <li className="item">
                      <a
                        href="https://www.twitter.com"
                        className="social__networks"
                      >
                        <TwitterIcon className="icon-team icon-footer" />
                      </a>
                    </li>
                    <li className="item">
                      <a
                        href="https://www.facebook.com"
                        className="social__networks"
                      >
                        <FacebookIcon className="icon-team icon-footer" />
                      </a>
                    </li>
                    <li className="item">
                      <a
                        href="https://www.linkedin.com"
                        className="social__networks"
                      >
                        <LinkedInIcon className="icon-team icon-footer" />
                      </a>
                    </li>
                  </ul>
                </div>
              </figcaption>
            </figure>
          </li>
          <li className="team__li">
            <figure>
              <picture>
                <source
                  srcSet={require('../../img/team/Olga-480.jpg')}
                  media="(max-width: 767px)"
                />
                <source
                  srcSet={require('../../img/team/Olga-768.jpg')}
                  media="(max-width: 1199px)"
                />
                <source
                  srcSet={require('../../img/team/Olga.jpg')}
                  media="(min-width: 1200px)"
                />
                <img
                  src={require('../../img/team/Olga-480.jpg')}
                  alt="Ольга Рєпіна"
                />
              </picture>

              <figcaption className="figcaption">
                Ольга Рєпіна
                <p className="figcaption_p">Головний менеджер</p>
                <div className="footer_link">
                  <ul className="footer_ul">
                    <li className="item">
                      <a
                        href="https://www.instagram.com"
                        className="social__networks"
                      >
                        <InstagramIcon className="icon-team icon-footer" />
                      </a>
                    </li>
                    <li className="item">
                      <a
                        href="https://www.twitter.com"
                        className="social__networks"
                      >
                        <TwitterIcon className="icon-team icon-footer" />
                      </a>
                    </li>
                    <li className="item">
                      <a
                        href="https://www.facebook.com"
                        className="social__networks"
                      >
                        <FacebookIcon className="icon-team icon-footer" />
                      </a>
                    </li>
                    <li className="item">
                      <a
                        href="https://www.linkedin.com"
                        className="social__networks"
                      >
                        <LinkedInIcon className="icon-team icon-footer" />
                      </a>
                    </li>
                  </ul>
                </div>
              </figcaption>
            </figure>
          </li>
          <li className="team__li">
            <figure>
              <picture>
                <source
                  srcSet={require('../../img/team/Nikolay-480.jpg')}
                  media="(max-width: 767px)"
                />
                <source
                  srcSet={require('../../img/team/Nikolay-768.jpg')}
                  media="(max-width: 1199px)"
                />
                <source
                  srcSet={require('../../img/team/Nikolay.jpg')}
                  media="(min-width: 1200px)"
                />
                <img
                  src={require('../../img/team/Nikolay-480.jpg')}
                  alt="Микола Тарасов"
                />
              </picture>

              <figcaption className="figcaption">
                Микола Тарасов
                <p className="figcaption_p">Гід в багатоденних турах</p>
                <div className="footer_link">
                  <ul className="footer_ul">
                    <li className="item">
                      <a
                        href="https://www.instagram.com"
                        className="social__networks"
                      >
                        <InstagramIcon className="icon-team icon-footer" />
                      </a>
                    </li>
                    <li className="item">
                      <a
                        href="https://www.twitter.com"
                        className="social__networks"
                      >
                        <TwitterIcon className="icon-team icon-footer" />
                      </a>
                    </li>
                    <li className="item">
                      <a
                        href="https://www.facebook.com"
                        className="social__networks"
                      >
                        <FacebookIcon className="icon-team icon-footer" />
                      </a>
                    </li>
                    <li className="item">
                      <a
                        href="https://www.linkedin.com"
                        className="social__networks"
                      >
                        <LinkedInIcon className="icon-team icon-footer" />
                      </a>
                    </li>
                  </ul>
                </div>
              </figcaption>
            </figure>
          </li>
          <li className="team__li">
            <figure>
              <picture>
                <source
                  srcSet={require('../../img/team/Mikhail-480.jpg')}
                  media="(max-width: 767px)"
                />
                <source
                  srcSet={require('../../img/team/Mikhail-768.jpg')}
                  media="(max-width: 1199px)"
                />
                <source
                  srcSet={require('../../img/team/Mikhail.jpg')}
                  media="(min-width: 1200px)"
                />
                <img
                  src={require('../../img/team/Mikhail-480.jpg')}
                  alt="Михайло Єрмаков"
                />
              </picture>

              <figcaption className="figcaption">
                Михайло Єрмаков
                <p className="figcaption_p">Екскурсовод</p>
                <div className="footer_link">
                  <ul className="footer_ul">
                    <li className="item">
                      <a
                        href="https://www.instagram.com"
                        className="social__networks"
                      >
                        <InstagramIcon className="icon-team icon-footer" />
                      </a>
                    </li>
                    <li className="item">
                      <a
                        href="https://www.twitter.com"
                        className="social__networks"
                      >
                        <TwitterIcon className="icon-team icon-footer" />
                      </a>
                    </li>
                    <li className="item">
                      <a
                        href="https://www.facebook.com"
                        className="social__networks"
                      >
                        <FacebookIcon className="icon-team icon-footer" />
                      </a>
                    </li>
                    <li className="item">
                      <a
                        href="https://www.linkedin.com"
                        className="social__networks"
                      >
                        <LinkedInIcon className="icon-team icon-footer" />
                      </a>
                    </li>
                  </ul>
                </div>
              </figcaption>
            </figure>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Team;
