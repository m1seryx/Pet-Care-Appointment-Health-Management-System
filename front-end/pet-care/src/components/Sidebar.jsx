import React from 'react'
import { BsHeartFill, BsCalendar, BsBarChart, BsFillGearFill, BsCreditCard, BsSpeedometer, BsJournalMedical
 } from 'react-icons/bs';




function Sidebar() {
  return (
    <aside id='sidebar'>
      <div className= 'sidebar-title'>
        <div className= 'sidebar-brand'>
            <BsHeartFill className='icon_header'/> PetCare.
        </div>


      </div>
      <ul className= 'sidebar-list'>
        <li className= 'sidebar-list-item'>
            <a href="">
                <BsSpeedometer className='icon'/> Dashboard
                </a>
        </li>
        <li className= 'sidebar-list-item'>
            <a href="">
                <BsJournalMedical className='icon'/> Pet Records
                </a>
        </li>
        <li className= 'sidebar-list-item'>
            <a href="">
                <BsCalendar className='icon'/> Appointments
                </a>
        </li>
        <li className= 'sidebar-list-item'>
            <a href="">
                <BsBarChart className='icon'/> Analytics
                </a>
        </li>
        <li className= 'sidebar-list-item'>
            <a href="">
                <BsCreditCard className='icon'/> Billing
                </a>
        </li>
        <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
      </ul>


    </aside>
  );
}


export default Sidebar;
