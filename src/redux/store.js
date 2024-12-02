import { configureStore } from '@reduxjs/toolkit';
import userReducer from './controleUsuario.js'; 
import messageReducer from './controleMensagens.js'; 

export const store = configureStore({
  reducer: {
    users: userReducer,
    messages: messageReducer,
  },
});
