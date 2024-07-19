import MainLayout from "./components/MainLayout";
import { useEffect, useState } from "react";
import SignIn from "./components/SignIn";
import Cookies from "universal-cookie";
import Room from "./components/Room";
import Chat from "./components/Chat";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./utils/firebase-config";
import { enqueueSnackbar } from "notistack";

const cookies = new Cookies();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(cookies.get("user"));
  const [roomId, setRoomId] = useState<string | null>(
    localStorage.getItem("roomId")
  );

  useEffect(() => {
    const checkRoomId = async (id: string) => {
      const roomDoc = await getDoc(doc(db, "rooms", id));
      if (roomDoc.exists()) {
        setRoomId(id);
        localStorage.setItem("roomId", id);
        enqueueSnackbar("Welcome to the room", {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
      } else {
        localStorage.removeItem("roomId");
        window.location.replace("/");
        enqueueSnackbar("Room not found", {
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
      }
    };

    const params = new URLSearchParams(window.location.search);
    const roomIdFromURL = params.get("roomId");

    if (roomIdFromURL) {
      checkRoomId(roomIdFromURL);
    } else {
      const storedRoomId = localStorage.getItem("roomId");
      if (storedRoomId) {
        checkRoomId(storedRoomId);
      }
    }
  }, [])

  const setRoomDetails = (id: string, isAdmin: boolean) => {
    setRoomId(id);
    localStorage.setItem("roomId", id);
    localStorage.setItem("isAdmin", isAdmin.toString());
  };

  return (
    <MainLayout isLoggedIn={isLoggedIn} setLogIn={setIsLoggedIn}>
      {isLoggedIn ? (
        <>{roomId ? <Chat /> : <Room setRoomDetails={setRoomDetails} />}</>
      ) : (
        <SignIn setLogIn={setIsLoggedIn} />
      )}
    </MainLayout>
  );
}

export default App;
