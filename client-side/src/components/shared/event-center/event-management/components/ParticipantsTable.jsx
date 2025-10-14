import React, { useState, useMemo } from "react";
import Icon from "../../../../AppIcon";
import Button from "../../../../ui/Button";

const ParticipantsTable = ({
  participants = [],
  onUpdateAttendance = () => {},
}) => {
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  const filteredAndSortedParticipants = useMemo(() => {
    let filtered = participants?.filter((participant) => {
      const matchesSearch =
        participant?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        participant?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesFilter =
        filterStatus === "all" ||
        (filterStatus === "attended" && participant?.attended) ||
        (filterStatus === "not-attended" && !participant?.attended);
      return matchesSearch && matchesFilter;
    });

    return filtered?.sort((a, b) => {
      let aValue = a?.[sortField];
      let bValue = b?.[sortField];

      if (typeof aValue === "string") {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [participants, sortField, sortDirection, filterStatus, searchTerm]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectAll = () => {
    if (
      selectedParticipants?.length === filteredAndSortedParticipants?.length
    ) {
      setSelectedParticipants([]);
    } else {
      setSelectedParticipants(filteredAndSortedParticipants?.map((p) => p?.id));
    }
  };

  const handleSelectParticipant = (participantId) => {
    setSelectedParticipants((prev) =>
      prev?.includes(participantId)
        ? prev?.filter((id) => id !== participantId)
        : [...prev, participantId]
    );
  };

  const handleBulkAttendance = (attended) => {
    selectedParticipants?.forEach((participantId) => {
      onUpdateAttendance(participantId, attended);
    });
    setSelectedParticipants([]);
  };

  const exportData = () => {
    const csvContent = [
      ["Name", "Email", "Role", "Registration Date", "Attendance Status"],
      ...filteredAndSortedParticipants?.map((p) => [
        p?.name,
        p?.email,
        p?.role,
        p?.registrationDate,
        p?.attended ? "Attended" : "Not Attended",
      ]),
    ]
      ?.map((row) => row?.join(","))
      ?.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "participants.csv";
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  const attendedCount = participants?.filter((p) => p?.attended)?.length;
  const totalCount = participants?.length;

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Event Participants
          </h3>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Total: {totalCount}</span>
            <span>Attended: {attendedCount}</span>
            <span>Pending: {totalCount - attendedCount}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" size="sm" onClick={exportData}>
            <Icon name="Download" size={16} className="mr-2" />
            Export CSV
          </Button>
        </div>
      </div>
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search participants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Status</option>
            <option value="attended">Attended</option>
            <option value="not-attended">Not Attended</option>
          </select>
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedParticipants?.length > 0 && (
        <div className="flex items-center justify-between bg-muted rounded-lg p-4 mb-4">
          <span className="text-sm text-foreground">
            {selectedParticipants?.length} participant(s) selected
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAttendance(true)}
            >
              <Icon name="CheckCircle" size={16} className="mr-2" />
              Mark Attended
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAttendance(false)}
            >
              <Icon name="XCircle" size={16} className="mr-2" />
              Mark Not Attended
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedParticipants([])}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>
      )}
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">
                <input
                  type="checkbox"
                  checked={
                    selectedParticipants?.length ===
                      filteredAndSortedParticipants?.length &&
                    filteredAndSortedParticipants?.length > 0
                  }
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Name</span>
                  <Icon
                    name={
                      sortField === "name"
                        ? sortDirection === "asc"
                          ? "ChevronUp"
                          : "ChevronDown"
                        : "ChevronsUpDown"
                    }
                    size={14}
                  />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort("email")}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Email</span>
                  <Icon
                    name={
                      sortField === "email"
                        ? sortDirection === "asc"
                          ? "ChevronUp"
                          : "ChevronDown"
                        : "ChevronsUpDown"
                    }
                    size={14}
                  />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort("role")}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Role</span>
                  <Icon
                    name={
                      sortField === "role"
                        ? sortDirection === "asc"
                          ? "ChevronUp"
                          : "ChevronDown"
                        : "ChevronsUpDown"
                    }
                    size={14}
                  />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-foreground">
                  Registration Date
                </span>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-foreground">
                  Status
                </span>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-foreground">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedParticipants?.map((participant) => (
              <tr
                key={participant?.id}
                className="border-b border-border hover:bg-muted/50"
              >
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedParticipants?.includes(participant?.id)}
                    onChange={() => handleSelectParticipant(participant?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-foreground">
                    {participant?.name}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-muted-foreground">
                    {participant?.email}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                    {participant?.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="text-muted-foreground">
                    {participant?.registrationDate}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    {participant?.attended ? (
                      <>
                        <Icon
                          name="CheckCircle"
                          size={16}
                          className="text-success"
                        />
                        <span className="text-success text-sm">Attended</span>
                      </>
                    ) : (
                      <>
                        <Icon
                          name="XCircle"
                          size={16}
                          className="text-muted-foreground"
                        />
                        <span className="text-muted-foreground text-sm">
                          Not Attended
                        </span>
                      </>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        onUpdateAttendance(
                          participant?.id,
                          !participant?.attended
                        )
                      }
                    >
                      <Icon
                        name={participant?.attended ? "XCircle" : "CheckCircle"}
                        size={16}
                      />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredAndSortedParticipants?.map((participant) => (
          <div
            key={participant?.id}
            className="bg-muted/30 rounded-lg p-4 border border-border"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedParticipants?.includes(participant?.id)}
                  onChange={() => handleSelectParticipant(participant?.id)}
                  className="rounded border-border"
                />
                <div>
                  <h4 className="font-medium text-foreground">
                    {participant?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {participant?.email}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  onUpdateAttendance(participant?.id, !participant?.attended)
                }
              >
                <Icon
                  name={participant?.attended ? "XCircle" : "CheckCircle"}
                  size={16}
                />
              </Button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                  {participant?.role}
                </span>
                <span className="text-muted-foreground">
                  {participant?.registrationDate}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {participant?.attended ? (
                  <>
                    <Icon
                      name="CheckCircle"
                      size={16}
                      className="text-success"
                    />
                    <span className="text-success text-sm">Attended</span>
                  </>
                ) : (
                  <>
                    <Icon
                      name="XCircle"
                      size={16}
                      className="text-muted-foreground"
                    />
                    <span className="text-muted-foreground text-sm">
                      Not Attended
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredAndSortedParticipants?.length === 0 && (
        <div className="text-center py-12">
          <Icon
            name="Users"
            size={48}
            className="mx-auto text-muted-foreground mb-4"
          />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No participants found
          </h3>
          <p className="text-muted-foreground">
            {searchTerm || filterStatus !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Participants will appear here once they register for your event."}
          </p>
        </div>
      )}
    </div>
  );
};

export default ParticipantsTable;
