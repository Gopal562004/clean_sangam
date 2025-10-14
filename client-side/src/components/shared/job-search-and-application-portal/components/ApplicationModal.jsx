
// // import React, { useState, useRef } from "react";
// // import Icon from "../../../AppIcon";
// // import Button from "../../../ui/Button";
// // import Input from "../../../ui/Input";
// // import { toast } from "react-hot-toast";

// // const ApplicationModal = ({ job, isOpen, onClose, onSubmit }) => {
// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     phone: "",
// //     coverLetter: "",
// //     resume: null,
// //     customAnswers: [],
// //   });
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [currentStep, setCurrentStep] = useState(1);
// //   const fileInputRef = useRef(null);

// //   const customQuestions = job?.customQuestions || [];

// //   const handleInputChange = (field, value) => {
// //     setFormData((prev) => ({ ...prev, [field]: value }));
// //   };

// //   const handleCustomAnswer = (questionId, answer) => {
// //     setFormData((prev) => {
// //       const existing = prev.customAnswers.find(
// //         (q) => q.questionId === questionId
// //       );
// //       const updatedAnswers = existing
// //         ? prev.customAnswers.map((q) =>
// //             q.questionId === questionId ? { questionId, answer } : q
// //           )
// //         : [...prev.customAnswers, { questionId, answer }];
// //       return { ...prev, customAnswers: updatedAnswers };
// //     });
// //   };

// //   const handleFileUpload = (event) => {
// //     const file = event?.target?.files?.[0];
// //     if (!file) return;

// //     if (file.size > 5 * 1024 * 1024) {
// //       toast.error("File size must be less than 5MB");
// //       return;
// //     }

// //     if (
// //       ![
// //         "application/pdf",
// //         "application/msword",
// //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
// //       ].includes(file.type)
// //     ) {
// //       toast.error("Please upload a PDF or Word document");
// //       return;
// //     }

// //     setFormData((prev) => ({ ...prev, resume: file }));
// //   };

// //   const isStepValid = (step) => {
// //     switch (step) {
// //       case 1:
// //         return (
// //           formData.firstName &&
// //           formData.lastName &&
// //           /\S+@\S+\.\S+/.test(formData.email) &&
// //           /^[0-9]{10}$/.test(formData.phone)
// //         );
// //       case 2:
// //         return !!formData.resume;
// //       case 3:
// //         const requiredQuestions = customQuestions.filter((q) => q.required);
// //         return requiredQuestions.every((q) =>
// //           formData.customAnswers.some(
// //             (a) => a.questionId === (q._id || q.id) && a.answer?.trim() !== ""
// //           )
// //         );
// //       default:
// //         return true;
// //     }
// //   };

// //   const handleNextOrSubmit = async () => {
// //     if (!isStepValid(currentStep)) return;

// //     if (currentStep < 3) {
// //       setCurrentStep(currentStep + 1);
// //     } else {
// //       try {
// //         setIsSubmitting(true);
// //         if (onSubmit) await onSubmit(formData); // send data to parent
// //       } catch (err) {
// //         console.error("Application submit failed:", err);
// //         toast.error(err?.message || "Failed to submit application");
// //       } finally {
// //         setIsSubmitting(false);
// //       }
// //     }
// //   };

// //   if (!isOpen || !job) return null;

// //   return (
// //     <div className="fixed inset-0 z-50 overflow-y-auto">
// //       <div
// //         className="fixed inset-0 bg-black bg-opacity-50"
// //         onClick={() => !isSubmitting && onClose()}
// //       />
// //       <div className="relative min-h-screen flex items-center justify-center p-4">
// //         <div className="relative bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl">
// //           {/* Header */}
// //           <div className="sticky top-0 bg-card border-b border-border p-6 z-10">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <h1 className="text-xl font-bold text-foreground">
// //                   Apply for {job?.title}
// //                 </h1>
// //                 <p className="text-sm text-muted-foreground mt-1">
// //                   {job?.company?.name} • {job?.location}
// //                 </p>
// //               </div>
// //               <button
// //                 onClick={onClose}
// //                 disabled={isSubmitting}
// //                 className="p-2 hover:bg-muted rounded-md transition-colors"
// //               >
// //                 <Icon name="X" size={20} className="text-muted-foreground" />
// //               </button>
// //             </div>

