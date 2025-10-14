// // // // import React, { useState } from 'react';
// // // // import Icon from '../../../AppIcon';
// // // // import { Checkbox } from '../../../ui/Checkbox';
// // // // import Select from '../../../ui/Select';

// // // // const FilterSidebar = ({ filters = {}, onFiltersChange }) => {
// // // //   const [expandedSections, setExpandedSections] = useState({
// // // //     jobType: true,
// // // //     experience: true,
// // // //     salary: true,
// // // //     company: true,
// // // //     posted: true
// // // //   });

// // // //   const toggleSection = (section) => {
// // // //     setExpandedSections(prev => ({
// // // //       ...prev,
// // // //       [section]: !prev?.[section]
// // // //     }));
// // // //   };

// // // //   const handleFilterChange = (category, value, checked) => {
// // // //     const currentFilters = filters?.[category] || [];
// // // //     let newFilters;
    
// // // //     if (checked) {
// // // //       newFilters = [...currentFilters, value];
// // // //     } else {
// // // //       newFilters = currentFilters?.filter(f => f !== value);
// // // //     }
    
// // // //     onFiltersChange?.({
// // // //       ...filters,
// // // //       [category]: newFilters
// // // //     });
// // // //   };

// // // //   const handleRangeChange = (category, field, value) => {
// // // //     onFiltersChange?.({
// // // //       ...filters,
// // // //       [category]: {
// // // //         ...filters?.[category],
// // // //         [field]: value
// // // //       }
// // // //     });
// // // //   };

// // // //   const clearAllFilters = () => {
// // // //     onFiltersChange?.({});
// // // //   };

// // // //   const jobTypes = [
// // // //     { value: 'full-time', label: 'Full-time', count: 234 },
// // // //     { value: 'part-time', label: 'Part-time', count: 87 },
// // // //     { value: 'contract', label: 'Contract', count: 156 },
// // // //     { value: 'freelance', label: 'Freelance', count: 45 },
// // // //     { value: 'internship', label: 'Internship', count: 78 }
// // // //   ];

// // // //   const experienceLevels = [
// // // //     { value: 'entry', label: 'Entry Level (0-2 years)', count: 145 },
// // // //     { value: 'mid', label: 'Mid Level (2-5 years)', count: 298 },
// // // //     { value: 'senior', label: 'Senior Level (5-10 years)', count: 167 },
// // // //     { value: 'executive', label: 'Executive (10+ years)', count: 89 }
// // // //   ];

// // // //   const companySizes = [
// // // //     { value: 'startup', label: 'Startup (1-50)', count: 89 },
// // // //     { value: 'small', label: 'Small (51-200)', count: 134 },
// // // //     { value: 'medium', label: 'Medium (201-1000)', count: 178 },
// // // //     { value: 'large', label: 'Large (1000+)', count: 234 }
// // // //   ];

// // // //   const postedTimes = [
// // // //     { value: 'today', label: 'Today', count: 23 },
// // // //     { value: 'week', label: 'Past week', count: 145 },
// // // //     { value: 'month', label: 'Past month', count: 356 },
// // // //     { value: 'anytime', label: 'Any time', count: 699 }
// // // //   ];

// // // //   const FilterSection = ({ title, section, children }) => (
// // // //     <div className="border-b border-border pb-4 mb-4">
// // // //       <button
// // // //         onClick={() => toggleSection(section)}
// // // //         className="flex items-center justify-between w-full py-2 text-left"
// // // //       >
// // // //         <h3 className="font-semibold text-foreground">{title}</h3>
// // // //         <Icon 
// // // //           name={expandedSections?.[section] ? "ChevronUp" : "ChevronDown"} 
// // // //           size={16} 
// // // //           className="text-muted-foreground" 
// // // //         />
// // // //       </button>
// // // //       {expandedSections?.[section] && (
// // // //         <div className="mt-3 space-y-3">
// // // //           {children}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );

// // // //   return (
// // // //     <div className="w-full lg:w-80 bg-card border border-border rounded-lg p-6">
// // // //       {/* Filter Header */}
// // // //       <div className="flex items-center justify-between mb-6">
// // // //         <h2 className="text-lg font-semibold text-foreground">Filters</h2>
// // // //         <button
// // // //           onClick={clearAllFilters}
// // // //           className="text-sm text-primary hover:text-primary/80 font-medium"
// // // //         >
// // // //           Clear all
// // // //         </button>
// // // //       </div>

