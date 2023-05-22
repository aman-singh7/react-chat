import React, { useContext, useState } from "react";
import { Menu, MenuItem, ListItemIcon,IconButton } from '@mui/material';
import { PersonAdd, Create, Logout } from '@mui/icons-material';
import { AuthContext } from "../context/AuthContext";
import { auth, db, storage } from "../firebase";
import { signOut } from "@firebase/auth";
import { getDownloadURL, ref } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { ChatContext } from "../context/ChatContext";
import { arrayUnion, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

const MoreProfileOptions = () => {
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCreateGroup = async  () => {
        setAnchorEl(null);
        const name = prompt("Enter group name");
        if (!name) return;

        const storageRef = ref(storage, "group.png");
        const photoURL = await getDownloadURL(storageRef);
        
        // Create Group logic
        const groupId = uuid();
        const roomId = uuid()

        // Set the chat to be empty
        await setDoc(doc(db, "chats", roomId), {messages: []});

        // Map id -> room
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [groupId+".info"]: {
                title: name,
                photoURL: photoURL,
            },
            [groupId+".date"]: serverTimestamp(),
            [groupId+".roomId"]: roomId,
            [groupId+".isGroup"]: true,
        })

        // Map group to room
        await setDoc(doc(db, "groups", groupId), {
            roomId: roomId,
            title: name,
            photoURL: photoURL
        });

        // Map room to user
        await setDoc(doc(db, "rooms", roomId), {
            parent: groupId,
            usersInfo: [
                {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                },
            ]
        });
        
        // Room data
        const roomInfo = await getDoc(doc(db, "rooms", roomId));
        const users = roomInfo.data().usersInfo;

        const userMap = new Map(users.map((user) => [user.uid, user]))

        const payload = {
            groupId: groupId,
            roomId: roomId,
            users: userMap,
            title: name,
            photoURL: photoURL,
            isGroup: true,
        }

        dispatch({type: "CHANGE_USER", payload: payload})
    };

    const handleJoinGroup = async () => {
        setAnchorEl(null);
        const groupId = prompt("Enter group id");
        if(!groupId) return;

        // Join group logic
        const res = await getDoc(doc(db, "groups", groupId));

        if(!res.exists()) {
            alert("Incorrect group id");
            return;
        }

        const title = res.data().title;
        const photoURL = res.data().photoURL;
        const roomId = res.data().roomId;

        // Map room to user
        await updateDoc(doc(db, "rooms", roomId), {
            usersInfo: arrayUnion({
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
             }),
        });


        // Map id -> room
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [groupId+".info"]: {
                title: title,
                photoURL: photoURL,
            },
            [groupId+".date"]: serverTimestamp(),
            [groupId+".roomId"]: roomId,
            [groupId+".isGroup"]: true,
        })

        // Room data
        const roomInfo = await getDoc(doc(db, "rooms", roomId));
        const users = roomInfo.data().usersInfo;

        const userMap = new Map(users.map((user) => [user.uid, user]))

        const payload = {
            groupId: groupId,
            roomId: roomId,
            users: userMap,
            title: title,
            photoURL: photoURL,
            isGroup: true,
        }

        dispatch({type: "CHANGE_USER", payload: payload})
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

export default MoreProfileOptions;
