import React,{useContext} from 'react'
// eslint-disable-next-line
import {MdClose,MdChat,MdPeople,MdMicNone,MdMicOff,MdSend} from "react-icons/md";
import { connect } from 'react-redux';
import { SocketContext } from '../context/context';
import { setNavbar, setSidebar, setTab } from '../redux/actions/UiActions';
import "./Sidebar.css"

function Avatar({src}){
   return (<div className="avatar">
      <img src={src} alt="user-avatar" />
   </div>);
}
const UserList = (props)=>{
   return (
      <div className="user-list">
         <div className="user__list__left">
         <Avatar src={props.avatar}/>
         <span>{props.name}</span>
         </div>
         <div>
            <button><MdMicNone/></button>
         </div>
      </div>
   )
}

function Sidebar(props) {
console.log("Sidebar props",props)
const socket = useContext(SocketContext);



const [messages,setMessages] = React.useState([]);
const [message,setMessage] = React.useState("");

   const handleSwitch = ()=>{
      props.setNavbar(true);
      props.setSidebar(false);
   }

   const handleMessage = (e)=>{
      setMessages([...messages,{time:new Date().getTime(),message:message,user:props.user && props.user.name}])
      socket.emit("chat-message",{time:new Date().getTime(),message:message,user:props.user && props.user.name});
      setMessage('');
   }

   socket.on("chat-message",(message)=>{
console.log(message);
setMessages([...messages,message.message])

   })

   console.log(messages);
   return (
      <div className={`sidebar ${props.isSidebar && "sidebar__enable"}`}>
         <div className="sidebar__header">
            <h1>Meeting details</h1>
            <button onClick={handleSwitch}>
               <MdClose/>
            </button>
         </div>
         <div className="sidebar__tabs">
         <button onClick={()=>props.setTab("people")} className={`${props.activeTab==="people" && "activeTab"}`}><MdPeople/><span>({props.peoples.length})</span></button>
            <button onClick={()=>props.setTab("chat")} className={`${props.activeTab==="chat" && "activeTab"}`}><MdChat/></button>
           
         </div>

         {props.activeTab==="people" && <div className="attendes__list">
          
            {
               props.peoples.map((people,i)=>{
                  return   <UserList key={i} name={people.name} avatar={people.avatar}/>
               })
            }
         </div>}
         {props.activeTab==="chat" && <div className="chat__body">
            <div className="chat__body__chats">
               {
                  messages.map((message,i)=>{
                     return <div className="user-chat">
                      <div className="chat__top">
                         <span>{props.user&& props.user.name===message.user?"You":message.user}</span>
                         <span>{new Date(message.time).getHours()}:{new Date(message.time).getMinutes()}</span>
                      </div>
                      <div className="chat__message">
                         {message.message}
                      </div>
                     </div>
                  })
               }
            </div>
            <div className="chat__footer">
               <div className="chat__footer__input">
                  <input type="text" name="message" id="message" placeholder="send a message to everyone" value={message} onChange={(e)=>setMessage(e.target.value)}/>
                  <button disabled={!message && true}onClick={!message?null:handleMessage}><MdSend/></button>
               </div>
            </div>
         </div>}
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
   isSidebar:state.UiReducer.isSidebar,
   activeTab:state.UiReducer.activeTab,
   peoples:state.UiReducer.peoples,
   user:state.UiReducer.user,
})
export default connect(mapStateToProps,mapDispatchToProps)(Sidebar)