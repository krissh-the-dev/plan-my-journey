import React, { useState, useEffect } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from './Alert';

export default function PayPalBtn({ fare, isPaid, setIsPaid, setDisabled }) {
  const [sdkReady, setSdkReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({
    type: '',
    message: ''
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const addPayPalScript = async () => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=ASJB5UI4EjetXHh6HjuRjC12dYxmlj2b1Up1A8WrF5NziQsKL6kXoMp-hj-_V4PdbOU7DGSFhQy5Ti2_`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  const handleSuccess = async (details, data) => {
    setDisabled(true);
    setIsPaid(data.orderID);
    console.log({ details, data });
    setAlert({
      type: 'success',
      message: 'Payment successful'
    });

    setDisabled(false);
    setOpen(true);
  };

  const handelError = err => {
    setAlert({
      type: 'error',
      message: 'Unable to complete payments'
    });
  };

  useEffect(() => {
    addPayPalScript();
  }, []);

  return (
    <>
      {sdkReady && !isPaid && (
        <PayPalButton
          amount={fare}
          // shippingPreference="NO_SHIPPING"
          onSuccess={handleSuccess}
          onError={handelError}
          onCancel={() => setDisabled(false)}
        />
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.type}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
}
