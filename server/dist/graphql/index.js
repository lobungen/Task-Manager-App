import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema.js';
import { root } from './resolvers.js'; // You’ll define this
const graphqlHandler = graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, // Enables GraphiQL UI
});
export default graphqlHandler;
