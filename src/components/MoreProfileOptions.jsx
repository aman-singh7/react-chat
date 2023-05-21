import React, { useContext, useState } from "react";
import {Menu, MenuItem, ListItemIcon,IconButton} from '@mui/material';
import PersonAdd from '@mui/icons-material/PersonAdd';
import { Create } from '@mui/icons-material';
import Logout from '@mui/icons-material/Logout';
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { signOut } from "@firebase/auth";

export default function AccountMenu() {
    const {currentUser} = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCreateGroup = () => {
        setAnchorEl(null);
    };

    const handleJoinGroup = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        signOut(auth);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="moreOptions">
        <div className="icon">
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <img src={currentUser.photoURL} alt="" />
            </IconButton>
        </div>
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
            elevation: 0,
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleCreateGroup}>
            <ListItemIcon>
                <PersonAdd fontSize="small" />
            </ListItemIcon>
            Create Group
            </MenuItem>
            <MenuItem onClick={handleJoinGroup}>
            <ListItemIcon>
                <Create fontSize="small" />
            </ListItemIcon>
            Join Group
            </MenuItem>
            <MenuItem onClick={handleLogout}>
            <ListItemIcon>
                <Logout fontSize="small" />
            </ListItemIcon>
            Logout
            </MenuItem>
        </Menu>
        </div>
    );
}
