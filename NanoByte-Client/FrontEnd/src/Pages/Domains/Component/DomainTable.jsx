function DomainTable() {
  const domains = [
    {
      name: ".com",
      newPrice: "$9.99 USD",
      transfer: "$9.99 USD",
      renew: "$15.00 USD",
    },
    {
      name: ".net",
      newPrice: "$16.20 USD",
      transfer: "$16.20 USD",
      renew: "$16.20 USD",
    },
    {
      name: ".com",
      newPrice: "$9.99 USD",
      transfer: "$9.99 USD",
      renew: "$15.00 USD",
    },
    {
      name: ".com",
      newPrice: "$9.99 USD",
      transfer: "$9.99 USD",
      renew: "$15.00 USD",
    },
    {
      name: ".com",
      newPrice: "$9.99 USD",
      transfer: "$9.99 USD",
      renew: "$15.00 USD",
    },
    {
      name: ".com",
      newPrice: "$9.99 USD",
      transfer: "$9.99 USD",
      renew: "$15.00 USD",
    },
    {
      name: ".com",
      newPrice: "$9.99 USD",
      transfer: "$9.99 USD",
      renew: "$15.00 USD",
    },
  ];

  return (
    <>
        <div className="font-cairo relative overflow-x-auto shadow-lg sm:rounded-lg mt-12 [direction:rtl] max-w-7xl mx-auto rounded-[20px] bg-gradient-to-r from-[#1b4976] to-[#234d77]">
      <table className="w-full text-sm md:text-base text-center text-gray-200">
        <thead className="text-base text-white uppercase bg-gradient-to-r from-[#3b53b3] to-[#0a5cad] rounded-t-lg shadow-sm">
          <tr>
            <th className="px-4 py-2">الدومين</th>
            <th className="px-4 py-2">سعر جديد</th>
            <th className="px-4 py-2">نقل</th>
            <th className="px-4 py-2">تجديد</th>
          </tr>
        </thead>
        <tbody className="text-base">
          {domains.map((domain, index) => (
            <tr
              key={index}
              className={`border-b border-[#1a3d5f] ${
                index % 2 === 0 ? "bg-[#334899]" : "bg-[#394fa8]"
              } text-white hover:bg-[#3e87cc] transition-all duration-300`}
            >
              <td className="px-4 py-4 font-bold text-[20px] text-white whitespace-nowrap">
                {domain.name}
              </td>
              <td className="px-4 py-4">
                {domain.newPrice}
                <br />
                <span className="text-xs md:text-sm text-gray-300">1 سنة</span>
              </td>
              <td className="px-4 py-4">
                {domain.transfer}
                <br />
                <span className="text-xs md:text-sm text-gray-300">1 سنة</span>
              </td>
              <td className="px-4 py-4">
                {domain.renew}
                <br />
                <span className="text-xs md:text-sm text-gray-300">1 سنة</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </>
  );
}

export default DomainTable;
