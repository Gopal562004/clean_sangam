import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Button from "../../../../components/ui/Button";
import AppImage from "../../../../components/AppImage";
import { sendMenteeRequest } from "../../../../lib/mongo/mentorServices";
import { useAuth } from "../../../../context/AuthContext"; // assuming you have this

const ProfileHeader = ({
  user,
  isOwner,
  isEditing,
  onPhotoUpload,
  onEditToggle,
  onSave,
  onCancel,
  onMessage,
}) => {
  const { user: currentUser } = useAuth(); // current logged-in user
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [requestError, setRequestError] = useState(null);

  // Check if request already sent on profile load
  useEffect(() => {
    if (user?.mentees && currentUser?.id) {
      const alreadySent = user.mentees.some(
        (m) => m.userId.toString() === currentUser.id
      );
      setRequestSent(alreadySent);
    }
  }, [user, currentUser]);

  const joinedDate = user?.joinedDate
    ? format(new Date(user.joinedDate), "MMMM yyyy")
    : "";

  const currentPosition = user?.currentPosition || "";
  const company = user?.company || "";
  const location = user?.location || "Not specified";
  const department = user?.department || "Not specified";
  const graduationYear = user?.education?.length
    ? new Date(user.education[user.education.length - 1].endDate).getFullYear()
    : "N/A";
  const skills = user?.skills || [];
  const experiences = user?.experiences || [];
  const achievements = user?.achievements || [];

  const totalEndorsements = skills.reduce(
    (sum, skill) => sum + (skill?.endorsements || 0),
    0
  );

  const handleConnectionRequest = async () => {
    setRequestLoading(true);
    setRequestError(null);
    try {
      await sendMenteeRequest(user._id); // backend toggle
      setRequestSent((prev) => !prev); // toggle locally
    } catch (err) {
      console.error(err);
      setRequestError(err || "Failed to send/withdraw request");
    } finally {
      setRequestLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-lg elevation-2 overflow-hidden">
      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-r from-primary to-secondary"></div>

      {/* Profile Content */}
      <div className="relative px-6 pb-6">
        {/* Profile Photo */}
        <div className="absolute -top-16 left-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-card bg-card overflow-hidden">
              <AppImage
                src={user?.avatar}
                alt={user?.name}
                className="w-full h-full object-cover"
                fallbackText={user?.name?.substring(0, 2)}
              />
            </div>
            {isOwner && (
              <button
                onClick={onPhotoUpload}
                className="absolute bottom-2 right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                aria-label="Change profile photo"
              >
                📷
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end pt-4 space-x-3">
          {isOwner ? (
            isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={onCancel}>
                  Cancel
                </Button>
                <Button variant="default" size="sm" onClick={onSave}>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={onEditToggle}
                iconName="Edit"
                iconPosition="left"
              >
                Edit Profile
              </Button>
            )
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onMessage}
                iconName="MessageCircle"
                iconPosition="left"
              >
                Message
              </Button>

              {/* Only show Connect/Withdraw if the user is a mentor */}
              {user?.mentorshipPreferences?.isMentor && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleConnectionRequest}
                  iconName="UserPlus"
                  iconPosition="left"
                  disabled={requestLoading}
                >
                  {requestSent ? "Withdraw" : "Connect"}
                </Button>
              )}

              {requestError && (
                <span className="text-red-600 ml-2">{requestError}</span>
              )}
            </>
          )}
        </div>

        {/* Profile Info */}
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-text-primary">{user?.name}</h1>
          <p className="text-lg text-text-secondary mt-1">
            {currentPosition} at {company}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-text-secondary">
            <span>📍 {location}</span>
            <span>
              🎓 {department} • Class of {graduationYear}
            </span>
            <span>📅 Joined {joinedDate}</span>
          </div>

          {/* Contact Links */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            {user?.email && user?.privacySettings?.contactInfoVisible && (
              <a
                href={`mailto:${user.email}`}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                📧 {user.email}
              </a>
            )}
            {user?.phone && user?.privacySettings?.contactInfoVisible && (
              <a
                href={`tel:${user.phone}`}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                📞 {user.phone}
              </a>
            )}
            {user?.linkedin && (
              <a
                href={user.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                💼 LinkedIn
              </a>
            )}
            {user?.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                🌐 Website
              </a>
            )}
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">
                {experiences.length}
              </div>
              <div className="text-sm text-text-secondary">Experiences</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">
                {skills.length}
              </div>
              <div className="text-sm text-text-secondary">Skills</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">
                {achievements.length}
              </div>
              <div className="text-sm text-text-secondary">Achievements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">
                {totalEndorsements}
              </div>
              <div className="text-sm text-text-secondary">Endorsements</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
