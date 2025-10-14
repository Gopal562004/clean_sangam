// import React, { useState, useEffect } from "react";
// import Button from "../../../../components/ui/Button";
// import Icon from "../../../../components/AppIcon";
// import { BiDollar } from "react-icons/bi";
// import { User, Mail, CreditCard } from "lucide-react";
// import { useAuth } from "../../../../context/AuthContext";
// import {
//   donateToCampaign,
//   quickDonate,
// } from "../../../../lib/mongo/donationServices";
// import { toast } from "react-hot-toast";

// const DonateModal = ({
//   isOpen,
//   onClose,
//   campaign,
//   initialAmount,
//   onConfirm,
// }) => {
//   const { user } = useAuth();
//   const [amount, setAmount] = useState(initialAmount || "");
//   const [loading, setLoading] = useState(false);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   useEffect(() => setAmount(initialAmount || ""), [initialAmount]);

//   if (!isOpen) return null;

//   const handleDonate = () => {
//     if (!amount || amount <= 0) {
//       toast.error("Please enter a valid amount");
//       return;
//     }
//     setShowConfirmation(true);
//   };

//   const confirmPayment = async () => {
//     setShowConfirmation(false);
//     setLoading(true);

//     try {
//       let result;
//       let donationTarget = campaign._id
//         ? campaign.title
//         : campaign.category || "General Fund";

//       if (campaign._id) {
//         result = await donateToCampaign(campaign._id, amount);
//       } else {
//         result = await quickDonate({
//           amount,
//           category: campaign.category || "general",
//           message: `For ${campaign.category || "general"} fund`,
//         });
//       }

//       // Show animation
//       setPaymentSuccess(true);

//       // Wait 2s for animation before closing
//       setTimeout(() => {
//         setPaymentSuccess(false);
//         onConfirm?.(campaign._id || null, amount, result); // call only after animation
//         onClose(); // close modal after animation
//       }, 2000);
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Donation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
//         {/* Close */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//         >
//           <Icon name="X" size={20} />
//         </button>

//         <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//           Donate to {campaign.title || campaign.category || "Quick Donation"}
//         </h2>
//         <p className="text-sm text-gray-500 mb-6">
//           Your contribution helps make a difference!
//         </p>

//         {/* Amount */}
//         <div className="flex flex-col mb-4">
//           <label className="text-sm font-medium text-gray-700 mb-1">
//             Amount
//           </label>
//           <div className="flex items-center border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
//             <BiDollar size={22} className="ml-3 text-gray-500" />
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="w-full p-2 outline-none"
//               placeholder="Enter donation amount"
//               min="1"
//             />
//           </div>
//         </div>

//         {/* Name */}
//         <div className="flex flex-col mb-4">
//           <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
//           <div className="flex items-center border border-border rounded-lg bg-gray-100 overflow-hidden">
//             <User size={20} className="ml-3 text-gray-500" />
//             <input
//               type="text"
//               value={user?.name || ""}
//               className="w-full p-2 outline-none bg-gray-100 cursor-not-allowed"
//               readOnly
//             />
//           </div>
//         </div>

//         {/* Email */}
//         <div className="flex flex-col mb-4">
//           <label className="text-sm font-medium text-gray-700 mb-1">
//             Email
//           </label>
//           <div className="flex items-center border border-border rounded-lg bg-gray-100 overflow-hidden">
//             <Mail size={20} className="ml-3 text-gray-500" />
//             <input
//               type="email"
//               value={user?.email || ""}
//               className="w-full p-2 outline-none bg-gray-100 cursor-not-allowed"
//               readOnly
//             />
//           </div>
//         </div>

//         {/* Payment Method */}
//         <div className="flex flex-col mb-4">
//           <label className="text-sm font-medium text-gray-700 mb-1">
//             Payment Method
//           </label>
//           <div className="flex items-center border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
//             <CreditCard size={20} className="ml-3 text-gray-500" />
//             <select
//               value="credit"
//               className="w-full p-2 outline-none cursor-not-allowed bg-gray-100"
//               disabled
//             >
//               <option value="credit">Credit Card (demo)</option>
//             </select>
//           </div>
//         </div>

//         <Button
//           className="mt-6 w-full bg-primary text-white hover:bg-primary/90 transition-colors"
//           onClick={handleDonate}
//           loading={loading}
//         >
//           {loading ? "Processing..." : "Confirm Donation"}
//         </Button>

