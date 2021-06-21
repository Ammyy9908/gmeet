import React from 'react'
import { connect } from 'react-redux'
import { setFeed, setFeedImage, setPermission } from '../redux/actions/UiActions'
import "./Permission.css"
function PopUpPermission(props) {
console.log(props);

   const handleFeedbackPopUp = ()=>{
      props.setPermission(false);
      props.setFeed(true);
     
   }


   const handleFeedbackPopUpClose =(e)=>{
      console.log(e.target);
if(!e.target.classList.contains('popup-permission-modal') && !e.target.classList.contains('permission-controls') && !e.target.classList.contains('permission-text')){
   props.setPermission(false);
}
   }
  
   return (
      <div className="PopUpPermission" onClick={handleFeedbackPopUpClose}>
            <div className="popup-permission-modal">
               <p className="permission-text">if there was a problem you face during the meting.We need this issues kindly provide us using feedback form appear after allowing us.</p>
               <div className="permission-controls">
                  <button onClick={()=>props.setPermission(false)}>Decline</button>
                  <button onClick={handleFeedbackPopUp}>Allow</button>
               </div>
            </div>
      </div>
   )
}

const mapDispatchToProps = (dispatch)=>({
   setPermission:isPermission=>dispatch(setPermission(isPermission)),
   setFeed:isFeedback=>dispatch(setFeed(isFeedback)),
   setFeedImage:FeedbackImage=>dispatch(setFeedImage(FeedbackImage)),
})

export default connect(null,mapDispatchToProps)(PopUpPermission)
