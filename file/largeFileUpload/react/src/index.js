import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import io from 'socket.io-client';
import SocketIOFileUpload from 'socketio-file-upload/client'

const SOCKET_PATH = 'http://localhost:3030/largeUpload';
const socket = io(SOCKET_PATH)
let siofu = new SocketIOFileUpload(socket);
siofu.maxFileSize = null;
siofu.chunkSize = 1024 * 100;

function App() {
  siofu.addEventListener("complete", function (event) {
    console.log(event.success);
    console.log("-------------------------------");
    console.log(event.file);
  });

  siofu.addEventListener("progress", function (event) {
    console.log(((event.bytesLoaded / event.file.size) * 100).toFixed(2));
  });


  return (
    <div>
      <button id="upload_btn" onClick={siofu.prompt}>파일 업로드</button>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
