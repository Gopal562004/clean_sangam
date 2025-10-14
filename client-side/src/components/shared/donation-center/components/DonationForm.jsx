import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Icon from "../../../components/AppIcon";

const DonationForm = ({ onSubmit, onClose, categories }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetAmount: "",
    daysRemaining: "",
    category: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (
      !formData.targetAmount ||
      isNaN(formData.targetAmount) ||
      parseFloat(formData.targetAmount) <= 0
    ) {
      newErrors.targetAmount = "Enter a valid target amount";
    }
    if (
      !formData.daysRemaining ||
      isNaN(formData.daysRemaining) ||
      parseInt(formData.daysRemaining) <= 0
    ) {
      newErrors.daysRemaining = "Enter valid days remaining";
    }
    if (!formData.category) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      await onSubmit(formData); // Pass clean data to parent
    } catch (error) {
      console.error("Campaign creation error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface border border-border rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-border p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">
              Create Donation Campaign
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter campaign title"
            />
            {errors.title && (
              <p className="text-sm text-error">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-input rounded-md resize-none"
              rows="4"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the purpose of this campaign..."
            />
            {errors.description && (
              <p className="text-sm text-error">{errors.description}</p>
            )}
          </div>

          {/* Target Amount */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Target Amount ($)
            </label>
            <Input
              type="number"
              min="1"
              value={formData.targetAmount}
              onChange={(e) =>
                handleInputChange("targetAmount", e.target.value)
              }
              placeholder="Enter target amount"
            />
            {errors.targetAmount && (
              <p className="text-sm text-error">{errors.targetAmount}</p>
            )}
          </div>

          {/* Days Remaining */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Campaign Duration (days)
            </label>
            <Input
              type="number"
              min="1"
              value={formData.daysRemaining}
              onChange={(e) =>
                handleInputChange("daysRemaining", e.target.value)
              }
              placeholder="Enter number of days"
            />
            {errors.daysRemaining && (
              <p className="text-sm text-error">{errors.daysRemaining}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select
              value={formData.category}
              onChange={(value) => handleInputChange("category", value)}
              options={
                categories || [
                  { value: "education", label: "Education" },
                  { value: "health", label: "Health" },
                  { value: "environment", label: "Environment" },
                  { value: "others", label: "Others" },
                ]
              }
            />
            {errors.category && (
              <p className="text-sm text-error">{errors.category}</p>
            )}
          </div>

          {/* Image (optional) */}
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <Input
              type="text"
              value={formData.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              placeholder="Paste image URL"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-3 pt-4">
            <Button
              type="submit"
              disabled={isProcessing}
              loading={isProcessing}
              iconName="PlusCircle"
              iconPosition="left"
              className="flex-1"
            >
              {isProcessing ? "Creating..." : "Create Campaign"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;
