import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


function App() {

  return (
    <ApolloProvider client={client}>
      <div className='container'>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </ApolloProvider>
  )
}

export default App
