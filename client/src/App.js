import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddProduct from './pages/AddProduct';
import MyProducts from './pages/MyProducts';
import ProductGallery from './pages/ProductGallery';
import NoMatch from './pages/NoMatch';
import CategoryPage from './pages/CategoryPage';
import Wishlist from './pages/Wishlist';
import './App.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
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

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/add-product" component={AddProduct} />
          <Route exact path="/my-products" component={MyProducts} />
          <Route exact path="/marketplace" component={ProductGallery} />
          <Route exact path="/wishlist" component={Wishlist} />
          {/* <Route exact path="/user-products" component={UserProducts} /> */}
          <Route exact path="/categories/:category" component={CategoryPage} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
