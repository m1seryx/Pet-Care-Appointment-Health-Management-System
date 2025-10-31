import React from 'react'
import { BsCalendar, BsBarChartFill, BsJournalMedical, BsHourglassSplit}
from 'react-icons/bs';
import './Admin.css';
import Sidebar from './Sidebar'; 
import Header from './Header';


function AdminHome() {
  return (
    <div className='grid-container'>
      <Sidebar />
      <Header />
    <main className='main-container'>

        <div className= 'main-dash'>
            <h3>Welcome Back, Admin!</h3>
            <h4>Have a nice day.</h4>
            
        </div>



        <div className='main-cards'>
            <div className= 'card'>
              <div className='card-inner'>
                <h3> Pet records  </h3>
                <BsJournalMedical className='card_icon'/>
                </div>
            </div>


             <div className= 'card'>
              <div className='card-inner'>
                <h3> Today's Appointments </h3>
                <BsCalendar className='card_icon'/>
                </div>
            </div>


             <div className= 'card'>
              <div className='card-inner'>
                <h3> Monthly Revenue  </h3>
                <BsBarChartFill className='card_icon'/>
                </div>
            </div>


             <div className= 'card'>
              <div className='card-inner'>
                <h3> Pending Approvals </h3>
                <BsHourglassSplit className='card_icon'/>
                </div>
            </div>




        </div>
    </main>
    </div>

  );
}


export default AdminHome;