// //             {/* Progress Steps */}
// //             <div className="flex items-center justify-between mt-6">
// //               {[1, 2, 3].map((step) => (
// //                 <div key={step} className="flex items-center">
// //                   <div
// //                     className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
// //                       step === currentStep
// //                         ? "bg-primary text-primary-foreground"
// //                         : step < currentStep
// //                         ? "bg-success text-success-foreground"
// //                         : "bg-muted text-muted-foreground"
// //                     }`}
// //                   >
// //                     {step < currentStep ? (
// //                       <Icon name="Check" size={16} />
// //                     ) : (
// //                       step
// //                     )}
// //                   </div>
// //                   {step < 3 && (
// //                     <div
// //                       className={`w-16 h-0.5 mx-2 ${
// //                         step < currentStep ? "bg-success" : "bg-muted"
// //                       }`}
// //                     />
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //             <div className="flex justify-between text-sm text-muted-foreground mt-2">
// //               <span>Personal Info</span>
// //               <span>Resume</span>
// //               <span>Questions</span>
// //             </div>
// //           </div>

// //           {/* Content */}
// //           <div className="p-6 space-y-4">
// //             {/* Step 1 */}
// //             {currentStep === 1 && (
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-foreground mb-1">
// //                     First Name *
// //                   </label>
// //                   <Input
// //                     type="text"
// //                     value={formData.firstName}
// //                     onChange={(e) =>
// //                       handleInputChange("firstName", e.target.value)
// //                     }
// //                     placeholder="Enter your first name"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-foreground mb-1">
// //                     Last Name *
// //                   </label>
// //                   <Input
// //                     type="text"
// //                     value={formData.lastName}
// //                     onChange={(e) =>
// //                       handleInputChange("lastName", e.target.value)
// //                     }
// //                     placeholder="Enter your last name"
// //                   />
// //                 </div>
// //                 <div className="col-span-2">
// //                   <label className="block text-sm font-medium text-foreground mb-1">
// //                     Email *
// //                   </label>
// //                   <Input
// //                     type="email"
// //                     value={formData.email}
// //                     onChange={(e) => handleInputChange("email", e.target.value)}
// //                     placeholder="Enter your email"
// //                   />
// //                 </div>
// //                 <div className="col-span-2">
// //                   <label className="block text-sm font-medium text-foreground mb-1">
// //                     Phone *
// //                   </label>
// //                   <Input
// //                     type="tel"
// //                     value={formData.phone}
// //                     onChange={(e) => handleInputChange("phone", e.target.value)}
// //                     placeholder="Enter your phone"
// //                   />
// //                 </div>
// //               </div>
// //             )}

// //             {/* Step 2 */}
// //             {currentStep === 2 && (
// //               <>
// //                 <div>
// //                   <label className="block text-sm font-medium text-foreground mb-2">
// //                     Resume *
// //                   </label>
// //                   <div
// //                     onClick={() => fileInputRef?.current?.click()}
// //                     className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors"
// //                   >
// //                     {formData.resume ? (
// //                       <div className="space-y-2">
// //                         <Icon
// //                           name="FileText"
// //                           size={32}
// //                           className="text-success mx-auto"
// //                         />
// //                         <div className="text-sm font-medium text-foreground">
// //                           {formData.resume.name}
// //                         </div>
// //                         <div className="text-xs text-muted-foreground">
// //                           {(formData.resume.size / 1024 / 1024).toFixed(1)} MB
// //                         </div>
// //                         <Button
// //                           variant="outline"
// //                           size="sm"
// //                           onClick={(e) => {
// //                             e.stopPropagation();
// //                             setFormData((prev) => ({ ...prev, resume: null }));
// //                           }}
// //                         >
// //                           Remove
// //                         </Button>
// //                       </div>
// //                     ) : (
// //                       <div className="space-y-2">
// //                         <Icon
// //                           name="Upload"
// //                           size={32}
// //                           className="text-muted-foreground mx-auto"
// //                         />
// //                         <div className="text-sm font-medium text-foreground">
// //                           Click to upload your resume
// //                         </div>
// //                         <div className="text-xs text-muted-foreground">
// //                           PDF, DOC, or DOCX • Max 5MB
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>
// //                   <input
// //                     ref={fileInputRef}
// //                     type="file"
// //                     accept=".pdf,.doc,.docx"
// //                     onChange={handleFileUpload}
// //                     className="hidden"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-foreground mb-2">
// //                     Cover Letter (Optional)
// //                   </label>
// //                   <textarea
// //                     value={formData.coverLetter}
// //                     onChange={(e) =>
// //                       handleInputChange("coverLetter", e.target.value)
// //                     }
// //                     placeholder="Tell us why you're interested..."
// //                     rows={6}
// //                     className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
// //                   />
// //                 </div>
// //               </>
// //             )}

