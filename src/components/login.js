import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUsuarioAtivo } from '../redux/controleUsuario';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [nickname, setNickname] = useState('');
  const [senha, setSenha] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fazerLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backend-bcc-2-b.vercel.app/usuario/verificarSenha', {
        nickname,
        senha,
      });
      if (response.data.senhaCorreta) {
        dispatch(setUsuarioAtivo({ nickname }));
        alert('Login bem-sucedido!');
        navigate('/chat');
      } else {
        alert('Senha incorreta!');
      }
    } catch (error) {
      console.error('Erro ao autenticar', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={fazerLogin}>
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
