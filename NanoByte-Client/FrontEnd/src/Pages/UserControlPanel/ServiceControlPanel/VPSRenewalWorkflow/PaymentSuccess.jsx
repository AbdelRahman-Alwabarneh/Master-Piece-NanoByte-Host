import React from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentSuccess = () => {


  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      limit={1}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="colored"
      transition={Bounce}
    />
  );
};

export { PaymentSuccess, toast, Bounce };
