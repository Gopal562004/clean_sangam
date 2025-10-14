import React, { useState } from "react";
import Button from "../../../../components/ui/Button";
import { File, Image, Calendar, Tag, X } from "lucide-react";
import { BiMoney } from "react-icons/bi";

const validCategories = [
  "general",
  "scholarship",
  "emergency",
  "infrastructure",
  "Education",
  "Health",
  "Environment",
  "Community Development",
  "others",
];

const CreateCampaignModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [daysRemaining, setDaysRemaining] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTargetAmount("");
    setDaysRemaining("");
    setCategory("");
    setImage(null);
  };

  const handleSubmit = () => {
    if (
      !title ||
      !description ||
      !targetAmount ||
      !daysRemaining ||
      !category
    ) {
      alert("Please fill in all required fields!");
      return;
    }

    const payload = {
      title,
      description,
      targetAmount: Number(targetAmount),
      daysRemaining: Number(daysRemaining),
      category,
      image: image ? image.name : "",
    };

    onSubmit(payload);
    resetForm(); // ✅ Clear the form after submit
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto scrollbar-hide">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative transform transition-transform duration-300 scale-100 mx-4 my-6">
        {/* Close Button */}
        <button
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Create New Campaign
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Fill in the details to launch your campaign.
        </p>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-hide">
          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Tag size={18} className="mr-2 text-gray-500" />
              Campaign Title <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-1.5 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
              placeholder="Enter campaign title"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <File size={18} className="mr-2 text-gray-500" />
              Description <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-1.5 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none text-sm"
              rows={3}
              placeholder="Describe your campaign"
            />
          </div>

          {/* Target Amount */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <BiMoney size={18} className="mr-2 text-gray-500" />
              Target Amount (USD) <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="w-full p-1.5 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
              placeholder="Enter target amount"
            />
          </div>

          {/* Days Remaining */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Calendar size={18} className="mr-2 text-gray-500" />
              Days Remaining <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              value={daysRemaining}
              onChange={(e) => setDaysRemaining(e.target.value)}
              className="w-full p-1.5 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
              placeholder="Enter number of days"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Tag size={18} className="mr-2 text-gray-500" /> Category{" "}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-1.5 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
            >
              <option value="">Select Category</option>
              {validCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Image size={18} className="mr-2 text-gray-500" /> Campaign Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-border rounded-lg p-1.5 cursor-pointer text-sm"
            />
            {image && (
              <p className="text-xs text-gray-500 mt-1">{image.name}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          className="mt-6 w-full bg-primary text-white hover:bg-primary/90 transition-colors"
          onClick={handleSubmit}
        >
          Create Campaign
        </Button>
      </div>
    </div>
  );
};

export default CreateCampaignModal;
