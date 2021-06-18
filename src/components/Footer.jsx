import React from 'react';
import {MdMic,MdCallEnd,MdVideocam,MdVideocamOff,MdKeyboardArrowUp} from 'react-icons/md';
import { connect } from 'react-redux';
import { setInfo } from '../redux/actions/UiActions';
import "./Footer.css";

function Footer(props) {

   const handleInfoShow = ()=>{
      props.setInfo(!props.isInfo)
   }
   return (
      <div className="footer">
         <button className="meeting__info__button" onClick={handleInfoShow}>
            Meeting info <MdKeyboardArrowUp/>
         </button>
         <div className="meeting__controls">
            <button><MdMic/></button>
            <button><MdCallEnd/></button>
            <button><MdVideocam/></button>
         </div>
      </div>
   )
}

const mapStateToProps = (state)=>({
   isInfo:state.UiReducer.isInfo
})
const mapDispatchToProps = (dispatch)=>({
   setInfo:isInfo=>dispatch(setInfo(isInfo))
})
export default connect(mapStateToProps,mapDispatchToProps)(Footer)
