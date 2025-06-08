import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: ID!
    username: String!
  }

  type Ticket {
    id: ID!
    name: String!
    description: String
    status: String!
    assignedUser: User
    priority: String
    createdAt: String
    updatedAt: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

   type DeleteTicketResponse {
    success: Boolean!
    message: String
  }

  type Query {
    me: User
    users: [User!]!
    tickets: [Ticket!]!
    ticket(id: ID!): Ticket
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    createUser(username: String!, password: String!): User!
    createTicket(name: String!, description: String, status: String!, assignedUserId: ID, priority: String): Ticket!
    updateTicket(id: ID!, name: String, description: String, status: String, assignedUserId: ID, priority: String): Ticket!
    deleteTicket(id: ID!): DeleteTicketResponse!
  }
`;