
const PaymentHeader = ({ onCreatePayment }) => {
  return (
    <div className="mb-6 text-center">
      <h1 className="text-2xl font-bold tracking-wide text-sky-600 uppercase">
        View Payment
      </h1>
      <p className="text-sm font-medium text-sky-500">
        (Generate Payment report for a certain duration)
      </p>

      <div className="mt-4 border-t pt-4">
        <h2 className="text-sm font-semibold text-gray-700 tracking-wider uppercase mb-3">
          Payment
        </h2>
        <button
          onClick={onCreatePayment}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition-colors"
        >
          Create Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentHeader;
