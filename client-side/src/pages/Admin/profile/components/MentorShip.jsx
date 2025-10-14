import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPendingMenteeRequests,
  handleMenteeRequest,
  getMentorshipDashboard,
} from "../../../../lib/mongo/mentorServices";

const MentorShip = ({ isOwner }) => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedMentees, setApprovedMentees] = useState([]);
  const [rejectedMentees, setRejectedMentees] = useState([]);
  const [totalMentees, setTotalMentees] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch dashboard data
  const fetchDashboard = async () => {
    setLoading(true);
    try {
      // Fetch pending requests
      const pendingData = await getPendingMenteeRequests();
      setPendingRequests(pendingData.pendingRequests || []);

      // Fetch mentorship dashboard stats
      const dashboardData = await getMentorshipDashboard();
      setApprovedMentees(dashboardData.approved || []);
      setRejectedMentees(dashboardData.rejected || []);
      setTotalMentees(dashboardData.totalMentees || 0);
    } catch (err) {
      console.error(err);
      setError("Failed to load mentorship data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOwner) fetchDashboard();
  }, [isOwner]);

  const handleAction = async (studentId, action) => {
    setActionLoading(true);
    try {
      await handleMenteeRequest({ studentId, action });
      // Remove handled request from pending
      setPendingRequests((prev) =>
        prev.filter((req) => req.userId._id !== studentId)
      );

      // Update dashboard counts
      if (action === "approve") {
        const approvedUser = pendingRequests.find(
          (req) => req.userId._id === studentId
        );
        setApprovedMentees((prev) => [...prev, approvedUser]);
      } else if (action === "reject") {
        const rejectedUser = pendingRequests.find(
          (req) => req.userId._id === studentId
        );
        setRejectedMentees((prev) => [...prev, rejectedUser]);
      }
      setTotalMentees((prev) => prev + (action === "approve" ? 1 : 0));
    } catch (err) {
      console.error(err);
      setError(`Failed to ${action} request`);
    } finally {
      setActionLoading(false);
    }
  };

  const visitProfile = (studentId) => {
    navigate(`/users/view/${studentId}`);
  };

  if (!isOwner) return <div>You cannot manage mentorship requests.</div>;
  if (loading) return <div>Loading mentorship data...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Dashboard Stats */}
      <div className="flex space-x-6 mb-6">
        <div className="p-4 border rounded w-40 text-center">
          <p className="text-gray-500 text-sm">Total Mentees</p>
          <p className="text-xl font-bold">{totalMentees}</p>
        </div>
        <div className="p-4 border rounded w-40 text-center">
          <p className="text-gray-500 text-sm">Approved</p>
          <p className="text-xl font-bold">{approvedMentees.length}</p>
        </div>
        <div className="p-4 border rounded w-40 text-center">
          <p className="text-gray-500 text-sm">Pending</p>
          <p className="text-xl font-bold">{pendingRequests.length}</p>
        </div>
        <div className="p-4 border rounded w-40 text-center">
          <p className="text-gray-500 text-sm">Rejected</p>
          <p className="text-xl font-bold">{rejectedMentees.length}</p>
        </div>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Pending Mentee Requests</h3>
          <ul className="space-y-4">
            {pendingRequests.map((req) => (
              <li
                key={req._id}
                className="flex items-center justify-between p-4 border rounded"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={req.userId.avatar || "/default-avatar.png"}
                    alt={req.userId.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{req.userId.name}</p>
                    <p className="text-sm text-gray-500">{req.userId.role}</p>
                    <p className="text-sm text-gray-500">{req.userId.email}</p>
                    <p className="text-sm text-gray-400">
                      Requested at:{" "}
                      {new Date(req.requestedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    disabled={actionLoading}
                    onClick={() => handleAction(req.userId._id, "approve")}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    disabled={actionLoading}
                    onClick={() => handleAction(req.userId._id, "reject")}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => visitProfile(req.userId._id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View Profile
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Approved Mentees */}
      {approvedMentees.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Approved Mentees</h3>
          <ul className="space-y-2">
            {approvedMentees.map((req) => (
              <li
                key={req._id}
                className="flex items-center justify-between p-2 border rounded"
              >
                <p>{req.userId.name}</p>
                <button
                  onClick={() => visitProfile(req.userId._id)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View Profile
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Rejected Mentees */}
      {rejectedMentees.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Rejected Mentees</h3>
          <ul className="space-y-2">
            {rejectedMentees.map((req) => (
              <li
                key={req._id}
                className="flex items-center justify-between p-2 border rounded"
              >
                <p>{req.userId.name}</p>
                <button
                  onClick={() => visitProfile(req.userId._id)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View Profile
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MentorShip;