// // // //       {/* Job Type Filter */}
// // // //       <FilterSection title="Job Type" section="jobType">
// // // //         {jobTypes?.map((type) => (
// // // //           <div key={type?.value} className="flex items-center justify-between">
// // // //             <Checkbox
// // // //               id={type?.value}
// // // //               checked={filters?.jobType?.includes(type?.value)}
// // // //               onChange={(checked) => handleFilterChange('jobType', type?.value, checked)}
// // // //               label={type?.label}
// // // //               className="flex-1"
// // // //             />
// // // //             <span className="text-sm text-muted-foreground ml-2">({type?.count})</span>
// // // //           </div>
// // // //         ))}
// // // //       </FilterSection>

// // // //       {/* Experience Level Filter */}
// // // //       <FilterSection title="Experience Level" section="experience">
// // // //         {experienceLevels?.map((level) => (
// // // //           <div key={level?.value} className="flex items-center justify-between">
// // // //             <Checkbox
// // // //               id={level?.value}
// // // //               checked={filters?.experience?.includes(level?.value)}
// // // //               onChange={(checked) => handleFilterChange('experience', level?.value, checked)}
// // // //               label={level?.label}
// // // //               className="flex-1"
// // // //             />
// // // //             <span className="text-sm text-muted-foreground ml-2">({level?.count})</span>
// // // //           </div>
// // // //         ))}
// // // //       </FilterSection>

// // // //       {/* Salary Range Filter */}
// // // //       <FilterSection title="Salary Range" section="salary">
// // // //         <div className="space-y-3">
// // // //           <div className="grid grid-cols-2 gap-3">
// // // //             <div>
// // // //               <label className="text-sm font-medium text-foreground block mb-1">Min</label>
// // // //               <Select
// // // //                 value={filters?.salary?.min || ''}
// // // //                 onChange={(value) => handleRangeChange('salary', 'min', value)}
// // // //                 options={[
// // // //                   { value: '', label: 'Any' },
// // // //                   { value: '30000', label: '$30,000' },
// // // //                   { value: '50000', label: '$50,000' },
// // // //                   { value: '75000', label: '$75,000' },
// // // //                   { value: '100000', label: '$100,000' },
// // // //                   { value: '150000', label: '$150,000' }
// // // //                 ]}
// // // //               />
// // // //             </div>
// // // //             <div>
// // // //               <label className="text-sm font-medium text-foreground block mb-1">Max</label>
// // // //               <Select
// // // //                 value={filters?.salary?.max || ''}
// // // //                 onChange={(value) => handleRangeChange('salary', 'max', value)}
// // // //                 options={[
// // // //                   { value: '', label: 'Any' },
// // // //                   { value: '75000', label: '$75,000' },
// // // //                   { value: '100000', label: '$100,000' },
// // // //                   { value: '150000', label: '$150,000' },
// // // //                   { value: '200000', label: '$200,000' },
// // // //                   { value: '300000', label: '$300,000+' }
// // // //                 ]}
// // // //               />
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </FilterSection>

// // // //       {/* Company Size Filter */}
// // // //       <FilterSection title="Company Size" section="company">
// // // //         {companySizes?.map((size) => (
// // // //           <div key={size?.value} className="flex items-center justify-between">
// // // //             <Checkbox
// // // //               id={size?.value}
// // // //               checked={filters?.companySize?.includes(size?.value)}
// // // //               onChange={(checked) => handleFilterChange('companySize', size?.value, checked)}
// // // //               label={size?.label}
// // // //               className="flex-1"
// // // //             />
// // // //             <span className="text-sm text-muted-foreground ml-2">({size?.count})</span>
// // // //           </div>
// // // //         ))}
// // // //       </FilterSection>

// // // //       {/* Date Posted Filter */}
// // // //       <FilterSection title="Date Posted" section="posted">
// // // //         {postedTimes?.map((time) => (
// // // //           <div key={time?.value} className="flex items-center justify-between">
// // // //             <Checkbox
// // // //               id={time?.value}
// // // //               checked={filters?.posted?.includes(time?.value)}
// // // //               onChange={(checked) => handleFilterChange('posted', time?.value, checked)}
// // // //               label={time?.label}
// // // //               className="flex-1"
// // // //             />
// // // //             <span className="text-sm text-muted-foreground ml-2">({time?.count})</span>
// // // //           </div>
// // // //         ))}
// // // //       </FilterSection>

// // // //       {/* Active Filters Count */}
// // // //       {Object?.keys(filters)?.length > 0 && (
// // // //         <div className="mt-6 pt-4 border-t border-border">
// // // //           <div className="text-sm text-muted-foreground">
// // // //             {Object?.values(filters)?.flat()?.length} active filters
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default FilterSidebar;
// // // import React, { useState } from "react";
// // // import Icon from "../../../AppIcon";
// // // import { Checkbox } from "../../../ui/Checkbox";
// // // import Select from "../../../ui/Select";

