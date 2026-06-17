# CampusSphere 🌐

> **An Institutional Learning Management System (LMS) for Unified Higher Education Resource Delivery**

CampusSphere is a full-stack MERN application engineered to eliminate the friction points of traditional online course marketplaces when adapted to localized college structures. Built specifically around academic constraints, CampusSphere bridges the gap between department lecture halls and distributed content delivery through localized, section-targeted enrollment and real-time announcement broadcasting.

---

## 🚀 Hackathon Core Features

### 🏢 1. Institutional Target Alignment Architecture

Unlike commercial e-commerce platforms where users discover and purchase generic courses, CampusSphere handles access strictly at the infrastructure level:

* **Unified Academic Schemas:** Both Student profiles and Course/Notice payloads share matching parameters for `semester` (1–8) and `classSection` (`Section A`, `Section B`, `Section C`).
* **Zero-Cart Push Model:** Shopping carts, checkout steps, signature matching, and payment gateways have been completely excised. Courses are designated as free and immediate core syllabus components.

### 🛡️ 2. Enrollment Mismatch Auto-Resolution

* **Strict Structural Matching:** Eradicates common string collisions (e.g., `CSE-B` vs. `Section B`) by utilizing standardized option selections across registration panels and faculty wizard steps.
* **Instant Sync Hooks:** When a Lecturer publishes an engineering course, a backend database hook queries all active undergraduates sharing matching targets and automatically links the documents, establishing instantaneous access on student portals.

### 📢 3. Targeted Notice Board & Document Broadcast System *(New Upgrade!)*

* **Frictionless Communication Routing:** Allows faculty members and department heads to post short-term updates, urgent alerts, and event changes without needing to spin up a heavy course playlist.
* **Cloud-Native Document Handouts:** Faculty can seamlessly attach reference materials and PDFs. The files are streamed securely via cloud CDNs, allowing targeted student pools to instantly view and download them straight from an integrated alert banner panel at the top of their dashboard.

### 📊 4. Precision Media Duration Aggregation

* **Dynamic Parsing Engine:** Replaces hardcoded commercial display metrics with real-time mathematical aggregation.
* **Accurate Section Summation:** Loops dynamically through structural course layouts (`sections` and `subSections`), summing the precise durations of uploaded media files to calculate total reading/viewing length down to the single minute (e.g., `10 min`).

---

## 🛠️ Tech Stack & Infrastructure

* **Frontend:** React.js, Vite, Tailwind CSS, Redux Toolkit (State Management), React Hook Form
* **Backend:** Node.js, Express.js, MongoDB (Mongoose ODM)
* **Media Hosting & Cloud Storage:** Cloudinary Integration for high-performance video lectures, course thumbnails, and PDF document handout attachments
* **Branding & Styling:** Deep institutional palette overhauls unlinked from the marketplace boilerplate codebases

---

## 📂 Repository Layout

```text
├── backend/
│   ├── config/          # Database connection & Cloudinary storage handlers
│   ├── controllers/     # Modular business logic (Auth, Course Execution, Category, Notice)
│   ├── models/          # Target-enforced Mongoose Schemas (User, Course, Section, Notice)
│   └── routes/          # Clean, role-guarded Express endpoints (User, Course, Profile)
└── frontend/
    ├── data/            # Localized navigation grids & academic footer configurations
    ├── src/
    │   ├── components/  # Atomic React design units (Auth, Dashboard Wizards, Notice Form)
    │   ├── pages/       # Overhauled Landing, Institutional About, & Grievance views
    │   └── slices/      # Redux structural slices ensuring seamless rendering state

```

---

## ⚙️ Quick Local Initialization

### Prerequisites

* Node.js installed locally
* MongoDB Instance URI
* Cloudinary Storage API Keys

### Step 1: Backend Setup

```bash
cd backend
npm install

```

Create a `.env` file in the root of the `backend/` directory with the following structure:

```env
PORT=4000
MONGODB_URL=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret_token
FOLDER_NAME=campussphere_media_bucket
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

```

Run the development listener:

```bash
npm start

```

### Step 2: Frontend Setup

```bash
cd ../frontend
npm install

```

Configure your environment parameters if API endpoints require redirection, then fire up the development compilation server:

```bash
npm run dev

```

Navigate to `http://localhost:5173/` in your browser.
