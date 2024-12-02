import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://backend-bcc-2-b.vercel.app/mensagem';

// Buscar todas as mensagens
export const buscarMensagens = createAsyncThunk('messages/buscarMensagens', async () => {
  const response = await axios.get(BASE_URL);
  return response.data.listaMensagens; // Retorna as mensagens do backend
});

// Enviar uma nova mensagem
export const enviarMensagem = createAsyncThunk('messages/enviarMensagem', async (mensagem) => {
  const response = await axios.post(BASE_URL, mensagem);
  return response.data; // Retorna a nova mensagem enviada
});

// Atualizar o status de leitura de uma mensagem
export const atualizarStatusMensagem = createAsyncThunk('messages/atualizarStatusMensagem', async (id) => {
  const response = await axios.patch(`${BASE_URL}/${id}`, { lida: true });
  return response.data;
});

// Excluir uma mensagem
export const excluirMensagem = createAsyncThunk('messages/excluirMensagem', async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
});

const messageSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(buscarMensagens.fulfilled, (state, action) => {
        return action.payload; // Atualiza o estado com as mensagens do backend
      })
      .addCase(enviarMensagem.fulfilled, (state, action) => {
        state.push(action.payload); // Adiciona a nova mensagem ao estado
      })
      .addCase(atualizarStatusMensagem.fulfilled, (state, action) => {
        const index = state.findIndex((message) => message.id === action.payload.id);
        if (index !== -1) {
          state[index].lida = true; // Marca a mensagem como lida
        }
      })
      .addCase(excluirMensagem.fulfilled, (state, action) => {
        return state.filter((message) => message.id !== action.payload.id); // Remove a mensagem do estado
      });
  },
});

export default messageSlice.reducer;