// // // const FilterSidebar = ({ filters = {}, onFiltersChange }) => {
// // //   const [expandedSections, setExpandedSections] = useState({
// // //     jobType: true,
// // //     experience: true,
// // //     salary: true,
// // //     company: true,
// // //     posted: true,
// // //   });

// // //   const toggleSection = (section) => {
// // //     setExpandedSections((prev) => ({
// // //       ...prev,
// // //       [section]: !prev?.[section],
// // //     }));
// // //   };

// // //   const handleFilterChange = (category, value, checked) => {
// // //     const currentFilters = filters?.[category] || [];
// // //     let newFilters = checked
// // //       ? [...currentFilters, value]
// // //       : currentFilters.filter((f) => f !== value);

// // //     onFiltersChange?.({ ...filters, [category]: newFilters });
// // //   };

// // //   const handleRangeChange = (category, field, value) => {
// // //     onFiltersChange?.({
// // //       ...filters,
// // //       [category]: {
// // //         ...filters?.[category],
// // //         [field]: value ? Number(value) : "",
// // //       },
// // //     });
// // //   };

// // //   const clearAllFilters = () => onFiltersChange?.({});

// // //   const jobTypes = [
// // //     { value: "full-time", label: "Full-time" },
// // //     { value: "part-time", label: "Part-time" },
// // //     { value: "contract", label: "Contract" },
// // //     { value: "freelance", label: "Freelance" },
// // //     { value: "internship", label: "Internship" },
// // //   ];

// // //   const experienceLevels = [
// // //     { value: "entry", label: "Entry Level (0-2 years)" },
// // //     { value: "mid", label: "Mid Level (2-5 years)" },
// // //     { value: "senior", label: "Senior Level (5-10 years)" },
// // //     { value: "executive", label: "Executive (10+ years)" },
// // //   ];

// // //   const companySizes = [
// // //     { value: "startup", label: "Startup (1-50)" },
// // //     { value: "small", label: "Small (51-200)" },
// // //     { value: "medium", label: "Medium (201-1000)" },
// // //     { value: "large", label: "Large (1000+)" },
// // //   ];

// // //   const postedTimes = [
// // //     { value: "today", label: "Today" },
// // //     { value: "week", label: "Past week" },
// // //     { value: "month", label: "Past month" },
// // //     { value: "anytime", label: "Any time" },
// // //   ];

// // //   const FilterSection = ({ title, section, children }) => (
// // //     <div className="border-b border-border pb-4 mb-4">
// // //       <button
// // //         onClick={() => toggleSection(section)}
// // //         className="flex items-center justify-between w-full py-2 text-left"
// // //       >
// // //         <h3 className="font-semibold text-foreground">{title}</h3>
// // //         <Icon
// // //           name={expandedSections?.[section] ? "ChevronUp" : "ChevronDown"}
// // //           size={16}
// // //           className="text-muted-foreground"
// // //         />
// // //       </button>
// // //       {expandedSections?.[section] && (
// // //         <div className="mt-3 space-y-3">{children}</div>
// // //       )}
// // //     </div>
// // //   );

// // //   return (
// // //     <div className="w-full lg:w-80 bg-card border border-border rounded-lg p-6">
// // //       <div className="flex items-center justify-between mb-6">
// // //         <h2 className="text-lg font-semibold text-foreground">Filters</h2>
// // //         <button
// // //           onClick={clearAllFilters}
// // //           className="text-sm text-primary hover:text-primary/80 font-medium"
// // //         >
// // //           Clear all
// // //         </button>
// // //       </div>

// // //       {/* Job Type */}
// // //       <FilterSection title="Job Type" section="jobType">
// // //         {jobTypes.map((type) => (
// // //           <div key={type.value} className="flex items-center justify-between">
// // //             <Checkbox
// // //               id={type.value}
// // //               checked={filters?.jobType?.includes(type.value)}
// // //               onChange={(checked) =>
// // //                 handleFilterChange("jobType", type.value, checked)
// // //               }
// // //               label={type.label}
// // //               className="flex-1"
// // //             />
// // //           </div>
// // //         ))}
// // //       </FilterSection>

