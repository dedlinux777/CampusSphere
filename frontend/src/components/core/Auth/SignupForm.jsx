import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { signUp } from "../../../services/operations/authAPI"
import { ACCOUNT_TYPE, SECTION_OPTIONS } from "../../../utils/constants"
import Tab from "../../common/Tab"

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    semester: "",
    classSection: "",
  });

  const [teachingAssignments, setTeachingAssignments] = useState([]);
  const [assignmentSem, setAssignmentSem] = useState("1");
  const [assignmentSec, setAssignmentSec] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const addAssignment = () => {
    if (!assignmentSec) {
      toast.error("Please select class section");
      return;
    }
    setTeachingAssignments([
      ...teachingAssignments,
      { semester: parseInt(assignmentSem), classSection: assignmentSec }
    ]);
    setAssignmentSec("");
  };

  const removeAssignment = (index) => {
    setTeachingAssignments(teachingAssignments.filter((_, i) => i !== index));
  };

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return;
    }

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType === ACCOUNT_TYPE.STUDENT ? parseInt(formData.semester) : undefined,
        accountType === ACCOUNT_TYPE.STUDENT ? formData.classSection : undefined,
        accountType === ACCOUNT_TYPE.INSTRUCTOR ? teachingAssignments : undefined,
        navigate
      )
    );

    // Reset form data
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      semester: "",
      classSection: "",
    })
    setTeachingAssignments([]);
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div>
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          {/* First Name */}
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
            />
          </label>

          {/* Last Name */}
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
            />
          </label>
        </div>

        {/* Email Address */}
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
          />
        </label>


        <div className="flex gap-x-4">
          {/* Create Password */}
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 outline-none"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          {/* Confirm Password  */}
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 outline-none"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>

        {accountType === ACCOUNT_TYPE.STUDENT && (
          <div className="flex gap-x-4">
            {/* Semester */}
            <label className="w-1/2">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Semester <sup className="text-pink-200">*</sup>
              </p>
              <select
                required
                name="semester"
                value={formData.semester || ""}
                onChange={handleOnChange}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none cursor-pointer"
              >
                <option value="" disabled>Choose Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem.toString()}>Semester {sem}</option>
                ))}
              </select>
            </label>

            {/* Class Section */}
            <label className="w-1/2">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Class Section <sup className="text-pink-200">*</sup>
              </p>
              <select
                required
                name="classSection"
                value={formData.classSection || ""}
                onChange={handleOnChange}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
              >
                <option value="" disabled>Choose Section</option>
                {SECTION_OPTIONS.map((section) => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
            </label>
          </div>
        )}

        {accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <div className="flex flex-col gap-y-2 border border-richblack-700 rounded-lg p-4">
            <p className="text-[0.875rem] text-richblack-5 font-semibold">Teaching Assignments</p>
            <div className="flex gap-x-2 items-end">
              <label className="flex-1">
                <p className="mb-1 text-[0.75rem] text-richblack-300">Semester</p>
                <select
                  value={assignmentSem}
                  onChange={(e) => setAssignmentSem(e.target.value)}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <option key={sem} value={sem.toString()}>Semester {sem}</option>
                  ))}
                </select>
              </label>
              <label className="flex-1">
                <p className="mb-1 text-[0.75rem] text-richblack-300">Class Section</p>
                <select
                  value={assignmentSec}
                  onChange={(e) => setAssignmentSec(e.target.value)}
                  required
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[10px] text-richblack-5 outline-none"
                >
                  <option value="" disabled>Choose Section</option>
                  {SECTION_OPTIONS.map((section) => (
                    <option key={section} value={section}>{section}</option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={addAssignment}
                className="bg-yellow-50 text-richblack-900 rounded-[0.5rem] p-[10px] px-4 font-semibold text-sm hover:scale-95 transition-all duration-200"
              >
                Add
              </button>
            </div>
            {teachingAssignments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {teachingAssignments.map((assignment, index) => (
                  <div key={index} className="flex items-center gap-x-2 bg-richblack-700 text-richblack-100 rounded-full px-3 py-1 text-xs">
                    <span>Sem {assignment.semester} ({assignment.classSection})</span>
                    <button
                      type="button"
                      onClick={() => removeAssignment(index)}
                      className="text-pink-200 hover:text-pink-50 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}


        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm