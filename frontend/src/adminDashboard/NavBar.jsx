import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  Menu,
  MenuItem,
  Container,
  Box,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NavBar = () => {
  const [loggedInAdmin, setLoggedInAdmin] = useState(null);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch logged-in admin details here
    // Replace this with your API call to fetch admin details
    // For now, using a sample admin object
    const sampleAdmin = {
      firstName: "John",
      lastName: "Doe",
    };
    setLoggedInAdmin(sampleAdmin);
  }, []);

  const handleProfileDialogOpen = () => {
    setOpenProfileDialog(true);
    setAnchorEl(null); // Close the menu
  };

  const handleProfileDialogClose = () => {
    setOpenProfileDialog(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search query:", searchQuery);
    setSearchQuery("");
  };

  const handleLogout = () => {
    // Clear token and redirect to login
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "rgba(255, 148, 112, 1)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <form onSubmit={handleSearchSubmit}>
              <TextField
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search patients, doctors, admins, health staff..."
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <IconButton type="submit">
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </form>
          {/* <Typography variant="h5" style={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography> */}
          <Box display="flex" alignItems="right">
         
            <IconButton>
              <NotificationsIcon />
            </IconButton>
            <IconButton onClick={handleMenuOpen}>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleProfileDialogOpen}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Edit Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              {/* Add other menu items as needed */}
            </Menu>
          </Box>
        </Toolbar>
        <Dialog open={openProfileDialog} onClose={handleProfileDialogClose}>
          <DialogTitle>Admin Profile</DialogTitle>
          <DialogContent>
            {/* Display admin's profile details here */}
            {/* You can also include the edit profile form here */}
            <Typography>
              Logged-in as: {loggedInAdmin?.firstName} {loggedInAdmin?.lastName}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleProfileDialogClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AppBar>
  );
};

export default NavBar;
