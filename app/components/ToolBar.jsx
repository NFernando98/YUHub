import React from 'react'

export function ToolBar() {
    function openAdele(){
        window.$("#adeleViewer").toggle();
    }
        return (
            <div className="ToolBarContainer" style={{
                position: 'absolute', 
                top: '80%',
                left: '50%',
                color: 'red',
                transform: 'translate(-50%, 80%) scale(2.0)'
            }}>
                <button className="circular ui icon button" onClick={openAdele}>
                <i className="fas fa-robot"></i>
            </button>
    
            <button className="circular ui icon button" style={{
                backgroundColor: "red"
            }} onClick={()=>{
                window.$('#chatContainer').modal('show');
            }}>
                <i className="icon chat"></i>
            </button>
    
            <button className="circular ui icon button">
                <i className="icon game"></i>
            </button>
            </div>
        )
    }