// PrintInvoice.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import MainInvoiceContent from "./maininvoice";
import { motion } from "framer-motion";
import { Check, Download, FileText, AlertCircle } from "lucide-react";
import Loading from "../../../Components/Loading/Loading";
import NoDataFound from "../../../Components/NoDataFound/NoDataFound";
const PrintInvoice = () => {
  const { orderNumber } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/invoices/PrintInvoice/${orderNumber}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInvoice(response.data);
      } catch (error) {
        console.error("خطأ في جلب الفاتورة:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchInvoice();
  }, []);

  if (loading) return <Loading/>;
  if (!invoice) return <NoDataFound/>;

  return (
    <>
    <title>الفاتورة #{invoice.orderNumber} - NanoByte</title>
    <div id="invoice-ready" dir="rtl" style={{ padding: 20, background: "#0F172A", minHeight: "100vh" }}>
        <div className="w-full lg:w-2/3 order-2 lg:order-1 mb-8 lg:mb-0">
            <MainInvoiceContent
            invoice={invoice}
            motion={motion}
            FileText={FileText}
            AlertCircle={AlertCircle}
            Check={Check}
            />
        </div>
        </div>
    </>
  );
};

export default PrintInvoice;
