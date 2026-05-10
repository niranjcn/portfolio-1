const fs = require('fs');
let c = fs.readFileSync('src/data/content.js', 'utf8');

// ── 1. Add images to TRACIENT (project 01) ──────────────────────────────────
c = c.replace(
  "illustration: 'merkle',",
  "illustration: 'merkle',\n        images: [\n          '/images/tracient/architecturefinal(2).png',\n          '/images/tracient/blockchain.png',\n          '/images/tracient/ai_model.png',\n          '/images/tracient/anomaly.png',\n          '/images/tracient/anomaly_model_results.png',\n          '/images/tracient/erdiagram.png',\n          '/images/tracient/frontend1.png',\n          '/images/tracient/frontend2.png',\n          '/images/tracient/journal.png',\n          '/images/tracient/policy.png',\n        ],"
);

// ── 2. Add images to DMS (project 03) ───────────────────────────────────────
c = c.replace(
  "illustration: 'network',",
  "illustration: 'network',\n        images: [\n          '/images/dms/Screenshot 2026-05-10 085439.png',\n          '/images/dms/Screenshot 2026-05-10 085620.png',\n          '/images/dms/Screenshot 2026-05-10 085647.png',\n          '/images/dms/Screenshot 2026-05-10 085734.png',\n          '/images/dms/Screenshot 2026-05-10 085812.png',\n        ],"
);

// ── 3. Add images to step4eco (project 04) ──────────────────────────────────
c = c.replace(
  "illustration: 'house',",
  "illustration: 'house',\n        images: [\n          '/images/step4eco/Screenshot 2026-05-10 085948.png',\n          '/images/step4eco/Screenshot 2026-05-10 090001.png',\n        ],"
);

// ── 4. Add images to Exam Hall (project 05) ─────────────────────────────────
c = c.replace(
  "illustration: 'grid',",
  "illustration: 'grid',\n        images: [\n          '/images/examhall/1000233804.jpg',\n          '/images/examhall/1000233805.jpg',\n          '/images/examhall/Screenshot 2026-05-10 125138.png',\n          '/images/examhall/Screenshot 2026-05-10 125145.png',\n        ],"
);

// ── 5. Add images to KCCL (project 06) ──────────────────────────────────────
c = c.replace(
  "illustration: 'documents',",
  "illustration: 'documents',\n        images: [\n          '/images/kccl/1000233801.jpg',\n          '/images/kccl/1000233802.jpg',\n          '/images/kccl/1000233803.jpg',\n        ],"
);

