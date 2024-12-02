import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://backend-bcc-2-b.vercel.app/usuario';

export const buscarUsuarios = createAsyncThunk('users/buscarUsuarios', async () => {
  const response = await axios.get(BASE_URL);
  return response.data.listaUsuarios;  // Retorna a lista de usuários do backend
});

export const adicionarUsuario = createAsyncThunk('users/adicionarUsuario', async (usuario) => {
  const response = await axios.post(BASE_URL, usuario);
  return response.data;  // Retorna o usuário adicionado
});

export const atualizarUsuario = createAsyncThunk('users/atualizarUsuario', async (usuario) => {
  const response = await axios.put(BASE_URL, usuario);
  return response.data;  // Retorna o usuário atualizado
});

export const excluirUsuario = createAsyncThunk('users/excluirUsuario', async (usuario) => {
  const response = await axios.delete(BASE_URL, { data: usuario });
  return response.data;  // Retorna o usuário excluído
});

const controleUsuario = createSlice({
  name: 'users',
  initialState: { list: [], activeUser: null },
  reducers: {
    setUsuarioAtivo: (state, action) => {
      state.activeUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buscarUsuarios.fulfilled, (state, action) => {
        state.list = action.payload;  // Atualiza a lista de usuários no estado
      })
      .addCase(adicionarUsuario.fulfilled, (state, action) => {
        state.list.push(action.payload);  // Adiciona o usuário ao estado
      })
      .addCase(atualizarUsuario.fulfilled, (state, action) => {
        const index = state.list.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;  // Atualiza o usuário no estado
        }
      })
      .addCase(excluirUsuario.fulfilled, (state, action) => {
        state.list = state.list.filter(user => user.id !== action.payload.id);  // Remove o usuário do estado
      });
  },
});

export const { setUsuarioAtivo } = controleUsuario.actions;
export default controleUsuario.reducer;
