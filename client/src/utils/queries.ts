
import { gql } from '@apollo/client';

export const QUERY_TICKETS = gql`
  query allTickets {
    tickets {
      _id
      name
      description
      status
    }
  }
`;

export const QUERY_USERS = gql`
 query Users {
  users {
    _id
    password
    username
  }
}
`;

export const QUERY_TICKET = gql`
    query Tickets {
    
    }