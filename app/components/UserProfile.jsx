import React from 'react'

export function UserProfile(){
    function updateGuestProfile(){
        //see comment in App.js
        document.querySelector("#registerUserButton").innerText = "update";

        //change the header of the modal to show that we want to update this guests profile data
        document.querySelector("#guestLoginHeader").innerText = "Update Guest Profile"
        const userNameTextField = document.querySelector("#guestUsername")
        if(!userNameTextField.value){
            userNameTextField.value = localStorage.getItem("username");
        }
        window.$('.ui.modal').modal('show');
    }
    return (
        <button className="circular ui icon button" style={{
            // position: "absolute",
            float: 'right',
            transform: 'translate(-50%, 50%) scale(2.0)',
        }} onClick={updateGuestProfile}>
        <i className="icon user"></i>
        </button>
    )
}