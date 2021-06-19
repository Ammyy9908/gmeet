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
}

const UiReducer = (state=intialState,action)=>{
   switch(action.type){
      case "SET_NAVBAR":{
         return{
            ...state,
            isNavbar:action.isNavbar
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