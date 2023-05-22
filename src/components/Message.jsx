import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);
    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behaviour: "smooth" })
    }, [message]);
    
    console.log(data.users);
    console.log(message.senderId);

    return (
        <div ref={ref} className={`message ${message.senderId == currentUser.uid && "owner"}`}>
            <div className="messageInfo">
                <img src={data.users.get(message.senderId)?.photoURL} alt="" />
                <span>Just now</span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    )
}

export default Message