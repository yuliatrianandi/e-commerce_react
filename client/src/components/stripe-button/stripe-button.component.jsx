import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_H9KGl0j4GdPThdCz0BCP8pqX00OMJMJQU5';

  const onToken = token => {
    axios({
      url: 'http://localhost:5000/payment',
      method: 'post',
      data: {
        amount:priceForStripe,
        token
      }
    }).then(response => {
      alert('Payment Successful');
    }).catch(error => {
      console.log('Payment error: ', error);
      alert('There was an issue with your payment.Please make sure you use the provided credit card.');
    })
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
