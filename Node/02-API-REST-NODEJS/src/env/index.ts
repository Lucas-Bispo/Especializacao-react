/**
 * Carrega as variáveis de ambiente do arquivo .env
 * e verifica se elas estão corretas com o schema de validação
 * definido pela biblioteca Zod.
 *
 * Se o ambiente for 'test', carrega o arquivo .env.test
 * caso contrário, carrega o arquivo .env padrão.
 *
 * O schema de validação verifica se as variáveis de ambiente
 * possuem os valores esperados:
 * - NODE_ENV: development, test ou production (padrão: production)
 * - DATABASE_CLIENT: sqlite ou pg (padrão: sqlite)
 * - DATABASE_URL: string (obrigatório)
 * - PORT: número (padrão: 3333)
 *
 * Se alguma variável de ambiente estiver incorreta, imprime um erro
 * no console e lança uma exceção.
 *
 * Exporta as variáveis de ambiente validadas.
 */
import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']).default('sqlite'),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('⚠️ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
