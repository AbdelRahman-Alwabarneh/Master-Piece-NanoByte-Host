function ButtonDedicatedServer({ onClick, isUnlimited, quantity }) {
  return (
    <>
      <button
        onClick={onClick}
        className={`font-cairo mt-auto group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-blue-500/30 backdrop-blur-lg px-4 py-2 text-sm font-semibold text-white transition-all duration-300 ease-in-out ${!isUnlimited && quantity === 0 && "opacity-50"} ${
          !isUnlimited && quantity == 0
            ? "cursor-not-allowed"
            : "hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-600/50"
        } border border-white/20 whitespace-nowrap`}
      >
        <span className="text-sm">
          {!isUnlimited && quantity == 0 ? "نفذت الكمية" : "أطلب الأن"}
        </span>
        <div
          className={`absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] ${
            isUnlimited
              ? "group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]"
              : null
          }`}
        >
          <div className="relative h-full w-12 bg-white/30"></div>
        </div>
      </button>
    </>
  );
}
export default ButtonDedicatedServer;
