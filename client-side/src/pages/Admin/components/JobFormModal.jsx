import React, { useState, useEffect } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Icon from "../../../components/AppIcon";

const JobFormModal = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: { name: "", logo: "", description: "", size: "", industry: "" },
    location: "",
    employmentType: "Full-time",
    remote: false,
    urgent: false,
    salary: { min: "", max: "" },
    description: "",
    keyRequirements: "",
    requirements: "",
    benefits: "",
    category: "",
    tags: "",
    status: "pending",
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        keyRequirements: initialData.keyRequirements?.join(", ") || "",
        requirements: initialData.requirements?.join(", ") || "",
        benefits: initialData.benefits?.join(", ") || "",
        tags: initialData.tags?.join(", ") || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("company.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        company: { ...prev.company, [key]: value },
      }));
    } else if (name.includes("salary.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        salary: { ...prev.salary, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      keyRequirements: formData.keyRequirements
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      requirements: formData.requirements
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      benefits: formData.benefits
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      tags: formData.tags
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
    };
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md max-h-[80vh] p-4 flex flex-col relative">
        {/* Exit Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <Icon name="X" className="w-5 h-5" />
        </button>

        <h3 className="text-base font-semibold mb-3 pr-6">
          {initialData ? "Edit Job" : "Post a New Job"}
        </h3>

        {/* Scrollable form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-3 text-sm overflow-y-auto pr-2 scrollbar-hide"
        >
          <Input
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Input
            label="Company Name"
            name="company.name"
            value={formData.company.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <Input
            label="Employment Type"
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Salary Min"
              name="salary.min"
              type="number"
              value={formData.salary.min}
              onChange={handleChange}
            />
            <Input
              label="Salary Max"
              name="salary.max"
              type="number"
              value={formData.salary.max}
              onChange={handleChange}
            />
          </div>
          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Input
            label="Key Requirements (comma separated)"
            name="keyRequirements"
            value={formData.keyRequirements}
            onChange={handleChange}
          />
          <Input
            label="Requirements (comma separated)"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
          />
          <Input
            label="Benefits (comma separated)"
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
          />
          <Input
            label="Tags (comma separated)"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-2 mt-3">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="default" size="sm">
              {initialData ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobFormModal;
