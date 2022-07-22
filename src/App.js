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
  constructor() {
    super();
    this.state = {
      hover: false,
    };
  }

  onHover = () => {
    this.setState({
      hover: true
    })
  }

  onLeaveHover = () => {
    this.setState({
      hover: false
    })
  }

  render() {
    return (
      <div className='body'>
        <ApolloProvider client={client}>
          <Header onHover={this.onHover} onLeaveHover={this.onLeaveHover} hover={this.state.hover}/>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
