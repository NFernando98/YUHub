import React, { useEffect, useRef, useState } from "react";

const socket = window.io();
socket.emit("welcome", "new user");
socket.on("welcome", ()=>{
    console.log("new user just joined!")
})

export default function Chat() {
  return (
        <div>
            Welcome!
        </div>
  );
}
