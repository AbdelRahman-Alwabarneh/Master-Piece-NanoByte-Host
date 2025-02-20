import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Loading from "../../Components/Loading/Loading";
import ContentPayment from "./Components/ContentPayment";
const PaymentPage = () => {
  return (
    <div dir="rtl">
      <Header />
      <ContentPayment/>
      <Footer />
    </div>
  );
};

export default PaymentPage;
