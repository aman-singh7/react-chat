import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();
export const ChatContextProvider  = ({children}) => {
    const {currentUser} = useContext(AuthContext)
    
    const INITIAL_STATE = {
        groupId: "null",
        roomId: "null",
        isGroup: false,
        users: {},
    }

    const chatReducer = (state, action) => {
        switch(action.type) {
            case "CHANGE_USER":
                return action.payload;
            
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return (
        <ChatContext.Provider value={{data: state, dispatch}}>
            {children}
        </ChatContext.Provider>
    );
}