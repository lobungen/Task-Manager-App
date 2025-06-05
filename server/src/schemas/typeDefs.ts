const typeDefs = `
  type Ticket {
    _id: ID!
    name: String!
    status: String!
    description: String!
  }

  type User {
    _id: ID!
    username: String!
    password: String!
    }
  
    
    type Query {
      tickets: [Ticket]!
      users: [User]!
    }

    type Mutation {
        createTicket(name:String!, status:String!, description:String!): Ticket!
    }

`
export default typeDefs;
