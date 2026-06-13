# CampusSphere Functional Workflows 🔄
> **A Comprehensive Guide to Role-Based Execution Paths & Internal Database State Operations**

This document tracks how data flows through the CampusSphere ecosystem across distinct institutional access boundaries.

---

## 👤 1. Strict Onboarding Flow (Student Sign-up)


```

[Student Onboarding Selects Option] ──> [Enforced Dropdowns: Sem 7 + Section B] ──> [DB User Record Created with Academic Metadata]

```

1.  **Access Entry:** The user navigates to the registration view and specifies an account role type (`Student`).
2.  **Constraint Enforcement:** The dynamic string text fields are completely replaced with strict dropdown select choices (`Semester 1-8` and `Section A/B/C`).
3.  **Data Generation:** Password strings undergo secure client-side checks and standard server-side hashing before document insertion.
4.  **Bypass Matrix:** Legacy workflows for Email OTP verification and external SMTP mailing networks are fully bypassed to reduce startup latency. The account state defaults directly to `approved: true`.

---

## 📝 2. Faculty Syllabus Insertion Flow (Lecturer Operations)


```

[Lecturer Creates Course] ──> [Assigns Target: Sem 7, Section B] ──> [Automatic Match Query Triggered] ──> [Instant Student Portal Injection]

```

1.  **Course Initialization:** A authenticated lecturer goes to the `/dashboard/add-course` panel and provides administrative course data (Title, Description, Engineering Category).
2.  **Structural Categorization:** Fallback marketplace items are replaced with explicit engineering divisions: `Core Engineering`, `Professional Elective`, `Open Elective`, or `Lab Practical`.
3.  **Target Binding:** The Lecturer assigns two rigid target parameters:
    * `Target Semester` (e.g., `Semester 7`)
    * `Target Section` (e.g., `Section B`)
4.  **Building Modules:** The faculty member builds course nested units by creating `Sections` and uploading atomic media lectures (`SubSections`).

---

## ⚙️ 3. Push-Based Automatic Enrollment (Behind-the-Scenes)

The moment a course state changes or goes live under a matching target category, an automated background database hook initiates:

1.  **Query Execution:** The controller executes a search across the user collection:
    ```javascript
    User.find({ accountType: "Student", semester: course.targetSemester, classSection: course.targetSection })
    ```
2.  **Cross-Document Synchronization:**
    * The collection of discovered Student IDs is written as a batch append (`$addToSet`) inside the Course's `studentsEnrolled` array.
    * Reciprocally, the unique `course._id` is securely written directly into the `enrolledCourses` state array across all corresponding Student records.
3.  **Portal Isolation Assurance:** This blocks accidental data exposure, ensuring a student registered in `Semester 7 - Section A` can never read or view an analytical course assigned to `Semester 7 - Section B`.

---

## ⏱️ 4. Dynamic Time Aggregation Workflow

1.  **Duration Input Entry:** When video files are uploaded via Cloudinary, the frontend wizard captures raw, integer time metadata values directly parsed from the video player context.
2.  **Mathematical Summation:** The analytical dashboard strips static placeholders and loops through child lecture instances:
    $$\text{Total Duration} = \sum_{i=1}^{n} \text{subSection}[i].\text{duration}$$
3.  **Formatter Conversion:** The compiled runtime integers map into a safe layout converter (`secToDuration.js`). It strips legacy market padding constants and formats the final display string based on real video time (e.g., an isolated 10-minute file securely reflects as `10 min`).
