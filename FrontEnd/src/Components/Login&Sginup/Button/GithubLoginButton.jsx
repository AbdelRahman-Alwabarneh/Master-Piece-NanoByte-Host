// إذا كنت تستخدم React Router

const GithubLoginButton = () => {
  const handleLogin = () => {
    window.location.href = import.meta.env.VITE_GITHUB_AUTH;
  };

  return (
    <button
      onClick={handleLogin}
      className="text-[2.4rem] no-underline text-white transition-colors duration-300 ease-in-out hover:bg-white rounded-full hover:border-solid hover:border-1 hover:text-[#0D1117] hover:border-black"
    >
      <i className="fa-brands fa-github "></i>
    </button>
  );
};

export default GithubLoginButton;
