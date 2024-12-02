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

  // Função para fazer login
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
        navigate('/chat');  // Redireciona para o chat após login
      } else {
        alert('Senha incorreta!');
      }
    } catch (error) {
      console.error('Erro ao autenticar', error);
    }
  };

  // Função para redirecionar para a tela de cadastro de usuário
  const irParaCadastro = () => {
    navigate('/users');  // Redireciona para a página de cadastro de usuário
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

      
      <button onClick={irParaCadastro}>Cadastro de Usuário</button>

      
      <button onClick={() => navigate('/chat')}>Ir para o Chat</button>
    </div>
  );
};

export default Login;
