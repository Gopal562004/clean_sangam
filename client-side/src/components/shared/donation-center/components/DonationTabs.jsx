// import React, { useState } from "react";
// import Button from "../../../../components/ui/Button";
// import Icon from "../../../../components/AppIcon";

// const DonationTabs = ({
//   donationHistory = [],
//   recurringDonations = [],
//   taxDocuments = [],
//   totalPerCampaign = [],
//   totalQuick = { totalAmount: 0, transactionCount: 0 },
//   userTotalDonations = 0,
//   onExportReceipts,
// }) => {
//   const [activeTab, setActiveTab] = useState("history");

//   const tabs = [
//     { id: "history", label: "Donation History", icon: "History" },
//     { id: "recurring", label: "Recurring Donations", icon: "Repeat" },
//     { id: "receipts", label: "Tax Documents", icon: "FileText" },
//   ];

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//     }).format(amount);

//   const formatDate = (dateString) =>
//     new Date(dateString)?.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       completed: { color: "bg-success/10 text-success", text: "Completed" },
//       pending: { color: "bg-warning/10 text-warning", text: "Pending" },
//       failed: { color: "bg-error/10 text-error", text: "Failed" },
//       active: { color: "bg-success/10 text-success", text: "Active" },
//       paused: { color: "bg-error/10 text-error", text: "Paused" },
//       available: { color: "bg-primary/10 text-primary", text: "Available" },
//     };
//     return statusConfig?.[status] || statusConfig.completed;
//   };

//   const renderDonations = (donations) =>
//     donations.map((donation) => {
//       const statusBadge = getStatusBadge(donation.status);
//       return (
//         <div
//           key={donation._id}
//           className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:bg-card transition-colors duration-200"
//         >
//           <div>
//             <h4 className="font-medium text-text-primary">
//               {donation.campaignName || donation.campaign}
//             </h4>
//             <div className="text-sm text-text-secondary">
//               {formatDate(donation.date)} | Receipt: {donation.receipt || "-"}
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="font-semibold text-text-primary">
//               {formatCurrency(donation.amount)}
//             </div>
//             <span
//               className={`inline-block px-2 py-1 rounded-full text-xs ${statusBadge.color}`}
//             >
//               {statusBadge.text}
//             </span>
//           </div>
//         </div>
//       );
//     });

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "recurring":
//         if (!recurringDonations.length)
//           return (
//             <div className="text-center py-8">
//               <Icon
//                 name="Repeat"
//                 size={48}
//                 className="mx-auto text-text-secondary mb-4"
//               />
//               <h3 className="text-lg font-semibold text-text-primary mb-2">
//                 No Recurring Donations
//               </h3>
//             </div>
//           );
//         return recurringDonations.map((donation) => {
//           const statusBadge = getStatusBadge(donation.status);
//           return (
//             <div
//               key={donation.id}
//               className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
//             >
//               <div>
//                 <h4 className="font-medium text-text-primary">
//                   {donation.campaign}
//                 </h4>
//                 <div className="text-sm text-text-secondary">
//                   {formatCurrency(donation.amount)} / {donation.frequency} |
//                   Next: {formatDate(donation.nextPayment)}
//                 </div>
//               </div>
//               <span
//                 className={`inline-block px-2 py-1 rounded-full text-xs ${statusBadge.color}`}
//               >
//                 {statusBadge.text}
//               </span>
//             </div>
//           );
//         });

//       case "receipts":
//         if (!taxDocuments.length)
//           return (
//             <p className="text-center text-text-secondary">
//               No tax documents available.
//             </p>
//           );

