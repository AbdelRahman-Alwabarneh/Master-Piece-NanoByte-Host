import React from 'react';

const ItemsPerPageSelect = ({ itemsPerPage, setItemsPerPage,totalPages ,currentPage , totalCount}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
      <div className="flex flex-wrap items-center bg-[#2F64BB]/15 px-2 sm:px-3 py-1.5 rounded-lg gap-2">
        <div className="flex items-center text-sm text-gray-200 space-x-2 rtl:space-x-reverse flex-wrap">
          <span className="text-xs whitespace-nowrap">عرض</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
            className="px-2 py-1 bg-[#2344b1]/50 border border-[#003366]/50 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 
                     text-white text-sm min-w-[60px]
                     hover:bg-[#2344b1]/70 transition-colors duration-200"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={0}>الكل</option>
          </select>
          <span className="text-xs whitespace-nowrap">لكل صفحة</span>
        </div>
        <div className="hidden sm:block mx-2 h-4 w-px bg-gray-500/30" />
        <div className="flex items-center text-sm text-gray-200 space-x-2 rtl:space-x-reverse flex-wrap">
          <span className="whitespace-nowrap text-xs sm:text-sm">
            الصفحة {currentPage} من {totalPages}
          </span>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            ({totalCount.toLocaleString()} عناصر)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemsPerPageSelect;