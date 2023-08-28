import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MyAppBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const clearToken = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 200) {
        navigate("/");
      }
    } catch {}
  };

  return (
    <AppBar>
      <Toolbar>
        <Link
          to={"/booking"}
          style={{
            color: "white",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          <Typography variant="h4">Booking</Typography>
        </Link>
        <div style={{ marginLeft: "auto" }}>
          <IconButton onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>
        </div>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem>
            <Link
              to="/mybookings"
              style={{
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              My Bookings
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              onClick={clearToken}
              to=""
              style={{
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Logout
            </Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;

