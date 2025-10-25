import React from 'react'
import {BsPersonCircle, BsBellFill } from 'react-icons/bs';


function Header() {
  return (
    <header className='header-admin'>

      <div className= 'header-right'>
         <BsBellFill className='bellicon'/>
        <BsPersonCircle className='icon'/>
      </div>


    </header>
  );
}


export default Header;
