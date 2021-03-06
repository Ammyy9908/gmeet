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
import Cookies from "js-cookie";
import { useHistory } from 'react-router-dom'
import ToastMini from "../components/ToastMini"


function UserTile({people,isCameraOn}){
   return (
      <div className="user-tile" id={people.id+"media"}>
         <audio autoplay="true" id={people.id}/>
            {!isCameraOn && <div className="people__avatar">
               <img src={people.avatar} alt="avatar"/>

              

            </div>}

      </div>
   )
}
function Room({id,setPeople,setToast,user,peoples,isCameraOn,isMicOn,isToastMini}) {

   const history = useHistory();
   console.log("props user",user);
   
  React.useEffect(() => {

if(!Cookies.get("AUTH_TOKEN")){
return history.push("/");
}
   socket.emit("join-meet",{code:id,user:{name:user ? user.name:"Someone",email:user ? user.email:"sb78639@gmail.com",avatar:user && user.avatar}});
    

    socket.on("user-connect",(users) => {
      console.log(users)
      setPeople(users);
      const audio = new Audio(ping);
      audio.play();
      
    })

    socket.on("system-message",(message) => {
  
     
       setToast(message.message);
    })
    
    
  },
  // eslint-disable-next-line
   [user]);
   return (
      <SocketContext.Provider value={socket}><div className="application-room">
        
         <Navbar/>
         <Sidebar/>
         <MeetingInfo/>
           {isToastMini &&  <ToastMini message={isMicOn?"Microphone on":"Microphone off"}/>}
         <div className="room-body">
           {
              peoples.map((people,i)=>{
                 return <UserTile key={i} people={people} isCameraOn={isCameraOn}/>
              })
           }
         </div>
         <Toast/>
         <Footer id={id}/>
      </div>
      </SocketContext.Provider>
   )
}

const mapStateToProps = (state)=>({
   user:state.UiReducer.user,
   peoples:state.UiReducer.peoples,
   audioStream:state.UiReducer.audioStream,
   isCameraOn:state.UiReducer.isCameraOn,
   isMicOn:state.UiReducer.isMicOn,
   isToastMini:state.UiReducer.isToastMini
})

const mapDispatchToProps = (dispatch)=>({
   setPeople:peoples=>dispatch(setPeople(peoples)),
   setToast:isToast=>dispatch(setToast(isToast))
})
export default connect(mapStateToProps,mapDispatchToProps)(Room)
