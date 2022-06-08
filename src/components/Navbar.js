import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import Avatar from '@mui/material/Avatar';
import Logo from '../images/logo.png';
import User from '../images/user.jpeg';
import './Navbar.css';
import { IconContext } from 'react-icons';

function Navbar() {

  return (
    <>
      <IconContext.Provider value={{ color: '#000000' }}>
        <div className='navbar'>
          <div className='nav-logo'>
          <Link to='/' className='menu-bars'>
          <img src={Logo}	alt="beach" style={{ height: "40px", width: "40px"}} />
          </Link>
          <span className="app-name">MY APPLICATION</span>
          </div>
          <div className='nav-profile'>
          <Avatar alt="User" src={User} />
          <span className='user-name'>Prakash P</span>
          </div>
         
        </div>
        <nav className={'nav-menu active'}>
          <ul className='nav-menu-items'>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
