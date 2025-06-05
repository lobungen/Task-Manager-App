import { gql } from '@apollo/client';

export const CREATE_TICKET = gql`
 mutation CreateTicket($name: String!, $status: String!, $description: String!) {
  createTicket(name: $name, status: $status, description: $description) {
    _id
    description
    name
    status
  }
}
    `;