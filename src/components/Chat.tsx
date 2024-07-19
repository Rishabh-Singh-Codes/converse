import { Box, Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { db } from "../utils/firebase-config";
import Cookies from "universal-cookie";
import { Message } from "../utils/types";
import MessageBox from "./Message";

const cookies = new Cookies();

const Chat = () => {
  const roomId = localStorage.getItem("roomId") || "";
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin") || "false");
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const user = cookies.get("user");

  const messagesCollection = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesCollection,
      where("room", "==", roomId),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const messages: Message[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          id: doc.id,
          text: data.text,
          createdAt: data.createdAt?.toDate()
            ? data.createdAt.toDate()
            : new Date(data.createdAt),
          userName: data.userName,
          userPic: data.userPic,
          userId: data.userId,
          room: data.room,
          isAdmin: data.isAdmin,
        });
      });

      setMessages(messages);
    });

    return () => unsubscribe();
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messages]);

  if (!roomId) return null;

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newMessage.length) {
      await addDoc(messagesCollection, {
        text: newMessage,
        createdAt: serverTimestamp(),
        userName: user.displayName,
        userPic: user.photoURL,
        userId: user.uid,
        room: roomId,
        isAdmin,
      });

      setNewMessage("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        marginY: "1rem",
        minWidth: "100%",
        height: "70vh",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflowX: "hidden",
          overflowY: "scroll",
          maxHeight: "inherit",
          height: "100%",
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: message.userId === user.uid ? "end" : "start",
            }}
          >
            <MessageBox message={message} />
          </Box>
        ))}
        <Box ref={bottomRef} />
      </Box>
      <form onSubmit={sendMessage} style={{ display: "flex" }}>
        <TextField
          fullWidth
          placeholder="Type your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button
          variant="contained"
          endIcon={<SendRoundedIcon />}
          sx={{ ml: "1rem" }}
          type="submit"
        >
          Send
        </Button>
      </form>
    </Box>
  );
};

export default Chat;
