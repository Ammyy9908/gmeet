import React from 'react';
import "./MeetingInfo.css";
import {MdInfo,MdContentPaste} from "react-icons/md"
import { connect } from 'react-redux';
import { setToast } from '../redux/actions/UiActions';

function MeetingInfo(props) {

   const handleCopy =()=>{
      navigator.clipboard.writeText("https://meet.google.com/cqv-arvg-dii").then(()=>{
   props.setToast("meet link copied successfully")
      }).catch((e)=>{
         console.error(e);
      })
   }
   return (
      <div className={`meeting__info ${props.isInfo && "info_enable"}`}>
        
         <div className="meeting__info__body">
            <h3>Joining info</h3>
            <span>https://meet.google.com/cqv-arvg-dii</span>
            <button className="meet_url__copy" onClick={handleCopy}>
<MdContentPaste/> Copy Joining info
            </button>
         </div>
      </div>
   )
}

const mapStateToProps = (state)=>({
   isInfo:state.UiReducer.isInfo
})

const mapDispatchToProps = (dispatch)=>({
   setToast:isToast=>dispatch(setToast(isToast))
})

export default connect(mapStateToProps,mapDispatchToProps)(MeetingInfo)
