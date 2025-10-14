import React, { useState } from "react";
import { format } from "date-fns";
import Button from "../../../../components/ui/Button";

const achievementCategories = [
  { value: "Award", label: "Award", icon: "🏆" },
  { value: "Competition", label: "Competition", icon: "🥇" },
  { value: "Certification", label: "Certification", icon: "📜" },
  { value: "Program", label: "Program", icon: "🎯" },
  { value: "Publication", label: "Publication", icon: "📚" },
  { value: "Project", label: "Project", icon: "🚀" },
  { value: "Recognition", label: "Recognition", icon: "⭐" },
  { value: "Other", label: "Other", icon: "💫" },
];

const getCategoryIcon = (category) => {
  const cat = achievementCategories.find((c) => c.value === category);
  return cat?.icon || "💫";
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return format(new Date(dateString), "MMM yyyy");
};

const AchievementForm = ({ achievement, onSave, onCancel, isNew }) => {
  const [formData, setFormData] = useState(achievement);

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="bg-muted rounded-lg p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-1">
            Achievement Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="e.g., First Place - University Hackathon 2024"
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            {achievementCategories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.icon} {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            placeholder="Describe your achievement..."
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(formData)}>
          {isNew ? "Add Achievement" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

const AchievementsSection = ({
  achievements,
  isEditing,
  isOwner,
  onUpdate,
}) => {
  const [editAchievements, setEditAchievements] = useState(achievements || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  const emptyAchievement = {
    title: "",
    date: "",
    description: "",
    category: "Award",
  };

  const handleAddAchievement = (achievement) => {
    const updated = [...editAchievements, { ...achievement, id: Date.now() }];
    setEditAchievements(updated);
    onUpdate(updated);
    setShowAddForm(false);
  };

  const handleUpdateAchievement = (index, achievement) => {
    const updated = [...editAchievements];
    updated[index] = achievement;
    setEditAchievements(updated);
    onUpdate(updated);
    setEditingIndex(-1);
  };

  const handleDeleteAchievement = (index) => {
    const updated = editAchievements.filter((_, i) => i !== index);
    setEditAchievements(updated);
    onUpdate(updated);
  };

  // === Render ===
  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          Achievements & Awards
        </h2>
        {isEditing && isOwner && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddForm(true)}
          >
            Add Achievement
          </Button>
        )}
      </div>

      {showAddForm && isEditing && isOwner && (
        <AchievementForm
          achievement={emptyAchievement}
          onSave={handleAddAchievement}
          onCancel={() => setShowAddForm(false)}
          isNew
        />
      )}

      <div className="space-y-6">
        {(editAchievements.length > 0 ? editAchievements : achievements)?.map(
          (achievement, idx) => (
            <div
              key={achievement.id}
              className="border border-border rounded-lg p-4"
            >
              {editingIndex === idx ? (
                <AchievementForm
                  achievement={achievement}
                  onSave={(data) => handleUpdateAchievement(idx, data)}
                  onCancel={() => setEditingIndex(-1)}
                />
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex gap-3 flex-1">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-lg">
                          {getCategoryIcon(achievement.category)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-text-primary">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {achievement.category} • {formatDate(achievement.date)}
                      </p>
                      {achievement.description && (
                        <p className="text-text-primary mt-2 text-sm leading-relaxed">
                          {achievement.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {isEditing && isOwner && (
                    <div className="flex space-x-2">
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
                        onClick={() => handleDeleteAchievement(idx)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        )}
      </div>

      {editAchievements.length === 0 && achievements.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🏆</div>
          <p className="text-text-secondary">
            {isOwner
              ? "Add your achievements and awards to showcase your accomplishments"
              : "No achievements available"}
          </p>
        </div>
      )}
    </div>
  );
};

export default AchievementsSection;