// //             {/* Step 3 */}
// //             {currentStep === 3 && (
// //               <div className="space-y-4">
// //                 {customQuestions.length === 0 && (
// //                   <p className="text-sm text-muted-foreground">
// //                     No additional questions for this job.
// //                   </p>
// //                 )}
// //                 {customQuestions.map((q) => {
// //                   const qId = q._id || q.id;
// //                   const answerObj = formData.customAnswers.find(
// //                     (a) => a.questionId === qId
// //                   );
// //                   const answerValue = answerObj?.answer || "";
// //                   return (
// //                     <div key={qId}>
// //                       <label className="block text-sm font-medium text-foreground mb-1">
// //                         {q.question} {q.required && "*"}
// //                       </label>
// //                       {q.type === "textarea" ? (
// //                         <textarea
// //                           rows={3}
// //                           value={answerValue}
// //                           onChange={(e) =>
// //                             handleCustomAnswer(qId, e.target.value)
// //                           }
// //                           className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
// //                         />
// //                       ) : (
// //                         <Input
// //                           type="text"
// //                           value={answerValue}
// //                           onChange={(e) =>
// //                             handleCustomAnswer(qId, e.target.value)
// //                           }
// //                         />
// //                       )}
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             )}
// //           </div>

// //           {/* Footer Buttons */}
// //           <div className="sticky bottom-0 bg-card border-t border-border p-6 flex justify-end space-x-2">
// //             <Button
// //               variant="outline"
// //               onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
// //               disabled={currentStep === 1 || isSubmitting}
// //             >
// //               Back
// //             </Button>
// //             <Button
// //               onClick={handleNextOrSubmit}
// //               disabled={!isStepValid(currentStep) || isSubmitting}
// //               loading={isSubmitting}
// //             >
// //               {currentStep < 3 ? "Next" : "Submit"}
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ApplicationModal;
// import React, { useState, useRef, useEffect } from "react";
// import Icon from "../../../AppIcon";
// import Button from "../../../ui/Button";
// import Input from "../../../ui/Input";
// import { toast } from "react-hot-toast";

// const ApplicationModal = ({ job, isOpen, onClose, onSubmit, userId }) => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     coverLetter: "",
//     resume: null,
//     customAnswers: [],
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [hasApplied, setHasApplied] = useState(false);
//   const fileInputRef = useRef(null);

//   const customQuestions = job?.customQuestions || [];

//   // Check if user already applied on modal open
//   useEffect(() => {
//     if (job?.applicants?.some((a) => a.userId === userId)) {
//       setHasApplied(true);
//     }
//   }, [job, userId]);

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleCustomAnswer = (questionId, answer) => {
//     setFormData((prev) => {
//       const existing = prev.customAnswers.find(
//         (q) => q.questionId === questionId
//       );
//       const updatedAnswers = existing
//         ? prev.customAnswers.map((q) =>
//             q.questionId === questionId ? { questionId, answer } : q
//           )
//         : [...prev.customAnswers, { questionId, answer }];
//       return { ...prev, customAnswers: updatedAnswers };
//     });
//   };

//   const handleFileUpload = (event) => {
//     const file = event?.target?.files?.[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("File size must be less than 5MB");
//       return;
//     }

//     if (
//       ![
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       ].includes(file.type)
//     ) {
//       toast.error("Please upload a PDF or Word document");
//       return;
//     }

//     setFormData((prev) => ({ ...prev, resume: file }));
//   };

