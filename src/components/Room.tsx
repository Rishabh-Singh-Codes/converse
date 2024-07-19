import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase-config";
import { enqueueSnackbar } from "notistack";

const cookies = new Cookies();

type Props = {
  setRoomDetails: (id: string, isAdmin: boolean) => void;
};

const Room = ({ setRoomDetails }: Props) => {
  const user = cookies.get("user");
  const [currRoomId, setCurrRoomId] = useState<string>("");
  const [userEnteredRoomId, setUserEnteredRoomId] = useState<string>("");

  useEffect(() => {
    setCurrRoomId(uuidv4());
  }, []);

  if (!user) return;

  const handleSubmitRoomId = async (id: string, isAdmin: boolean) => {
    if (id.length) {
      if (isAdmin) {
        await setDoc(
          doc(db, "rooms", id),
          {
            admin: user.uid,
            adminName: user.displayName,
            isAdminOnline: true,
          },
          { merge: true }
        );

        setRoomDetails(id, isAdmin);

        enqueueSnackbar("Welcome to the room", {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
      } else {
        const roomDoc = await getDoc(doc(db, "rooms", id));

        if (roomDoc.exists()) {
          setRoomDetails(id, isAdmin);

          enqueueSnackbar("Welcome to the room", {
            variant: "success",
            anchorOrigin: { horizontal: "right", vertical: "top" },
          });
        } else {
          enqueueSnackbar("Room not found", {
            variant: "error",
            anchorOrigin: { horizontal: "right", vertical: "top" },
          });
        }
      }
    }
  };

  return (
    <Box sx={{ color: "primary.contrastText", minWidth: "95%" }}>
      <Typography variant="h5" sx={{ width: "100%" }}>
        Hi <span style={{ fontWeight: "bolder" }}>{user.displayName}</span>,
        ready to enter your chat room?
      </Typography>


      <Button
        variant="contained"
        endIcon={<TelegramIcon />}
        sx={{ mt: "1rem" }}
        onClick={() => handleSubmitRoomId(currRoomId, true)}
      >
        Create Room
      </Button>

      <Box sx={{ mt: "7rem" }}>
        <Typography variant="h6">Already have a room id?</Typography>
        <Box>
          <TextField
            placeholder="Enter room id"
            value={userEnteredRoomId}
            onChange={(e) => setUserEnteredRoomId(e.target.value)}
          />
          <IconButton
            onClick={() => handleSubmitRoomId(userEnteredRoomId, false)}
          >
            <TelegramIcon sx={{ color: "primary.contrastText" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Room;
