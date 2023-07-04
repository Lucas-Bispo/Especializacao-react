import 'styled-components';

import { defaultTheme } from '../styles/theme/default';

// A importação de 'styled-components' permite a extensão de tipos do pacote.

// O tipo ThemeType é definido como o tipo do objeto defaultTheme importado do arquivo '../styles/theme/default'.
type ThemeType = typeof defaultTheme;

// A declaração do módulo 'styled-components' é feita para estender a interface DefaultTheme.

declare module 'styled-components' {
  // A interface DefaultTheme é estendida para incorporar o tipo ThemeType.
  export interface DefaultTheme extends ThemeType {}
}
