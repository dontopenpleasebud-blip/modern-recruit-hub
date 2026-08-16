export const profile = {
  name: "Katakam Bhargav",
  shortName: "Bhargav",
  roles: ["Full Stack Developer", "Data Analyst", "Problem Solver"],
  tagline:
    "Computer Science undergrad building fast, reliable web applications — from REST APIs to production dashboards.",
  summary:
    "A final-year Computer Science engineering student with hands-on experience across full-stack web development and data analysis. Six months as a Java web development intern, plus freelance delivery of a production billing system. Self-starter, quick learner, strong problem solver — currently open to internship and entry-level software roles.",
  email: "katakambhargav073@gmail.com",
  phone: "+91 8074200988",
  location: "Palakollu, West Godavari, Andhra Pradesh, India",
  github: "https://github.com/bhargav2006",
  linkedin: "https://www.linkedin.com/in/bhargav-katakam-62118227a/",
  resume: "/assets/KATAKAM_BHARGAV_RESUME.pdf",
  photo: "/assets/IMG_7926.png",
  dob: "28-01-2006",
  languages: "Telugu, English, Hindi",
  status: "Open to Opportunities",
};

export const stats = [
  { num: "5+", label: "Projects shipped" },
  { num: "5", label: "Certifications" },
  { num: "6 mo", label: "Internship" },
  { num: "7.63", label: "CGPA" },
];

export const skills = [
  { name: "Programming", tech: "C, Java, Python", pct: 90 },
  {
    name: "Web Development",
    tech: "HTML, CSS, JavaScript, React.js, Node.js, Express.js, Java Servlets",
    pct: 85,
  },
  { name: "Databases", tech: "MySQL, MongoDB, SQLite", pct: 75 },
  { name: "Data Analysis", tech: "Pandas, Matplotlib, Seaborn", pct: 70 },
  { name: "Tools & DevOps", tech: "Git, GitHub, VS Code, Eclipse, Nginx, PM2", pct: 90 },
  {
    name: "Soft Skills",
    tech: "Problem solving, Adaptability, Ownership, Communication",
    pct: 100,
  },
];

export type Project = {
  title: string;
  date: string;
  desc: string;
  tags: string[];
  image: string;
  github: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "mini-Trello",
    date: "Apr 2026 — May 2026",
    desc: "Full-stack multi-user task management system with secure authentication and real-time task creation, updates and synchronisation over Socket.IO.",
    tags: ["React", "Express.js", "MongoDB", "Socket.IO", "REST APIs"],
    image: "/assets/projects/mini-trello.png",
    github: "https://github.com/bhargav2006/mini-Trello",
    live: "https://mini-trello-0502.vercel.app/",
  },
  {
    title: "Personal Budget Tracker",
    date: "Mar 2026 — Apr 2026",
    desc: "Client-side budget tracker with transaction CRUD and monthly financial summaries, using SQLite (Wasm) plus localStorage for full offline persistence.",
    tags: ["React", "SQLite Wasm", "localStorage", "Chart.js"],
    image:
      "https://github.com/bhargav2006/Personal-Budget-Tracker/blob/main/screenshots/dashboard_overview.png?raw=true",
    github: "https://github.com/bhargav2006/Personal-Budget-Tracker",
    live: "https://personal-budget-tracker-bice.vercel.app/",
  },
  {
    title: "StocksApp",
    date: "Jul 2025 — Aug 2025",
    desc: "Responsive stock dashboard rendering dynamic company profiles and real-time quotes from the Finnhub API.",
    tags: ["React", "Bootstrap", "Finnhub API", "Dashboard"],
    image: "/assets/projects/StocksApp.png",
    github: "https://github.com/bhargav2006/StocksApp",
    live: "https://bhargav2006.github.io/StocksApp/",
  },
  {
    title: "React ToDo Application",
    date: "May 2025 — Jun 2025",
    desc: "Lightweight front-end task app built with React and Bootstrap, with Toastify-powered real-time notifications.",
    tags: ["React", "Bootstrap", "React Toastify"],
    image: "/assets/projects/React_ToDo.png",
    github: "https://github.com/bhargav2006/simple_ReactTODO",
    live: "https://simple-react-todo-virid.vercel.app/",
  },
  {
    title: "ToDo Application Backend",
    date: "Mar 2025 — May 2025",
    desc: "Node.js and Express backend exposing authenticated REST APIs for user and task CRUD, persisted in MongoDB.",
    tags: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
    image: "/assets/projects/ToDo_Backend.png",
    github: "https://github.com/bhargav2006/ToDo_Backend",
  },
];

