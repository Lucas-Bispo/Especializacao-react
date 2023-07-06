// Importando os hooks useEffect e useState da biblioteca 'react'
import { useEffect, useState } from 'react';

// Importando o hook useParams da biblioteca 'react-router-dom'
import { useParams } from 'react-router-dom';

// Importando o objeto api do módulo '../../lib/axios'
import { api } from '../../lib/axios';

// Importando componentes personalizados do diretório '../../components'
import { Banner } from '../../components/Banner';
import { Input } from '../../components/Input';
import { Loading } from '../../components/Loading';
import { Card } from '../../components/Card';

// Importando componentes estilizados do módulo './styles'
import { Cards, UserContainer } from './styles';

// Definindo uma interface para as informações do usuário
interface UserInfo {
  avatarUrl: string;
  bio: string;
  company: string;
  following: number;
  htmlUrl: string;
  name: string;
  login: string;
}

// Definindo uma interface para um repositório
interface Repository {
  name: string;
  description: string;
  createdAt: string;
  openIssues: number,
}

// Exportando um componente funcional chamado 'User'
export function User() {
  // Usando o hook useParams para obter o valor de 'user' da URL
  const { user } = useParams();

  // Usando o hook useState para definir variáveis de estado e seus setters
  const [search, setSearch] = useState('');
  const [userInfo, setUserInfo] = useState({} as UserInfo);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(true);
  const [isLoadingRepositories, setIsLoadingRepositories] = useState(true);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [searchedRepositories, setSearchedRepositories] = useState<Repository[]>([]);

  // Definindo uma função assíncrona para buscar informações do usuário
  async function fetchUser() {
    // Usando o objeto api para enviar uma requisição GET para a API do GitHub
    const { data } = await api.get(`/users/${user}`);

    // Atualizando o estado userInfo com os dados recebidos da API
    setUserInfo({
      avatarUrl: data.avatar_url,
      bio: data.bio,
      company: data.company,
      following: data.following,
      htmlUrl: data.html_url,
      name: data.name,
      login: data.login,
    });

    // Definindo isLoadingUserInfo como false para indicar que o carregamento está completo
    setIsLoadingUserInfo(false);
  }

  // Definindo uma função assíncrona para buscar repositórios
  async function fetchRepositories() {
    // Usando o objeto api para enviar uma requisição GET para a API do GitHub com parâmetros de consulta
    const { data } = await api.get(`/users/${user}/repos?per_page=100&sort=created`);

    // Filtrando os dados recebidos da API para incluir apenas repositórios com pelo menos uma issue aberta
    const repositoriesFilter = data.filter((repository: any) => repository.open_issues >= 1);

    // Mapeando os dados filtrados e criando um array de repositórios
    const repositoriesMap = repositoriesFilter.map((repository: any) => {
      return {
        name: repository.name,
        description: repository.description,
        createdAt: repository.created_at,
        openIssues: repository.open_issues,
      }
    });

    // Atualizando o estado repositories com o array de repositórios
    setRepositories(repositoriesMap);

    // Definindo isLoadingRepositories como false para indicar que o carregamento está completo
    setIsLoadingRepositories(false);
  }

  // Definindo uma função para buscar repositórios com base no valor do estado search
  function searchRepository() {
    // Criando uma expressão regular a partir do valor do estado search (convertido para minúsculas)
    const regex = new RegExp("" + search.toLocaleLowerCase() + "");

    // Filtrando o array de repositórios para incluir apenas aqueles cujo nome corresponde à expressão regular
    const result = repositories.filter(repository => regex.test(repository.name.toLocaleLowerCase()));

    // Atualizando o estado searchedRepositories com o resultado da filtragem
    setSearchedRepositories(result);

    // Definindo isLoadingRepositories como false para indicar que o carregamento está completo
    setIsLoadingRepositories(false);
  }
  
  // Usando o hook useEffect para executar efeitos colaterais quando o componente é montado
  useEffect(() => {
    // Chamando fetchUser e fetchRepositories quando o componente é montado
    fetchUser();
    fetchRepositories();
  }, []);

  // Usando outro hook useEffect para executar efeitos colaterais quando o estado search muda
  useEffect(() => {
    // Definindo isLoadingRepositories como true para indicar que o carregamento começou
    setIsLoadingRepositories(true);

    // Definindo um timeout para chamar searchRepository após um atraso de 500ms
    const timeout = setTimeout( () => {
      searchRepository();
    }, 500);
  
    // Retornando uma função de limpeza que limpa o timeout quando o componente desmonta ou antes de executar este efeito novamente
    return () => clearTimeout(timeout);    
  }, [search]);

  // Retornando JSX que define o que deve ser renderizado por este componente
  return (
    <UserContainer>
      {
        isLoadingUserInfo
          ?
          <Loading />
          :
          <Banner
            user={userInfo}
          />
      }

      <Input
        placeholder="Buscar repositório"
        onChange={event => setSearch(event.target.value)}
      />

      <Cards>
        {
          isLoadingRepositories
            ?
              <>
                <Loading />
                <Loading />
              </>
            :

            search
            ? 
              searchedRepositories.map(repository =>
                <Card
                  key={repository.name}
                  repository={repository}
                />
              )
            :
              repositories.map(repository =>
                <Card
                  key={repository.name}
                  repository={repository}
                />
              )
          }
      </Cards>
    </UserContainer>
  );
}
