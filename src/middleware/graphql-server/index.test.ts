import { createServer } from 'graphql-yoga'
import { Hono } from '../../hono'
import { graphqlServer } from './index'

describe('GraphQL Server Middleware', () => {
  let app: Hono

  beforeEach(() => {
    app = new Hono()
    app.use('/graphql', graphqlServer)
  })

  it('should handle a simple query', async () => {
    const query = `
      query {
        hello
      }
    `
    const req = new Request('http://localhost/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })
    const res = await app.request(req)
    const json = await res.json()
    expect(json.data.hello).toBe('Hello, world!')
  })

  it('should handle a mutation', async () => {
    const mutation = `
      mutation {
        setMessage(message: "Hello, GraphQL!") {
          message
        }
      }
    `
    const req = new Request('http://localhost/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation }),
    })
    const res = await app.request(req)
    const json = await res.json()
    expect(json.data.setMessage.message).toBe('Hello, GraphQL!')
  })
})
