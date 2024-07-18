import MainLayout from "./components/MainLayout";
import { useState } from "react";
import SignIn from "./components/SignIn";
import Cookies from "universal-cookie";
import Room from "./components/Room";
import Chat from "./components/Chat";

const cookies = new Cookies();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(cookies.get("user"));
  const [roomId, setRoomId] = useState<string | null>(null);
  return (
    <MainLayout isLoggedIn={isLoggedIn} setLogIn={setIsLoggedIn}>
      {isLoggedIn ? (
        <>{roomId ? <Chat /> : <Room />}</>
      ) : (
        <SignIn setLogIn={setIsLoggedIn} />
      )}
    </MainLayout>
  );
}

export default App;
