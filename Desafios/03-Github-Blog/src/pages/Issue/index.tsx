import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { api } from '../../lib/axios';
import { Loading } from '../../components/Loading';
import { Banner } from '../../components/Banner';

import { PostContainer, Content } from './styles';

// Define a interface 'issueInfo' com os campos esperados dos dados da issue
interface issueInfo {
  htmlUrl: string;
  title: string;
  userLogin: string;
  createdAt: string;
  comments: number;
}

export function Issue() {
  // Obtém os parâmetros da rota usando o hook 'useParams' do 'react-router-dom'
  const { user, repository, issue } = useParams();

  // Define os estados para armazenar as informações da issue
  const [issueInfo, setIssueInfo] = useState({} as issueInfo); 
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Executa a função de busca da issue quando o componente é montado
  useEffect(() => {
    async function fetchIssue() {
      // Realiza a requisição para obter os dados da issue usando a API do 'axios'
      const { data } = await api.get(`/repos/${user}/${repository}/issues/${issue}`);      

      // Atualiza os estados com as informações obtidas
      setIssueInfo({
        htmlUrl: data.html_url,
        title: data.title,
        userLogin: data.user.login,
        createdAt: data.created_at,
        comments: data.comments
      });
      setBody(data.body);
      setIsLoading(false);
    }

    fetchIssue();
  }, []);

  return (
    <PostContainer>
      {
        isLoading 
        ?
          <Loading />
        :
          <>
            <Banner
              issue={issueInfo}
            />
            <Content>
              <ReactMarkdown
                linkTarget={'_blank'}
              >
                {body}
              </ReactMarkdown>
            </Content>
          </>
      }
    </PostContainer>
  );
}
