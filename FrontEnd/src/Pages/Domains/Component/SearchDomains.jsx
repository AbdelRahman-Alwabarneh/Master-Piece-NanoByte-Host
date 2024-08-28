function SearchDomains() {
  return (
    <>
      <h2 className="font-cairo text-4xl font-bold text-center text-white mb-2 mt-[130px] p-4 rounded-md">
        حجز دومين جديد
      </h2>
      <p className="font-cairo text-lg text-gray-300 text-center mb-12">
        يمكنك الأن حجز دومين بكل سهولة مع نانوبايت
      </p>
      <div className="bg-[#1D3079] text-white p-10 rounded-xl shadow-xl max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row-reverse gap-4">
          <input
            type="text"
            placeholder="العثور على نطاق جديد 🔍"
            className="flex-grow p-4 rounded-lg text-black text-right placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
          <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg">
            ابحث
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchDomains;
