import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 480,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 0,
  outline: "none",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const LoginModal = ({ open, handleClose }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");

  const handleContinue = () => {};

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box sx={{ ...style, height: "auto" }}>
        <Box
          sx={{
            width: "100%",
            p: 4,
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "text.secondary",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            id="login-modal-title"
            variant="h5"
            component="h2"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Login / Signup
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Enter your mobile number to continue
          </Typography>

          <Box sx={{ mt: 3, width: "100%" }}>
            <Typography
              variant="caption"
              fontWeight="bold"
              sx={{ mb: 1, display: "block" }}
            >
              Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter Name"
              variant="outlined"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Typography
              variant="caption"
              fontWeight="bold"
              sx={{ mb: 1, display: "block" }}
            >
              Mobile Number
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter Mobile Number"
              variant="outlined"
              size="small"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              type="tel"
            />
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleContinue}
            sx={{
              mt: 1,
              bgcolor: "linear-gradient(93deg, #53b2fe, #065af3)",
              background: "linear-gradient(93deg, #53b2fe, #065af3)",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: "0 1px 7px 0 rgba(0, 0, 0, 0.2)",
            }}
            endIcon={<ArrowForwardIosIcon fontSize="small" />}
          >
            Continue
          </Button>

          <Box sx={{ my: 3 }}>
            <Divider>
              <Typography variant="caption" color="text.secondary">
                Or Login/Signup With
              </Typography>
            </Divider>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<GoogleIcon />}
              sx={{
                textTransform: "none",
                borderColor: "#e0e0e0",
                color: "text.primary",
                "&:hover": {
                  borderColor: "#bdbdbd",
                  bgcolor: "#f5f5f5",
                },
              }}
            >
              Google
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginModal;
