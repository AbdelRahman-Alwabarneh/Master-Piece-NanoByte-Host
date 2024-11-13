import React from 'react';

const ItemsPerPageSelect = ({ itemsPerPage, setItemsPerPage }) => {
  return (
    <div className="flex items-center text-sm space-x-2">
    <div className="relative">
      <select
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
        className="px-1 bg-[#194f86] border border-[#003366] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white"
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={0}>الكل</option>
      </select>
  
    </div>
    <span className="text-white font-medium text-sm text-center">عرض البيانات</span>
  </div>
  );
};

export default ItemsPerPageSelect;