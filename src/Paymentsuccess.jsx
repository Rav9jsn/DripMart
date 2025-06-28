import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaRegCopy } from "react-icons/fa6";

const PaymentSuccess = () => {
  const location = useLocation();
  const [reference, setReference] = useState(null);
  const [error, setError] = useState(null);
  const textRef = useRef(null);
 const handleCopy = () => {
  if (!reference) return;

  navigator.clipboard.writeText(reference)
    .then(() => {
      
    })
    .catch((err) => {
      console.error("Failed to copy text:", err);
    });
};

  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const ref = searchParams.get("reference");
      setReference(ref);
    } catch (err) {
      console.error("Error parsing payment reference:", err);
      setError("Something went wrong while retrieving payment details.");
    }
  }, [location]);

  return (
    <div className="flex h-screen flex-col justify-center items-center gap-6 px-4 text-center">
      <div className="text-green-600 text-6xl font-bold">✓</div>
      <h1 className="text-3xl font-bold text-gray-800">Payment Successful</h1>
      <p className="text-gray-600 text-lg">
        Thank you! Your payment has been processed successfully.
      </p>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {!error && reference && (
        <p className="text-sm flex gap-2 text-gray-500">
          Reference No: <span  ref={textRef} className="font-semibold">{reference}
 </span>
 <FaRegCopy className="cursor-pointer " onClick={()=>handleCopy()} />
        </p>
      )}

      <Link
        to="/"
        className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;