//         {/* Confirmation Modal */}
//         {showConfirmation && (
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-xl p-6 w-80 shadow-lg text-center">
//               <h3 className="text-lg font-semibold mb-4">Confirm Donation</h3>
//               <p className="mb-4">
//                 Are you sure you want to donate <strong>${amount}</strong> to{" "}
//                 {campaign.title || campaign.category || "this fund"}?
//               </p>
//               <div className="flex justify-between space-x-3">
//                 <Button
//                   variant="outline"
//                   onClick={() => setShowConfirmation(false)}
//                 >
//                   Cancel
//                 </Button>
//                 <Button onClick={confirmPayment}>Confirm</Button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Payment Success Animation */}
//         {paymentSuccess && (
//           <div className="absolute inset-0 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-full shadow-lg flex flex-col items-center animate-ping">
//               <Icon name="Check" size={40} className="text-green-500 mb-2" />
//               <span className="text-green-500 font-semibold">
//                 Donated ${amount} to {campaign.title || campaign.category}!
//               </span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DonateModal;
import React, { useState, useEffect } from "react";
import Button from "../../../../components/ui/Button";
import Icon from "../../../../components/AppIcon";
import { BiDollar } from "react-icons/bi";
import { User, Mail, CreditCard } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import {
  donateToCampaign,
  quickDonate,
} from "../../../../lib/mongo/donationServices";
import { toast } from "react-hot-toast";

const DonateModal = ({
  isOpen,
  onClose,
  campaign,
  initialAmount,
  onConfirm,
}) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState(initialAmount || "");
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => setAmount(initialAmount || ""), [initialAmount]);

  if (!isOpen) return null;

  const handleDonate = () => {
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    setShowConfirmation(true);
  };

const confirmPayment = async () => {
  if (loading) return; // prevent double clicks
  setLoading(true);
  setShowConfirmation(false);

  try {
    let result;
    if (campaign._id) {
      result = await donateToCampaign(campaign._id, amount);
    } else {
      result = await quickDonate({
        amount,
        category: campaign.category || "general",
        message: `For ${campaign.category || "general"} fund`,
      });
    }

    setPaymentSuccess(true);

    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        setFadeOut(false);
        onConfirm?.(campaign._id || null, amount, result);
        onClose();
      }, 300);
    }, 500);
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Donation failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <Icon name="X" size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Donate to {campaign.title || campaign.category || "Quick Donation"}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Your contribution helps make a difference!
        </p>

        {/* Amount */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="flex items-center border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
            <BiDollar size={22} className="ml-3 text-gray-500" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 outline-none"
              placeholder="Enter donation amount"
              min="1"
            />
          </div>
        </div>

        {/* Name */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
          <div className="flex items-center border border-border rounded-lg bg-gray-100 overflow-hidden">
            <User size={20} className="ml-3 text-gray-500" />
            <input
              type="text"
              value={user?.name || ""}
              className="w-full p-2 outline-none bg-gray-100 cursor-not-allowed"
              readOnly
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="flex items-center border border-border rounded-lg bg-gray-100 overflow-hidden">
            <Mail size={20} className="ml-3 text-gray-500" />
            <input
              type="email"
              value={user?.email || ""}
              className="w-full p-2 outline-none bg-gray-100 cursor-not-allowed"
              readOnly
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <CreditCard size={20} className="ml-3 text-gray-500" />
            <select
              value="credit"
              className="w-full p-2 outline-none cursor-not-allowed bg-gray-100"
              disabled
            >
              <option value="credit">Credit Card (demo)</option>
            </select>
          </div>
        </div>

        <Button
          className="mt-6 w-full bg-primary text-white hover:bg-primary/90 transition-colors"
          onClick={handleDonate}
          loading={loading}
        >
          {loading ? "Processing..." : "Confirm Donation"}
        </Button>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-80 shadow-lg text-center">
              <h3 className="text-lg font-semibold mb-4">Confirm Donation</h3>
              <p className="mb-4">
                Are you sure you want to donate <strong>${amount}</strong> to{" "}
                {campaign.title || campaign.category || "this fund"}?
              </p>
              <div className="flex justify-between space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </Button>
                <Button onClick={confirmPayment}>Confirm</Button>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Payment Success Animation */}
        {paymentSuccess && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
            <div
              className={`bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center transition-all duration-500 ${
                fadeOut ? "opacity-0 scale-90" : "opacity-100 scale-100"
              }`}
            >
              <Icon name="Check" size={40} className="text-green-500 mb-2" />
              <span className="text-green-600 font-semibold text-center">
                Donated ${amount} to {campaign.title || campaign.category}!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonateModal;
