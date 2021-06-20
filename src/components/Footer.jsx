import React,{useContext} from 'react';
// eslint-disable-next-line
import {MdMic,MdCallEnd,MdVideocam,MdVideocamOff,MdKeyboardArrowUp,MdMicOff} from 'react-icons/md';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SocketContext } from '../context/context';
import { setAudio, setCamera, setInfo, setMic, setVideo } from '../redux/actions/UiActions';
import "./Footer.css";


function Footer(props) {
   const history = useHistory()
   const handleInfoShow = ()=>{
      props.setInfo(!props.isInfo)
   }
// eslint-disable-next-line
   const socket = useContext(SocketContext);

   const handleMettingEnd = ()=>{
      
      
      socket.emit("leave",{user:props.user && props.peoples.filter(user=>user.name===props.user.name)[0]});
      history.push(`/end/${props.id}`);

   }



   // const getVideoStream = ()=>{
   //    if(navigator.mediaDevices.getUserMedia()){
   //       navigator.mediaDevices.getUserMedia({video:props.isCameraOn,audio:props.isMicOn}).then(()=>{

   //       })
   //    }
   // }

   function TurnMicOn() {

  
    const currentUser = props.peoples.filter((people)=>people.email===props.user.email)[0];
    const myAudio = document.getElementById(currentUser.id);
      navigator.mediaDevices.getUserMedia({video: false, audio: true}).then( stream => {
         myAudio.srcObject = stream;
         props.setAudio(stream);
         props.setMic(true);
        
         
      }).catch( err => {
          console.log("u got an error:" + err)
      });
  }

  function TurnOffMic(){
  const isEnabled = props.audioStream.getAudioTracks()[0].enabled;
  if( isEnabled){
   props.audioStream.getAudioTracks()[0].enabled = false;
  }
   props.setMic(false);
  }



  function camerOn(){
   const currentUser = props.peoples.filter((people)=>people.email===props.user.email)[0];
   const mediaContainer = document.getElementById(currentUser.id+"media");
   const video = document.createElement('video')
   video.setAttribute("id",currentUser.id+"video");

   navigator.mediaDevices.getUserMedia({video:true,audio:false}).then((stream)=>{
      console.log(stream);
      props.setVideo(stream);
      video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })

       mediaContainer.append(video);
   }).catch((error)=>{
      console.error(error);
   })

  
   props.setCamera(true);
  }




  function TurnCameraOff(){
   const currentUser = props.peoples.filter((people)=>people.email===props.user.email)[0];
   const videoTag = document.getElementById(currentUser.id+"video");
   const isEnabled = props.videoStream.getVideoTracks()[0].enabled;
   if( isEnabled){
    props.videoStream.getVideoTracks()[0].enabled = false;
   }
    props.setCamera(false);
    videoTag.remove();
   }



  
   return (
      <div className="footer">
         <button className="meeting__info__button" onClick={handleInfoShow}>
            Meeting info <MdKeyboardArrowUp/>
         </button>
         <div className="meeting__controls">
            <button onClick={props.isMicOn?TurnOffMic:TurnMicOn}>{props.isMicOn?<MdMic/>:<MdMicOff fill="red"/>}</button>
            <button onClick={handleMettingEnd}><MdCallEnd/></button>
            <button onClick={props.isCameraOn?TurnCameraOff:camerOn}>{props.isCameraOn?<MdVideocam/>:<MdVideocamOff/>}</button>
         </div>
      </div>
   )
}

const mapStateToProps = (state)=>({
   isInfo:state.UiReducer.isInfo,
   user:state.UiReducer.user,
   peoples:state.UiReducer.peoples,
   isMicOn:state.UiReducer.isMicOn,
   isCameraOn:state.UiReducer.isCameraOn,
   audioStream:state.UiReducer.audioStream,
   videoStream:state.UiReducer.videoStream,
})
const mapDispatchToProps = (dispatch)=>({
   setInfo:isInfo=>dispatch(setInfo(isInfo)),
   setMic:isMicOn=>dispatch(setMic(isMicOn)),
   setCamera:isCameraOn=>dispatch(setCamera(isCameraOn)),
   setAudio:audioStream=>dispatch(setAudio(audioStream)),
   setVideo:videoStream=>dispatch(setVideo(videoStream))
})
export default connect(mapStateToProps,mapDispatchToProps)(Footer)
