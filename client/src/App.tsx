/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import RootReducer from './reducers/RootReducer';
import logger from 'redux-logger';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { setContext } from '@apollo/client/link/context';

function App() {
  //Cookies fungerer ikke med denne varianten
  /*const link = from([
    new HttpLink({
      uri: 'http://localhost:5000/graphql',
      credentials: 'include',
    }),
  ]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    credentials: 'include',

    uri: 'http://localhost:5000/graphql',
  });*/

  const store = createStore(
    RootReducer,
    composeWithDevTools(applyMiddleware(logger))
  );

  const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
    credentials: 'include',
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    fetch('http://localhost:5000/refresh-token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      const response = await x.json();
      console.log(response);
      window.localStorage.setItem('token', response.accessToken);
    });
  }, []);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">{Routes}</div>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
