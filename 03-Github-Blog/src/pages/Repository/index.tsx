// Importando os hooks useEffect e useState da biblioteca 'react'
import { useEffect, useState } from 'react';

// Importando o objeto api do módulo '../../lib/axios'
import { api } from '../../lib/axios';

// Importando componentes personalizados do diretório '../../components'
import { Banner } from '../../components/Banner';
import { Card } from '../../components/Card';
import { Loading } from '../../components/Loading';
import { Input } from '../../components/Input';

// Importando componentes estilizados do módulo './styles'
import { BlogContainer, Title, Cards } from './styles';

// Importando o hook useParams da biblioteca 'react-router-dom'
import { useParams } from 'react-router-dom';

// Definindo uma interface para as informações do repositório
interface RepositoryInfo {
  name: string;
  createdAt: string;
  htmlUrl: string;
  description: string;
  stargazersCount: number;
  openIssues: number;
}

// Definindo uma interface para uma issue
interface Issue {
  title: string;
  createdAt: string;
  body: string;
  number: number;
}

// Exportando um componente funcional chamado 'Repository'
export function Repository() {
  // Usando o hook useParams para obter os valores de 'user' e 'repository' da URL
  const { user, repository } = useParams();

  // Usando o hook useState para definir variáveis de estado e seus setters
  const [search, setSearch] = useState('');
  const [repositoryInfo, setRepositoryInfo] = useState({} as RepositoryInfo);
  const [isLoadingRepositoryInfo, setIsLoadingRepositoryInfo] = useState(true);
  const [isLoadingIssues, setIsLoadingIssues] = useState(true);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [firstRender, setFirstRender] = useState(true);

  // Definindo uma função assíncrona para buscar informações do repositório
  async function fetchRepository() {
    // Usando o objeto api para enviar uma requisição GET para a API do GitHub
    const { data } = await api.get(`repos/${user}/${repository}`);

    // Atualizando o estado repositoryInfo com os dados recebidos da API
    setRepositoryInfo({
      name: data.name,
      createdAt: data.created_at,
      htmlUrl: data.html_url,
      description: data.description,
      stargazersCount: data.stargazers_count,
      openIssues: data.open_issues,
    });

    // Definindo isLoadingRepositoryInfo como false para indicar que o carregamento está completo
    setIsLoadingRepositoryInfo(false);
  }

  // Definindo uma função assíncrona para buscar issues
  async function fetchIssues() {
    // Usando o objeto api para enviar uma requisição GET para a API do GitHub com uma consulta de pesquisa
    const { data } = await api.get(`/search/issues?q=${search}%20repo:${user}/${repository}`);

    // Mapeando os itens nos dados recebidos da API e criando um array de issues
    const issuesItems = data.items.map((issue: any) => (
      {
        number: issue.number,
        title: issue.title,
        createdAt: issue.created_at,
        body: issue.body,
      }
    ));

    // Atualizando o estado issues com o array de issues
    setIssues(issuesItems);

    // Definindo isLoadingIssues como false para indicar que o carregamento está completo
    setIsLoadingIssues(false);
  }

  // Usando o hook useEffect para executar efeitos colaterais quando o componente é montado
  useEffect(() => {
    // Chamando fetchRepository e fetchIssues quando o componente é montado
    fetchRepository();
    fetchIssues();
  }, []);

  // Usando outro hook useEffect para executar efeitos colaterais quando o estado search muda
  useEffect(() => {
    // Definindo isLoadingIssues como true para indicar que o carregamento começou
    setIsLoadingIssues(true);

    if(firstRender) {
      // Se este é o primeiro render, defina firstRender como false e não faça mais nada
      setFirstRender(false);
    } else {
      // Se este não é o primeiro render, defina um timeout para chamar fetchIssues após um atraso de 3000ms (3 segundos)
      const timeout = setTimeout(async () => {
        fetchIssues();
      }, 3000);
  
      // Retornando uma função de limpeza que limpa o timeout quando o componente desmonta ou antes de executar este efeito novamente
      return () => clearTimeout(timeout);
    }  
  }, [search]);

  // Retornando JSX que define o que deve ser renderizado por este componente
  return (
    <BlogContainer>
      {
        isLoadingRepositoryInfo
          ?
          <Loading />
          :
          <Banner 
            repository={repositoryInfo}
          />
      }

      <Title>
        <h3>Publicações</h3>
        <span>{issues.length} {issues.length <= 1 ? 'publicação' : 'publicações'} </span>
      </Title>

      <Input
        placeholder="Buscar contéudo"
        onChange={props => setSearch(props.target.value)}
      />

      <Cards>
        { isLoadingIssues
          ? 
            <div className="loading">
              <Loading />
              <Loading />
            </div>
          : 
            <>
              {
                issues.map(issue => (
                  <Card
                    key={issue.number}
                    issue={issue}
                  />
                ))
              }
            </>
        }
      </Cards>
        
    </BlogContainer>
  );
}
