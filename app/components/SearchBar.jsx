import React, { useEffect, useRef, useState } from "react";

export function SearchBar(props) {
    function searchByNewFilter(){
        const filter_value = document.querySelector("#searchRoomValue")
        console.log(`searching for ${filter_value.value}`);
    }
    return(
        <div style={{
            position: 'absolute', 
            top: '0%',
            left: '50%',
            color: 'red',
            transform: 'translate(-50%, 0%)'
        }}>
        <div className="ui search">
        <div className="ui icon input">
        <input className="prompt" type="text" id="searchRoomValue" style={{color: "red"}} placeholder={props.value}></input>
        <i className="exchange icon"></i>
        </div>
        <i className="search icon" style={{cursor: "pointer"}} onClick={searchByNewFilter}></i>
        <div className="results"></div>
        </div>
        </div>
    )
}