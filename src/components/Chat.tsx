import { Box, Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
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
import ForumIcon from "@mui/icons-material/Forum";
import MessageBox from "./Message";
import { enqueueSnackbar } from "notistack";

const cookies = new Cookies();

const Chat = () => {
  const roomId = localStorage.getItem("roomId") || "";
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin") || "false");
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isAdminOnline, setIsAdminOnline] = useState<boolean>(true);

  const user = cookies.get("user");

  const messagesCollection = collection(db, "messages");

  //   For getting messages
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

  //   For scrolling to the bottom most message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //   For checking if the room admin is oonline
  useEffect(() => {
    const roomRef = doc(db, "rooms", roomId);

    const unsubscribe = onSnapshot(roomRef, (doc) => {
      const data = doc.data();
      const adminOnline = data?.isAdminOnline ?? true;

      if (!adminOnline && !isAdmin) {
        enqueueSnackbar("Admin left the room", {
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
      }

      setIsAdminOnline(adminOnline);
    });

    return () => unsubscribe();
  }, [roomId]);

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
        {!isAdminOnline && (
          <Box
            sx={{
              minWidth: { xs: "88vw", md: "46vw" },
              position: "fixed",
              textAlign: "center",
              bgcolor: "gray",
              mx: "auto",
              zIndex: "10",
              py: "1rem",
              borderRadius: "1rem",
              color: "white",
              fontWeight: "bolder",
            }}
          >
            Admin left the room.
          </Box>
        )}
        {messages.length > 0 ? (
          messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: message.userId === user.uid ? "end" : "start",
              }}
            >
              <MessageBox message={message} isAdminOnline={isAdminOnline} />
            </Box>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              color: "gray",
            }}
          >
            <ForumIcon sx={{ mr: "1rem" }} /> No messages in this room yet.
          </Box>
        )}
        <Box ref={bottomRef} />
      </Box>
      <form onSubmit={sendMessage} style={{ display: "flex" }}>
        <TextField
          fullWidth
          placeholder="Type your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={!isAdminOnline}
        />
        <Button
          variant="contained"
          endIcon={<SendRoundedIcon />}
          sx={{ ml: "1rem" }}
          type="submit"
          disabled={!isAdminOnline}
        >
          Send
        </Button>
      </form>
    </Box>
  );
};

export default Chat;
