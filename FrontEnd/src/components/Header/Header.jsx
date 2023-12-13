import React, { useState } from 'react';
import style from './Header.module.css';
import Logo from '../../assets/Icons/logo.svg';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('access_token') !== null);

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className={style.Bg}>
      <div className={style.container}>
        <div className={style.logoCont}>
          <img src={Logo} alt="" />
          <h1>Galaxy<br />Bank</h1>
        </div>
        <div className={style.links}>
          <Link to="/" id={style.oBanco}><h1>O Banco</h1></Link>
          {isAuthenticated ? (
            <Link to="/userArea" id={style.oBanco}><h1>Home</h1></Link>
          ) : (
            <Link to="/register" id={style.oBanco}><h1>Register</h1></Link>
          )}
          {isAuthenticated ? (
            <h1 id={style.logout} onClick={logout}>Sair</h1>
          ) : (
            <Link to="/login" id={style.login}><h1>Login</h1></Link>
          )}

        </div>
      </div>
    </div>
  );
}

export default Header;