// // //       {/* Experience */}
// // //       <FilterSection title="Experience Level" section="experience">
// // //         {experienceLevels.map((level) => (
// // //           <div key={level.value} className="flex items-center justify-between">
// // //             <Checkbox
// // //               id={level.value}
// // //               checked={filters?.experience?.includes(level.value)}
// // //               onChange={(checked) =>
// // //                 handleFilterChange("experience", level.value, checked)
// // //               }
// // //               label={level.label}
// // //               className="flex-1"
// // //             />
// // //           </div>
// // //         ))}
// // //       </FilterSection>

// // //       {/* Salary Range */}
// // //       <FilterSection title="Salary Range" section="salary">
// // //         <div className="grid grid-cols-2 gap-3">
// // //           <div>
// // //             <label className="text-sm font-medium block mb-1">Min</label>
// // //             <Select
// // //               value={filters?.salary?.min || ""}
// // //               onChange={(value) => handleRangeChange("salary", "min", value)}
// // //               options={[
// // //                 { value: "", label: "Any" },
// // //                 { value: "30000", label: "$30,000" },
// // //                 { value: "50000", label: "$50,000" },
// // //                 { value: "75000", label: "$75,000" },
// // //               ]}
// // //             />
// // //           </div>
// // //           <div>
// // //             <label className="text-sm font-medium block mb-1">Max</label>
// // //             <Select
// // //               value={filters?.salary?.max || ""}
// // //               onChange={(value) => handleRangeChange("salary", "max", value)}
// // //               options={[
// // //                 { value: "", label: "Any" },
// // //                 { value: "100000", label: "$100,000" },
// // //                 { value: "150000", label: "$150,000" },
// // //                 { value: "200000", label: "$200,000+" },
// // //               ]}
// // //             />
// // //           </div>
// // //         </div>
// // //       </FilterSection>

// // //       {/* Company Size */}
// // //       <FilterSection title="Company Size" section="company">
// // //         {companySizes.map((size) => (
// // //           <div key={size.value} className="flex items-center justify-between">
// // //             <Checkbox
// // //               id={size.value}
// // //               checked={filters?.companySize?.includes(size.value)}
// // //               onChange={(checked) =>
// // //                 handleFilterChange("companySize", size.value, checked)
// // //               }
// // //               label={size.label}
// // //               className="flex-1"
// // //             />
// // //           </div>
// // //         ))}
// // //       </FilterSection>

// // //       {/* Date Posted */}
// // //       <FilterSection title="Date Posted" section="posted">
// // //         {postedTimes.map((time) => (
// // //           <div key={time.value} className="flex items-center justify-between">
// // //             <Checkbox
// // //               id={time.value}
// // //               checked={filters?.posted?.includes(time.value)}
// // //               onChange={(checked) =>
// // //                 handleFilterChange("posted", time.value, checked)
// // //               }
// // //               label={time.label}
// // //               className="flex-1"
// // //             />
// // //           </div>
// // //         ))}
// // //       </FilterSection>
// // //     </div>
// // //   );
// // // };

// // // export default FilterSidebar;
// // import React, { useState } from "react";
// // import Icon from "../../../AppIcon";
// // import { Checkbox } from "../../../ui/Checkbox";
// // import Select from "../../../ui/Select";

// // const FilterSidebar = ({ filters = {}, onFiltersChange }) => {
// //   const [expandedSections, setExpandedSections] = useState({
// //     jobType: true,
// //     experience: true,
// //     salary: true,
// //     company: true,
// //     posted: true,
// //   });

// //   const toggleSection = (section) => {
// //     setExpandedSections((prev) => ({
// //       ...prev,
// //       [section]: !prev?.[section],
// //     }));
// //   };

// //   const handleFilterChange = (category, value, checked) => {
// //     const currentFilters = filters?.[category] || [];
// //     let newFilters = checked
// //       ? [...currentFilters, value]
// //       : currentFilters.filter((f) => f !== value);

// //     onFiltersChange?.({ ...filters, [category]: newFilters });
// //   };

// //   const handleRangeChange = (category, field, value) => {
// //     onFiltersChange?.({
// //       ...filters,
// //       [category]: {
// //         ...filters?.[category],
// //         [field]: value ? Number(value) : "",
// //       },
// //     });
// //   };

// //   const clearAllFilters = () => onFiltersChange?.({});

// //   const jobTypes = [
// //     { value: "full-time", label: "Full-time" },
// //     { value: "part-time", label: "Part-time" },
// //     { value: "contract", label: "Contract" },
// //     { value: "freelance", label: "Freelance" },
// //     { value: "internship", label: "Internship" },
// //   ];

// //   const experienceLevels = [
// //     { value: "entry", label: "Entry Level (0-2 years)" },
// //     { value: "mid", label: "Mid Level (2-5 years)" },
// //     { value: "senior", label: "Senior Level (5-10 years)" },
// //     { value: "executive", label: "Executive (10+ years)" },
// //   ];

