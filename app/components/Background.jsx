import React, { useEffect, useRef, useState } from "react";
import { AdeleViewer } from "./AdeleBot";
import { CallTrigger } from "./callTrigger";
import { Chat } from "./Chat";
import { GuestLoginPortal } from "./GuestLoginPortal";
import { PeerAvatar } from "./PeerAvatar";
import { SearchBar } from "./SearchBar";
import { ToolBar } from "./ToolBar";
import { UserProfile } from "./UserProfile";

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
            <UserProfile></UserProfile>
            <SearchBar></SearchBar>
            <GuestLoginPortal></GuestLoginPortal>
            <ToolBar></ToolBar>
            <PeerAvatar></PeerAvatar>
            <AdeleViewer></AdeleViewer>
            <CallTrigger></CallTrigger>
            <Chat></Chat>
        </div>
    )
}