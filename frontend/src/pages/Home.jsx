import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';

import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from "../components/core/HomePage/Button"
import TimelineSection from '../components/core/HomePage/TimelineSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'
import Course_Slider from '../components/core/Catalog/Course_Slider'

import { getCatalogPageData } from '../services/operations/pageAndComponentData'

import { MdOutlineRateReview } from 'react-icons/md'
import { FaArrowRight } from "react-icons/fa"

import { motion } from 'framer-motion'
import { fadeIn, } from './../components/common/motionFrameVarients';

// background random images
import backgroundImg1 from '../assets/Images/random bg img/coding bg1.jpg'
import backgroundImg2 from '../assets/Images/random bg img/coding bg2.jpg'
import backgroundImg3 from '../assets/Images/random bg img/coding bg3.jpg'
import backgroundImg4 from '../assets/Images/random bg img/coding bg4.jpg'
import backgroundImg5 from '../assets/Images/random bg img/coding bg5.jpg'
import backgroundImg6 from '../assets/Images/random bg img/coding bg6.jpeg'
import backgroundImg7 from '../assets/Images/random bg img/coding bg7.jpg'
import backgroundImg8 from '../assets/Images/random bg img/coding bg8.jpeg'
import backgroundImg9 from '../assets/Images/random bg img/coding bg9.jpg'
import backgroundImg10 from '../assets/Images/random bg img/coding bg10.jpg'
import backgroundImg111 from '../assets/Images/random bg img/coding bg11.jpg'


const randomImges = [
    backgroundImg1,
    backgroundImg2,
    backgroundImg3,
    backgroundImg4,
    backgroundImg5,
    backgroundImg6,
    backgroundImg7,
    backgroundImg8,
    backgroundImg9,
    backgroundImg10,
    backgroundImg111,
];


