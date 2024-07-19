import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import { Message } from "../utils/types";
import { format } from "date-fns";

type Props = {
  message: Message;
};

const MessageBox = ({ message }: Props) => {
  return (
    <Box
      sx={{
        bgcolor: "#a9def9",
        width: "fit-content",
        maxWidth: "70%",
        padding: "0.5rem",
        my: "0.5rem",
        borderRadius: "0.5rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt={message.userName}
          src={message.userPic}
          sx={{ width: "1.5rem", height: "1.5rem" }}
        />
        {message.isAdmin ? (
          <Typography
            sx={{
              fontSize: "0.8rem",
              ml: "0.5rem",
              fontWeight: "bolder",
              color: "#e07a5f",
              display: "flex",
              alignItems: "center",
            }}
          >
            {message.userName}
            <Tooltip title="Room Admin">
            <StarsRoundedIcon sx={{ fontSize: "1rem", ml: "0.1rem" }} />
            </Tooltip>
          </Typography>
        ) : (
          <Typography
            sx={{ fontSize: "0.8rem", ml: "0.5rem", fontWeight: "bolder" }}
          >
            {message.userName}
          </Typography>
        )}
      </Box>
      <Typography sx={{ mt: "0.5rem" }}>{message.text}</Typography>
      <Typography
        sx={{
          mt: "0.5rem",
          fontSize: "0.7rem",
          color: "gray",
          width: "100%",
          textAlign: "end",
        }}
      >
        {format(new Date(message.createdAt), "PPp")}
      </Typography>
    </Box>
  );
};

export default MessageBox;
