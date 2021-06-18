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
   const [time,setTime] = React.useState(`${new Date().getHours()}:${new Date().getMinutes()}`);


   setInterval(()=>{
      setTime(`${new Date().getHours()}:${new Date().getMinutes()}`)
   },1000);

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
         <button onClick={handlePeople} className="people__button"><MdPeople/><span className="user__count">0</span></button>
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
   isNavbar:state.UiReducer.isNavbar
})
export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
