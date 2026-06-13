import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "Unified Academic Services for",
    highlightText: "Faculty & Undergraduates",
    description:
      "CampusSphere provides integrated course planning, lecture schedules, real-time syllabus tracking, and direct collaboration tools for the entire university ecosystem.",
    BtnText: "Learn More",
    BtnLink: "/about",
  },
  {
    order: 1,
    heading: "Regulation Aligned Curriculum",
    description:
      "Access academic syllabi and course materials carefully curated and structured to align with university regulations.",
  },
  {
    order: 2,
    heading: "Advanced Pedagogy Methods",
    description:
      "Utilizing modern instructional strategies, interactive lectures, and lab sessions to ensure deep technical understanding.",
  },
  {
    order: 3,
    heading: "Continuous Evaluation",
    description:
      "Track attendance, continuous internal evaluations (CIE), lab submissions, and term marks dynamically.",
  },
  {
    order: 4,
    heading: "Class Progress Tracker",
    description:
      "Stay ahead with real-time course completions, semester timelines, and department notices.",
  },
  {
    order: 5,
    heading: "Career & Placement Readiness",
    description:
      "Direct portal access to campus recruitment schedules, workshop details, and mock tests.",
  },
];

const LearningGrid = () => {

  return (
    <div className="grid mx-auto w-[350px] lg:w-fit grid-cols-1 lg:grid-cols-4 mb-12">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`${i === 0 && "lg:col-span-2 lg:h-[294px]"}  ${card.order % 2 === 1
                ? "bg-richblack-700 h-[294px]"
                : card.order % 2 === 0
                  ? "bg-richblack-800 h-[294px]"
                  : "bg-transparent"
              } ${card.order === 3 && "lg:col-start-2"}  `}
          >
            {card.order < 0 ? (
              <div className="lg:w-[90%] flex flex-col gap-3 pb-10 lg:pb-0">
                <div className="text-4xl font-semibold ">
                  {card.heading}
                  <HighlightText text={card.highlightText} />
                </div>
                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-richblack-5 text-lg">{card.heading}</h1>

                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;