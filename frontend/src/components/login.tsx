import { Send } from "@mui/icons-material";
import {
  Container,
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface IFormData {
  email: string;
  otp: string;
}
const Login: React.FC = () => {
  useEffect(() => {
    const cookieName = "token";

    if (Cookies.get(cookieName)) {
      navigate("/booking");
    }
  }, []);

  const navigate = useNavigate();
  const [isFailed, setIsFailed] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    otp: "",
  });

  const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });
      if (response.status === 200) {
        alert("OTP sent");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response: Response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        navigate("/booking");
      } else {
        setIsFailed(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper
          elevation={3}
          sx={{ padding: 3, width: "40%", textAlign: "center" }}
        >
          <form>
            <Typography variant="h6">LOGIN</Typography>
            <Stack direction={"row"} spacing={1}>
              <TextField
                name="email"
                label="Email"
                fullWidth
                onChange={handleFormDataChange}
              ></TextField>
              <IconButton size="large" disableRipple onClick={handleOtpSubmit}>
                <Send color="primary"></Send>
              </IconButton>
            </Stack>
            <TextField
              name="otp"
              label="OTP"
              fullWidth
              margin="dense"
              type="password"
              onChange={handleFormDataChange}
            ></TextField>
          </form>
          <Button
            color={isFailed ? "secondary" : "primary"}
            variant="contained"
            type="submit"
            fullWidth
            disableFocusRipple
            onClick={handleFormSubmit}
          >
            LOG IN
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;

