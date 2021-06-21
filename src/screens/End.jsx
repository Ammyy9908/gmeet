import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PopUpPermission from "../components/PopUpPermission"
import { setPermission } from '../redux/actions/UiActions';
import FeedbackPop from  "../components/FeedbackPop";


function End(props) {
   const history = useHistory()
   const handleMoveHome = ()=>{
      history.push("/");
   }

   const rejoin = ()=>{
      history.push("/"+props.id);
   }


  

   
   return (
      <div className="end-meeting">
         {props.isPermission && <PopUpPermission/>}
         {props.isFeedback && <FeedbackPop/>}
         <div className="meeting-end-container">
         <div className="end-meeting-wrapper">
               <div className="end-meeting-heading">
               You've left the meeting
               </div>
               <div className="end-meeting-buttons">
                  <button onClick={rejoin}>Rejoin</button>
                  <button onClick={handleMoveHome}>Return to home screen</button>
               </div>
               <div className="meeting-feedback">
                  <button className="feedback-btn" onClick={()=>props.setPermission(true)}>Submit feedback</button>

               </div>
         </div>
         </div>
      </div>
   )
}


const mapStateToProps = (state)=>({
   isPermission: state.UiReducer.isPermission,
   isFeedback:state.UiReducer.isFeedback,
})
const mapDispatchToProps = (dispatch)=>({
   setPermission:isPermission=>dispatch(setPermission(isPermission)),
})

export default connect(mapStateToProps,mapDispatchToProps)(End)
