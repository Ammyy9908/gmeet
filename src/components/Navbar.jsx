import React from 'react'
// eslint-disable-next-line
import { MdPeople,MdPeopleOutline,MdChat,MdChatBubbleOutline,MdMessage } from "react-icons/md";
import { connect } from 'react-redux';
import { setNavbar, setSidebar, setTab } from '../redux/actions/UiActions';
import "./Navbar.css";

function Avatar({src}){
   return (<div className="avatar">
      <img src={src} alt="user-avatar" />
   </div>);
}

function Navbar(props) {
   const [time,setTime] = React.useState(``);


   setInterval(()=>{
      formatAMPM(new Date())
   },1000);



   function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      setTime(strTime.toUpperCase());
    }


   const handlePeople = ()=>{
      props.setTab("people");
      props.setNavbar(false);
      props.setSidebar(true);
   }
   const handleChat = ()=>{
      props.setTab("chat");
      props.setNavbar(false);
      props.setSidebar(true);
   }
   return (
      <div className={`navbar ${!props.isNavbar && "navbar__disable"}`}>
         <button onClick={handlePeople} className="people__button"><MdPeople/><span className="user__count">{props.peoples.length}</span></button>
         <button onClick={handleChat}><MdChat/></button>
         <div className="current-time">
            {time}
         </div>
         <div className="logined__user">
            <span>You</span>
            <Avatar src="https://randomuser.me/api/portraits/men/46.jpg"/>
         </div>
      </div>
   )
}

const mapDispatchToProps = (dispatch)=>({
   setNavbar:isNavbar=>dispatch(setNavbar(isNavbar)),
   setSidebar:isSidebar=>dispatch(setSidebar(isSidebar)),
   setTab:activeTab=>dispatch(setTab(activeTab))
})
const mapStateToProps = (state)=>({
   isNavbar:state.UiReducer.isNavbar,
   peoples:state.UiReducer.peoples
})
export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
