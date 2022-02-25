import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import Auth from '../utils/auth';
import { useStoreContext } from '../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../utils/actions'

const stripePromise = loadStripe('pk_test_51KXB4HIM9k0nTT2QJxomjvo21MMfufeZIJeYdehZIDGps2mH6RPUWFyxyOS4zkjd1Xt8gGQc1MBjNkqAacCbQIT500J5VHZhvR');

function ShoppingCart(props) {
    const [state, dispatch] = useStoreContext();
    //Grabs the checkout data
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        if (data) {
          stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: data.checkout.session });
          });
        }
      }, [data]);

    useEffect(() => {
        async function getCart() {
          const cart = await idbPromise('cart', 'get');
          dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        }
    
        if (!state.cart.length) {
          getCart();
        }
      }, [state.cart.length, dispatch]);
    
      function calculateTotal() {
        let sum = 0;
        state.cart.forEach((item) => {
          sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
     }

    function submitCheckout() {
        const productIds = [];
    
        state.cart.forEach((item) => {
          for (let i = 0; i < item.purchaseQuantity; i++) {
            productIds.push(item._id);
          }
        });
    
        getCheckout({
          variables: { products: productIds },
        });
    }

      return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            {/*<CartItem key={item._id} item={item} />*/}
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
}

export default ShoppingCart;