import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ContentPayment from "./Components/ContentPayment";
import PaymentMetaTags from "./Components/MetaTags";
const PaymentPage = () => {
  return (
    <div dir="rtl">
      <PaymentMetaTags />
      <Header />
      <ContentPayment/>
      <Footer />
    </div>
  );
};

export default PaymentPage;
