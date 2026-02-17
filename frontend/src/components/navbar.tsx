import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Button
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./../store/index";
import { logout } from "./../store/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate("/"); 
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#00acc1" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        <Typography variant="h6" component="div">
          Dental Clinic
        </Typography>

        {user ? (
          <Box>
            <Button
              color="inherit"
              startIcon={<Avatar sx={{ width: 32, height: 32 }}>{user.email[0].toUpperCase()}</Avatar>}
              onClick={handleMenuOpen}
            >
              {user.email}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem disabled>
                <Typography variant="subtitle1">{user.email}</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button color="inherit" onClick={() => navigate("/")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;