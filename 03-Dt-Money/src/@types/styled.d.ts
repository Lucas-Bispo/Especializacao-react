// Importa o pacote 'styled-components', uma biblioteca para estilização de componentes em React usando CSS-in-JS.
import 'styled-components';

// Importa o objeto 'defaultTheme' de um arquivo local que contém as definições de estilo do tema padrão.
// Esse tema inclui cores, fontes, espaçamentos, etc., organizados de forma modular.
import { defaultTheme } from "../styles/themes/default";

// Cria um tipo TypeScript chamado 'ThemeType' que é inferido a partir do tipo do objeto 'defaultTheme'.
// Isso permite que o TypeScript valide o uso do tema em toda a aplicação, garantindo consistência e evitando erros.
type ThemeType = typeof defaultTheme;

// Declara um módulo adicional para o pacote 'styled-components'.
// Isso é necessário para estender a interface 'DefaultTheme' fornecida pelo 'styled-components'.
declare module 'styled-components' {
  // Estende a interface 'DefaultTheme' do 'styled-components' para incluir as propriedades do nosso tema personalizado.
  // Com isso, o TypeScript reconhece nosso tema como parte da interface global do 'styled-components'.
  export interface DefaultTheme extends ThemeType {}
}