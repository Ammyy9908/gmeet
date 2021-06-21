import Peer from "peerjs";



const mypeer = new Peer(undefined,{
   host: "localhost",
   path:"/myapp",
   port:"9000"
})

export default mypeer;