import React, { useState } from 'react';
import './NavBar.css';
import cart from '../Assets/cart.jpg';
import logo from '../Assets/Tutoring+.png';
import { Link } from 'react-router-dom';
// import { checkCookie } from '../../utils/auth';

const NavBar = () => {
  const [menu, setMenu] = useState("home");
  // const cookie = getCookie();
  // console.log('cookie',cookie);

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="" />
        <p>Tutoring+</p>
      </div>
      <ul className='nav-menu'>
        <li onClick={() => setMenu("home")}>
          <Link style={{ textDecoration: 'none' }} to='/'>
            Home
          </Link>
          {menu === "home" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("aboutUs")}>
          <Link style={{ textDecoration: 'none' }} to='/aboutUs'>
            About us
          </Link>
          {menu === "aboutUs" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("courses")}>
          <Link style={{ textDecoration: 'none' }} to='/courses'>
            Courses
          </Link>
          {menu === "courses" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("contactUs")}>
          <Link style={{ textDecoration: 'none' }} to='/contactUs'>
            Contact Us
          </Link>
          {menu === "contactUs" ? <hr /> : null}
        </li>
      </ul>
      <div className='nav-login-cart'>
        {/* Wrap the Register button with Link */}
        <Link to='/register'>
          <button className='register'>Register</button>
        </Link>
        {/* {cookie == "login" ? (<> <Link to='/logout'>
          <button className='login'>Logout</button>
        </Link></>) : (<><Link to='/login'>
          <button className='login'>Login</button>
        </Link></>)} */}
        <Link to='/login'>
          <button className='login'>Login</button>
        </Link>

        <Link to='/cart'>
          <img src={cart} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
