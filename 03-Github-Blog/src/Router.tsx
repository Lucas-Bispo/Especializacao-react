import { Route, Routes } from 'react-router-dom';

import { DefaultLayout } from './layouts/DefaultLayout';
import { Home } from './pages/Home';
import { User } from './pages/User';
import { Repository } from './pages/Repository';
import { Issue } from './pages/Issue';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        {/* Rota para a página inicial */}
        <Route path="/" element={<Home />} />
        
        {/* Rota para exibir informações de um usuário */}
        <Route path=":user" element={<User />} />
        
        {/* Rota para exibir informações de um repositório */}
        <Route path=":user/:repository" element={<Repository />} />
        
        {/* Rota para exibir informações de uma issue */}
        <Route path=":user/:repository/:issue" element={<Issue />} />
      </Route>
    </Routes>
  );
}