//   const isStepValid = (step) => {
//     switch (step) {
//       case 1:
//         return (
//           formData.firstName &&
//           formData.lastName &&
//           /\S+@\S+\.\S+/.test(formData.email) &&
//           /^[0-9]{10}$/.test(formData.phone)
//         );
//       case 2:
//         return !!formData.resume;
//       case 3:
//         const requiredQuestions = customQuestions.filter((q) => q.required);
//         return requiredQuestions.every((q) =>
//           formData.customAnswers.some(
//             (a) => a.questionId === (q._id || q.id) && a.answer?.trim() !== ""
//           )
//         );
//       default:
//         return true;
//     }
//   };

//   const handleNextOrSubmit = async () => {
//     if (!isStepValid(currentStep)) return;

//     if (currentStep < 3) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       try {
//         setIsSubmitting(true);
//         if (onSubmit) await onSubmit(formData);
//         setHasApplied(true); // mark applied after success
//         toast.success("Application submitted successfully!");
//       } catch (err) {
//         if (err.response?.data?.message === "Already applied") {
//           setHasApplied(true); // mark applied if already applied
//           toast("You have already applied!");
//         } else {
//           console.error("Application submit failed:", err);
//           toast.error(err?.message || "Failed to submit application");
//         }
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   if (!isOpen || !job) return null;

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50"
//         onClick={() => !isSubmitting && onClose()}
//       />
//       <div className="relative min-h-screen flex items-center justify-center p-4">
//         <div className="relative bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl">
//           {/* Header */}
//           <div className="sticky top-0 bg-card border-b border-border p-6 z-10">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-xl font-bold text-foreground">
//                   Apply for {job?.title}
//                 </h1>
//                 <p className="text-sm text-muted-foreground mt-1">
//                   {job?.company?.name} • {job?.location}
//                 </p>
//               </div>
//               <button
//                 onClick={onClose}
//                 disabled={isSubmitting}
//                 className="p-2 hover:bg-muted rounded-md transition-colors"
//               >
//                 <Icon name="X" size={20} className="text-muted-foreground" />
//               </button>
//             </div>

//             {/* Progress Steps */}
//             <div className="flex items-center justify-between mt-6">
//               {[1, 2, 3].map((step) => (
//                 <div key={step} className="flex items-center">
//                   <div
//                     className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                       step === currentStep
//                         ? "bg-primary text-primary-foreground"
//                         : step < currentStep
//                         ? "bg-success text-success-foreground"
//                         : "bg-muted text-muted-foreground"
//                     }`}
//                   >
//                     {step < currentStep ? (
//                       <Icon name="Check" size={16} />
//                     ) : (
//                       step
//                     )}
//                   </div>
//                   {step < 3 && (
//                     <div
//                       className={`w-16 h-0.5 mx-2 ${
//                         step < currentStep ? "bg-success" : "bg-muted"
//                       }`}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-between text-sm text-muted-foreground mt-2">
//               <span>Personal Info</span>
//               <span>Resume</span>
//               <span>Questions</span>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="p-6 space-y-4">
//             {/* Step 1 */}
//             {currentStep === 1 && (
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-1">
//                     First Name *
//                   </label>
//                   <Input
//                     type="text"
//                     value={formData.firstName}
//                     onChange={(e) =>
//                       handleInputChange("firstName", e.target.value)
//                     }
//                     placeholder="Enter your first name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-1">
//                     Last Name *
//                   </label>
//                   <Input
//                     type="text"
//                     value={formData.lastName}
//                     onChange={(e) =>
//                       handleInputChange("lastName", e.target.value)
//                     }
//                     placeholder="Enter your last name"
//                   />
//                 </div>
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-foreground mb-1">
//                     Email *
//                   </label>
//                   <Input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     placeholder="Enter your email"
//                   />
//                 </div>
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-foreground mb-1">
//                     Phone *
//                   </label>
//                   <Input
//                     type="tel"
//                     value={formData.phone}
//                     onChange={(e) => handleInputChange("phone", e.target.value)}
//                     placeholder="Enter your phone"
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Step 2 */}
//             {currentStep === 2 && (
//               <>
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">
//                     Resume *
//                   </label>
//                   <div
//                     onClick={() => fileInputRef?.current?.click()}
//                     className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors"
//                   >
//                     {formData.resume ? (
//                       <div className="space-y-2">
//                         <Icon
//                           name="FileText"
//                           size={32}
//                           className="text-success mx-auto"
//                         />
//                         <div className="text-sm font-medium text-foreground">
//                           {formData.resume.name}
//                         </div>
//                         <div className="text-xs text-muted-foreground">
//                           {(formData.resume.size / 1024 / 1024).toFixed(1)} MB
//                         </div>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setFormData((prev) => ({ ...prev, resume: null }));
//                           }}
//                         >
//                           Remove
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="space-y-2">
//                         <Icon
//                           name="Upload"
//                           size={32}
//                           className="text-muted-foreground mx-auto"
//                         />
//                         <div className="text-sm font-medium text-foreground">
//                           Click to upload your resume
//                         </div>
//                         <div className="text-xs text-muted-foreground">
//                           PDF, DOC, or DOCX • Max 5MB
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept=".pdf,.doc,.docx"
//                     onChange={handleFileUpload}
//                     className="hidden"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">
//                     Cover Letter (Optional)
//                   </label>
//                   <textarea
//                     value={formData.coverLetter}
//                     onChange={(e) =>
//                       handleInputChange("coverLetter", e.target.value)
//                     }
//                     placeholder="Tell us why you're interested..."
//                     rows={6}
//                     className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
//                   />
//                 </div>
//               </>
//             )}