// ── 6. Add new projects before the closing ], ────────────────────────────────
const newProjects = `
      {
        number: '07',
        title: 'ConfessIt — Anonymous Confessions Platform',
        tagline: 'Anonymous confessions, matchmaking, love notes and mini-games.',
        stackLine: 'React · FastAPI · MongoDB · Docker',
        stack: ['React', 'TypeScript', 'FastAPI', 'Python', 'MongoDB', 'Docker', 'Docker Compose', 'Tailwind CSS', 'Shadcn UI'],
        description:
          'A full-stack anonymous social platform with confessions, matchmaking, love notes and mini-games. Magic-link auth, Docker-deployed FastAPI backend, MongoDB.',
        longDescription: [
          'ConfessIt is a full-stack web application that provides a safe and anonymous space for users to share confessions, connect with others, and engage in fun activities.',
          'Features include anonymous confessions with reactions and comments, matchmaking to find and connect with other users, anonymous love notes, and mini-games to break the ice.',
          'The backend is built with FastAPI and Python, storing data in MongoDB, fully containerized with Docker Compose. The frontend uses React, TypeScript, Tailwind CSS, and Shadcn UI components. Authentication uses magic links for a seamless, passwordless experience.',
        ],
        highlights: [
          'Anonymous confession system with reactions and comments',
          'Matchmaking engine to connect users with shared interests',
          'Magic-link authentication for passwordless onboarding',
          'Love notes and mini-games features for engagement',
          'Fully Dockerized full-stack deployment',
        ],
        metrics: [
          ['5+', 'core features'],
          ['Magic', 'link auth'],
          ['Docker', 'deployed'],
        ],
        badges: ['Full-Stack · Social Platform'],
        links: {
          github: 'https://github.com/niranjcn',
          live: 'https://linkedin.com/in/niranjcn',
        },
        featured: false,
        illustration: 'network',
        year: '2025',
        status: 'Delivered',
        images: [],
      },
      {
        number: '08',
        title: 'Network Backup Management System',
        tagline: 'Centralized multi-NOC network config backup with Google Drive & WhatsApp alerts.',
        stackLine: 'FastAPI · React · MongoDB · Docker · Netmiko · Google Drive API',
        stack: ['FastAPI', 'Python', 'React', 'MongoDB', 'Docker', 'Docker Compose', 'Netmiko', 'JWT', 'RBAC', 'Google Drive API', 'WhatsApp API'],
        description:
          'Centralized network backup system for Kerala Vision Broadband. Manages multi-NOC device configs with automated scheduled backups, version comparison, Google Drive storage and WhatsApp alerts.',
        longDescription: [
          'A comprehensive, centralized solution for managing and backing up network device configurations across multiple, geographically dispersed Network Operations Centers (NOCs) — built during the Kerala Vision Broadband DevOps internship.',
          'Key features include multi-NOC management, real-time dashboard, device management, automated and scheduled backups (daily/weekly/monthly), visual configuration comparison between backup versions, and Google Drive integration for secure off-site storage.',
          'Integrated WhatsApp API for automated backup status alerts eliminates ~15 hours/week of manual monitoring. JWT-based RBAC with Head Admin, Admin, and User roles. Fully containerized with Docker Compose for production deployment.',
        ],
        highlights: [
          'Multi-NOC centralized management for Kerala Vision Broadband',
          'Scheduled backups via Netmiko + cron (daily/weekly/monthly)',
          'Google Drive API for cloud backup storage',
          'WhatsApp API alerts for automated notifications',
          'Visual configuration diff comparison between versions',
          '~15 hrs/week manual operations eliminated',
        ],
        metrics: [
          ['Multi-NOC', 'deployment'],
          ['80%', 'ops reduction'],
          ['Auto', 'scheduled'],
        ],
        badges: ['Kerala Vision Broadband — Production'],
        links: {
          github: 'https://github.com/niranjcn',
          live: 'https://linkedin.com/in/niranjcn',
        },
        featured: false,
        illustration: 'network',
        year: '2025',
        status: 'Production',
        images: [],
      },
      {
        number: '09',
        title: 'BS DNS Manager',
        tagline: 'Advanced DNS redirection and lifecycle management with RPZ logic.',
        stackLine: 'FastAPI · React · TypeScript · MongoDB · Docker · Selenium',
        stack: ['FastAPI', 'Python', 'React', 'TypeScript', 'MongoDB', 'Motor', 'Docker', 'Docker Compose', 'Tailwind CSS', 'Framer Motion', 'Selenium', 'JWT'],
        description:
          'Advanced full-stack DNS management system with RPZ-based redirection, domain lifecycle automation, bulk CSV upload, and real-time dashboard.',
        longDescription: [
          'The BS DNS Manager is an advanced domain management system engineered to streamline DNS redirection and automate the lifecycle management of DNS entries based on their expiration dates.',
          'Built with a FastAPI backend and React + TypeScript frontend, the platform uses Response Policy Zone (RPZ) logic to ensure real-time propagation of DNS changes. Features include comprehensive domain management (add/search/filter with various source/target types), scheduled automated expiry tasks, bulk CSV upload, and a stealth mode UI theme.',
          'The system integrates Selenium for automation tasks and uses MongoDB with the Motor async driver for high-performance data operations. Framer Motion animations create a futuristic, polished UI experience.',
        ],
        highlights: [
          'RPZ-based DNS redirection with real-time propagation',
          'Automated domain lifecycle management with scheduled expiry',
          'Bulk domain upload via CSV file',
          'Stealth mode UI and Framer Motion animations',
          'Selenium-powered automation for DNS operations',
        ],
        metrics: [
          ['Real-time', 'DNS sync'],
          ['RPZ', 'policy logic'],
          ['Bulk', 'CSV upload'],
        ],
        badges: ['Production DNS System'],
        links: {
          github: 'https://github.com/niranjcn',
          live: 'https://linkedin.com/in/niranjcn',
        },
        featured: false,
        illustration: 'network',
        year: '2025',
        status: 'Production',
        images: [],
      },
      {
        number: '10',
        title: 'IGNITE — Sports Event Website',
        tagline: 'Sports fest website for St. Thomas College annual event.',
        stackLine: 'React · Vite · Tailwind CSS',
        stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'JavaScript'],
        description:
          'Official sports event website for IGNITE, the annual sports fest of St. Thomas College of Engineering and Technology. Built and maintained by Vblaze Tech Club.',
        longDescription: [
          'IGNITE is the official sports festival website for St. Thomas College of Engineering and Technology, designed and built by the Vblaze Tech Club under Niranj\'s leadership as President.',
          'The site features event listings, schedule displays, registration flows, and live leaderboards for various sports events. Designed with a high-energy visual aesthetic using Framer Motion animations and a bold color palette to match the festival spirit.',
          'Served 500+ participants during the annual fest. Built with React + Vite for performance and Tailwind CSS for rapid UI development.',
        ],
        highlights: [
          'Official college sports fest website',
          'Served 500+ participants',
          'Built by Vblaze Tech Club',
          'Framer Motion animations and high-energy UI',
          'Event listings, schedule and registration flow',
        ],
        metrics: [
          ['500+', 'participants'],
          ['Vblaze', 'tech club'],
          ['React', 'Vite'],
        ],
        badges: ['St. Thomas College — Annual Sports Fest'],
        links: {
          github: 'https://github.com/niranjcn',
          live: 'https://linkedin.com/in/niranjcn',
        },
        featured: false,
        illustration: 'grid',
        year: '2024',
        status: 'Delivered',
        images: [],
      },
      {
        number: '11',
        title: 'XTASY — Techno-Cultural Fest Website',
        tagline: 'Techno-cultural event website for St. Thomas College annual fest.',
        stackLine: 'React · Vite · Tailwind CSS',
        stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'JavaScript'],
        description:
          'Official techno-cultural fest website for XTASY, the annual cultural event of St. Thomas College of Engineering and Technology. Built and maintained by Vblaze Tech Club.',
        longDescription: [
          'XTASY is the official techno-cultural festival website for St. Thomas College of Engineering and Technology, designed and built by the Vblaze Tech Club under Niranj\'s leadership as President.',
          'The site features event categories spanning technical competitions, cultural performances, and workshops. Interactive event registration, countdown timers, and a dynamic event gallery create an immersive pre-fest experience for students.',
          'Served 500+ participants. Built with React + Vite for fast performance and Tailwind CSS for consistent, scalable styling.',
        ],
        highlights: [
          'Official college techno-cultural fest website',
          'Served 500+ participants',
          'Interactive event registration and countdown',
          'Dynamic event gallery and schedule',
          'Built and led by Vblaze Tech Club',
        ],
        metrics: [
          ['500+', 'participants'],
          ['Vblaze', 'tech club'],
          ['React', 'Vite'],
        ],
        badges: ['St. Thomas College — Techno-Cultural Fest'],
        links: {
          github: 'https://github.com/niranjcn',
          live: 'https://linkedin.com/in/niranjcn',
        },
        featured: false,
        illustration: 'grid',
        year: '2024',
        status: 'Delivered',
        images: [],
      },`;

