import { PureComponent } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache, ApolloClient } from '@apollo/client';
import Header from './components/header/Header';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

class App extends PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <Header />
      </ApolloProvider>
    );
  }
}

export default App;