//             {/* Step 3 */}
//             {currentStep === 3 && (
//               <div className="space-y-4">
//                 {customQuestions.length === 0 && (
//                   <p className="text-sm text-muted-foreground">
//                     No additional questions for this job.
//                   </p>
//                 )}
//                 {customQuestions.map((q) => {
//                   const qId = q._id || q.id;
//                   const answerObj = formData.customAnswers.find(
//                     (a) => a.questionId === qId
//                   );
//                   const answerValue = answerObj?.answer || "";
//                   return (
//                     <div key={qId}>
//                       <label className="block text-sm font-medium text-foreground mb-1">
//                         {q.question} {q.required && "*"}
//                       </label>
//                       {q.type === "textarea" ? (
//                         <textarea
//                           rows={3}
//                           value={answerValue}
//                           onChange={(e) =>
//                             handleCustomAnswer(qId, e.target.value)
//                           }
//                           className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
//                         />
//                       ) : (
//                         <Input
//                           type="text"
//                           value={answerValue}
//                           onChange={(e) =>
//                             handleCustomAnswer(qId, e.target.value)
//                           }
//                         />
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* Footer Buttons */}
//           <div className="sticky bottom-0 bg-card border-t border-border p-6 flex justify-end space-x-2">
//             <Button
//               variant="outline"
//               onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
//               disabled={currentStep === 1 || isSubmitting || hasApplied}
//             >
//               Back
//             </Button>
//             <Button
//               onClick={handleNextOrSubmit}
//               disabled={!isStepValid(currentStep) || isSubmitting || hasApplied}
//               loading={isSubmitting}
//             >
//               {hasApplied ? (
//                 <div className="flex items-center space-x-1">
//                   <Icon name="Check" size={16} /> <span>Applied</span>
//                 </div>
//               ) : currentStep < 3 ? (
//                 "Next"
//               ) : (
//                 "Submit"
//               )}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplicationModal;
import React, { useState, useRef, useEffect } from "react";
import Icon from "../../../AppIcon";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import { toast } from "react-hot-toast";

