import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "universal-cookie";
import { signOut } from "firebase/auth";
import { auth, db } from "../utils/firebase-config";
import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import ForumIcon from '@mui/icons-material/Forum';
import { doc, updateDoc } from "firebase/firestore";
import { enqueueSnackbar } from "notistack";

const cookies = new Cookies();

type Props = {
    isLoggedIn: boolean;
    setLogIn: (val: boolean) => void;
}

const Navbar = ({ isLoggedIn = false, setLogIn }: Props) => {
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const user = cookies.get("user");
  const roomId = localStorage.getItem("roomId");
  const isAdmin = localStorage.getItem("isAdmin");

  const handleLogOut = async () => {
    await signOut(auth);
    if(isAdmin && roomId) {
      await updateDoc(doc(db, "rooms", roomId), {
        isAdminOnline: false,
      });
    }
    cookies.remove("user");
    handleCloseUserMenu();
    setLogIn(false);
    localStorage.removeItem("roomId");
    localStorage.removeItem("isAdmin");
    enqueueSnackbar("Logout Successful", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "top" },
    });
  }

  const shareableLink = `${window.location.origin}/?roomId=${roomId}`;

  const copyToClipboard = (text: string, type?: string) => {
    navigator.clipboard.writeText(text);
    enqueueSnackbar(`${type === "link" ? "Link copied" : "RoomId Copied"}`, {
      variant: "info",
      anchorOrigin: { horizontal: "right", vertical: "top" },
    });
  };

  return (
    <AppBar position="static" sx={{ borderRadius: "1rem", marginTop: "1rem" }}>
      <Container sx={{ minWidth: "100%" }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: 900,
              fontSize: "2rem",
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            Converse
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
              <Tooltip title={user?.displayName}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.displayName} src={user?.photoURL} />
                </IconButton>
              </Tooltip>
            ) : (
              <Box sx={{display: "flex", alignItems: "center"}}>
                <ForumIcon sx={{marginY: "auto"}} />
              </Box>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLogOut}>
                <Typography textAlign="center">Log Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>

       {roomId && <Box sx={{display: "flex", justifyContent: "space-between", my: "0.5rem"}}>
          <Typography>Room: <span style={{fontWeight: "bolder"}}>{roomId}</span></Typography>
          <Box sx={{ display: "flex", alignItems: "center", ml: "2rem" }}>
          <Tooltip title="Copy Room Id">
            <ContentCopyIcon
              sx={{ ":hover": { cursor: "pointer" }, marginRight: "1rem" }}
              onClick={() => copyToClipboard(roomId)}
            />
          </Tooltip>
          <Tooltip title="Copy Link">
            <LinkIcon
              sx={{ ":hover": { cursor: "pointer" } }}
              onClick={() => copyToClipboard(shareableLink, "link")}
            />
          </Tooltip>
        </Box>
        </Box>}
      </Container>
    </AppBar>
  );
};
export default Navbar;
