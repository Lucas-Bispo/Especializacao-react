import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use.case'

interface CustomRequest extends FastifyRequest {
  user: {
    sub: string
  }
  params: {
    gymId: string
  }
  body: {
    latitude: number
    longitude: number
  }
}

const requestSchema = z.object({
  user: z.object({
    sub: z.string()
  }),
  params: z.object({
    gymId: z.string().uuid()
  }),
  body: z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    })
  })
})

export async function create(request: CustomRequest, reply: FastifyReply) {
  try {
    const validatedRequest = requestSchema.parse(request)
    const { user, params, body } = validatedRequest
    const { gymId } = params
    const { latitude, longitude } = body

    const checkInUseCase = makeCheckInUseCase()
    await checkInUseCase.execute({
      gymId,
      userId: user.sub,
      userLatitude: latitude,
      userLongitude: longitude,
    })

    return reply.status(201).send()
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ message: 'Erro interno do servidor' })
  }
}