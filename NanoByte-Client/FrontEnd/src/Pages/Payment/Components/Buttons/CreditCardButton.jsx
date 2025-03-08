function CreditCardButton({ validateConsent }) {
  const handleClick = (e) => {
    if (!validateConsent()) {
      e.preventDefault();
    }
  };

  return (
    <>
      <button
        type="submit"
        onClick={handleClick}
        className="w-full bg-nano-success-100 hover:bg-nano-success-200 text-white font-bold py-3 px-4 rounded transition duration-300 text-sm shadow-md"
      >
        إكمال الشراء
      </button>
    </>
  );
}

export default CreditCardButton;