// //   const companySizes = [
// //     { value: "startup", label: "Startup (1-50)" },
// //     { value: "small", label: "Small (51-200)" },
// //     { value: "medium", label: "Medium (201-1000)" },
// //     { value: "large", label: "Large (1000+)" },
// //   ];

// //   const postedTimes = [
// //     { value: "today", label: "Today" },
// //     { value: "week", label: "Past week" },
// //     { value: "month", label: "Past month" },
// //     { value: "anytime", label: "Any time" },
// //   ];

// //   const FilterSection = ({ title, section, children }) => (
// //     <div className="border-b border-border pb-4 mb-4">
// //       <button
// //         onClick={() => toggleSection(section)}
// //         className="flex items-center justify-between w-full py-2 text-left"
// //       >
// //         <h3 className="font-semibold text-foreground">{title}</h3>
// //         <Icon
// //           name={expandedSections?.[section] ? "ChevronUp" : "ChevronDown"}
// //           size={16}
// //           className="text-muted-foreground"
// //         />
// //       </button>
// //       {expandedSections?.[section] && (
// //         <div className="mt-3 space-y-3">{children}</div>
// //       )}
// //     </div>
// //   );

// //   return (
// //     <div className="w-full lg:w-80 bg-card border border-border rounded-lg p-6">
// //       <div className="flex items-center justify-between mb-6">
// //         <h2 className="text-lg font-semibold text-foreground">Filters</h2>
// //         <button
// //           onClick={clearAllFilters}
// //           className="text-sm text-primary hover:text-primary/80 font-medium"
// //         >
// //           Clear all
// //         </button>
// //       </div>

// //       {/* Job Type */}
// //       <FilterSection title="Job Type" section="jobType">
// //         {jobTypes.map((type) => (
// //           <Checkbox
// //             key={type.value}
// //             id={type.value}
// //             checked={filters?.jobType?.includes(type.value)}
// //             onChange={(checked) =>
// //               handleFilterChange("jobType", type.value, checked)
// //             }
// //             label={type.label}
// //           />
// //         ))}
// //       </FilterSection>

// //       {/* Experience */}
// //       <FilterSection title="Experience Level" section="experience">
// //         {experienceLevels.map((level) => (
// //           <Checkbox
// //             key={level.value}
// //             id={level.value}
// //             checked={filters?.experience?.includes(level.value)}
// //             onChange={(checked) =>
// //               handleFilterChange("experience", level.value, checked)
// //             }
// //             label={level.label}
// //           />
// //         ))}
// //       </FilterSection>

// //       {/* Salary Range */}
// //       <FilterSection title="Salary Range" section="salary">
// //         <div className="grid grid-cols-2 gap-3">
// //           <input
// //             type="number"
// //             placeholder="Min"
// //             value={filters?.salary?.min || ""}
// //             onChange={(e) => handleRangeChange("salary", "min", e.target.value)}
// //             className="border border-border rounded px-2 py-1 w-full"
// //           />
// //           <input
// //             type="number"
// //             placeholder="Max"
// //             value={filters?.salary?.max || ""}
// //             onChange={(e) => handleRangeChange("salary", "max", e.target.value)}
// //             className="border border-border rounded px-2 py-1 w-full"
// //           />
// //         </div>
// //       </FilterSection>

// //       {/* Company Size */}
// //       <FilterSection title="Company Size" section="company">
// //         {companySizes.map((size) => (
// //           <Checkbox
// //             key={size.value}
// //             id={size.value}
// //             checked={filters?.companySize?.includes(size.value)}
// //             onChange={(checked) =>
// //               handleFilterChange("companySize", size.value, checked)
// //             }
// //             label={size.label}
// //           />
// //         ))}
// //       </FilterSection>

// //       {/* Posted */}
// //       <FilterSection title="Posted" section="posted">
// //         {postedTimes.map((time) => (
// //           <Checkbox
// //             key={time.value}
// //             id={time.value}
// //             checked={filters?.posted?.includes(time.value)}
// //             onChange={(checked) =>
// //               handleFilterChange("posted", time.value, checked)
// //             }
// //             label={time.label}
// //           />
// //         ))}
// //       </FilterSection>
// //     </div>
// //   );
// // };

// // export default FilterSidebar;
// import React, { useState } from "react";
// import Icon from "../../../AppIcon";
// import { Checkbox } from "../../../ui/Checkbox";

// const FilterSidebar = ({ filters = {}, onFiltersChange }) => {
//   const [expandedSections, setExpandedSections] = useState({
//     jobType: true,
//     experience: true,
//     salary: true,
//     company: true,
//     posted: true,
//     remote: true,
//     urgent: true,
//     category: true,
//     industry: true,
//     tags: true,
//     status: true,
//   });

//   const toggleSection = (section) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [section]: !prev?.[section],
//     }));
//   };

//   const handleFilterChange = (category, value, checked) => {
//     const currentFilters = filters?.[category] || [];
//     let newFilters = checked
//       ? [...currentFilters, value]
//       : currentFilters.filter((f) => f !== value);

//     onFiltersChange?.({ ...filters, [category]: newFilters });
//   };

//   const handleRangeChange = (category, field, value) => {
//     onFiltersChange?.({
//       ...filters,
//       [category]: {
//         ...filters?.[category],
//         [field]: value ? Number(value) : "",
//       },
//     });
//   };

//   const clearAllFilters = () => onFiltersChange?.({});

//   const jobTypes = [
//     "Full-time",
//     "Part-time",
//     "Contract",
//     "Freelance",
//     "Internship",
//   ];
//   const experienceLevels = ["entry", "mid", "senior", "executive"];
//   const companySizes = ["startup", "small", "medium", "large"];
//   const postedTimes = ["today", "week", "month", "anytime"];
//   const categories = ["IT", "Finance", "Healthcare", "Education", "Other"];
//   const industries = ["IT", "Finance", "Healthcare", "Education", "Other"];
//   const tagsList = ["JavaScript", "Python", "React", "Node.js", "MongoDB"];

//   const FilterSection = ({ title, section, children }) => (
//     <div className="border-b border-border pb-4 mb-4">
//       <button
//         onClick={() => toggleSection(section)}
//         className="flex items-center justify-between w-full py-2 text-left"
//       >
//         <h3 className="font-semibold text-foreground">{title}</h3>
//         <Icon
//           name={expandedSections?.[section] ? "ChevronUp" : "ChevronDown"}
//           size={16}
//           className="text-muted-foreground"
//         />
//       </button>
//       {expandedSections?.[section] && (
//         <div className="mt-3 space-y-3">{children}</div>
//       )}
//     </div>
//   );

//   return (
//     <div className="w-full lg:w-80 bg-card border border-border rounded-lg p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-lg font-semibold text-foreground">Filters</h2>
//         <button
//           onClick={clearAllFilters}
//           className="text-sm text-primary hover:text-primary/80 font-medium"
//         >
//           Clear all
//         </button>
//       </div>

//       {/* Job Type */}
//       <FilterSection title="Job Type" section="jobType">
//         {jobTypes.map((type) => (
//           <Checkbox
//             key={type}
//             id={type}
//             checked={filters?.jobType?.includes(type)}
//             onChange={(checked) => handleFilterChange("jobType", type, checked)}
//             label={type}
//           />
//         ))}
//       </FilterSection>

//       {/* Experience Level */}
//       <FilterSection title="Experience Level" section="experience">
//         {experienceLevels.map((exp) => (
//           <Checkbox
//             key={exp}
//             id={exp}
//             checked={filters?.experience?.includes(exp)}
//             onChange={(checked) =>
//               handleFilterChange("experience", exp, checked)
//             }
//             label={exp}
//           />
//         ))}
//       </FilterSection>

//       {/* Salary Range */}
//       <FilterSection title="Salary Range" section="salary">
//         <div className="grid grid-cols-2 gap-3">
//           <input
//             type="number"
//             placeholder="Min"
//             value={filters?.salary?.min || ""}
//             onChange={(e) => handleRangeChange("salary", "min", e.target.value)}
//             className="border border-border rounded px-2 py-1 w-full"
//           />
//           <input
//             type="number"
//             placeholder="Max"
//             value={filters?.salary?.max || ""}
//             onChange={(e) => handleRangeChange("salary", "max", e.target.value)}
//             className="border border-border rounded px-2 py-1 w-full"
//           />
//         </div>
//       </FilterSection>

//       {/* Company Size */}
//       <FilterSection title="Company Size" section="companySize">
//         {companySizes.map((size) => (
//           <Checkbox
//             key={size}
//             id={size}
//             checked={filters?.companySize?.includes(size)}
//             onChange={(checked) =>
//               handleFilterChange("companySize", size, checked)
//             }
//             label={size}
//           />
//         ))}
//       </FilterSection>

