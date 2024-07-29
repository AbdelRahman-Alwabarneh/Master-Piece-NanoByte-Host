function Button() {
  return (
    <>
<button class="font-cairo relative inline-flex h-16 active:scale-95 transition-transform transform overflow-hidden rounded-lg p-[1px] focus:outline-none bg-gradient-to-b from-[#1A318C] to-[#161E41] shadow-lg hover:shadow-xl">
  <span class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4F6D8C_0%,#1E2A38_50%,#263B61_100%)]"></span>
  <span class="font-bold inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#1A318C] px-8 text-md text-white backdrop-blur-3xl gap-2 transition-colors duration-300 hover:bg-[#1c1aa5]">
    اطلع على مكتبة الشروحات
  </span>
</button>



    </>
  );
}
export default Button;
