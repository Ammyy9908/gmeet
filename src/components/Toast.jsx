import React from 'react';
import { connect } from 'react-redux';
import { setToast } from '../redux/actions/UiActions';
import "./Toast.css"

function Toast({isToast,setToast}) {
   React.useEffect(()=>{
         if(isToast){
            setTimeout(()=>{
               setToast(false)
            },5000);
         }
   },[isToast])
   return (
      <div className={`toast ${isToast && "toast__enable"}`}>
         {isToast}
      </div>
   )
}


const mapStateToProps = (state)=>({
   isToast: state.UiReducer.isToast
})
const mapDispatchToProps = (dispatch)=>({
   setToast:isToast=>dispatch(setToast(isToast))
})
export default connect(mapStateToProps,mapDispatchToProps)(Toast)
