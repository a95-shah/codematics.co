export interface NewsItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  content: string;
  coverImage?: string;
}

export const newsItems: NewsItem[] = [
  {
    slug: "cv-maker-resume-builder-app",
    title: "CV Maker | Resume Builder App",
    description: "Create standardized and personalized resumes — the job search companion for every professional. Available on iOS and Android.",
    date: "Dec 2024",
    category: "Product Launch",
    content: "We are thrilled to announce the launch of CV Maker | Resume Builder, the ultimate companion for job seekers everywhere. This innovative app provides over 40 professionally designed resume templates, smart content suggestions powered by AI, and ATS-friendly formatting to help you stand out in today's competitive job market.\n\nWhether you're a fresh graduate crafting your first resume or an experienced professional looking to update your CV, our app guides you through every step of the process. With features like LinkedIn profile import, real-time preview, and multiple export formats (PDF, DOCX), creating a polished, professional resume has never been easier.\n\nThe app is now available for free download on both the App Store and Google Play Store, with premium features available through an affordable subscription plan. Join thousands of professionals who are already using CV Maker to land their dream jobs.",
  },
  {
    slug: "bomber-warriors-reloaded",
    title: "Bomber Warriors: Reloaded",
    description: "Find the spirit of challenges — an exciting action-packed gaming experience by Codematics, now reloaded with new levels.",
    date: "Nov 2024",
    category: "Game Release",
    content: "Get ready for the ultimate action-packed experience! Codematics is proud to present Bomber Warriors: Reloaded — a completely revamped version of our beloved Bomber Warrior game with all-new levels, enhanced graphics, and exciting gameplay mechanics.\n\nThis major update brings 50 new levels across 5 different themed worlds, introducing new enemies, power-ups, and boss battles that will test even the most skilled players. The graphics engine has been completely overhauled, delivering stunning visual effects and smoother animations on all devices.\n\nNew features include daily challenges with exclusive rewards, a global tournament mode where players can compete for top rankings, and a social hub where you can connect with friends and share your achievements. The game also introduces a new character customization system with dozens of skins and accessories to unlock.\n\nBomber Warriors: Reloaded is available as a free update for existing players and as a new download on the App Store and Google Play Store.",
  },
  {
    slug: "blood-community-mobile-app",
    title: "Blood Community Mobile App",
    description: "Give blood, save lives — a community-driven app connecting blood donors with recipients in real-time.",
    date: "Oct 2024",
    category: "Social Impact",
    content: "Codematics is proud to launch Blood Community, a life-saving mobile application designed to bridge the critical gap between blood donors and recipients. This CSR-driven initiative reflects our commitment to using technology for social good and making a real difference in people's lives.\n\nBlood Community creates a connected network of registered blood donors who can be quickly located and contacted during emergencies. The app uses location-based matching to find nearby compatible donors, sends real-time push notifications for urgent blood requests, and integrates with local blood bank directories to provide comprehensive information.\n\nKey features include easy donor registration with blood type verification, donation history tracking, an emergency SOS button for urgent requests, and a community engagement platform where donors can connect and share their experiences. The app also provides educational content about blood donation, eligibility criteria, and the impact of regular donations.\n\nWe believe that technology should serve humanity, and Blood Community is a testament to that belief. The app is available for free on both iOS and Android platforms.",
  },
  {
    slug: "fund-raising-record-keeper-app",
    title: "Fund-Raising Record Keeper App",
    description: "Easily manage and monitor all fundraising records and activities with our comprehensive management solution.",
    date: "Sep 2024",
    category: "Product Launch",
    content: "Managing fundraising activities just got a whole lot easier. Codematics introduces the Fund-Raising Record Keeper App — a comprehensive tool designed for organizations, NGOs, and community groups that conduct fundraising campaigns and need reliable record-keeping.\n\nThe app simplifies every aspect of fundraising management, from tracking individual donations and managing donor relationships to generating automated receipts and creating detailed financial reports. With multi-user access and role-based permissions, your entire team can collaborate effectively while maintaining data security and integrity.\n\nFeatures include real-time donation tracking with categorization, a donor CRM with contact management and communication history, automated receipt generation with customizable templates, campaign management tools for tracking goals and progress, and comprehensive reporting with export options to Excel and PDF.\n\nThe Fund-Raising Record Keeper App is available on iOS, Android, and web platforms, ensuring accessibility for organizations of all sizes.",
  },
  {
    slug: "flicky-chicky-fun-platform-arcader",
    title: "Flicky Chicky Fun Platform Arcader",
    description: "A delightful jumping and running game bringing fun for all ages — now available on all platforms.",
    date: "Aug 2024",
    category: "Game Release",
    content: "Introducing Flicky Chicky — the most adorable arcade platformer of the year! Codematics game studio has created a charming, fun-filled gaming experience that brings joy to players of all ages.\n\nGuide your cheerful chick character through beautifully designed worlds filled with obstacles, collect golden coins, discover hidden paths, and unlock new characters. With its intuitive one-tap controls, vibrant hand-drawn art style, and progressively challenging levels, Flicky Chicky delivers hours of entertainment.\n\nThe game features multiple themed worlds including Sunny Meadows, Crystal Caves, Sky Paradise, and Mystic Forest, each with unique gameplay mechanics and visual styles. Players can unlock over 20 different character skins, compete on global leaderboards, and take on daily challenges for exclusive rewards.\n\nFlicky Chicky is designed to be enjoyed by everyone — kids love the colorful graphics and simple controls, while adults appreciate the challenging later levels and achievement system. The game is free to download and play on both iOS and Android devices.",
  },
  {
    slug: "smart-tvs-remote-control",
    title: "Smart TVs Remote Control for iOS & Android",
    description: "The smartest remote control app for your Smart TV. Control any brand from your phone with ease.",
    date: "Jul 2024",
    category: "Product Update",
    content: "Codematics is excited to announce a major update to our Universal TV Remote app — now rebranded as Smart TVs Remote Control with a completely redesigned interface, expanded device compatibility, and powerful new features.\n\nWith over 180 million users worldwide, our remote control app has been the trusted choice for smart TV control. This update takes the experience to the next level with a sleek new UI, faster device discovery, and support for the latest TV models from Samsung, LG, Sony, TCL, Hisense, and more.\n\nNew features in this update include enhanced voice control with natural language support, a personalized channel guide with recommendations, smart home integration for controlling connected devices, screen mirroring from your phone to your TV, and improved IR blaster support for older TV models.\n\nThe update also introduces a redesigned remote interface with customizable button layouts, haptic feedback for a more tactile experience, and dark/light theme options. Performance improvements ensure faster connection times and more responsive control.\n\nThe Smart TVs Remote Control update is available now as a free download on both the App Store and Google Play Store.",
  },
  {
    slug: "codematics-journey-startup-to-global-impact",
    title: "Codematics Journey: From Startup to Global Impact",
    description: "A look back at our incredible journey from a small startup in Abbottabad to a global software company.",
    date: "Jun 2024",
    category: "Company News",
    content: "From a small office in Abbottabad, Pakistan to serving over 180 million users worldwide — the Codematics journey is a testament to the power of vision, perseverance, and technological excellence.\n\nFounded by Malik Ahsan Ali with a mission to create technology that serves humanity, Codematics has grown from a team of passionate developers into a multinational software company with offices in Pakistan and Estonia (EU). Our journey has been marked by continuous innovation, award-winning products, and a commitment to delivering excellence in every project.\n\nKey milestones in our journey include launching the Universal TV Remote app which now serves 180M+ users globally, completing 766+ projects across diverse industries, winning 33+ industry awards for software excellence, establishing our EU presence in Estonia, and launching the URRAAN CSR initiative providing free digital skills training.\n\nToday, Codematics stands as a trusted partner for businesses worldwide, offering services spanning mobile development, web development, game development, AI, blockchain, and digital marketing. Our diverse team of experts continues to push boundaries, creating solutions that make a real difference in people's lives.\n\nAs we look to the future, we remain committed to our founding mission — using technology to build a better, safer, and more peaceful world.",
  },
  {
    slug: "urraan-digital-skills-bootcamp-success",
    title: "URRAAN Digital Skills Bootcamp Success",
    description: "Our CSR initiative URRAAN has trained over 500 students in digital skills with a 75%+ success rate.",
    date: "May 2024",
    category: "CSR",
    content: "Codematics is proud to share the remarkable success of URRAAN, our flagship Corporate Social Responsibility initiative that is transforming lives through free digital skills education in Abbottabad and surrounding areas.\n\nURRAAN provides free monthly boot camps and internships covering a wide range of digital skills including web development, mobile app development, graphic design, digital marketing, and freelancing. Since its inception, the program has trained over 500 students, with a success rate exceeding 75% — meaning the majority of our graduates either start successful freelancing careers, secure local employment, or launch their own startups.\n\nThe latest cohort of URRAAN graduates has been particularly impressive, with students creating real-world projects, contributing to open-source communities, and securing positions at leading tech companies. Several graduates have also launched their own startups, creating employment opportunities for others in the region.\n\nURRAAN represents our belief that technology education should be accessible to everyone, regardless of their economic background. By investing in the next generation of digital talent, we are not only transforming individual lives but also contributing to the economic growth of our community.\n\nWe invite businesses and individuals to support URRAAN through mentorship, sponsorship, or simply spreading the word about this initiative.",
  },
  {
    slug: "codematics-pos-system-launch",
    title: "Codematics Point of Sale System Launch",
    description: "Introducing our comprehensive POS system for modern retail — complete with inventory management and analytics.",
    date: "Apr 2024",
    category: "Product Launch",
    content: "Codematics is excited to introduce our comprehensive Point of Sale (POS) system — a complete retail management solution designed for modern businesses that demand efficiency, reliability, and powerful insights.\n\nThe Codematics POS system combines fast, secure transaction processing with intelligent inventory management, customer relationship tools, and real-time business analytics. Whether you run a retail store, restaurant, or service business, our POS system adapts to your needs with customizable workflows and industry-specific features.\n\nKey features include lightning-fast checkout processing with barcode and QR code scanning, real-time inventory tracking with automatic reorder alerts, customer loyalty programs and CRM integration, staff management with time tracking and performance metrics, multi-location support with centralized reporting, and integration with popular payment gateways and accounting software.\n\nThe system is available across all platforms — iOS, Android, Web, and Desktop — ensuring you can manage your business from anywhere. Our cloud-based architecture guarantees data security, automatic backups, and seamless synchronization across all your devices.\n\nThe Codematics POS system is available with flexible pricing plans to suit businesses of all sizes, from small shops to enterprise chains.",
  },
];