//         return (
//           <div className="space-y-3">
//             {taxDocuments.map((doc) => (
//               <div
//                 key={doc.id}
//                 className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
//               >
//                 <div>
//                   <h4 className="font-medium text-text-primary">
//                     Tax Year {doc.year}
//                   </h4>
//                   <div className="text-sm text-text-secondary">
//                     Total Donation: {formatCurrency(doc.totalDonation)} •{" "}
//                     {doc.documentCount} receipts
//                   </div>
//                 </div>
//                 <div className="flex space-x-2">
//                   <Button variant="outline" size="sm" iconName="Eye">
//                     View
//                   </Button>
//                   <Button variant="outline" size="sm" iconName="Download">
//                     Download
//                   </Button>
//                 </div>
//               </div>
//             ))}
//             <div className="bg-info/10 border border-info/20 rounded-lg p-4">
//               <div className="flex items-start space-x-3">
//                 <Icon name="Info" size={16} className="text-info mt-0.5" />
//                 <div>
//                   <h4 className="font-medium text-text-primary mb-1">
//                     Tax Deduction Information
//                   </h4>
//                   <p className="text-sm text-text-secondary">
//                     Your donations are tax-deductible to the full extent allowed
//                     by law.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <Button
//               variant="outline"
//               size="sm"
//               iconName="Download"
//               onClick={onExportReceipts}
//             >
//               Export All
//             </Button>
//           </div>
//         );

//       default:
//         return (
//           <div className="space-y-6">
//             <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-border">
//               <h4 className="font-semibold text-text-primary mb-2">
//                 Total Donations
//               </h4>
//               <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
//                 {totalPerCampaign.map((c) => (
//                   <div key={c.campaign}>
//                     {c.campaign}: {formatCurrency(c.totalAmount)} (
//                     {c.transactionCount} tx)
//                   </div>
//                 ))}
//                 <div>
//                   Quick Donations: {formatCurrency(totalQuick.totalAmount)} (
//                   {totalQuick.transactionCount} tx)
//                 </div>
//                 <div className="font-medium text-text-primary">
//                   Grand Total: {formatCurrency(userTotalDonations)}
//                 </div>
//               </div>
//             </div>
//             {donationHistory.length ? (
//               renderDonations(donationHistory)
//             ) : (
//               <p className="text-center text-text-secondary">
//                 No donations yet.
//               </p>
//             )}
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="bg-card rounded-lg border border-border overflow-hidden">
//       <div className="border-b border-border">
//         <nav className="flex space-x-8 px-6">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
//                 activeTab === tab.id
//                   ? "border-primary text-primary"
//                   : "border-transparent text-text-secondary hover:text-text-primary"
//               }`}
//             >
//               <Icon name={tab.icon} size={16} />
//               <span>{tab.label}</span>
//             </button>
//           ))}
//         </nav>
//       </div>
//       <div className="p-6">{renderTabContent()}</div>
//     </div>
//   );
// };

// export default DonationTabs;
import React, { useState } from "react";
import Button from "../../../../components/ui/Button";
import Icon from "../../../../components/AppIcon";

