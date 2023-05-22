import React, { useContext, useState } from "react";
import More from "../img/more.png";
import { Menu, MenuItem, ListItemIcon,IconButton } from '@mui/material';
import PersonAdd from '@mui/icons-material/PersonAdd';
import { ExitToApp, People } from '@mui/icons-material';
import { ChatContext } from "../context/ChatContext";

const MoreChatOptions = () => {
    const { data } = useContext(ChatContext);

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleInviteFriends = () => {
        setAnchorEl(null);
        const message = `Hello, join my group ${data.title} using the below code: ${data.groupId}`
        navigator.clipboard.writeText(message);
        alert("Invite code copied in clipboard");
    };

    const handleFriends = () => {
        setAnchorEl(null);
    };

    const handleClearChat = () => {
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
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <img src={More} alt="" />
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
            <MenuItem onClick={handleInviteFriends}>
            <ListItemIcon>
                <PersonAdd fontSize="small" />
            </ListItemIcon>
            Invite Friends
            </MenuItem>
            <MenuItem onClick={handleFriends}>
            <ListItemIcon>
                <People fontSize="small" />
            </ListItemIcon>
            Friends
            </MenuItem>
            <MenuItem onClick={handleClearChat}>
            <ListItemIcon>
                <ExitToApp fontSize="small" />
            </ListItemIcon>
            Leave Group
            </MenuItem>
        </Menu>
        </div>
    );
}

export default MoreChatOptions;
