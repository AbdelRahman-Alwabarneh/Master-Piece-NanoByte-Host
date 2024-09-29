import ButtonVps from "./Button";
import FeaturesOfOurServices1 from "./FeaturesOfOurServices1";
import FeaturesOfOurServices2 from "./FeaturesOfOurServices2";
function AllVpsPlans() {
  const Plans = [
    { name: "NV-1", ram: "2GB", cpu: "3.5GHz / 1 CORE", storage: "50GB SSD", speed: "Upto 10Gbit/s", protection: "DDoS 2.5TB", price: "$6.00 USD" },
    { name: "NV-2", ram: "4GB", cpu: "3.5GHz / 3 CORE", storage: "75GB SSD", speed: "Upto 10Gbit/s", protection: "DDoS 2.5TB", price: "$9.00 USD" },
    { name: "NV-3", ram: "6GB", cpu: "3.5GHz / 4 CORE", storage: "90GB SSD", speed: "Upto 10Gbit/s", protection: "DDoS 2.5TB", price: "$11.00 USD" },
    { name: "NV-4", ram: "8GB", cpu: "3.5GHz / 5 CORE", storage: "100GB SSD", speed: "Upto 10Gbit/s", protection: "DDoS 2.5TB", price: "$16.00 USD" },
    { name: "NV-5", ram: "12GB", cpu: "3.5GHz / 5 CORE", storage: "120GB SSD", speed: "Upto 10Gbit/s", protection: "DDoS 2.5TB", price: "$19.00 USD" },
    { name: "NV-6", ram: "16GB", cpu: "3.5GHz / 6 CORE", storage: "140GB SSD", speed: "Upto 10Gbit/s", protection: "DDoS 2.5TB", price: "$25.00 USD" },
    { name: "NV-7", ram: "24GB", cpu: "3.5GHz / 7 CORE", storage: "160GB SSD", speed: "Upto 10Gbit/s", protection: "DDoS 2.5TB", price: "$35.00 USD" },
    { name: "NV-8", ram: "32GB", cpu: "3.5GHz / 8 CORE", storage: "180GB SSD", speed: "Upto 10Gbit/s", protection: "DDoS 2.5TB", price: "$45.00 USD" },
    { name: "NV-9", ram: "48GB", cpu: "3.5GHz / 8 CORE", storage: "220GB SSD", speed: "Upto 10Gbit/s", protection: "DDoS 2.5TB", price: "$65.00 USD" },
    { name: "NV-10", ram: "64GB", cpu: "3.5GHz / 10 CORE", storage: "250GB SSD", speed: "Upto 10Gbit/s", protection: "DDoS 2.5TB", price: "$95.00 USD" },
]
  return (
    <>
            <title>الخوادم المشتركة - NanoByte</title>
            <h2 className="font-cairo text-3xl font-bold text-center text-white mb-1 mt-[200px] p-4 rounded-md">
  (VPS) إستضافة خوادم مشتركة
</h2>
<p className="font-cairo text-white text-center">
    كن مستعدا للانطلاق مع نانوبايت هوست
</p>
<div className="font-cairo relative overflow-x-auto shadow-md sm:rounded-lg mt-[50px] [direction:rtl] max-w-7xl mx-auto rounded-[20px]">
    <table className="w-full text-base text-center text-gray-200">
        <thead className="text-base text-white uppercase bg-[#1b4976] rounded-t-lg">
            <tr>
                <th scope="col" className="px-6 py-3">الأسم</th>
                <th scope="col" className="px-6 py-3">الرامات</th>
                <th scope="col" className="px-6 py-3">المعالج</th>
                <th scope="col" className="px-6 py-3">التخزين</th>
                <th scope="col" className="px-6 py-3">سرعة الأتصال</th>
                <th scope="col" className="px-6 py-3">الحماية</th>
                <th scope="col" className="px-6 py-3">التكلفة الشهرية</th>
                <th scope="col" className="px-6 py-3">طلب</th>
            </tr>
        </thead>
        <tbody className="text-base">
            {Plans.map((Plan, index) => (
                <tr key={index} className={`border-b border-[#003366] ${index % 2 === 0 ? 'bg-[#235a92]' : 'bg-[#194f86]'} text-white hover:bg-[#174776]`}>
                    <th scope="row" className="px-6 py-3 font-medium text-white whitespace-nowrap">{Plan.name}</th>
                    <td className="px-6 py-7">{Plan.ram}</td>
                    <td className="px-6 py-7">{Plan.cpu}</td>
                    <td className="px-6 py-7">{Plan.storage}</td>
                    <td className="px-6 py-7">{Plan.speed}</td>
                    <td className="px-6 py-7">{Plan.protection}</td>
                    <td className="px-6 py-7">{Plan.price}</td>
                    <td className="px-6 py-7">
                        <ButtonVps />
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

<FeaturesOfOurServices1/>
<FeaturesOfOurServices2/>

    </>
  );
}
export default AllVpsPlans;
