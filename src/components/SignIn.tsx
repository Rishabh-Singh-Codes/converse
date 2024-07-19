import { Box, Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, provider } from "../utils/firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { enqueueSnackbar } from "notistack";

const cookies = new Cookies();

type Props = {
  setLogIn: (val: boolean) => void;
};

const SignIn = ({ setLogIn }: Props) => {
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      cookies.set("user", JSON.stringify(user));
      setLogIn(true);
      enqueueSnackbar("Login Successful", {
        variant: "success",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
    } catch (error) {
      console.log("error while signing in", error);
      enqueueSnackbar("Error in login", {
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        width: "100%",
      }}
    >
      <Typography sx={{ color: "primary.contrastText" }} variant="h3">
        Let the conversations flow!
      </Typography>
      <Typography
        sx={{ mt: "5rem", color: "primary.contrastText" }}
        variant="h6"
      >
        Sign In to join coversation
      </Typography>
      <Button
        onClick={handleGoogleSignIn}
        variant="contained"
        sx={{ mt: "1rem", fontSize: "1.2rem" }}
      >
        <GoogleIcon style={{ fontSize: "1.5rem", marginRight: "1rem" }} />
        Sign In with Google
      </Button>
    </Box>
  );
};

export default SignIn;
