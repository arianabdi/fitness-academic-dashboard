import { io } from "socket.io-client";
import { useSelector } from "react-redux";



// console.log('socket.js', auth)
export const socket = io('ws://185.10.72.167:5055', {
  autoConnect: false,
  // transports: ['websocket'],
  extraHeaders: {
    authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInJvbGUiOiJzIiwiaWF0IjoxNjk2ODM3MjE4LCJleHAiOjE2OTY4NDA4MTh9.MjYTdQaaOqNq_Gu66P71FsWOaau95Uy2Vsw68QTWSTY'
  },
});


// // "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : process.env.REACT_APP_API_URL;
// const token = localStorage.getItem('token')
// console.log('______________xxxxxxxxxx', URL, token);


