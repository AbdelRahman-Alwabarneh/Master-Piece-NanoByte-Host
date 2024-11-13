import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import EmailTemplateModal from './EmailTemplateDropdown';

const SettingsDropdown = ({ serviceData, userId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="flex items-center gap-2 bg-blue-600/90 hover:bg-blue-600 px-4 py-2 rounded-md text-[11px] sm:text-xs font-medium transition-all duration-200 active:scale-95"
        onClick={toggleDropdown}
      >
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
        <span>الإعدادات</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 left-0 mt-2 w-44 sm:w-48 bg-gradient-to-b from-blue-900/95 to-blue-800/95 backdrop-blur-sm border border-blue-700/50 rounded-lg shadow-2xl transform origin-top scale-100 transition-all duration-200">
          <div className="py-1">
            <button
              type="button"
              className="w-full text-right px-4 py-2.5 text-[11px] sm:text-xs hover:bg-blue-700/50 flex items-center justify-between transition-colors duration-200 active:bg-blue-600/50"
              onClick={handleOpenModal}
            >
              <span>ارسال رسالة</span>
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <EmailTemplateModal
          serviceData={serviceData}
          userId={userId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SettingsDropdown;