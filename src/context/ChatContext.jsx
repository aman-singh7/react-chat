import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();
export const ChatContextProvider  = ({children}) => {
    const {currentUser} = useContext(AuthContext)
    
    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    };

    const chatReducer = (state, action) => {
        switch(action.type) {
            case "CHANGE_USER":
                const user = action.payload
                return {
                    user: user,
                    chatId:
                        currentUser.uid > user.uid
                          ?  currentUser.uid + user.uid
                          :  user.uid + currentUser.uid
                };
            
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