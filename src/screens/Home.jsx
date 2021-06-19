import React from 'react'
import {MdSettings,MdFeedback,MdHelpOutline,MdVideoCall,MdLink,MdAdd} from "react-icons/md";
import { connect } from 'react-redux';
import conversation from "../assets/conversation.svg"
import { setPopOver, setUser } from '../redux/actions/UiActions';
import { GoogleLogin } from 'react-google-login';
import axios from "axios";
import Cookies from "js-cookie";
function Avatar({src}){
   return (<div className="avatar">
      <img src={src} alt="user-avatar" />
   </div>);
}


function Home(props) {


  

   

   console.log("Home Props",props);


   const handlePopRemove = (e)=>{
     
      if(!e.target.classList.contains("new-meeting-btn")){
         props.setPopOver(false);
      }
   }


   const responseGoogle = async (response) => {
      if(response.error){
         return alert("There is some error while login");
      }

      const {email,name,imageUrl} = response.profileObj;




      

      try{
         const r = await axios.post(`${process.env.REACT_APP_SERVER_PROD}/add`,{email,name,imageUrl});
         console.log(r.data.token);
         const {token} = r.data;
         console.log("The token is ",token);
         Cookies.set("AUTH_TOKEN",token);
      }
      catch(e){
         if(e.response && e.response.data){
            console.log(e.response.data);
         }
      }


    }
   return (
      <div className="homepage" onClick={handlePopRemove}>
         <header>
            <div className="brandname">
               <a href="/">Gmeet</a>
            </div>
            <nav>
               <div className="time_home">2:15 PM Sat,Jun 19</div>
               <div className="nav__controls">
                  <button><MdHelpOutline/></button>
                  <button><MdFeedback/></button>
                  <button><MdSettings/></button>
               </div>
              { props.user && <Avatar src={props.user.avatar}/>}
            </nav>
         </header>

         <section className="landing">
            <div className="hero__left">
               <div className="hero__heading">
                  <h1>Join Conference Meetings for free for everyone</h1>
                  
               </div>
               <p>We built this using web technolgies like sockets</p>
                  

                  {!props.user && <GoogleLogin
    clientId="907442748570-rihj2qd4fv2ecvpkqbp36thrd3uqo9rr.apps.googleusercontent.com"
    render={renderProps => (
      <button className="google_login_auth" onClick={renderProps.onClick} disabled={renderProps.disabled}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google-icon" />
      Login with Google
   </button>
      
    )}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />}
                  {props.user && <div className="hero__meeting__form">
                     <button onClick={()=>props.setPopOver(true)} className="new-meeting-btn">
                        <MdVideoCall/> New Meeting
                        {props.popover && <div className="button_popover">
                           <button><MdLink/>Create a meeting for later</button>
                           <button><MdAdd/> Start an instant meeting</button>
                        </div>}
                        </button>
                     <input type="text" name="meetingCode" id="code" />
                  </div>}
            </div>
            <div className="hero__right">
                  <img src={conversation} className="illustration" alt="illustration"/>
            </div>
         </section>
      </div>
   )
}


const mapDispatchToProps = (dispatch)=>({
   setPopOver:popover=>dispatch(setPopOver(popover)),
   setUser:user=>dispatch(setUser(user)),
})

const mapStateToProps = (state)=>({
   popover:state.UiReducer.popover,
   user:state.UiReducer.user
})
export default connect(mapStateToProps,mapDispatchToProps)(Home)
