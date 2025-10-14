import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbTrail from "../../../components/ui/BreadcrumbTrail";
import ProfileHeader from "./components/ProfileHeader";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import EducationSection from "./components/EducationSection";
import AchievementsSection from "./components/AchievementsSection";
import PrivacyControls from "./components/PrivacyControls";

// Services
import { getUserProfileById } from "../../../lib/mongo/profileServices";

const PublicProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // mentor ID from route
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false); // Not owner for public profile

  const tabs = [
    { id: "about", label: "About", icon: "User" },
    { id: "experience", label: "Experience", icon: "Briefcase" },
    { id: "skills", label: "Skills", icon: "Award" },
    { id: "education", label: "Education", icon: "GraduationCap" },
    { id: "achievements", label: "Achievements", icon: "Trophy" },
    { id: "privacy", label: "Privacy", icon: "Shield" },
    { id: "mentorship", label: "Mentorship", icon: "Handshake" },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const fetchedProfile = await getUserProfileById(id);
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
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const renderTabContent = () => {
    if (!profileData) return null;
    switch (activeTab) {
      case "about":
        return <AboutSection data={profileData} isOwner={isOwner} />;
      case "experience":
        return (
          <ExperienceSection
            experiences={profileData.experiences}
            isOwner={isOwner}
          />
        );
      case "skills":
        return <SkillsSection skills={profileData.skills} isOwner={isOwner} />;
      case "education":
        return (
          <EducationSection
            education={profileData.education}
            isOwner={isOwner}
          />
        );
      case "achievements":
        return (
          <AchievementsSection
            achievements={profileData.achievements}
            isOwner={isOwner}
          />
        );
      case "privacy":
        return (
          <PrivacyControls
            settings={profileData.privacySettings}
            isOwner={isOwner}
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

export default PublicProfile;
