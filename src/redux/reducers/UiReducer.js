const intialState = {
   isNavbar:true,
   isSidebar:false,
   activeTab:"people",
   isToast:false,
   isInfo:false,
   peoples:[],
   popover:false,
   user:null,
   userDropDown:false,
   isModal:false,
   isPermission:false,
   isFeedback:false,
   FeedbackImage:null,
   isMicOn:false,
   isCameraOn:false,
   audioStream:null,
   videoStream:null
}

const UiReducer = (state=intialState,action)=>{
   switch(action.type){
      case "SET_NAVBAR":{
         return{
            ...state,
            isNavbar:action.isNavbar
         }
      }
      case "SET_MICROPHONE":{
         return{
            ...state,
            isMicOn:action.isMicOn
         }
      }
      case "SET_AUDIO":{
         return{
            ...state,
            audioStream:action.audioStream
         }
      }

      case "SET_VIDEO":{
         return{
            ...state,
            videoStream:action.videoStream
         }
      }
      case "SET_CAMERA":{
         return{
            ...state,
            isCameraOn:action.isCameraOn
         }
      }
      case "SET_FEED_IMAGE":{
         return{
            ...state,
            FeedbackImage:action.FeedbackImage
         }
      }
      case "SET_PERMISSION":{
         return{
            ...state,
            isPermission:action.isPermission
         }
      }
      case "SET_FEEDBACK":{
         return{
            ...state,
            isFeedback:action.isFeedback
         }
      }
      case "SET_MODAL":{
         return{
            ...state,
            isModal:action.isModal
         }
      }
      case "ACCOUNT_DROPDOWN":{
         return{
            ...state,
            userDropDown:action.userDropDown
         }
      }

      case "SET_USER":{
         return {
            ...state,
            user:action.user
         }
      }

      case "SET_POPOVER":{
         return{
            ...state,
            popover:action.popover
         }
      }

      case "SET_PEOPLES":{
         return{
            ...state,
            peoples:action.peoples
         }
      }
      case "SET_SIDEBAR":{
         return{
            ...state,
            isSidebar:action.isSidebar
         }
      }

      case "SET_INFO":{
         return{
            ...state,
            isInfo:action.isInfo
         }
      }
      case "SET_TOAST":{
         return{
            ...state,
            isToast:action.isToast
         }
      }

      case "SET_TAB":{
         return{
            ...state,
            activeTab:action.activeTab
         }
      }

      default:{
         return state
      }
   }
}

export default UiReducer;