// Insert new projects before the closing of list array
c = c.replace("      },\n    ],\n  },\n  experience:", newProjects + "\n    ],\n  },\n  experience:");

// ── 7. Add certificates section before contact ────────────────────────────────
const certsSection = `  certificates: {
    label: 'CERTIFICATES',
    subtitle: 'Courses, workshops, and certifications completed.',
    list: [
      {
        id: 'webdesign',
        title: '1-Day Web Design Challenge',
        issuer: 'Vblaze Tech Club',
        year: '2023',
        image: '/images/Certificates-main/Certificates-main/1-day web design challenge.jpg',
        tags: ['Web Design', 'Workshop'],
      },
      {
        id: 'autocad',
        title: 'AutoCAD Certification',
        issuer: 'Online Course',
        year: '2023',
        image: '/images/Certificates-main/Certificates-main/Auto CAD-1.png',
        tags: ['AutoCAD', 'Design'],
      },
      {
        id: 'devops',
        title: 'DevOps, Cloud Computing & Cyber Security',
        issuer: 'Online Course',
        year: '2024',
        image: '/images/Certificates-main/Certificates-main/DevOps, Cloud Computing and Cyber Se....png',
        tags: ['DevOps', 'Cloud', 'Security'],
      },
      {
        id: 'docker-k8s-2',
        title: 'Docker & Kubernetes',
        issuer: 'Online Course',
        year: '2024',
        image: '/images/Certificates-main/Certificates-main/Docker & Kubernetes -2.png',
        tags: ['Docker', 'Kubernetes'],
      },
      {
        id: 'docker-k8s',
        title: 'Docker & Kubernetes (Advanced)',
        issuer: 'Online Course',
        year: '2024',
        image: '/images/Certificates-main/Certificates-main/docker & Kubernities.png',
        tags: ['Docker', 'Kubernetes'],
      },
      {
        id: 'data-science',
        title: 'Introduction to Data Science',
        issuer: 'Online Course',
        year: '2023',
        image: '/images/Certificates-main/Certificates-main/Introduction_to_Data_Science_certifi....png',
        tags: ['Data Science', 'ML'],
      },
      {
        id: 'payment-lld',
        title: 'Low Level Design of Payment Apps',
        issuer: 'Online Course',
        year: '2024',
        image: '/images/Certificates-main/Certificates-main/Low_Level_Design_of_Payment_Apps.png',
        tags: ['System Design', 'FinTech'],
      },
      {
        id: 'ms-entra',
        title: 'Microsoft Entra',
        issuer: 'Microsoft',
        year: '2024',
        image: '/images/Certificates-main/Certificates-main/microsoft_entra.png',
        tags: ['Microsoft', 'Identity', 'Cloud'],
      },
      {
        id: 'mlops',
        title: 'MLOps Fundamentals',
        issuer: 'Online Course',
        year: '2024',
        image: '/images/Certificates-main/Certificates-main/MLOps Fundamentals.png',
        tags: ['MLOps', 'ML', 'DevOps'],
      },
      {
        id: 'raet26-cert',
        title: "Best Paper Award — RAET'26",
        issuer: 'RAET National Conference',
        year: '2026',
        image: '/images/Certificates-main/Certificates-main/Niranj C N-1.png',
        tags: ['Award', 'Research', 'National Level'],
        featured: true,
      },
      {
        id: 'react-bootcamp',
        title: 'React Bootcamp',
        issuer: 'Online Course',
        year: '2023',
        image: '/images/Certificates-main/Certificates-main/React-Bootcamp.png',
        tags: ['React', 'Frontend'],
      },
      {
        id: 'ml-roadmap',
        title: 'Roadmap to Become a ML Engineer',
        issuer: 'Online Course',
        year: '2023',
        image: '/images/Certificates-main/Certificates-main/Roadmap to Become a  ML  Engineer.png',
        tags: ['ML', 'Career'],
      },
      {
        id: 'solid',
        title: 'S.O.L.I.D Principles',
        issuer: 'Online Course',
        year: '2024',
        image: '/images/Certificates-main/Certificates-main/S.O.L.I.D PRINCIPLES EVERY DEVELOPER....png',
        tags: ['Software Design', 'Architecture'],
      },
      {
        id: 'self-driving-ev',
        title: 'Self Driving EV',
        issuer: 'Online Course',
        year: '2023',
        image: '/images/Certificates-main/Certificates-main/Self Driving EV-1.png',
        tags: ['AI', 'Automotive'],
      },
      {
        id: 'teachnook-course',
        title: 'Teachnook Course Completion',
        issuer: 'Teachnook',
        year: '2023',
        image: '/images/Certificates-main/Certificates-main/Teachnook COURSE Completion Certific....png',
        tags: ['Course', 'Completion'],
      },
      {
        id: 'teachnook-intern',
        title: 'Teachnook Internship Completion',
        issuer: 'Teachnook',
        year: '2023',
        image: '/images/Certificates-main/Certificates-main/TEACHNOOK Internship Completion Cert....png',
        tags: ['Internship', 'Completion'],
      },
      {
        id: 'ui-ux',
        title: 'UI and UX Design',
        issuer: 'Online Course',
        year: '2023',
        image: '/images/Certificates-main/Certificates-main/UI and UX-1.png',
        tags: ['UI/UX', 'Design'],
      },
      {
        id: 'vblaze-webdesign',
        title: 'Vblaze Web Designing Challenge',
        issuer: 'Vblaze Tech Club',
        year: '2024',
        image: '/images/Certificates-main/Certificates-main/Vblaze web designing challenge-1.png',
        tags: ['Web Design', 'Competition'],
      },
    ],
  },
`;

c = c.replace("  contact: {", certsSection + "  contact: {");

fs.writeFileSync('src/data/content.js', c, 'utf8');
console.log('Done! content.js updated with images, new projects, and certificates.');
