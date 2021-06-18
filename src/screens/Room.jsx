import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MeetingInfo from '../components/MeetingInfo'
import Toast from '../components/Toast'

function Room() {
   return (
      <div className="application-room">
         <Navbar/>
         <Sidebar/>
         <MeetingInfo/>
         <Toast message="copied meeting link"/>
         <Footer/>
      </div>
   )
}

export default Room
