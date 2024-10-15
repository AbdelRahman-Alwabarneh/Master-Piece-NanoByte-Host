import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronDown } from 'lucide-react';
import { useParams } from "react-router-dom";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Loading from '../../Components/Loading/Loading';
const DedicatedOrderDetails = () => {
  const [serverDetails, setServerDetails] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('oneMonth');
  const [promoCode, setPromoCode] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const { productLink } = useParams();

  // Fetch server details on component mount
  useEffect(() => {
    const fetchServerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/dedicatedServerDetails/${productLink}`);
        const data = response.data.DedicatedServerDetails;
        setServerDetails(data);
        setTotalPrice(data.subscriptionDurations.oneMonth.price);
      } catch (error) {
        console.error('خطأ في جلب تفاصيل الخادم:', error);
      }
    };
    fetchServerDetails();
  }, [productLink]);

  // Update total price when selected duration changes
  useEffect(() => {
    if (serverDetails) {
      setTotalPrice(serverDetails.subscriptionDurations[selectedDuration].price);
    }
  }, [selectedDuration, serverDetails]);

  const applyPromoCode = () => {
    console.log('تطبيق كود الخصم:', promoCode);
  };

  const getDurationText = (key) => {
    const durationMap = {
      'oneMonth': 'شهر واحد',
      'twoMonths': 'شهرين',
      'threeMonths': 'ثلاثة أشهر',
      'fourMonths': 'أربعة أشهر',
      'fiveMonths': 'خمسة أشهر',
      'sixMonths': 'ستة أشهر'
    };
    return durationMap[key] || `${key.replace('Months', '')} أشهر`;
  };

  if (!serverDetails) return <Loading/>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)] mt-[72px] [direction:rtl] text-white p-4 md:p-8 font-cairo text-right text-sm">
        <h1 className="text-2xl font-bold mb-8 text-center">إعداد الطلب</h1>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 px-4 mb-8 order-2 lg:order-1">
            <div className="space-y-6">
            <div className="bg-blue-900 bg-opacity-60 rounded-lg p-6 shadow-2xl space-y-6">
  <h2 className="text-2xl font-bold mb-4 text-center text-white border-b border-blue-700 pb-3">
    ملخص الطلب
  </h2>

  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <span className="font-semibold text-white">أسم الخطة:</span>
      <span className="text-white">{serverDetails.planTitle}</span>
    </div>

    <div className="flex justify-between items-center">
      <span className="font-semibold text-white">وصف الخطة:</span>
      <span className="text-white">{serverDetails.secondaryTitle}</span>
    </div>

    <div className="space-y-2">
      <span className="font-semibold text-white">تفاصيل الخطة:</span>
      <p className="whitespace-pre-wrap text-white bg-blue-800 bg-opacity-30 p-3 rounded-md">
        {serverDetails.planDescription}
      </p>
    </div>
  </div>
</div>


              <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 shadow-lg">
                <label htmlFor="duration" className="block mb-2 font-semibold">مدة الاشتراك:</label>
                <div className="relative">
                  <select
                    id="duration"
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="block w-full bg-blue-900 border border-blue-700 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(serverDetails.subscriptionDurations)
                      .filter(([_, value]) => value.enabled)
                      .map(([key, value]) => (
                        <option key={key} value={key}>
                          {getDurationText(key)} - ${value.price}
                        </option>
                      ))}
                  </select>
                  <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-4 h-4 pointer-events-none" />
                </div>
              </div>

              <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 shadow-lg">
                <label htmlFor="promoCode" className="block mb-2 font-semibold">كود الخصم:</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="promoCode"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-grow bg-blue-900 border border-blue-700 rounded-r py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="أدخل كود الخصم"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l transition duration-300"
                  >
                    تطبيق
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3 px-4 mb-8 order-1 lg:order-2">
  <div 
    className="bg-blue-800 bg-opacity-50 rounded-lg p-4 shadow-lg sticky" 
    style={{ top: '80px' }}
  >
    <h2 className="text-xl font-semibold mb-4 border-b border-blue-600 pb-2">
      ملخص الطلب
    </h2>
    <div className="space-y-3 mb-4">
      <div className="flex justify-between">
        <span>{serverDetails.planTitle}</span>
        <span className="font-bold">${totalPrice}</span>
      </div>
      <div className="flex justify-between">
        <span>رسوم الإعداد</span>
        <span className="font-bold">$0.00</span>
      </div>
    </div>
    <div className="border-t border-blue-600 pt-3">
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold">الإجمالي المطلوب</span>
        <span className="text-2xl font-bold text-white">${totalPrice}</span>
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300 text-sm shadow-md">
        الاستمرار للدفع
      </button>
    </div>
  </div>
</div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default DedicatedOrderDetails;
