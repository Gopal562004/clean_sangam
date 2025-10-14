import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/shared/Header";
import BreadcrumbTrail from "../../../components/ui/BreadcrumbTrail";
import ProfileHeader from "./components/ProfileHeader";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import EducationSection from "./components/EducationSection";
import AchievementsSection from "./components/AchievementsSection";
import PrivacyControls from "./components/PrivacyControls";
import MentorShip from "./components/MentorShip";

// Services
import {
  getUserProfile,
  updateUserProfile,
} from "../../../lib/mongo/profileServices";

const RecruiterProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isOwner, setIsOwner] = useState(true); // Adjust based on logged-in user

  const tabs = [
    { id: "about", label: "About", icon: "User" },
    { id: "experience", label: "Experience", icon: "Briefcase" },
    { id: "skills", label: "Skills", icon: "Award" },
    { id: "education", label: "Education", icon: "GraduationCap" },
    { id: "achievements", label: "Achievements", icon: "Trophy" },
    { id: "privacy", label: "Privacy", icon: "Shield" },
    {id:"mentorship", label:"Mentorship", icon:"Handshake"}
  ];

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const fetchedProfile = await getUserProfile(); // Call your API
        setUser(fetchedProfile.user);

        setProfileData({
          bio: fetchedProfile.user.bio || "",
          currentPosition: fetchedProfile.user.currentPosition || "",
          company: fetchedProfile.user.company || "",
          skills: fetchedProfile.user.skills || [],
          experiences: fetchedProfile.user.experiences || [],
          education: fetchedProfile.user.education || [],
          achievements: fetchedProfile.user.achievements || [],
          mentorshipPreferences: fetchedProfile.user.mentorshipPreferences || {
            available: false,
            isMentor: false,
            topics: [],
            meetingFrequency: "Monthly",
            preferredFormat: "Virtual",
          },
          privacySettings: fetchedProfile.user.privacySettings || {
            profileVisibility: "private",
            contactInfoVisible: true,
            experienceVisible: true,
            educationVisible: true,
            skillsVisible: true,
            achievementsVisible: true,
          },
        });
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handlePhotoUpload = () => {
    if (!isOwner) return;
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      console.log("File selected:", file);
      // TODO: upload to backend and update profile
    }
  };

  const handleEditToggle = () => {
    if (!isOwner) return;
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const updated = await updateUserProfile(profileData);
      setProfileData(updated.user);
      setIsEditing(false);
    } catch (err) {
      console.error("Update profile error:", err);
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => setIsEditing(false);

  const handleUpdateProfileData = (section, data) => {
    setProfileData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };
  


  const renderTabContent = () => {
    if (!profileData) return null;

    switch (activeTab) {
      case "about":
        return (
          <AboutSection
            data={profileData}
            isEditing={isEditing}
            isOwner={isOwner}
            onUpdate={(data) => handleUpdateProfileData("bio", data?.bio)}
            onUpdatePosition={(data) => {
              handleUpdateProfileData("currentPosition", data?.currentPosition);
              handleUpdateProfileData("company", data?.company);
            }}
          />
        );
      case "experience":
        return (
          <ExperienceSection
            experiences={profileData?.experiences}
            isEditing={isEditing}
            isOwner={isOwner}
            onUpdate={(experiences) =>
              handleUpdateProfileData("experiences", experiences)
            }
          />
        );
      case "skills":
        return (
          <SkillsSection
            skills={profileData?.skills}
            isEditing={isEditing}
            isOwner={isOwner}
            onUpdate={(skills) => handleUpdateProfileData("skills", skills)}
          />
        );
      case "education":
        return (
          <EducationSection
            education={profileData?.education}
            isEditing={isEditing}
            isOwner={isOwner}
            onUpdate={(education) =>
              handleUpdateProfileData("education", education)
            }
          />
        );
      case "achievements":
        return (
          <AchievementsSection
            achievements={profileData?.achievements}
            isEditing={isEditing}
            isOwner={isOwner}
            onUpdate={(achievements) =>
              handleUpdateProfileData("achievements", achievements)
            }
          />
        );
      case "privacy":
        return (
          <PrivacyControls
            settings={profileData?.privacySettings}
            mentorshipPreferences={profileData?.mentorshipPreferences}
            isOwner={isOwner}
            onUpdatePrivacy={(settings) =>
              handleUpdateProfileData("privacySettings", settings)
            }
            onUpdateMentorship={(mentorship) =>
              handleUpdateProfileData("mentorshipPreferences", mentorship)
            }
          />
        );
      case "mentorship":
        return (
          <MentorShip
            mentorshipPreferences={profileData?.mentorshipPreferences}
            isEditing={isEditing}
            isOwner={isOwner}
            onUpdate={(mentorshipPreferences) =>
              handleUpdateProfileData("mentorshipPreferences", mentorshipPreferences)
            }
            
          />
        );
      default:
        return null;
    }
  };

  if (loading) return <div className="p-4">Loading profile...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbTrail user={user} />

        <ProfileHeader
          user={user}
          profileData={profileData}
          isOwner={isOwner}
          isEditing={isEditing}
          onPhotoUpload={handlePhotoUpload}
          onEditToggle={handleEditToggle}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="mt-8">
          <div className="border-b border-border">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-text-secondary hover:text-text-primary hover:border-border"
                  }`}
                >
                  <span className="mr-2">
                    {tab.icon === "User" && "👤"}
                    {tab.icon === "Briefcase" && "💼"}
                    {tab.icon === "Award" && "🏆"}
                    {tab.icon === "GraduationCap" && "🎓"}
                    {tab.icon === "Trophy" && "🏅"}
                    {tab.icon === "Shield" && "🛡️"}
                  </span>
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="mt-8">{renderTabContent()}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterProfile;
