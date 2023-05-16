import React from 'react';
import { Link } from 'react-router-dom';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer_address">
          <Link to="/" className="logo">
            Travel<span>Agency</span>
          </Link>

          <address>
            <ul className="nav__info">
              <li className="item">
                <a
                  className="nav__link"
                  href="https://bit.ly/3pXMvUd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ApartmentIcon className="icon-contact" />
                  м. Київ,26
                </a>
              </li>
              <li className="item">
                <a href="mailto:travelagency.com" className="nav__link">
                  <MarkAsUnreadIcon className="icon-contact" />
                  travelagency.com
                </a>
              </li>
              <li className="item">
                <a href="tell:+380961111111" className="nav__link">
                  <PhoneIphoneIcon className="icon-contact" />
                  +38 096 111 11 11
                </a>
              </li>
            </ul>
          </address>
        </div>
        <div className="footer_link">
          <h4 className="footer_h4">приєднуйтесь</h4>
          <ul className="footer_ul">
            <li className="item">
              <a href="https://www.instagram.com" className="social__networks">
                <InstagramIcon className="icon-team icon-footer" />
              </a>
            </li>
            <li className="item">
              <a href="https://www.twitter.com" className="social__networks">
                <TwitterIcon className="icon-team icon-footer" />
              </a>
            </li>
            <li className="item">
              <a href="https://www.facebook.com" className="social__networks">
                <FacebookIcon className="icon-team icon-footer" />
              </a>
            </li>
            <li className="item">
              <a href="https://www.linkedin.com" className="social__networks">
                <LinkedInIcon className="icon-team icon-footer" />
              </a>
            </li>
          </ul>
        </div>
        <div className="footer_subscription">
          <form className="subscription_form">
            <label htmlFor="mail">Підпишіться на розсилку</label>
            <input type="email" name="mail" id="mail" placeholder="E-mail" />
            <button type="submit" className="button">
              Підписатися
              <TelegramIcon className="icon" width={24} height={24} />
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
