const React = require('react');
const ReactDOM = require('react-dom');

import Background from './components/Background';
import { showCallTrigger } from './components/callTrigger';

ReactDOM.render(<Background/>, document.getElementById('main'));

setTimeout(()=>{
    //show the register portal only if user has not registered before
    const username = localStorage.getItem("username");
  
    //here we only change the name of the register button to register or update, we want to avoid creating duplicates 
    document.querySelector("#registerUserButton").innerHTML = "register";
  
    if(!username){
      window.$('#loginPortal').modal('show');
    }else{
      console.log(`Welcome back ${username}`)
      globalSignals.findPeer.dispatch();
    }
  }, 2000);

console.log("%cYUHub!", "font-size:5em; color: blue");

window.editorSignals = {
    findPeer: new signals.Signal()
}
export const globalSignals = window.editorSignals;
globalSignals.findPeer.add(()=>{
    const user = localStorage.getItem("username");
    var candidatePeers = Array.from(window.peers).filter(peersName => peersName !== user);
    console.log("connecting", candidatePeers);

    if(candidatePeers.length > 0){
        //we connect to this peer until there are no peer left to connect to
        const yourSearchInterests = localStorage.getItem("interest");
        const yourProgramme = localStorage.getItem("programme");
        candidatePeers = candidatePeers.filter(peerName=>window.peersData[peerName]?.interest == yourSearchInterests).concat(candidatePeers.filter(peerName=>window.peersData[peerName]?.programme == yourProgramme));

        let peer = candidatePeers.pop();
        
        console.log("fit candidate", peer);
        if(peer instanceof String) document.querySelector("#connectPeerStatus").innerText = `connecting to ${peer}`;
        window.socket.emit("pickedPeer", {sender: user, reciever: peer});
        window.peerUser = peer;
    }
})