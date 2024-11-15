import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

const MergeableFields = () => {
  const [expandedSections, setExpandedSections] = useState({
    userdata: true,
    service: true,
    order: true,
    technical: true
  });

  const [copiedField, setCopiedField] = useState(null);

  const fieldGroups = {
    userdata: {
        title: "بيانات المستخدم",
        fields: {
          "userdata.firstName": "الاسم الأول",
          "userdata.lastName": "الاسم الأخير",
          "userdata.usernameDiscord": "اسم المستخدم على ديسكورد",
          "userdata.email": "البريد الإلكتروني",
          "userdata.password": "كلمة المرور",
          "userdata.phoneNumber": "رقم الهاتف",
          "userdata.companyName": "اسم الشركة",
          "userdata.streetAddress": "عنوان الشارع",
          "userdata.city": "المدينة",
          "userdata.country": "الدولة",
          "userdata.profileImage": "صورة الملف الشخصي",
          "userdata.isBanned": "حالة الحظر",
          "userdata.googleId": "معرف جوجل",
          "userdata.discordId": "معرف ديسكورد",
          "userdata.githubId": "معرف جيثب",
          "userdata.createdAt": "تاريخ الإنشاء"
        }
      }
      ,
    service: {
        title: "بيانات الخدمة",
        fields: {
          "serviceData.orderNumber": "رقم الطلب",
          "serviceData.bookingDate": "تاريخ الحجز",
          "serviceData.initialPayment": "الدفع الأولي",
          "serviceData.renewalAmount": "مبلغ التجديد",
          "serviceData.nextPaymentDate": "تاريخ الدفع التالي",
          "serviceData.expiryDate": "تاريخ الانتهاء",
          "serviceData.billingCycle": "دورة الفوترة",
          "serviceData.paymentMethod": "طريقة الدفع",
          "serviceData.discountCode": "رمز الخصم",
          "serviceData.productType": "نوع المنتج",
          "serviceData.domain": "النطاق",
          "serviceData.ipAddress": "عنوان الـ IP",
          "serviceData.username": "اسم المستخدم",
          "serviceData.password": "كلمة المرور",
          "serviceData.status": "حالة الخدمة",
          "serviceData.operatingSystem": "نظام التشغيل",
          "serviceData.adminNotes": "ملاحظات الإدارة",
        }
      },
      order: {
        title: "بيانات الطلب",
        fields: {
          "order.userId": "معرف المستخدم",
          "order.planName": "اسم الخطة",
          "order.Servicetype": "نوع الخدمة",
          "order.Subscriptionduration": "مدة الاشتراك",
          "order.orderNumber": "رقم الطلب",
          "order.paymentMethod": "طريقة الدفع",
          "order.paymentStatus": "حالة الدفع",
          "order.orderStatus": "حالة الطلب",
          "order.discountCode": "رمز الخصم",
          "order.amount": "المبلغ",
          "order.renewalFee": "رسوم التجديد",
          "order.nextPaymentDate": "تاريخ الدفعة القادمة",
          "order.expirationDate": "تاريخ الانتهاء",
        }
      },
    technical: {
      title: "البيانات التقنية",
      fields: {
        "technical.ipAddress": "عنوان IP",
        "technical.username": "اسم المستخدم التقني",
        "technical.password": "كلمة المرور",
        "technical.operatingSystem": "نظام التشغيل",
        "technical.hostname": "اسم المضيف",
        "technical.serverLocation": "موقع الخادم"
      }
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const copyToClipboard = async (text, fieldKey) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldKey);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="mt-4 bg-blue-950 bg-opacity-30 rounded-lg p-4" dir="rtl">
      <div className="mb-3">
        <h2 className="text-sm font-semibold text-white">الحقول القابلة للدمج</h2>
      </div>
      
      <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {Object.entries(fieldGroups).map(([groupKey, group]) => (
            <div key={groupKey} className="bg-blue-800 bg-opacity-45 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(groupKey)}
                className="w-full flex justify-between items-center p-2 text-white hover:bg-blue-800 transition-colors"
              >
                <span className="font-medium text-xs">{group.title}</span>
                {expandedSections[groupKey] ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              
              {expandedSections[groupKey] && (
                <div className="p-2 space-y-1.5">
                  {Object.entries(group.fields).map(([key, label]) => (
                    <div 
                      key={key}
                      className="flex flex-col gap-1 text-white hover:bg-blue-700/40 rounded p-1.5"
                    >
                      <span className="text-xs font-medium text-gray-300">{label}</span>
                      <div
                        className="bg-blue-950/50 px-1.5 py-1 rounded text-xs font-mono w-full text-center cursor-pointer flex items-center justify-between group"
                        dir="ltr"
                        onClick={() => copyToClipboard(`{$${key}}`, key)}
                      >
                        <span className="flex-grow text-center">{`{$${key}}`}</span>
                        {copiedField === key ? (
                          <Check className="h-3 w-3 text-green-400 ml-1" />
                        ) : (
                          <Copy className="h-3 w-3 opacity-0 group-hover:opacity-50 ml-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default MergeableFields;