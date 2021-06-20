import React from 'react'
import { connect } from 'react-redux';
import { setFeed } from '../redux/actions/UiActions';
import "./Feedback.css"
function FeedbackPop(props) {

   const [feedback,setFeedback] = React.useState('');

   const handleFeedback = ()=>{
      alert("Currentl we not add functionality for feedback")
   }
   return (
      <div className="feedback-popup">
         <div className="feedback-modal">
            <div className="feedback-modal-header">
               <h3>Send Feedback</h3>
            </div>
            <div className="feedback-text">
                  <textarea name="feedback" id="feedback" value={feedback} onChange={(e)=>setFeedback(e.target.value)} placeholder="Have a feedback? We'd love to hear it, but please don't share sensitive information.Have questions? Try help ro support"/>
            </div>
            <div className="feedback-footer">
               <button onClick={()=>props.setFeed(false)}>CANCEL</button>
               <button onClick={handleFeedback}>SEND</button>
            </div>


         </div>
      </div>
   )
}

const mapDispatchToProps = (dispatch)=>({
  
   setFeed:isFeedback=>dispatch(setFeed(isFeedback)),
})
export default connect(null,mapDispatchToProps)(FeedbackPop)