//       {/* Posted Date */}
//       <FilterSection title="Posted" section="posted">
//         {postedTimes.map((time) => (
//           <Checkbox
//             key={time}
//             id={time}
//             checked={filters?.posted?.includes(time)}
//             onChange={(checked) => handleFilterChange("posted", time, checked)}
//             label={time}
//           />
//         ))}
//       </FilterSection>

//       {/* Remote */}
//       <FilterSection title="Work Mode" section="remote">
//         {["Remote", "On-site"].map((mode) => (
//           <Checkbox
//             key={mode}
//             id={mode}
//             checked={filters?.remote?.includes(mode)}
//             onChange={(checked) => handleFilterChange("remote", mode, checked)}
//             label={mode}
//           />
//         ))}
//       </FilterSection>

//       {/* Urgency */}
//       <FilterSection title="Urgency" section="urgent">
//         <Checkbox
//           id="urgent"
//           checked={filters?.urgent?.includes("urgent")}
//           onChange={(checked) =>
//             handleFilterChange("urgent", "urgent", checked)
//           }
//           label="Urgent"
//         />
//       </FilterSection>

//       {/* Category */}
//       <FilterSection title="Category" section="category">
//         {categories.map((cat) => (
//           <Checkbox
//             key={cat}
//             id={cat}
//             checked={filters?.category?.includes(cat)}
//             onChange={(checked) => handleFilterChange("category", cat, checked)}
//             label={cat}
//           />
//         ))}
//       </FilterSection>

//       {/* Industry */}
//       <FilterSection title="Industry" section="industry">
//         {industries.map((ind) => (
//           <Checkbox
//             key={ind}
//             id={ind}
//             checked={filters?.industry?.includes(ind)}
//             onChange={(checked) => handleFilterChange("industry", ind, checked)}
//             label={ind}
//           />
//         ))}
//       </FilterSection>

//       {/* Tags */}
//       <FilterSection title="Skills / Tags" section="tags">
//         {tagsList.map((tag) => (
//           <Checkbox
//             key={tag}
//             id={tag}
//             checked={filters?.tags?.includes(tag)}
//             onChange={(checked) => handleFilterChange("tags", tag, checked)}
//             label={tag}
//           />
//         ))}
//       </FilterSection>

//       {/* Status */}
//       <FilterSection title="Status" section="status">
//         {["Active", "Expired"].map((status) => (
//           <Checkbox
//             key={status}
//             id={status}
//             checked={filters?.status?.includes(status)}
//             onChange={(checked) =>
//               handleFilterChange("status", status, checked)
//             }
//             label={status}
//           />
//         ))}
//       </FilterSection>
//     </div>
//   );
// };

// export default FilterSidebar;
import React, { useState } from "react";
import Icon from "../../../AppIcon";
import { Checkbox } from "../../../ui/Checkbox"; // Make sure to import the CSS file

