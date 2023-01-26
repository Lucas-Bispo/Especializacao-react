// JSX = JavaScript + XML
import { Post } from '../src/Post';
// Devesse de importar as funcoes dentro o app
// Propriedades ou atributos, sao elementos de cada teg

export function App() {
  // Sintax correta
  return (
    <div> 
    <Post 
      author="Lucas Bispo"
      content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus in magnam veniam dicta assumenda. Incidunt rerum voluptates fugit velit pariatur consequuntur aspernatur perferendis porro, ut quo laborum soluta atque repellendus."   
    />

    <Post 
      author="Lucas Oliveira"
      content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus in magnam veniam dicta assumenda. Incidunt rerum voluptates fugit velit pariatur consequuntur aspernatur perferendis porro, ut quo laborum soluta atque repellendus."   
    />
    
    </div>
  )
}