export const education = [
  {
    title: "B.Tech, Computer Science & Engineering",
    org: "Swarnandhra College of Engineering and Technology, Narasapuram",
    date: "July 2024 — Present",
    badge: "CGPA 7.63",
    desc: "Focus on software development, data structures, algorithms and full-stack web technologies.",
  },
  {
    title: "Diploma, Computer Engineering",
    org: "Smt. B. Seetha Polytechnic, Bhimavaram",
    date: "June 2021 — April 2024",
    badge: "77.35%",
    desc: "Core computer engineering: programming, hardware, networking and problem solving.",
  },
  {
    title: "Secondary Education (10th)",
    org: "BRMV Municipal High School, Palakollu",
    date: "2020 — 2021",
    badge: "CGPA 8.7",
    desc: "Completed secondary education with consistently high academic performance.",
  },
];

export const experience = [
  {
    title: "Freelance Full Stack Developer — Billing System",
    org: "SLG Milk Dairies, P. Gannavaram, Andhra Pradesh",
    date: "May 2026 — June 2026",
    points: [
      "Built a production billing system with React, Express, Node.js and MongoDB covering customers, products and invoices.",
      "Integrated the WhatsApp Cloud API for automated invoice delivery to customers.",
      "Deployed on an Ubuntu VPS with Nginx and PM2, then handed over after testing with the client.",
    ],
  },
  {
    title: "Java Web Developer Intern",
    org: "R.K. InfoSystems, Hyderabad, Telangana",
    date: "June 2023 — November 2023",
    points: [
      "Developed a QR-based dine-in reservation application using React, Java Servlets and MySQL.",
      "Designed RESTful APIs for efficient frontend–backend communication.",
      "Improved performance, fixed defects and hardened application security.",
      "Worked in a collaborative team workflow across the full stack.",
    ],
  },
];

export const certifications = [
  {
    title: "Web Development Intern — R.K. InfoSystems",
    issuer: "LinkedIn",
    year: "2024",
    link: "https://www.linkedin.com/in/bhargav-katakam-62118227a/overlay/Position/2504867943/treasury/?profileId=ACoAAEQDRPkBK7FUHgQizLN45qd7LAKRNNtQkhI",
    file: "/assets/cirtifications/Bhargav_RK_Info_Systems_OL.png",
  },
  {
    title: "Python 101 for Data Science",
    issuer: "Cognitive Class",
    year: "2024",
    link: "https://courses.cognitiveclass.ai/certificates/0c30761584c0401b970a9e4befe5e183",
    file: "/assets/cirtifications/Python_101_for_Data_Science.pdf",
  },
  {
    title: "Data Visualization Using Python",
    issuer: "Credly",
    year: "2024",
    link: "https://www.credly.com/badges/859167ee-cb2e-4c4f-8c35-e96d195deac5",
    file: "/assets/cirtifications/Data_Visualization_Using_Python.pdf",
  },
  {
    title: "Data Analysis with Python",
    issuer: "Cognitive Class",
    year: "2024",
    link: "https://courses.cognitiveclass.ai/certificates/e0f3566951e949b480a096768cc7917f",
    file: "/assets/cirtifications/Data_Analysis_with_Python.pdf",
  },
  {
    title: "AWS Academy Graduate — Data Engineering",
    issuer: "Credly",
    year: "2024",
    link: "https://www.credly.com/badges/67e09602-6143-489d-a71d-70278a23b9e9",
    file: "/assets/cirtifications/AWS_Academy_Graduate-Data_Engineering-Training_Badge.pdf",
  },
];

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  { to: "/certifications", label: "Certifications" },
  { to: "/contact", label: "Contact" },
] as const;
