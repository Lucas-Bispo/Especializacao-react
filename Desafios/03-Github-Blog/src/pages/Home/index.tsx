import { useEffect, useState } from 'react';

import { api } from '../../lib/axios';
import { Banner } from '../../components/Banner';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { HomeContainer, Cards } from './styles';
import { Loading } from '../../components/Loading';

// Define a interface UserInfo para representar as informações de um usuário
interface UserInfo {
  avatarUrl: string;
  login: string;
}

// Exporta o componente Home
export function Home() {
  // Define os estados utilizados no componente
  const [search, setSearch] = useState(''); // Estado para o valor de busca
  const [users, setUsers] = useState<UserInfo[]>([]); // Estado para os usuários encontrados
  const [isLoadingUsers, setIsLoadingUsers] = useState(false); // Estado para indicar se está carregando os usuários
  const [isFirstRender, setIsFirstRender] = useState(true); // Estado para indicar se é a primeira renderização

  // Função assíncrona para buscar os usuários
  async function fetchUsers() {
    // Faz uma requisição à API passando o valor de busca como parâmetro
    const { data } = await api.get(`/search/users?q=${search}`);

    // Mapeia os usuários retornados e cria um objeto UserInfo para cada um
    const users = data.items.map((user: any) => ({
      avatarUrl: user.avatar_url,
      login: user.login
    }));

    // Atualiza o estado com os usuários encontrados e indica que o carregamento foi concluído
    setUsers(users);
    setIsLoadingUsers(false);
  }

  // Efeito colateral que é executado quando o valor de busca é alterado
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      // Indica que está carregando os usuários
      setIsLoadingUsers(true);

      // Define um timeout para simular o carregamento dos usuários
      const timeout = setTimeout(async () => {
        await fetchUsers();
      }, 3000);

      // Retorna uma função de limpeza que cancela o timeout em caso de desmontagem do componente
      return () => clearTimeout(timeout);
    }
  }, [search]);

  return (
    <HomeContainer>
      {/* Renderiza o componente Banner */}
      <Banner
        home={{
          title: 'Pesquise por alguma conta do Github'
        }}
      />

      {/* Renderiza o componente Input para fazer a busca */}
      <Input
        placeholder="Buscar conta"
        onChange={event => setSearch(event.target.value)}
      />

      <Cards>
        {/* Verifica se está carregando os usuários */}
        {isLoadingUsers ? (
          <>
            {/* Renderiza o componente Loading duas vezes */}
            <Loading />
            <Loading />
          </>
        ) : (
          // Mapeia os usuários encontrados e renderiza o componente Card para cada um
          users.map(user => (
            <Card key={user.login} user={user} />
          ))
        )}
      </Cards>
    </HomeContainer>
  );
}
