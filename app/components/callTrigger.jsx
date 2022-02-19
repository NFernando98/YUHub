import React, { useEffect, useState, useRef, useCallback } from "react";

const peerId = localStorage.getItem("username");

const peer = new Peer(peerId);
const audioFeedback = document.createElement('audio');
document.body.appendChild(audioFeedback);
console.log(peerId, peer);
function handleStream(stream){
    if(!audioFeedback){
        audioFeedback = document.createElement('audio');
        document.body.appendChild(audioFeedback); 
    }
    audioFeedback.srcObject = stream;
    audioFeedback.play()
}
peer.on("call", (call) => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false
      })
      .then((stream) => {
        call.answer(stream);
        call.on("stream", handleStream);
      });
  });
  
function disconnectCaller(){
    window.call.close();
    audioFeedback.pause();
    audioFeedback.srcObject = null;
}

function makeCall(){
    const destination = window.peerUser;

    if(!destination){
        return;
    }else if(destination == localStorage.getItem("username")){
        return;
    }
   navigator.mediaDevices
  .getUserMedia({
      audio: true,
      video: false
  })
  .then((stream) => {
      const outgoing = peer.call(destination, stream);
      outgoing.on("stream", handleStream);
      window.call = outgoing;
  });
  }


export function CallTrigger() {
    return(
        <div style={{
            position: 'absolute', 
            top: '60%',
            left: '50%',
            color: 'red',
            transform: 'translate(-50%, 60%) scale(2.0)'
        }} id="callTriggerButtons">
            <button className="circular ui icon button" onClick={makeCall}>
            <div>Connect</div>
            <i className="icon phone" style={{color: "blue"}}></i>
        </button>

        <button className="circular ui icon button" onClick={disconnectCaller}>
            <div>Decline</div>
            <i className="icon phone" style={{color: "red"}}></i>
        </button>
        </div>
    )
}

// export function showCallTrigger(){
//     window.$("#callTriggerButtons").toggle();
// }