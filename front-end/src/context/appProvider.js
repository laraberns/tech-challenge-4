import React, { createContext, useContext, useReducer } from 'react';

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const AppReducer = (state, action) => {
    switch (action.type) {
        case 'SET_STAGE':
            return { ...state, stage: action.payload };
        case 'SET_USER_ID': 
            return { ...state, userId: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, { stage: 'login' });

    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
};

export const useAppState = () => {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('useAppState must be used within an AppProvider');
    }
    return context;
};

export const useAppDispatch = () => {
    const context = useContext(AppDispatchContext);
    if (!context) {
        throw new Error('useAppDispatch must be used within an AppProvider');
    }
    return context;
};
