import React from 'react';
import "./MeetingInfo.css";
// eslint-disable-next-line
import {MdInfo,MdContentPaste} from "react-icons/md"
import { connect } from 'react-redux';
import { setToast } from '../redux/actions/UiActions';

function MeetingInfo(props) {
const [link] = React.useState(window.location.href);
   const handleCopy =()=>{
      navigator.clipboard.writeText(link).then(()=>{
   props.setToast("meet link copied successfully")
      }).catch((e)=>{
         console.error(e);
      })
   }
   return (
      <div className={`meeting__info ${props.isInfo && "info_enable"}`}>
        
         <div className="meeting__info__body">
            <h3>Joining info</h3>
            <span>{link}</span>
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