const ApplicationModal = ({ job, isOpen, onClose, onSubmit, userId }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null,
    customAnswers: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [hasApplied, setHasApplied] = useState(false);
  const fileInputRef = useRef(null);

  const customQuestions = job?.customQuestions || [];

  // Check if user already applied
  useEffect(() => {
    if (job?.applicants?.some((a) => a.userId === userId)) {
      setHasApplied(true);
    }
  }, [job, userId]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCustomAnswer = (questionId, answer) => {
    setFormData((prev) => {
      const existing = prev.customAnswers.find(
        (q) => q.questionId === questionId
      );
      const updatedAnswers = existing
        ? prev.customAnswers.map((q) =>
            q.questionId === questionId ? { questionId, answer } : q
          )
        : [...prev.customAnswers, { questionId, answer }];
      return { ...prev, customAnswers: updatedAnswers };
    });
  };

  const handleFileUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    if (
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    ) {
      toast.error("Please upload a PDF or Word document");
      return;
    }

    setFormData((prev) => ({ ...prev, resume: file }));
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          /\S+@\S+\.\S+/.test(formData.email) &&
          /^[0-9]{10}$/.test(formData.phone)
        );
      case 2:
        return !!formData.resume;
      case 3:
        const requiredQuestions = customQuestions.filter((q) => q.required);
        return requiredQuestions.every((q) =>
          formData.customAnswers.some(
            (a) => a.questionId === (q._id || q.id) && a.answer?.trim() !== ""
          )
        );
      default:
        return true;
    }
  };

  const handleNextOrSubmit = async () => {
    if (!isStepValid(currentStep)) return;

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Immediately mark applied for instant UI feedback
      setHasApplied(true);
      setIsSubmitting(true);

      try {
        if (onSubmit) await onSubmit(formData);
        toast.success("Application submitted successfully!");
      } catch (err) {
        if (err.response?.data?.message === "Already applied") {
          toast("You have already applied!");
        } else {
          console.error("Application submit failed:", err);
          toast.error(err?.message || "Failed to submit application");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => !isSubmitting && onClose()}
      />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl">
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border p-6 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Apply for {job?.title}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {job?.company?.name} • {job?.location}
                </p>
              </div>
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="p-2 hover:bg-muted rounded-md transition-colors"
              >
                <Icon name="X" size={20} className="text-muted-foreground" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mt-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step === currentStep
                        ? "bg-primary text-primary-foreground"
                        : step < currentStep
                        ? "bg-success text-success-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step < currentStep ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-0.5 mx-2 ${
                        step < currentStep ? "bg-success" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Personal Info</span>
              <span>Resume</span>
              <span>Questions</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    First Name *
                  </label>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Last Name *
                  </label>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Phone *
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter your phone"
                  />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Resume *
                  </label>
                  <div
                    onClick={() => fileInputRef?.current?.click()}
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    {formData.resume ? (
                      <div className="space-y-2">
                        <Icon
                          name="FileText"
                          size={32}
                          className="text-success mx-auto"
                        />
                        <div className="text-sm font-medium text-foreground">
                          {formData.resume.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {(formData.resume.size / 1024 / 1024).toFixed(1)} MB
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData((prev) => ({ ...prev, resume: null }));
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Icon
                          name="Upload"
                          size={32}
                          className="text-muted-foreground mx-auto"
                        />
                        <div className="text-sm font-medium text-foreground">
                          Click to upload your resume
                        </div>
                        <div className="text-xs text-muted-foreground">
                          PDF, DOC, or DOCX • Max 5MB
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    value={formData.coverLetter}
                    onChange={(e) =>
                      handleInputChange("coverLetter", e.target.value)
                    }
                    placeholder="Tell us why you're interested..."
                    rows={6}
                    className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
              </>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="space-y-4">
                {customQuestions.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No additional questions for this job.
                  </p>
                )}
                {customQuestions.map((q) => {
                  const qId = q._id || q.id;
                  const answerObj = formData.customAnswers.find(
                    (a) => a.questionId === qId
                  );
                  const answerValue = answerObj?.answer || "";
                  return (
                    <div key={qId}>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        {q.question} {q.required && "*"}
                      </label>
                      {q.type === "textarea" ? (
                        <textarea
                          rows={3}
                          value={answerValue}
                          onChange={(e) =>
                            handleCustomAnswer(qId, e.target.value)
                          }
                          className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        />
                      ) : (
                        <Input
                          type="text"
                          value={answerValue}
                          onChange={(e) =>
                            handleCustomAnswer(qId, e.target.value)
                          }
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="sticky bottom-0 bg-card border-t border-border p-6 flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
              disabled={currentStep === 1 || isSubmitting || hasApplied}
            >
              Back
            </Button>
            <Button
              onClick={handleNextOrSubmit}
              disabled={!isStepValid(currentStep) || isSubmitting || hasApplied}
              loading={isSubmitting}
            >
              {hasApplied ? (
                <div className="flex items-center space-x-1">
                  <Icon name="Check" size={16} /> <span>Applied</span>
                </div>
              ) : currentStep < 3 ? (
                "Next"
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
