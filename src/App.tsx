import MainLayout from "./components/MainLayout";
import { useState } from "react";
import SignIn from "./components/SignIn";
import Cookies from "universal-cookie";
import Room from "./components/Room";
import Chat from "./components/Chat";

const cookies = new Cookies();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(cookies.get("user"));
  const [roomId, setRoomId] = useState<string | null>(localStorage.getItem("roomId"));

  const setRoomDetails = (id: string) => {
    setRoomId(id);
    localStorage.setItem("roomId", id);
  }
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
