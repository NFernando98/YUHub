import React, { useEffect, useRef, useState } from "react";
import { globalSignals } from "../app";
import { showCallTrigger } from "./callTrigger";

window.peers = new Set();
window.peersData = new Object();

const socket = window.io();
socket.emit("welcome", { name: localStorage.getItem("username"), programme: localStorage.getItem("programme"), interest: localStorage.getItem("interest")});
socket.on("welcome", (user)=>{
  if(!window.peers.has(user.name)){
    window.peers.add(user.name);
    if(user?.programme){
      if(window.peersData[user.name])window.peersData[user.name].programme = user.programme;
    }
    if(user?.interest){
      if(window.peersData[user.name])window.peersData[user.name].interest = user.interest;
    }
  }
 

  const username = localStorage.getItem("username")
  if(user.name !== username){
    console.log("new user just joined: ", user.name);
    globalSignals.findPeer.dispatch();

    //announce that a user was previously here
    socket.emit("announceOldtimer", { name: username, programme: localStorage.getItem("programme"), interest: localStorage.getItem("interest")});
  }
});


socket.on("updateInterest", (user)=>{
    if(user?.interest){
      if(window.peersData[user.name]) window.peersData[user.name].interest = user.interest;
    }
})

socket.on("announceOldtimer", (user)=>{
  if(!window.peers.has(user.name)){
    window.peers.add(user.name);
    if(user?.programme){
      if(window.peersData[user.name])window.peersData[user.name].programme = user.programme;
    }
    if(user?.interest){
      if(window.peersData[user.name])window.peersData[user.name].interest = user.interest;
    }
  }
  console.log("prev user(s): ", user);

  globalSignals.findPeer.dispatch();
})

socket.on("pickedPeer", (data)=>{
  const user = localStorage.getItem("username");
  if(data.reciever === user){
    console.log(`this user ${data.sender} is trying to connect with you!`);
    document.querySelector("#connectPeerStatus").innerText = `connecting to ${data.sender}`;
    window.peerUser = data.sender;
  }
});
socket.on("chat message", (msg)=>{
  const user = localStorage.getItem("username");
  const viewmessage = document.querySelector('#ViewMessage');
  if(user !== msg.sender){
    window.$("#ViewMessage").append('<span>'+msg.sender+": "+ msg.message + '</span><br />')
  }
})

socket.on("showUserAvatar", (user)=>{
  if(user.name !== localStorage.getItem("username")){
    document.querySelector("#peerEmoji").innerText = user.emoji;
  }
})
window.socket = socket;

export function Chat() {
  return (
    <div className="ui modal" id="chatContainer">
    <div className="header">Chat Message</div>
    <div className="scrolling content">
    <div id="ViewMessage" style={{
      width: "100%",
      height:"100%",
      overflow: "auto"

    }}>
    </div>
    <div className="ui fitted divider"></div>
    <br></br>
    <div className="ui right icon input" style={{width: "100%"}}>
    <i className="send icon" id="sendMessageButton"></i>
    <input type="text" id="chatMessage" placeholder=""></input>
    </div>
    </div>
    </div>
  );
}

document.addEventListener("keydown", (ev)=>{
  if(ev.which == 13){
    const chatmessage = document.querySelector('#chatMessage');
    if(document.activeElement == chatmessage){
      const user = localStorage.getItem("username");
      const viewmessage = document.querySelector('#ViewMessage');
      window.$("#ViewMessage").append('<span>'+user+": "+ chatmessage.value + '</span><br />')
      window.socket.emit("chat message", {sender: user, message: chatmessage.value})
      chatmessage.value = "";
    }
  }
})
