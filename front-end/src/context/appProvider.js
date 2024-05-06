import React, { createContext, useContext, useReducer } from 'react';

// Definindo os contextos
const AppStateContext = createContext();
const AppDispatchContext = createContext();

// Definindo o reducer
const AppReducer = (state, action) => {
    switch (action.type) {
        case 'SET_STAGE':
            return { ...state, stage: action.payload };
        case 'SET_USER_ID': // Adicione este caso para salvar o ID do usuário
            return { ...state, userId: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

// Provider principal
export const AppProvider = ({ children }) => {
    // Inicializando o estado e o dispatch
    const [state, dispatch] = useReducer(AppReducer, { stage: 'login' });

    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
};

// Hook para acessar o estado
export const useAppState = () => {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('useAppState must be used within an AppProvider');
    }
    return context;
};

// Hook para acessar o dispatch
export const useAppDispatch = () => {
    const context = useContext(AppDispatchContext);
    if (!context) {
        throw new Error('useAppDispatch must be used within an AppProvider');
    }
    return context;
};
