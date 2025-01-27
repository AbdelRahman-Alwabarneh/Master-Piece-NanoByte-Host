const DiscordLoginButton = () => {
  const handleLogin = () => {
    // توجيه المستخدم إلى مسار تسجيل الدخول عبر Discord
    // تحقق من أن المسار صحيح ويطابق ما هو موجود في خادمك
    window.location.href = `${import.meta.env.VITE_API_URL}/api/discordAuth/discord`;
  };

  return (
<button
  onClick={handleLogin}
  className="text-[2.4rem] no-underline text-white hover:text-[#7289DA] transition-colors duration-300 ease-in-out"
>
  <i className="fa-brands fa-discord"></i>
</button>

  );
};

export default DiscordLoginButton;
