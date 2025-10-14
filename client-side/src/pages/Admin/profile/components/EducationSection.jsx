import React, { useState } from "react";
import { format } from "date-fns";
import Button from "../../../../components/ui/Button";

const EducationSection = ({ education, isEditing, isOwner, onUpdate }) => {
  const [editEducation, setEditEducation] = useState(education || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  const degreeTypes = [
    "School / High School",
    "Junior College / Diploma",
    "Associate Degree",
    "Bachelor of Science",
    "Bachelor of Arts",
    "Bachelor of Engineering",
    "Master of Science",
    "Master of Arts",
    "Master of Business Administration",
    "Doctor of Philosophy",
    "Juris Doctor",
    "Other",
  ];

  const emptyEducation = {
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    gpa: "",
    honors: [""],
    relevantCoursework: [""],
  };

  const handleAddEducation = (newEdu) => {
    const updated = [
      ...editEducation,
      {
        ...newEdu,
        id: Date.now(),
        honors: newEdu.honors.filter(Boolean),
        relevantCoursework: newEdu.relevantCoursework.filter(Boolean),
      },
    ];
    setEditEducation(updated);
    onUpdate(updated);
    setShowAddForm(false);
  };

  const handleUpdateEducation = (index, updatedEdu) => {
    const updated = [...editEducation];
    updated[index] = {
      ...updatedEdu,
      honors: updatedEdu.honors.filter(Boolean),
      relevantCoursework: updatedEdu.relevantCoursework.filter(Boolean),
    };
    setEditEducation(updated);
    onUpdate(updated);
    setEditingIndex(-1);
  };

  const handleDeleteEducation = (index) => {
    const updated = editEducation.filter((_, i) => i !== index);
    setEditEducation(updated);
    onUpdate(updated);
  };

  const formatDateRange = (start, end) => {
    if (!start) return "Present";
    const startYear = format(new Date(start), "yyyy");
    const endYear = end ? format(new Date(end), "yyyy") : "Present";
    return `${startYear} - ${endYear}`;
  };

  const EducationForm = ({ data, onSave, onCancel }) => {
    const [formData, setFormData] = useState(data);

    const handleChange = (field, value) =>
      setFormData((prev) => ({ ...prev, [field]: value }));

    const handleArrayChange = (field, index, value) => {
      const arr = [...formData[field]];
      arr[index] = value;
      setFormData((prev) => ({ ...prev, [field]: arr }));
    };

    const addArrayItem = (field) =>
      setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
    const removeArrayItem = (field, index) => {
      const arr = formData[field].filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, [field]: arr }));
    };

    return (
      <div className="bg-muted rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-text-primary">
              Institution
            </label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => handleChange("institution", e.target.value)}
              placeholder="e.g., Stanford University"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary">
              Degree
            </label>
            <select
              value={formData.degree}
              onChange={(e) => handleChange("degree", e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">Select degree type</option>
              {degreeTypes.map((deg) => (
                <option key={deg} value={deg}>
                  {deg}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary">
              Field of Study
            </label>
            <input
              type="text"
              value={formData.field}
              onChange={(e) => handleChange("field", e.target.value)}
              placeholder="e.g., Computer Science"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary">
              GPA (Optional)
            </label>
            <input
              type="text"
              value={formData.gpa}
              onChange={(e) => handleChange("gpa", e.target.value)}
              placeholder="e.g., 3.8"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary">
              Start Date
            </label>
            <input
              type="month"
              value={formData.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary">
              End Date
            </label>
            <input
              type="month"
              value={formData.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {/* Honors */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-text-primary">
              Honors & Awards
            </label>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={() => addArrayItem("honors")}
            >
              Add
            </Button>
          </div>
          {formData.honors.map((honor, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={honor}
                onChange={(e) =>
                  handleArrayChange("honors", idx, e.target.value)
                }
                placeholder="e.g., Dean's List"
                className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeArrayItem("honors", idx)}
              >
                X
              </Button>
            </div>
          ))}
        </div>

        {/* Relevant Coursework */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-text-primary">
              Relevant Coursework
            </label>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={() => addArrayItem("relevantCoursework")}
            >
              Add
            </Button>
          </div>
          {formData.relevantCoursework.map((course, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={course}
                onChange={(e) =>
                  handleArrayChange("relevantCoursework", idx, e.target.value)
                }
                placeholder="e.g., Data Structures & Algorithms"
                className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeArrayItem("relevantCoursework", idx)}
              >
                X
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSave(formData)}>Save</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-text-primary">Education</h2>
        {isEditing && isOwner && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddForm(true)}
          >
            Add Education
          </Button>
        )}
      </div>

      {showAddForm && (
        <EducationForm
          data={emptyEducation}
          onSave={handleAddEducation}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editEducation.map((edu, idx) => (
        <div
          key={edu.id || idx}
          className="border border-border rounded-lg p-4 mb-4"
        >
          {editingIndex === idx ? (
            <EducationForm
              data={edu}
              onSave={(data) => handleUpdateEducation(idx, data)}
              onCancel={() => setEditingIndex(-1)}
            />
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-text-primary">
                  {edu.degree} in {edu.field}
                </h3>
                <p className="text-text-secondary">{edu.institution}</p>
                <p className="text-sm text-text-secondary">
                  {formatDateRange(edu.startDate, edu.endDate)}{" "}
                  {edu.gpa && `• GPA: ${edu.gpa}`}
                </p>
                {edu.honors?.length > 0 && (
                  <p className="text-xs mt-1">
                    Honors: {edu.honors.join(", ")}
                  </p>
                )}
                {edu.relevantCoursework?.length > 0 && (
                  <p className="text-xs mt-1">
                    Coursework: {edu.relevantCoursework.join(", ")}
                  </p>
                )}
              </div>
              {isEditing && isOwner && (
                <div className="flex gap-2">
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => setEditingIndex(idx)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => handleDeleteEducation(idx)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {!editEducation.length && !showAddForm && (
        <p className="text-text-secondary">
          No education information added yet.
        </p>
      )}
    </div>
  );
};

export default EducationSection;
