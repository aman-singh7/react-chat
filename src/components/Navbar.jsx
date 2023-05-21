import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import MoreProfileOptions from "./MoreProfileOptions";
import FormDialog from "./Dialog";

const Navbar = () => {
    const {currentUser} = useContext(AuthContext)

    return (
        <div className="navbar">
            <span className="logo">NexChat</span>
            <div className="user">
                <span>{currentUser.displayName}</span>
                <MoreProfileOptions />
                {/* <FormDialog/> */}
                {/* <button onClick={() => signOut(auth)}>logout</button> */}
            </div>
        </div>
    )
}

export default Navbar