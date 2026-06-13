import signupImg from "../assets/Images/signup.png"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join CampusSphere to manage your academic coursework and details"
      description1="Access all course modules and timetable schedules."
      description2="Collaborate with department faculty members and peers."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup