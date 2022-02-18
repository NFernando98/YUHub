import React, { useEffect, useRef, useState } from "react";
import { SearchBar } from "./SearchBar";

const backgroundStyle = {
    position: 'absolute',
    backgroundColor: 'gray',
    width: '100%',
    height: '100%',
    opacity: 0.5
  };

export default function Background() {
    return(
        <div style={backgroundStyle}>
            <SearchBar></SearchBar>
        </div>
    )
}