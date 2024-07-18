import { useEffect, useState } from "react";

const Chat = () => {
    const [roomId, setRoomId] = useState<string>("");

    useEffect(() => {
        setRoomId(localStorage.getItem("roomId") || "");
    }, []);

    console.log('roomId', roomId)

    // if(!roomId) return;
    return (
        <div>Chat: {roomId}</div>
    )
}

export default Chat;