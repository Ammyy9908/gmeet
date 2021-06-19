import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MeetingInfo from '../components/MeetingInfo'
import Toast from '../components/Toast'
import { connect } from 'react-redux'
import { setPeople, setToast } from '../redux/actions/UiActions'
import {SocketContext, socket} from '../context/context';
import ping from "../assets/Ping.mp3";
function Room({id,setPeople,setToast}) {
   
  React.useEffect(() => {
   
   
    socket.emit("join-meet",{code:id});
    

    socket.on("user-connect",(users) => {
      console.log(users)
      setPeople(users);
      
      
    })

    socket.on("system-message",(message) => {
  
      const audio = new Audio(ping);
         audio.play();
       setToast(message.message)
    })
    
  },
  // eslint-disable-next-line
   []);
   return (
      <SocketContext.Provider value={socket}><div className="application-room">
        
         <Navbar/>
         <Sidebar/>
         <MeetingInfo/>
         <Toast message="copied meeting link"/>
         <Footer/>
      </div>
      </SocketContext.Provider>
   )
}


const mapDispatchToProps = (dispatch)=>({
   setPeople:peoples=>dispatch(setPeople(peoples)),
   setToast:isToast=>dispatch(setToast(isToast))
})
export default connect(null,mapDispatchToProps)(Room)
