import {
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import TelegramIcon from "@mui/icons-material/Telegram";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const cookies = new Cookies();

type Props = {
  setRoomDetails: (val: string) => void;
};

const Room = ({ setRoomDetails }: Props) => {
  const user = cookies.get("user");
  const [currRoomId, setCurrRoomId] = useState<string>("");
  const [userEnteredRoomId, setUserEnteredRoomId] = useState<string>("");

  useEffect(() => {
    setCurrRoomId(uuidv4());
  }, []);

  if (!user) return;

  const handleSubmitRoomId = (id: string, isAdmin: boolean) => {
    if (id.length) {
      setRoomDetails(id);
      localStorage.setItem("isAdmin", isAdmin.toString());
    }
  };

  return (
    <Box sx={{ color: "primary.contrastText", minWidth: "95%" }}>
      <Typography variant="h5" sx={{ width: "100%" }}>
        Hi <span style={{ fontWeight: "bolder" }}>{user.displayName}</span>,
        ready to enter your chat room?
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mt: "0.3rem" }}>
        <span>Room Id:&nbsp;</span>
        <span>{currRoomId}</span>
        <Box sx={{ display: "flex", alignItems: "center", ml: "2rem" }}>
          <Tooltip title="Copy Room Id">
            <ContentCopyIcon
              sx={{ ":hover": { cursor: "pointer" }, marginRight: "1rem" }}
              onClick={() => navigator.clipboard.writeText(currRoomId)}
            />
          </Tooltip>
          <Tooltip title="Copy Link">
            <LinkIcon
              sx={{ ":hover": { cursor: "pointer" } }}
              onClick={() => navigator.clipboard.writeText(currRoomId)}
            />
          </Tooltip>
        </Box>
      </Box>

      <Button
        variant="contained"
        endIcon={<TelegramIcon />}
        sx={{ mt: "1rem" }}
        onClick={() => handleSubmitRoomId(currRoomId, true)}
      >
        Enter Room
      </Button>

      <Box sx={{ mt: "7rem" }}>
        <Typography variant="h6">Already have a room id?</Typography>
        <Box>
          <TextField
            placeholder="Enter room id"
            value={userEnteredRoomId}
            onChange={(e) => setUserEnteredRoomId(e.target.value)}
          />
          <IconButton onClick={() => handleSubmitRoomId(userEnteredRoomId, false)}>
            <TelegramIcon sx={{ color: "primary.contrastText" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Room;
