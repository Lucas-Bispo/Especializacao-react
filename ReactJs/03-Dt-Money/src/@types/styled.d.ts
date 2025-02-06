<<<<<<< HEAD
import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
/**
O código começa importando o styled-components e o defaultTheme do arquivo ../styles/themes/default. O styled-components é uma biblioteca 
JavaScript que permite você escrever CSS dentro dos seus componentes React. O defaultTheme é um objeto que contém as configurações de estilo para sua aplicação.
O código então define um tipo chamado ThemeType que é o tipo do objeto defaultTheme. O tipo ThemeType é definido usando a palavra-chave type e o operador typeof. 
O operador typeof retorna o tipo do valor que é passado como parâmetro. No caso, o parâmetro é o objeto defaultTheme.
O código então usa o declare module para declarar um novo tipo chamado DefaultTheme que estende o ThemeType. 
O declare module é uma palavra-chave que é usada para declarar um novo módulo TypeScript. O módulo DefaultTheme estende o módulo ThemeType. 
Isso significa que o DefaultTheme tem os mesmos atributos e métodos que o ThemeType.
O código completo é um exemplo de como usar a pasta @types em um projeto ReactJS que usa TypeScript. A pasta @types contém arquivos de tipos para bibliotecas e dependências usadas no projeto. 
Esses arquivos são usados pelo compilador TypeScript para verificar o tipo do código e evitar erros.
O uso de tipos pode ajudar a identificar e corrigir erros no código antes de ele ser executado, tornando o código mais legível e fornecendo informações 
sobre a estrutura de dados e as assinaturas de funções das bibliotecas e dependências. Isso pode ajudar os desenvolvedores a escrever código mais rapidamente e com menos erros.
*/
=======
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
>>>>>>> 03-Dt-Money