const DonationTabs = ({
  donationHistory = [],
  recurringDonations = [],
  taxDocuments = [],
  totalPerCampaign = [],
  totalQuick = { totalAmount: 0, transactionCount: 0 },
  userTotalDonations = 0,
  onExportReceipts,
}) => {
  const [activeTab, setActiveTab] = useState("history");

  const tabs = [
    { id: "history", label: "Donation History", icon: "History" },
    { id: "recurring", label: "Recurring Donations", icon: "Repeat" },
    { id: "receipts", label: "Tax Documents", icon: "FileText" },
  ];

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateString) =>
    new Date(dateString)?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: "bg-success/10 text-success", text: "Completed" },
      pending: { color: "bg-warning/10 text-warning", text: "Pending" },
      failed: { color: "bg-error/10 text-error", text: "Failed" },
      active: { color: "bg-success/10 text-success", text: "Active" },
      paused: { color: "bg-error/10 text-error", text: "Paused" },
      available: { color: "bg-primary/10 text-primary", text: "Available" },
    };
    return statusConfig?.[status] || statusConfig.completed;
  };

  const renderDonations = (donations) =>
    donations.map((donation) => {
      const statusBadge = getStatusBadge(donation.status);
      return (
        <div
          key={donation._id}
          className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:bg-card transition-colors duration-200"
        >
          <div>
            <h4 className="font-medium text-text-primary">
              {donation.campaignName || donation.campaign}
            </h4>
            <div className="text-sm text-text-secondary">
              {formatDate(donation.date)} | Receipt: {donation.receipt || "-"}
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-text-primary">
              {formatCurrency(donation.amount)}
            </div>
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs ${statusBadge.color}`}
            >
              {statusBadge.text}
            </span>
          </div>
        </div>
      );
    });

  const renderTabContent = () => {
    switch (activeTab) {
      case "recurring":
        if (!recurringDonations.length)
          return (
            <div className="text-center py-8">
              <Icon
                name="Repeat"
                size={48}
                className="mx-auto text-text-secondary mb-4"
              />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                No Recurring Donations
              </h3>
            </div>
          );

        const recurringContainerClass =
          recurringDonations.length > 3
            ? "max-h-[400px] overflow-y-auto scrollbar-hide space-y-4"
            : "space-y-4";

        return (
          <div className={recurringContainerClass}>
            {recurringDonations.map((donation) => {
              const statusBadge = getStatusBadge(donation.status);
              return (
                <div
                  key={donation.id}
                  className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
                >
                  <div>
                    <h4 className="font-medium text-text-primary">
                      {donation.campaign}
                    </h4>
                    <div className="text-sm text-text-secondary">
                      {formatCurrency(donation.amount)} / {donation.frequency} |
                      Next: {formatDate(donation.nextPayment)}
                    </div>
                  </div>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${statusBadge.color}`}
                  >
                    {statusBadge.text}
                  </span>
                </div>
              );
            })}
          </div>
        );

      case "receipts":
        if (!taxDocuments.length)
          return (
            <p className="text-center text-text-secondary">
              No tax documents available.
            </p>
          );

        return (
          <div className="space-y-3">
            {taxDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
              >
                <div>
                  <h4 className="font-medium text-text-primary">
                    Tax Year {doc.year}
                  </h4>
                  <div className="text-sm text-text-secondary">
                    Total Donation: {formatCurrency(doc.totalDonation)} •{" "}
                    {doc.documentCount} receipts
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" iconName="Eye">
                    View
                  </Button>
                  <Button variant="outline" size="sm" iconName="Download">
                    Download
                  </Button>
                </div>
              </div>
            ))}
            <div className="bg-info/10 border border-info/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-info mt-0.5" />
                <div>
                  <h4 className="font-medium text-text-primary mb-1">
                    Tax Deduction Information
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Your donations are tax-deductible to the full extent allowed
                    by law.
                  </p>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={onExportReceipts}
            >
              Export All
            </Button>
          </div>
        );

      default:
        const historyContainerClass =
          donationHistory.length > 3
            ? "max-h-[400px] overflow-y-auto scrollbar-hide space-y-4"
            : "space-y-4";

        return (
          <div>
            <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-border">
              <h4 className="font-semibold text-text-primary mb-2">
                Total Donations
              </h4>
              <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
                {totalPerCampaign.map((c) => (
                  <div key={c.campaign}>
                    {c.campaign}: {formatCurrency(c.totalAmount)} (
                    {c.transactionCount} tx)
                  </div>
                ))}
                <div>
                  Quick Donations: {formatCurrency(totalQuick.totalAmount)} (
                  {totalQuick.transactionCount} tx)
                </div>
                <div className="font-medium text-text-primary">
                  Grand Total: {formatCurrency(userTotalDonations)}
                </div>
              </div>
            </div>
            <div className={historyContainerClass}>
              {donationHistory.length ? (
                renderDonations(donationHistory)
              ) : (
                <p className="text-center text-text-secondary">
                  No donations yet.
                </p>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="p-6">{renderTabContent()}</div>
    </div>
  );
};

export default DonationTabs;
