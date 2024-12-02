import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { buscarUsuarios, adicionarUsuario, atualizarUsuario, excluirUsuario } from '../redux/controleUsuario';

const CadastroUsuario = () => {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.users.list);

  const [nickname, setNickname] = useState('');
  const [urlAvatar, setUrlAvatar] = useState('');
  const [senha, setSenha] = useState('');
  const [editarUsuario, setEditarUsuario] = useState(null);

  useEffect(() => {
    dispatch(buscarUsuarios());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editarUsuario) {
      dispatch(atualizarUsuario({ id: editarUsuario.id, nickname, urlAvatar, senha }));
    } else {
      dispatch(adicionarUsuario({ nickname, urlAvatar, senha }));
    }
    resetForm();
  };

  const handleEdit = (user) => {
    setEditarUsuario(user);
    setNickname(user.nickname);
    setUrlAvatar(user.urlAvatar);
  };

  const handleDelete = (id) => {
    const confirmarSenha = prompt('Digite a senha para excluir:');
    if (confirmarSenha) {
      dispatch(excluirUsuario({ id, senha: confirmarSenha }));
    }
  };

  const resetForm = () => {
    setNickname('');
    setUrlAvatar('');
    setSenha('');
    setEditarUsuario(null);
  };

  return (
    <div>
      <h2>Cadastro de Usuários</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL do Avatar"
          value={urlAvatar}
          onChange={(e) => setUrlAvatar(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">{editarUsuario ? 'Atualizar' : 'Cadastrar'}</button>
        <button type="button" onClick={resetForm}>
          Cancelar
        </button>
      </form>
      <ul>
        {usuarios.map((user) => (
          <li key={user.id}>
            <img src={user.urlAvatar} alt={user.nickname} style={{ width: 50 }} />
            <span>{user.nickname}</span>
            <button onClick={() => handleEdit(user)}>Editar</button>
            <button onClick={() => handleDelete(user.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CadastroUsuario;
