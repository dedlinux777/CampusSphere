import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  // State to keep track of the currently selected chart
  const [currChart, setCurrChart] = useState("students")

  // Function to generate random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

  // Data for the chart displaying attendance information
  const chartAttendanceData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        // Placeholder attendance rate between 75% and 95%
        data: courses.map((course) => 75 + (course.courseName.length % 21)),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

  // Data for the chart displaying labs information
  const chartLabsData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        // Placeholder labs submitted
        data: courses.map((course) => 25 + (course.courseName.length % 35)),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
  }

  const getChartData = () => {
    switch (currChart) {
      case "students":
        return chartDataStudents;
      case "attendance":
        return chartAttendanceData;
      case "labs":
        return chartLabsData;
      default:
        return chartDataStudents;
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>

      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${currChart === "students"
            ? "bg-richblack-700 text-yellow-50"
            : "text-yellow-400"
            }`}
        >
          Undergraduates
        </button>

        {/* Button to switch to the "attendance" chart */}
        <button
          onClick={() => setCurrChart("attendance")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${currChart === "attendance"
            ? "bg-richblack-700 text-yellow-50"
            : "text-yellow-400"
            }`}
        >
          Attendance
        </button>

        {/* Button to switch to the "labs" chart */}
        <button
          onClick={() => setCurrChart("labs")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${currChart === "labs"
            ? "bg-richblack-700 text-yellow-50"
            : "text-yellow-400"
            }`}
        >
          Labs Submitted
        </button>
      </div>

      <div className="relative mx-auto aspect-square h-full w-full">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={getChartData()}
          options={options}
        />
      </div>
    </div>
  )
}
