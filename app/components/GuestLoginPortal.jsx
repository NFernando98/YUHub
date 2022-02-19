import React from 'react'

function registerGuest(){
    const guestName = document.querySelector("#guestUsername").value;
    document.querySelector("#guestLoginHeader").innerText = "Guest Login"
    localStorage.setItem("username", guestName);
}

export function GuestLoginPortal() {

  return (
    <div className="ui modal">
    <div className="header" id="guestLoginHeader">Guest Login</div>
    <div className="scrolling content">
    <div className="ui left icon input">
    <i className="user icon"></i>
    <input type="text" id="guestUsername" placeholder="username"></input>
    </div>
    <div className="ui left icon input">
    <i className="book icon"></i>
    <input type="text" id="guestProgrammer" placeholder="programe: eg. computer science, business admin"></input>
    </div>
    </div>
    <div className="actions">
    <div className="ui black positive button" id="registerUserButton">
      Confirm
    </div>
    </div>
  </div>
  )
}

window.onload = function(){
    document.querySelector("#registerUserButton").onclick = function(){
        registerGuest();
    }
}