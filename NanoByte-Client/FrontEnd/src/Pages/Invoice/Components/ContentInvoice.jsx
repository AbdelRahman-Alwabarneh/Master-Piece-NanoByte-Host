import React, { useState, useEffect } from "react";
import axios from "axios";
import { Check, Download, FileText, AlertCircle } from "lucide-react";
import Loading from "../../../Components/Loading/Loading";
import NoDataFound from "../../../Components/NoDataFound/NoDataFound";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MainInvoiceContent from "./maininvoice";
import InvoiceSummary from "./InvoiceSummary";
const ContentInvoice = () => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderNumber } = useParams();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/invoices/${orderNumber}`
        );
        setInvoice(response.data);
      } catch (err) {
        setError("حدث خطأ في جلب تفاصيل الفاتورة");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [orderNumber]);

 

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <NoDataFound/>;
  }

  return (
    <>
      <div className="min-h-screen py-8 sm:py-12 px-4 md:px-6 mt-[72px] font-cairo bg-nano-bg-100">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row lg:gap-8 items-start">
          <div className="w-full lg:w-2/3 order-2 lg:order-1 mb-8 lg:mb-0">
            <MainInvoiceContent
            motion={motion}
            FileText={FileText}
            AlertCircle={AlertCircle}
            Check={Check}
            invoice={invoice}
            />
            </div>
          <InvoiceSummary
          motion={motion}
          AnimatePresence={AnimatePresence}
          AlertCircle={AlertCircle}
          invoice={invoice}
          Download={Download}
          />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentInvoice;
