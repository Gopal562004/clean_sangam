import React from "react";
import { GraduationCap, Building, FileText, Calendar } from "lucide-react";
import InputWithIcon from "./InputWithIcon";

const EducationSection = ({ show, formData, onChange, errors }) => {
  if (!show) return null;

  return (
    <div className="space-y-4 p-6 bg-blue-50 rounded-lg border-2 border-blue-200 transition-all duration-500 ease-in-out">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-900">
            Education Information
          </h3>
          <p className="text-sm text-blue-700">
            Please provide your educational background
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWithIcon
          type="text"
          placeholder="Institution Name"
          icon={Building}
          value={formData?.institution}
          onChange={(value) => onChange("institution", value)}
          error={errors?.institution}
          required
          rightIcon={null}
          onRightIconClick={() => {}}
          className=""
        />
        <InputWithIcon
          type="text"
          placeholder="Degree (e.g., Bachelor's, Master's)"
          icon={GraduationCap}
          value={formData?.degree}
          onChange={(value) => onChange("degree", value)}
          error={errors?.degree}
          required
          rightIcon={null}
          onRightIconClick={() => {}}
          className=""
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWithIcon
          type="text"
          placeholder="Field of Study"
          icon={FileText}
          value={formData?.field}
          onChange={(value) => onChange("field", value)}
          error={errors?.field}
          required
          rightIcon={null}
          onRightIconClick={() => {}}
          className=""
        />
        <InputWithIcon
          type="text"
          placeholder="Enrollment Number"
          icon={FileText}
          value={formData?.enrollmentNumber}
          onChange={(value) => onChange("enrollmentNumber", value)}
          error={errors?.enrollmentNumber}
          required
          rightIcon={null}
          onRightIconClick={() => {}}
          className=""
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Start Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={formData?.startDate}
              onChange={(e) => onChange("startDate", e?.target?.value)}
              className={`w-full h-12 pl-11 pr-4 border rounded-lg text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors?.startDate
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
              required
            />
          </div>
          {errors?.startDate && (
            <p className="text-sm text-red-600">{errors?.startDate}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            End Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={formData?.endDate}
              onChange={(e) => onChange("endDate", e?.target?.value)}
              className={`w-full h-12 pl-11 pr-4 border rounded-lg text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors?.endDate
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
              required
            />
          </div>
          {errors?.endDate && (
            <p className="text-sm text-red-600">{errors?.endDate}</p>
          )}
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-100 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This information helps us tailor your
          experience and connect you with relevant opportunities.
        </p>
      </div>
    </div>
  );
};

export default EducationSection;
