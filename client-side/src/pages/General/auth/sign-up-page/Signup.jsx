import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";
import Button from "../../../../components/ui/Button";
import Select from "../../../../components/ui/Select";
import InputWithIcon from "./components/InputWithIcon";
import EducationSection from "./components/EducationSection";
import { toast } from "react-toastify";

// ✅ Import register API
import { registerUser } from "../../../../lib/mongo/authServices";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    institution: "",
    degree: "",
    field: "",
    enrollmentNumber: "",
    startDate: "",
    endDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [errors, setErrors] = useState({});

  const roleOptions = [
    { value: "student", label: "Student" },
    { value: "alumni", label: "Alumni" },
    { value: "faculty", label: "Faculty" },
    { value: "recruiter", label: "Recruiter" }
  ];

  // Show education fields only if role is student or alumni
  useEffect(() => {
    const shouldShowEducation =
      formData.role === "student" || formData.role === "alumni";
    setShowEducation(shouldShowEducation);

    if (!shouldShowEducation) {
      setFormData((prev) => ({
        ...prev,
        institution: "",
        degree: "",
        field: "",
        enrollmentNumber: "",
        startDate: "",
        endDate: "",
      }));
    }
  }, [formData.role]);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    else if (formData.username.length < 3)
      newErrors.username = "Username must be at least 3 characters";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone))
      newErrors.phone = "Please enter a valid phone number";
    if (!formData.role) newErrors.role = "Please select a role";

    if (showEducation) {
      if (!formData.institution.trim())
        newErrors.institution = "Institution is required";
      if (!formData.degree.trim()) newErrors.degree = "Degree is required";
      if (!formData.field.trim()) newErrors.field = "Field is required";
      if (!formData.enrollmentNumber.trim())
        newErrors.enrollmentNumber = "Enrollment number is required";
      if (!formData.startDate) newErrors.startDate = "Start date is required";
      if (!formData.endDate) newErrors.endDate = "End date is required";
      if (
        formData.startDate &&
        formData.endDate &&
        new Date(formData.startDate) >= new Date(formData.endDate)
      ) {
        newErrors.endDate = "End date must be after start date";
      }
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

try {
  const payload = {
    name: formData.name,
    username: formData.username,
    email: formData.email,
    password: formData.password,
    phone: formData.phone,
    role: formData.role,
    education:
      showEducation && formData.role
        ? [
            {
              institution: formData.institution,
              degree: formData.degree,
              field: formData.field,
              enrollmentNumber: formData.enrollmentNumber,
              startDate: formData.startDate,
              endDate: formData.endDate,
            },
          ]
        : [],
  };

  const data = await registerUser(payload);

  console.log("Registration Response:", data); // ✅ Show in console

  if (data?.userId) {
    toast.success("Account created successfully!"); // ✅ Show success toast
    navigate("/dashboard");
  } else {
    toast.error(data?.message || "Registration failed"); // Show error toast
  }
} catch (error) {
  console.error("Registration failed:", error);
  toast.error(error?.message || "Network error"); // Show network error toast
  setErrors({
    general: error?.message || "Registration failed. Please try again.",
  });
} finally {
  setIsLoading(false);
}
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, text: "", color: "" };
    let strength = 0;
    let feedback = [];
    if (password.length >= 8) strength += 25;
    else feedback.push("8+ characters");
    if (/[a-z]/.test(password)) strength += 25;
    else feedback.push("lowercase");
    if (/[A-Z]/.test(password)) strength += 25;
    else feedback.push("uppercase");
    if (/[0-9]/.test(password)) strength += 25;
    else feedback.push("number");

    let text = "";
    let color = "";
    if (strength <= 25) (text = "Weak"), (color = "text-red-500");
    else if (strength <= 50) (text = "Fair"), (color = "text-orange-500");
    else if (strength <= 75) (text = "Good"), (color = "text-yellow-500");
    else (text = "Strong"), (color = "text-green-500");

    return { strength, text, color, feedback };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Join our community today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="p-3 rounded-md bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputWithIcon
                type="text"
                placeholder="Full Name"
                icon={User}
                value={formData.name}
                onChange={(value) => handleInputChange("name", value)}
                error={errors.name}
                required
              />
              <InputWithIcon
                type="text"
                placeholder="Username"
                icon={User}
                value={formData.username}
                onChange={(value) => handleInputChange("username", value)}
                error={errors.username}
                required
              />
            </div>

            <InputWithIcon
              type="email"
              placeholder="Email Address"
              icon={Mail}
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
              error={errors.email}
              required
            />

            <div className="space-y-2">
              <InputWithIcon
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                icon={Lock}
                value={formData.password}
                onChange={(value) => handleInputChange("password", value)}
                error={errors.password}
                rightIcon={showPassword ? EyeOff : Eye}
                onRightIconClick={() => setShowPassword(!showPassword)}
                required
              />

              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength.strength <= 25
                            ? "bg-red-500"
                            : passwordStrength.strength <= 50
                            ? "bg-orange-500"
                            : passwordStrength.strength <= 75
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium ${passwordStrength.color}`}
                    >
                      {passwordStrength.text}
                    </span>
                  </div>
                  {passwordStrength.feedback.length > 0 && (
                    <p className="text-xs text-gray-500">
                      Missing: {passwordStrength.feedback.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputWithIcon
                type="tel"
                placeholder="Phone Number"
                icon={Phone}
                value={formData.phone}
                onChange={(value) => handleInputChange("phone", value)}
                error={errors.phone}
                required
              />
              <Select
                placeholder="Select Role"
                options={roleOptions}
                value={formData.role}
                onChange={(value) => handleInputChange("role", value)}
                error={errors.role}
                required
              />
            </div>

            <EducationSection
              show={showEducation}
              formData={formData}
              onChange={handleInputChange}
              errors={errors}
            />

            {/* Terms */}
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div className="text-sm text-gray-600">
                <p>
                  By creating an account, you agree to our{" "}
                  <Link
                    to="/terms"
                    className="text-purple-600 hover:text-purple-500 font-medium"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-purple-600 hover:text-purple-500 font-medium"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white h-12 text-base"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login-page"
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Sign in
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
