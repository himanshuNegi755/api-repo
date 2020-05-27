import React from 'react';
import {Switch, Route} from 'react-router-dom'

import FrontPage from './components/frontPage';
import ShopPage from './components/shopPage';
import CartPage from './components/cartPage';
import ProductPage from './components/productPage';
import GoogleButton from './components/googleButton';

function App() {
  return (
    <Switch>
          <Route exact path="/" component={FrontPage} />
          <Route path="/shop/:productType" component={ShopPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/product/:productId" component={ProductPage} />
    </Switch>
  );
}

export default App;
