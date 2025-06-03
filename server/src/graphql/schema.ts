// src/graphql/schema.ts
import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
  }

  type Ticket {
    id: ID!
    name: String!
    status: String!
    description: String!
    assignedUserId: ID!
    assignedUser: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    tickets: [Ticket]
    ticket(id: ID!): Ticket
  }

  input TicketInput {
    name: String!
    status: String!
    description: String!
    assignedUserId: ID!
  }

  type Mutation {
    createTicket(input: TicketInput): Ticket
    deleteTicket(id: ID!): String
  }
`);
