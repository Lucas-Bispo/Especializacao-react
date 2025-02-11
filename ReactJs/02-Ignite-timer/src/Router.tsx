// src/Router.js
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';

export default function Router() {
  return (
    <Routes>
      {/* Rota para a página Home */}
      <Route path="/" element={<Home />} />

      {/* Rota para a página History */}
      <Route path="/history" element={<History />} />
    </Routes>
  );
}