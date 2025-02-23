// Carrega as variáveis de ambiente do arquivo .env
import { config } from 'dotenv'

// Utiliza o Zod para validar as variáveis de ambiente
import { z } from 'zod'

// Verifica se o ambiente é de testes e carrega o arquivo .env.test
if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
// Caso contrário, carrega o arquivo .env padrão
} else {
  config()
}

// Define o schema de validação para as variáveis de ambiente
const envSchema = z.object({
  // Variável NODE_ENV pode ser development, test ou production, e tem como padrão production
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  // Variável DATABASE_CLIENT pode ser sqlite ou pg, e tem como padrão sqlite
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']).default('sqlite'),
  // Variável DATABASE_URL é uma string e é obrigatória
  DATABASE_URL: z.string(),
  // Variável PORT é um número e tem como padrão 3333
  PORT: z.coerce.number().default(3333),
})

// Tenta validar as variáveis de ambiente com o schema definido
const _env = envSchema.safeParse(process.env)

// Se a validação falhar, imprime um erro e lança uma exceção
if (_env.success === false) {
  console.error('  Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

// Exporta as variáveis de ambiente validadas
export const env = _env.data
