import { Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ApiService from './Api.service';

import Navigation from './components/Menu/Navigation/Navigation';
import Pdp from './components/Pdp/Pdp/Pdp';
import LoadingSpinner from './components/LoadingSpinner';
import OrderConfirmation from './components/Order/OrderConfirmation/OrderConfirmation';
import ThankYou from './components/Order/ThankYou/ThankYou';
import Welcome from './components/Welcome';
import SomethingWentWrong from './components/Order/SomethingWentWrong/SomethingWentWrong';

function App() {
  const [products, setProducts] = useState([]);

  const getDataHandler = async () => {
    try {
      const productsList = await ApiService.httpGet('products.json');

      setProducts(productsList);
    } catch (error) {
      alert('Something went wrong, please reload');
    }
  };

  useEffect(() => {
    getDataHandler();
  }, []);

  return (
    <>
      <Navigation data={products} />
      <Switch>
        <Route path="/" exact>
          <Welcome data={products} />
        </Route>
        <Route path="/products/:productId">
          {products.length === 0 ? <LoadingSpinner /> : <Pdp data={products} />}
        </Route>
        <Route path="/order-confirmation">
          <OrderConfirmation />
        </Route>
        <Route path="/thank-you">
          <ThankYou />
        </Route>
        <Route path="/error">
          <SomethingWentWrong />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
}

export default App;
