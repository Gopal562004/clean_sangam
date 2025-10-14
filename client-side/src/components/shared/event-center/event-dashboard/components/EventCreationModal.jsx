// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import Icon from "../../../../AppIcon";
// import Button from "../../../../ui/Button";
// import Input from "../../../../ui/Input";
// import Select from "../../../../ui/Select";

// const EventCreationModal = ({ isOpen, onClose, onCreateEvent }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     mode: "",
//     date: "",
//     time: "",
//     location: "",
//     capacity: "",
//     category: "",
//     banner: null,
//     guests: [{ name: "", role: "" }],
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const modeOptions = [
//     { value: "online", label: "Online" },
//     { value: "offline", label: "Offline" },
//     { value: "hybrid", label: "Hybrid" },
//   ];

//   const categoryOptions = [
//     { value: "technology", label: "Technology" },
//     { value: "business", label: "Business" },
//     { value: "education", label: "Education" },
//     { value: "networking", label: "Networking" },
//     { value: "workshop", label: "Workshop" },
//     { value: "conference", label: "Conference" },
//     { value: "seminar", label: "Seminar" },
//     { value: "webinar", label: "Webinar" },
//   ];

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     if (errors?.[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
//   };

//   const handleGuestChange = (index, field, value) => {
//     const updatedGuests = [...formData.guests];
//     updatedGuests[index][field] = value;
//     setFormData((prev) => ({ ...prev, guests: updatedGuests }));
//   };

//   const addGuest = () =>
//     setFormData((prev) => ({
//       ...prev,
//       guests: [...prev.guests, { name: "", role: "" }],
//     }));

//   const removeGuest = (index) =>
//     setFormData((prev) => ({
//       ...prev,
//       guests: prev.guests.filter((_, i) => i !== index),
//     }));

//   const handleFileChange = (e) => {
//     const file = e?.target?.files?.[0];
//     if (file) setFormData((prev) => ({ ...prev, banner: file }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.title.trim()) newErrors.title = "Event title is required";
//     if (!formData.description.trim())
//       newErrors.description = "Event description is required";
//     if (!formData.mode) newErrors.mode = "Event mode is required";
//     if (!formData.date) newErrors.date = "Event date is required";
//     if (!formData.time) newErrors.time = "Event time is required";
//     if (!formData.capacity || formData.capacity < 1)
//       newErrors.capacity = "Valid capacity is required";
//     if (!formData.category) newErrors.category = "Event category is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     try {
//       const newEvent = {
//         _id: Date.now(),
//         ...formData,
//         banner: formData.banner
//           ? URL.createObjectURL(formData.banner)
//           : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
//         status: "pending",
//         registeredCount: 0,
//         attendedCount: 0,
//         createdAt: new Date().toISOString(),
//         tags: [formData.category, formData.mode],
//       };

//       await onCreateEvent(newEvent);
//       handleClose();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleClose = () => {
//     setFormData({
//       title: "",
//       description: "",
//       mode: "",
//       date: "",
//       time: "",
//       location: "",
//       capacity: "",
//       category: "",
//       banner: null,
//       guests: [{ name: "", role: "" }],
//     });
//     setErrors({});
//     setIsSubmitting(false);
//     onClose();
//   };

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) handleClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in"
//       onClick={handleBackdropClick}
//     >
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         transition={{ duration: 0.2 }}
//         className="relative w-full max-w-2xl mx-4 bg-card rounded-xl shadow-xl max-h-[85vh] overflow-hidden"
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-border">
//           <h2 className="text-xl font-semibold flex items-center">
//             <Icon name="PlusCircle" size={24} className="mr-2" />
//             Create New Event
//           </h2>
//           <Button variant="ghost" size="icon" onClick={handleClose}>
//             <Icon name="X" size={20} />
//           </Button>
//         </div>

//         {/* Modal Content */}
//         <div className="overflow-y-auto max-h-[calc(85vh-140px)] p-6 space-y-6">
//           <Input
//             label="Event Title"
//             value={formData.title}
//             onChange={(e) => handleInputChange("title", e.target.value)}
//             error={errors.title}
//           />
//           <textarea
//             placeholder="Event Description"
//             value={formData.description}
//             onChange={(e) => handleInputChange("description", e.target.value)}
//             rows={4}
//             className={`w-full px-3 py-2 border rounded-md text-sm ${
//               errors.description ? "border-destructive" : "border-border"
//             }`}
//           />
//           <Select
//             label="Mode"
//             options={modeOptions}
//             value={formData.mode}
//             onChange={(val) => handleInputChange("mode", val)}
//             error={errors.mode}
//           />
//           <Select
//             label="Category"
//             options={categoryOptions}
//             value={formData.category}
//             onChange={(val) => handleInputChange("category", val)}
//             error={errors.category}
//           />
//           <Input
//             type="date"
//             label="Date"
//             value={formData.date}
//             onChange={(e) => handleInputChange("date", e.target.value)}
//             error={errors.date}
//           />
//           <Input
//             type="time"
//             label="Time"
//             value={formData.time}
//             onChange={(e) => handleInputChange("time", e.target.value)}
//             error={errors.time}
//           />
//           <Input
//             label="Location"
//             value={formData.location}
//             onChange={(e) => handleInputChange("location", e.target.value)}
//           />
//           <Input
//             type="number"
//             label="Capacity"
//             value={formData.capacity}
//             onChange={(e) =>
//               handleInputChange("capacity", parseInt(e.target.value))
//             }
//             error={errors.capacity}
//           />
//           <div>
//             <label className="block mb-2 text-sm font-medium">Banner</label>
//             <input type="file" onChange={handleFileChange} />
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
//           <Button
//             variant="outline"
//             onClick={handleClose}
//             disabled={isSubmitting}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="default"
//             onClick={handleSubmit}
//             loading={isSubmitting}
//             iconName="PlusCircle"
//             iconPosition="left"
//           >
//             Create Event
//           </Button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default EventCreationModal;
import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../../AppIcon";
import Button from "../../../../ui/Button";
import Input from "../../../../ui/Input";
import Select from "../../../../ui/Select";

const EventCreationModal = ({ isOpen, onClose, onCreateEvent }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mode: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    category: "",
    banner: null,
    guests: [{ name: "", role: "" }],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modeOptions = [
    { value: "online", label: "Online" },
    { value: "offline", label: "Offline" },
    { value: "hybrid", label: "Hybrid" },
  ];

  const categoryOptions = [
    { value: "technology", label: "Technology" },
    { value: "business", label: "Business" },
    { value: "education", label: "Education" },
    { value: "networking", label: "Networking" },
    { value: "workshop", label: "Workshop" },
    { value: "conference", label: "Conference" },
    { value: "seminar", label: "Seminar" },
    { value: "webinar", label: "Webinar" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setFormData((prev) => ({ ...prev, banner: file }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Event title is required";
    if (!formData.description.trim())
      newErrors.description = "Event description is required";
    if (!formData.mode) newErrors.mode = "Select a mode";
    if (!formData.date) newErrors.date = "Select a date";
    if (!formData.time) newErrors.time = "Select a time";
    if (!formData.capacity || formData.capacity < 1)
      newErrors.capacity = "Enter valid capacity";
    if (!formData.category) newErrors.category = "Select a category";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const newEvent = {
        _id: Date.now().toString(),
        ...formData,
        banner: formData.banner
          ? URL.createObjectURL(formData.banner)
          : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
        status: "pending",
        registeredCount: 0,
        attendedCount: 0,
        createdAt: new Date().toISOString(),
        tags: [formData.category, formData.mode],
      };

      await onCreateEvent(newEvent);
      handleClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      mode: "",
      date: "",
      time: "",
      location: "",
      capacity: "",
      category: "",
      banner: null,
      guests: [{ name: "", role: "" }],
    });
    setErrors({});
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-2xl mx-4 bg-card rounded-xl shadow-xl max-h-[85vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold flex items-center">
            <Icon name="PlusCircle" size={24} className="mr-2" />
            Create New Event
          </h2>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto max-h-[calc(85vh-140px)] p-6 space-y-6">
          <Input
            label="Event Title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            error={errors.title}
          />
          <textarea
            placeholder="Event Description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={4}
            className={`w-full px-3 py-2 rounded-md text-sm border ${
              errors.description ? "border-red-500" : "border-border"
            }`}
          />
          <Select
            label="Mode"
            options={modeOptions}
            value={formData.mode}
            onChange={(val) => handleInputChange("mode", val)}
            error={errors.mode}
          />
          <Select
            label="Category"
            options={categoryOptions}
            value={formData.category}
            onChange={(val) => handleInputChange("category", val)}
            error={errors.category}
          />
          <Input
            type="date"
            label="Date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            error={errors.date}
          />
          <Input
            type="time"
            label="Time"
            value={formData.time}
            onChange={(e) => handleInputChange("time", e.target.value)}
            error={errors.time}
          />
          <Input
            label="Location"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
          <Input
            type="number"
            label="Capacity"
            value={formData.capacity}
            onChange={(e) =>
              handleInputChange("capacity", parseInt(e.target.value))
            }
            error={errors.capacity}
          />
          <div>
            <label className="block mb-2 text-sm font-medium">Banner</label>
            <input type="file" onChange={handleFileChange} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            loading={isSubmitting}
            iconName="PlusCircle"
            iconPosition="left"
          >
            Create Event
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default EventCreationModal;