const Home = () => {

    // get background random images
    const [backgroundImg, setBackgroundImg] = useState(null);

    useEffect(() => {
        const bg = randomImges[Math.floor(Math.random() * randomImges.length)]
        setBackgroundImg(bg);
    }, [])

    // get courses data
    const [CatalogPageData, setCatalogPageData] = useState(null);
    const categoryID = "6506c9dff191d7ffdb4a3fe2" // hard coded
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCatalogPageData = async () => {
            const result = await getCatalogPageData(categoryID, dispatch);
            setCatalogPageData(result);
        }
        if (categoryID) {
            fetchCatalogPageData();
        }
    }, [categoryID])


    return (
        <React.Fragment>
            {/* background random image */}
            <div>
                <div className="w-full h-[450px] md:h-[650px] absolute top-0 left-0 opacity-[0.3] overflow-hidden object-cover ">
                    <img src={backgroundImg} alt="Background"
                        className="w-full h-full object-cover "
                    />

                    <div className="absolute left-0 bottom-0 w-full h-[250px] opacity_layer_bg "></div>
                </div>
            </div>

            <div className=' '>
                {/*Section1  */}
                <div className='relative h-[450px] md:h-[550px] justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white '>

                    <Link to={"/signup"}>
                        <div className='z-0 group p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                                        transition-all duration-200 hover:scale-95 w-fit'>
                            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                              transition-all duration-200 group-hover:bg-richblack-900'>
                                <p>Lecturer/Faculty Portal</p>
                                <FaArrowRight />
                            </div>
                        </div>

                    </Link>

                    <motion.div
                        variants={fadeIn('left', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className='text-center text-3xl lg:text-4xl font-semibold mt-7  '
                    >
                        Access Your Academic Universe in One Click
                    </motion.div>

                    <motion.div
                        variants={fadeIn('right', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className=' mt-4 w-[90%] text-center text-base lg:text-lg font-bold text-richblack-300'
                    >
                        Welcome to CampusSphere, the central academic portal for coursework, schedules, collaboration, and department notifications. Access all university resources in one single dashboard.
                    </motion.div>


                    <div className='flex flex-row gap-7 mt-8'>
                        <CTAButton active={true} linkto={"/signup"}>
                            Register / Login
                        </CTAButton>

                        <CTAButton active={false} linkto={"/academic-calendar"}>
                            View Academic Calendar
                        </CTAButton>
                    </div>
                </div>

                {/* announcements and faculty notices section */}
                <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>
                    
                    {/* Announcements & Faculty Notices Panel */}
                    <div className="w-full max-w-maxContent mx-auto my-12 p-6 rounded-2xl bg-richblack-800 border border-richblack-700 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-richblack-700 pb-4 mb-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                📢 Announcements & Faculty Notices
                            </h2>
                            <span className="text-xs font-semibold text-yellow-50 bg-yellow-900/35 px-3 py-1 rounded-full border border-yellow-50/20">
                                Institutional Updates
                            </span>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="p-5 rounded-xl bg-richblack-900/50 border border-richblack-800 hover:border-richblack-700 transition-all duration-300">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-bold text-pink-200 uppercase tracking-wider bg-pink-900/20 px-2 py-0.5 rounded">Academics</span>
                                    <span className="text-xs text-richblack-400">June 15, 2026</span>
                                </div>
                                <h3 className="text-lg font-semibold text-richblack-5 mb-2">End-Semester Examination Schedule</h3>
                                <p className="text-sm text-richblack-300">The detailed timetable for the upcoming semester exams has been published. Practical exams will commence from next week.</p>
                            </div>
                            <div className="p-5 rounded-xl bg-richblack-900/50 border border-richblack-800 hover:border-richblack-700 transition-all duration-300">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-bold text-yellow-50 uppercase tracking-wider bg-yellow-900/20 px-2 py-0.5 rounded">Admissions</span>
                                    <span className="text-xs text-richblack-400">June 12, 2026</span>
                                </div>
                                <h3 className="text-lg font-semibold text-richblack-5 mb-2">Enrollment Open for Elective Modules</h3>
                                <p className="text-sm text-richblack-300">Undergraduates can now choose their open electives for the next semester. Submissions close by end of this week.</p>
                            </div>
                            <div className="p-5 rounded-xl bg-richblack-900/50 border border-richblack-800 hover:border-richblack-700 transition-all duration-300">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-bold text-caribbeangreen-100 uppercase tracking-wider bg-caribbeangreen-900/20 px-2 py-0.5 rounded">Events</span>
                                    <span className="text-xs text-richblack-400">June 10, 2026</span>
                                </div>
                                <h3 className="text-lg font-semibold text-richblack-5 mb-2">Annual Technical Symposium</h3>
                                <p className="text-sm text-richblack-300">CampusSphere's annual tech fest registration is now live. Projects proposals are invited from all engineering branches.</p>
                            </div>
                        </div>
                    </div>

                    {/* course slider */}
                    <div className='mx-auto box-content w-full max-w-maxContentTab px- py-12 lg:max-w-maxContent'>
                        <h2 className='text-white mb-6 text-2xl '>
                            Academic Syllabus Modules 🏆
                        </h2>
                        <Course_Slider Courses={CatalogPageData?.selectedCategory?.courses} />
                    </div>
                </div>

                {/*Section 2  */}
                <div className='bg-pure-greys-5 text-richblack-700 '>
                    <div className='homepage_bg h-[310px]'>
                        <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                            <div className='h-[150px]'></div>
                            <div className='flex flex-row gap-7 text-white '>
                                <CTAButton active={true} linkto={"/signup"}>
                                    <div className='flex items-center gap-3' >
                                        Explore Academic Courses
                                        <FaArrowRight />
                                    </div>
                                </CTAButton>
                                <CTAButton active={false} linkto={"/signup"}>
                                    <div>
                                        Learn more
                                    </div>
                                </CTAButton>
                            </div>
                        </div>
                    </div>

                    <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                        <div className='flex flex-col lg:flex-row gap-5 mb-10 mt-[95px]'>
                            <div className='text-3xl lg:text-4xl font-semibold w-full lg:w-[45%]'>
                                Acquire the Knowledge you need for an
                                <HighlightText text={"Excellent Academic Record"} />
                            </div>

                            <div className='flex flex-col gap-10 w-full lg:w-[40%] items-start'>
                                <div className='text-[16px]'>
                                    The modern CampusSphere dictates its own terms. Today, an integrated institutional ecosystem empowers academic growth and administrative excellence.
                                </div>
                                <CTAButton active={true} linkto={"/signup"}>
                                    <div>
                                        Learn more
                                    </div>
                                </CTAButton>
                            </div>
                        </div>


                        {/* leadership */}
                        <TimelineSection />

                    </div>

                </div>


                {/*Section 3 */}
                <div className='mt-14 w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>
                    <InstructorSection />

                    {/* Reviws from Other Learner */}
                    <h1 className="text-center text-3xl lg:text-4xl font-semibold mt-8 flex justify-center items-center gap-x-3">
                        Reviews from enrolled undergraduates <MdOutlineRateReview className='text-yellow-25' />
                    </h1>
                    <ReviewSlider />
                </div>

                {/*Footer */}
                <Footer />
            </div >
        </React.Fragment>
    )
}

export default Home
