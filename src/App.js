import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login.js';
import SalaDeBatePapo from './components/batePapo.js';
import CadastroUsuario from './components/cadUsuario.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<CadastroUsuario />} />
        <Route path="/chat" element={<SalaDeBatePapo />} />
      </Routes>
    </Router>
  );
};

export default App;
