  import { createContext, useContext, useReducer } from "react";
  import { AuthContext } from "./authContext";

  export const ChatContext = createContext();

  export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const INITIAL_STATE = {
      chatId: "null",
      user: {},
      selected: false,
    };

    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_USER":
          return {
            ...state,
            selected: true,
            user: action.payload,
            chatId:
              currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid,
          };
    
        case "CHANGE_SELECTED":
          return {
            ...state,
            selected: action.payload,
          };
    
        default:
          return state;
      }
    };
    
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
      <ChatContext.Provider value={{ data: state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };
