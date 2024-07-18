import { Box, Button, Typography } from "@mui/material";
import { FaGoogle } from "react-icons/fa6";

const SignIn = () => {

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
        variant="contained"
        sx={{ mt: "1rem", fontSize: "1.2rem" }}
      >
        <FaGoogle style={{ fontSize: "1.5rem", marginRight: "1rem" }} />
        Sign In with Google
      </Button>
    </Box>
  );
};

export default SignIn;
