import React, { useEffect, useState, useRef, useCallback } from "react";


export function CallTrigger() {
    const audioRef = useRef(null);
    const handleStream = useCallback(
      (stream) => {
        audioRef.current.srcObject = stream;
      },
      [audioRef]
    );
  
    const [peer, setPeer] = useState();
    const [peerID, setPeerID] = useState();
    useEffect(() => {
        const peerID = localStorage.getItem("username")
        localStorage.setItem("peer-id", peerID);
    
        const peer = new Peer(peerID);
        setPeer(peer);
    
        peer.on("open", (id) => {
          setPeerID(peerID);
        });
    
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
    
        return () => {
          peer.destroy();
        };
      }, [handleStream]);

      const destination = "705508f1-b954-4575-a475-14eaf4e09d5f"
      //"38d1e467-5dfc-4731-b8e1-b7e3ccf6a440";

  const onCall = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false
      })
      .then((stream) => {
        const outgoing = peer.call(destination, stream);
        outgoing.on("stream", handleStream);
      });
  }, [peer, destination, handleStream]);

  
    return(
        <div style={{
            position: 'absolute', 
            top: '60%',
            left: '50%',
            color: 'red',
            transform: 'translate(-50%, 60%) scale(2.0)'
        }}>
            <button className="circular ui icon button" onClick={onCall}>
            <div>Connect</div>
            <i className="icon phone" style={{color: "blue"}}></i>
        </button>

        <button className="circular ui icon button">
            <div>Decline</div>
            <i className="icon phone" style={{color: "red"}}></i>
        </button>
        </div>
    )
}