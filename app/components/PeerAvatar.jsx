import React from 'react'

export function PeerAvatar() {
    return (
        <div>
            <div className="circular ui icon button"id="yourAvatar" style={{
            position: 'absolute', 
            top: '30%',
            left: '20%',
            color: 'red',
            transform: 'translate(-20%, -30%) scale(5.0)'
        }}><div style={{
            transform: 'scale(2.5)'
        }} id="yourEmoji">😱</div>
            </div>
            <div style={{
                  position: 'absolute', 
                  top: '30%',
                  left: '50%',
                  color: 'red',
                  transform: 'translate(-50%, -30%) scale(2.0)'
            }} id="connectPeerStatus">
                Finding yuhubers...
            </div>

            <div className="circular ui icon button"id="peerAvatar" style={{
            position: 'absolute', 
            top: '30%',
            left: '80%',
            color: 'green',
            transform: 'translate(-80%, -30%) scale(5.0)'
            }}><div style={{
                transform: 'scale(2.5)'
            }} id="peerEmoji">😀</div>
            </div>
        </div>
    )
}