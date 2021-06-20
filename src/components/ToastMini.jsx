import React from 'react';
import "./ToastMini.css";
import {MdMicNone,MdMicOff} from "react-icons/md"
import { connect } from 'react-redux';
import { setToastMini } from '../redux/actions/UiActions';

function ToastMini({message,setToastMini,isToastMini,isMicOn}) {

  
   setTimeout(()=>{
      if(isToastMini){
         setToastMini(false);
      }
   },3000);
   return (
      <div className="toast-mini">
         {isMicOn?<MdMicNone/>:<MdMicOff/>} {message}
      </div>
   )
}


const mapStateToProps = (state)=>({
   isToastMini: state.UiReducer.isToastMini,
   isMicOn:state.UiReducer.isMicOn,
})
const mapDispatchToProps = (dispatch)=>({
   setToastMini:isToast=>dispatch(setToastMini(isToast))
})

export default connect(mapStateToProps,mapDispatchToProps)(ToastMini)
