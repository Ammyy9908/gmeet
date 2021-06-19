import React from 'react';
import "./NewMeetingModal.css";
import {MdClose,MdContentCopy} from "react-icons/md"
import { connect } from 'react-redux';
import { setModal, setToast } from '../redux/actions/UiActions';
import dotenv from "dotenv"
dotenv.config()

function NewMeetingModal(props) {
   const [code,setCode] = React.useState('igv-bmwv-cwp');
console.log(process.env);
   React.useEffect(()=>{


      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
      var lenString = 7;
	var randomstring = '';

   for (var i=0; i<lenString; i++) {
		var rnum = Math.floor(Math.random() * characters.length);
		randomstring += characters.substring(rnum, rnum+1);
	}

   setCode(randomstring);


   },[])


   const handleCopy =()=>{
      navigator.clipboard.writeText(`https://gmeet2.vercel.app/${code}`).then(()=>{
         props.setToast("Copied meeting link");
      }).catch((e)=>{
         props.setToast(e.message);
      })
   }
   return (
      <div className="NewMeetingModal__popup">
         <div className="new__meeting__modal">
            <div className="modal__header">
               <h3>Here's the link to your meeting</h3>
               <button className="modal-close" onClick={()=>props.setModal(false)}><MdClose/></button>
            </div>
            <p>Copy this link and send it to people you want to meet with.Be sure you to save it so you can use it later,too.</p>

            <div className="generated__link__wrapper">
               <p>{`https://gmeet2.vercel.app/${code}`}</p>
              <button className="link_copy_btn" onClick={handleCopy}>
              <MdContentCopy/>
              </button>
            </div>
         </div>
      </div>
   )
}


const mapDispatchToProps = (dispatch)=>({
   setToast:isToast=>dispatch(setToast(isToast)),
   setModal:isModal=>dispatch(setModal(isModal)),
})

export default connect(null,mapDispatchToProps)(NewMeetingModal)
