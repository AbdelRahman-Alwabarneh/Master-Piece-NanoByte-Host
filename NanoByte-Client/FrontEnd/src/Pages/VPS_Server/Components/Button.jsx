function ButtonVps({isUnlimited,quantity}) {
  return (
    <>
<button className={`font-cairo group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-blue-500/30 backdrop-blur-lg px-4 py-2 text-sm font-semibold text-white transition-all duration-300 ease-in-out ${isUnlimited ? "hover:scale-110 hover:shadow-xl hover:shadow-blue-600/50" : "cursor-not-allowed"}  border border-white/20 whitespace-nowrap`}>
  <span className="text-sm">{ isUnlimited == false && quantity == 0 ?"نفذت الكمية":"أطلب الأن"}</span>
  <div className={`absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] ${isUnlimited ? "group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]" : null}`}>
    <div className="relative h-full w-12 bg-white/30"></div>
  </div>
</button>


    </>
  );
}
export default ButtonVps;