const FilterSidebar = ({ filters = {}, onFiltersChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    jobType: true,
    experience: true,
    salary: true,
    company: true,
    posted: true,
    remote: true,
    urgent: true,
    category: true,
    industry: true,
    tags: true,
    status: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev?.[section],
    }));
  };

  const handleFilterChange = (category, value, checked) => {
    const currentFilters = filters?.[category] || [];
    const newFilters = checked
      ? [...currentFilters, value]
      : currentFilters.filter((f) => f !== value);

    onFiltersChange?.({ ...filters, [category]: newFilters });
  };

  const handleRangeChange = (category, field, value) => {
    onFiltersChange?.({
      ...filters,
      [category]: {
        ...filters?.[category],
        [field]: value ? Number(value) : "",
      },
    });
  };

  const clearAllFilters = () => onFiltersChange?.({});

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
  ];
  const experienceLevels = ["entry", "mid", "senior", "executive"];
  const companySizes = ["startup", "small", "medium", "large"];
  const postedTimes = ["today", "week", "month", "anytime"];
  const categories = ["IT", "Finance", "Healthcare", "Education", "Other"];
  const industries = ["IT", "Finance", "Healthcare", "Education", "Other"];
  const tagsList = ["JavaScript", "Python", "React", "Node.js", "MongoDB"];

  const FilterSection = ({ title, section, children }) => (
    <div className="border-b border-border pb-2 mb-2">
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full py-1 text-left"
      >
        <h3 className="font-semibold text-foreground text-sm">{title}</h3>
        <Icon
          name={expandedSections?.[section] ? "ChevronUp" : "ChevronDown"}
          size={14}
          className="text-muted-foreground"
        />
      </button>
      {expandedSections?.[section] && (
        <div className="mt-1 space-y-1">{children}</div>
      )}
    </div>
  );

  return (
    <div className="w-full lg:w-72 bg-card border border-border rounded-lg p-4 scrollbar-hide overflow-y-auto max-h-[150vh]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-foreground">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="text-xs text-primary hover:text-primary/80 font-medium"
        >
          Clear all
        </button>
      </div>

      {/* Job Type */}
      <FilterSection title="Job Type" section="jobType">
        {jobTypes.map((type) => (
          <Checkbox
            key={type}
            id={type}
            checked={filters?.jobType?.includes(type)}
            onChange={(checked) => handleFilterChange("jobType", type, checked)}
            label={type}
            className="text-sm py-1"
          />
        ))}
      </FilterSection>

      {/* Experience Level */}
      <FilterSection title="Experience Level" section="experience">
        {experienceLevels.map((exp) => (
          <Checkbox
            key={exp}
            id={exp}
            checked={filters?.experience?.includes(exp)}
            onChange={(checked) =>
              handleFilterChange("experience", exp, checked)
            }
            label={exp}
            className="text-sm py-1"
          />
        ))}
      </FilterSection>

      {/* Salary Range */}
      <FilterSection title="Salary Range" section="salary">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters?.salary?.min || ""}
            onChange={(e) => handleRangeChange("salary", "min", e.target.value)}
            className="border border-border rounded px-2 py-1 text-sm w-full"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters?.salary?.max || ""}
            onChange={(e) => handleRangeChange("salary", "max", e.target.value)}
            className="border border-border rounded px-2 py-1 text-sm w-full"
          />
        </div>
      </FilterSection>

      {/* Company Size */}
      <FilterSection title="Company Size" section="companySize">
        {companySizes.map((size) => (
          <Checkbox
            key={size}
            id={size}
            checked={filters?.companySize?.includes(size)}
            onChange={(checked) =>
              handleFilterChange("companySize", size, checked)
            }
            label={size}
            className="text-sm py-1"
          />
        ))}
      </FilterSection>

      {/* Posted Date */}
      <FilterSection title="Posted" section="posted">
        {postedTimes.map((time) => (
          <Checkbox
            key={time}
            id={time}
            checked={filters?.posted?.includes(time)}
            onChange={(checked) => handleFilterChange("posted", time, checked)}
            label={time}
            className="text-sm py-1"
          />
        ))}
      </FilterSection>

      {/* Work Mode */}
      <FilterSection title="Work Mode" section="remote">
        {["Remote", "On-site"].map((mode) => (
          <Checkbox
            key={mode}
            id={mode}
            checked={filters?.remote?.includes(mode)}
            onChange={(checked) => handleFilterChange("remote", mode, checked)}
            label={mode}
            className="text-sm py-1"
          />
        ))}
      </FilterSection>

      {/* Urgency */}
      <FilterSection title="Urgency" section="urgent">
        <Checkbox
          id="urgent"
          checked={filters?.urgent?.includes("urgent")}
          onChange={(checked) =>
            handleFilterChange("urgent", "urgent", checked)
          }
          label="Urgent"
          className="text-sm py-1"
        />
      </FilterSection>

      {/* Category */}
      <FilterSection title="Category" section="category">
        {categories.map((cat) => (
          <Checkbox
            key={cat}
            id={cat}
            checked={filters?.category?.includes(cat)}
            onChange={(checked) => handleFilterChange("category", cat, checked)}
            label={cat}
            className="text-sm py-1"
          />
        ))}
      </FilterSection>

      {/* Industry */}
      <FilterSection title="Industry" section="industry">
        {industries.map((ind) => (
          <Checkbox
            key={ind}
            id={ind}
            checked={filters?.industry?.includes(ind)}
            onChange={(checked) => handleFilterChange("industry", ind, checked)}
            label={ind}
            className="text-sm py-1"
          />
        ))}
      </FilterSection>

      {/* Skills / Tags */}
      <FilterSection title="Skills / Tags" section="tags">
        {tagsList.map((tag) => (
          <Checkbox
            key={tag}
            id={tag}
            checked={filters?.tags?.includes(tag)}
            onChange={(checked) => handleFilterChange("tags", tag, checked)}
            label={tag}
            className="text-sm py-1"
          />
        ))}
      </FilterSection>

      {/* Status */}
      <FilterSection title="Status" section="status">
        {["Active", "Expired"].map((status) => (
          <Checkbox
            key={status}
            id={status}
            checked={filters?.status?.includes(status)}
            onChange={(checked) =>
              handleFilterChange("status", status, checked)
            }
            label={status}
            className="text-sm py-1"
          />
        ))}
      </FilterSection>
    </div>
  );
};

export default FilterSidebar;
