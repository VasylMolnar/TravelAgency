import { React } from 'react';
import Nav from '../UI/Nav/Nav';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AuthModal from '../AuthModal/AuthModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsOpen, setIsOpen } from '../../features/modal/authModalSlice';

const Header = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen);

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Travel<span>Agency</span>
        </Link>

        <Nav />

        <button
          type="button"
          className="menu-button"
          aria-expanded="false"
          onClick={() => dispatch(setIsOpen(!isOpen))}
        >
          <MenuIcon />
        </button>

        {/* AuthModal */}
        <AuthModal />
      </div>
    </header>
  );
};

export default Header;
