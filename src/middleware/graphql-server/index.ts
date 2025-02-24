import { createServer } from 'graphql-yoga'
import type { MiddlewareHandler } from '../../types'

export const graphqlServer: MiddlewareHandler = async (c, next) => {
  const server = createServer({
    schema: {
      typeDefs: `
        type Query {
          hello: String
        }
      `,
      resolvers: {
        Query: {
          hello: () => 'Hello, world!',
        },
      },
    },
  })

  const response = await server.handleRequest(c.req.raw)
  c.res = response
  await next()
}
