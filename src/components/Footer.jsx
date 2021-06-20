import React,{useContext} from 'react';
// eslint-disable-next-line
import {MdMic,MdCallEnd,MdVideocam,MdVideocamOff,MdKeyboardArrowUp} from 'react-icons/md';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SocketContext } from '../context/context';
import { setInfo } from '../redux/actions/UiActions';
import "./Footer.css";


function Footer(props) {
   const history = useHistory()
   const handleInfoShow = ()=>{
      props.setInfo(!props.isInfo)
   }
// eslint-disable-next-line
   const socket = useContext(SocketContext);

   const handleMettingEnd = ()=>{
      
      
      socket.emit("leave",{user:props.user && props.peoples.filter(user=>user.name===props.user.name)[0]});
      history.push('/');

   }
   return (
      <div className="footer">
         <button className="meeting__info__button" onClick={handleInfoShow}>
            Meeting info <MdKeyboardArrowUp/>
         </button>
         <div className="meeting__controls">
            <button><MdMic/></button>
            <button onClick={handleMettingEnd}><MdCallEnd/></button>
            <button><MdVideocam/></button>
         </div>
      </div>
   )
}

const mapStateToProps = (state)=>({
   isInfo:state.UiReducer.isInfo,
   user:state.UiReducer.user,
   peoples:state.UiReducer.peoples,
})
const mapDispatchToProps = (dispatch)=>({
   setInfo:isInfo=>dispatch(setInfo(isInfo))
})
export default connect(mapStateToProps,mapDispatchToProps)(Footer)
