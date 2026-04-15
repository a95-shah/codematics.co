// /scripts/seed.js
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Models (CommonJS because it's a script)
const ServiceSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },
  iconName: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  longDescription: { type: String },
  details: [{ type: String }],
  features: [{ type: String }],
  technologies: [{ type: String }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  description: { type: String },
  color: { type: String },
  longDescription: { type: String },
  features: [{ type: String }],
  platforms: [{ type: String }],
  image: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const NewsPostSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String },
  category: { type: String },
  content: { type: String },
  coverImage: { type: String },
  author: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  bio: { type: String },
  image: { type: String },
  linkedin: { type: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const NewsPost = mongoose.models.NewsPost || mongoose.model('NewsPost', NewsPostSchema);
const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);

const services = [
  {
    slug: "mobile-apps-development",
    iconName: "HiDeviceMobile",
    title: "Mobile Apps Development",
    description: "The global scenario of Mobile Apps Development is currently witnessing an enormous growth...",
    longDescription: "At Codematics, we specialize in building cutting-edge mobile applications...",
    details: ["iOS & Android Native Apps", "Cross-Platform Development", "App Store Optimization", "Maintenance & Support"],
    features: ["Custom UI/UX tailored to your brand", "Real-time push notifications & analytics", "Offline-first architecture for seamless experience", "Integration with third-party APIs and services", "Scalable backend infrastructure", "Continuous updates and performance monitoring"],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "REST APIs"]
  },
  {
    slug: "web-development",
    iconName: "HiCode",
    title: "Web Development",
    description: "Team Codematics possesses excellent web development skills...",
    longDescription: "Our web development team combines creativity with technical expertise...",
    details: ["Full-Stack Web Applications", "Progressive Web Apps (PWA)", "E-Commerce Solutions", "CMS Development"],
    features: ["Responsive design across all devices", "SEO-optimized architecture", "Performance-first development approach", "Secure authentication and data handling", "Cloud-native deployment strategies", "Real-time features with WebSocket integration"],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS"]
  },
  {
    slug: "game-development",
    iconName: "HiDesktopComputer",
    title: "Game Development",
    description: "Making and developing games from an idea to its functional stage is where all the fun lies...",
    longDescription: "Our game development studio brings creative visions to life...",
    details: ["Unity & Unreal Engine", "2D & 3D Games", "AR/VR Experiences", "Cross-Platform Gaming"],
    features: ["Engaging gameplay mechanics and level design", "High-quality 2D and 3D graphics", "Multiplayer and social features", "In-app purchases and monetization", "Cross-platform compatibility", "Regular content updates and live ops"],
    technologies: ["Unity", "Unreal Engine", "C#", "C++", "Blender", "Photon"]
  },
  {
    slug: "ux-ui-graphic-design",
    iconName: "HiColorSwatch",
    title: "UX/UI & Graphic Design",
    description: "In a world increasingly driven by visual content...",
    longDescription: "Great design is the bridge between your brand and your audience...",
    details: ["User Experience Research", "Interface Design", "Brand Identity", "Design Systems"],
    features: ["User research and persona development", "Wireframing and interactive prototyping", "Visual design with pixel-perfect precision", "Comprehensive brand guidelines", "Accessibility-first design principles", "Design system creation and documentation"],
    technologies: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "After Effects", "InVision"]
  },
  {
    slug: "3d-modeling-animation",
    iconName: "HiCube",
    title: "3D Modeling & Animation",
    description: "We blend creativity with technical precision to transform visual storytelling...",
    longDescription: "Our 3D modeling and animation studio transforms ideas into breathtaking visual experiences...",
    details: ["Character Modeling", "Product Visualization", "Motion Graphics", "Architectural Rendering"],
    features: ["Photorealistic 3D rendering", "Character rigging and animation", "Product visualization for e-commerce", "Architectural walkthroughs and fly-throughs", "Motion graphics for marketing", "VFX and compositing for film"],
    technologies: ["Maya", "3ds Max", "Blender", "ZBrush", "Cinema 4D", "After Effects"]
  },
  {
    slug: "digital-marketing",
    iconName: "HiSpeakerphone",
    title: "Digital Marketing",
    description: "We at Codematics have the expertise of working on how to use the web and digital space...",
    longDescription: "In today's digital-first world, a strong online presence is essential...",
    details: ["SEO & SEM", "Social Media Marketing", "Content Strategy", "Analytics & Reporting"],
    features: ["Comprehensive SEO audits and optimization", "Targeted social media campaigns", "Pay-per-click advertising management", "Content creation and marketing", "Email marketing automation", "Performance tracking and ROI analysis"],
    technologies: ["Google Analytics", "SEMrush", "HubSpot", "Meta Ads", "Google Ads", "Mailchimp"]
  },
  {
    slug: "generative-ai",
    iconName: "HiLightningBolt",
    title: "Generative AI",
    description: "We are at the forefront of AI innovation...",
    longDescription: "Artificial Intelligence is reshaping every industry...",
    details: ["Custom AI Models", "LLM Integration", "AI-Powered Automation", "Chatbot Development"],
    features: ["Custom large language model fine-tuning", "AI-powered content generation", "Intelligent document processing", "Conversational AI and chatbots", "Predictive analytics and forecasting", "Computer vision solutions"],
    technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI API", "LangChain", "Hugging Face"]
  },
  {
    slug: "natural-language-processing",
    iconName: "HiChat",
    title: "Natural Language Processing",
    description: "Codematics unique approach to NLP helps clients create smarter systems...",
    longDescription: "Natural Language Processing is the key to making technology understand humans...",
    details: ["Text Analytics", "Sentiment Analysis", "Language Models", "Voice Assistants"],
    features: ["Advanced text classification and extraction", "Real-time sentiment and emotion analysis", "Multi-language translation systems", "Named entity recognition", "Speech-to-text and text-to-speech", "Custom knowledge base Q&A systems"],
    technologies: ["spaCy", "NLTK", "BERT", "GPT Models", "Whisper", "Python"]
  },
  {
    slug: "blockchain-technology",
    iconName: "HiLink",
    title: "Blockchain Technology",
    description: "As a trusted provider of blockchain development and consulting services...",
    longDescription: "Blockchain technology is revolutionizing how businesses handle transactions...",
    details: ["Smart Contracts", "DeFi Solutions", "NFT Marketplaces", "Blockchain Consulting"],
    features: ["Smart contract development and auditing", "Decentralized application (dApp) development", "Token creation and ICO/IDO platforms", "Supply chain transparency solutions", "Digital identity and authentication", "Blockchain integration with existing systems"],
    technologies: ["Solidity", "Ethereum", "Web3.js", "Hardhat", "IPFS", "Polygon"]
  }
];

const products = [
  { slug: "universal-tv-remote", title: "Universal TV Remote", description: "Over 180 million users worldwide...", color: "#c92228", longDescription: "Universal TV Remote is our flagship product with over 180 million users worldwide...", features: ["Compatible with 100+ TV brands", "Intuitive touchpad navigation", "Voice control integration", "Smart home device management", "Channel guide and favorites", "Custom remote layouts", "IR and WiFi connectivity", "Regular updates with new device support"], platforms: ["iOS", "Android"] },
  { slug: "invoice-billing-receipt-maker", title: "InvoiceBilling | Receipt Maker", description: "Fast invoices, quick payments...", color: "#2563eb", longDescription: "InvoiceBilling is a professional invoicing and receipt management solution...", features: ["Professional invoice templates", "Automatic payment reminders", "Multi-currency support", "Tax calculation and management", "Client database management", "Financial reports and analytics", "PDF and email sharing", "Recurring invoice automation"], platforms: ["iOS", "Android", "Web"] },
  { slug: "codematics-point-of-sale", title: "Codematics Point of Sale", description: "A full-featured POS system for modern retail...", color: "#059669", longDescription: "Codematics Point of Sale is a comprehensive retail management solution...", features: ["Fast checkout processing", "Inventory management with alerts", "Customer loyalty programs", "Staff management and time tracking", "Real-time sales analytics", "Multi-location support", "Barcode and QR scanning", "Integration with payment gateways"], platforms: ["iOS", "Android", "Web", "Desktop"] },
  { slug: "citizen-master", title: "Citizen Master", description: "Your ID, civil records, services — all in one secure digital platform...", color: "#7c3aed", longDescription: "Citizen Master is a secure digital platform that brings government services to citizens...", features: ["Digital identity management", "Civil records access", "Service request tracking", "Document verification", "Secure data encryption", "Multi-language support", "Push notification alerts", "Offline access to key documents"], platforms: ["iOS", "Android"] },
  { slug: "cv-maker-resume-builder", title: "CV Maker | Resume Builder", description: "Create standardized and personalized resumes instantly...", color: "#d97706", longDescription: "CV Maker is the ultimate resume building companion for job seekers...", features: ["40+ professional resume templates", "ATS-friendly formatting", "Smart content suggestions", "Multiple export formats (PDF, DOCX)", "Cover letter builder", "LinkedIn profile import", "Real-time preview", "Cloud sync across devices"], platforms: ["iOS", "Android"] },
  { slug: "smart-roku-remote", title: "Smart Roku Remote", description: "Your Roku devices and streaming — a smart remote control app...", color: "#0891b2", longDescription: "Smart Roku Remote is the perfect companion app for Roku device owners...", features: ["Full Roku device control", "Voice search integration", "Keyboard for easy text input", "Channel management and favorites", "Media casting support", "Multiple device support", "Customizable button layout", "Sleep timer functionality"], platforms: ["iOS", "Android"] },
  { slug: "bomber-warrior-game", title: "Bomber Warrior Game", description: "Find the spirit of challenges — an exciting action-packed gaming experience...", color: "#dc2626", longDescription: "Bomber Warrior is an action-packed arcade game...", features: ["Multiple challenging levels", "Power-ups and special abilities", "Global leaderboards", "Achievement system", "Stunning visual effects", "Engaging soundtrack", "Daily challenges and rewards", "Social sharing features"], platforms: ["iOS", "Android"] },
  { slug: "blood-community-app", title: "Blood Community App", description: "Give blood, save lives — a community-driven mobile app...", color: "#e11d48", longDescription: "Blood Community is a life-saving mobile application...", features: ["Donor registration and profiles", "Real-time blood request alerts", "Location-based donor matching", "Blood bank directory", "Donation history tracking", "Emergency SOS feature", "Blood type compatibility info", "Community engagement features"], platforms: ["iOS", "Android"] },
  { slug: "fund-raising-record-keeping", title: "Fund Raising Record Keeping", description: "Easily manage and monitor all fundraising activities...", color: "#65a30d", longDescription: "Fund Raising Record Keeping is a comprehensive management tool...", features: ["Donation tracking and management", "Donor relationship management", "Automated receipt generation", "Financial reporting and analytics", "Campaign management tools", "Multi-user access and roles", "Export to Excel/PDF", "Audit trail for transparency"], platforms: ["iOS", "Android", "Web"] },
  { slug: "flicky-chicky-arcader", title: "Flicky Chicky Arcader", description: "A delightful jumping and running game — fun for all ages...", color: "#f59e0b", longDescription: "Flicky Chicky is a charming arcade platformer...", features: ["Simple one-tap controls", "Multiple themed worlds", "Unlockable characters and skins", "Coin collection and in-game shop", "Daily rewards and challenges", "Colorful 2D graphics", "Fun sound effects and music", "Offline play support"], platforms: ["iOS", "Android"] }
];

const newsItems = [
  { slug: "cv-maker-resume-builder-app", title: "CV Maker | Resume Builder App", description: "Create standardized and personalized resumes...", date: "Dec 2024", category: "Product Launch", content: "We are thrilled to announce the launch of CV Maker..." },
  { slug: "bomber-warriors-reloaded", title: "Bomber Warriors: Reloaded", description: "Find the spirit of challenges...", date: "Nov 2024", category: "Game Release", content: "Get ready for the ultimate action-packed experience!..." },
  { slug: "blood-community-mobile-app", title: "Blood Community Mobile App", description: "Give blood, save lives...", date: "Oct 2024", category: "Social Impact", content: "Codematics is proud to launch Blood Community..." },
  { slug: "fund-raising-record-keeper-app", title: "Fund-Raising Record Keeper App", description: "Easily manage and monitor all fundraising records...", date: "Sep 2024", category: "Product Launch", content: "Managing fundraising activities just got easier..." },
  { slug: "flicky-chicky-fun-platform-arcader", title: "Flicky Chicky Fun Platform Arcader", description: "A delightful jumping and running game...", date: "Aug 2024", category: "Game Release", content: "Introducing Flicky Chicky..." },
  { slug: "smart-tvs-remote-control", title: "Smart TVs Remote Control for iOS & Android", description: "The smartest remote control app for your Smart TV...", date: "Jul 2024", category: "Product Update", content: "Codematics is excited to announce a major update..." },
  { slug: "codematics-journey-startup-to-global-impact", title: "Codematics Journey: From Startup to Global Impact", description: "A look back at our incredible journey...", date: "Jun 2024", category: "Company News", content: "From a small office in Abbottabad, Pakistan to serving over 180 million users..." },
  { slug: "urraan-digital-skills-bootcamp-success", title: "URRAAN Digital Skills Bootcamp Success", description: "Our CSR initiative URRAAN has trained over 500 students...", date: "May 2024", category: "CSR", content: "Codematics is proud to share the remarkable success of URRAAN..." },
  { slug: "codematics-pos-system-launch", title: "Codematics Point of Sale System Launch", description: "Introducing our comprehensive POS system for modern retail...", date: "Apr 2024", category: "Product Launch", content: "Codematics is excited to introduce our comprehensive Point of Sale (POS) system..." }
];

const teamMembers = [
  { name: "Malik Ahsan Ali", role: "Managing Director (MD) / Founder" },
  { name: "Hammad Lodhi", role: "Chief Executive Officer" },
  { name: "Waqar Ahmad", role: "Chief Financial Officer" },
  { name: "Babar Ali", role: "General Manager" },
  { name: "Obaid Ullah Khan", role: "Admin / Accounts Officer" },
  { name: "Abu Huraira", role: "Admin Assistant" },
  { name: "Adeel", role: "SQA Engineer" },
  { name: "Farhad Younas", role: "iOS Engineer" },
  { name: "Kaleem Ahmad", role: "3D Modeler & Animator | Team Lead" },
  { name: "Muhammad Mursaleen", role: "3D Technical Director" },
  { name: "Umaima Malik", role: "3D Modeler & Animator" }
];

async function seed() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) throw new Error('MONGODB_URI is not defined');

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Service.deleteMany({});
    await Product.deleteMany({});
    await NewsPost.deleteMany({});
    await TeamMember.deleteMany({});

    // Seed Services
    await Service.insertMany(services);
    console.log('Services seeded successfully');

    // Seed Products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

    // Seed News
    const newsToInsert = newsItems.map(item => ({
      ...item,
      author: "Codematics Team"
    }));
    await NewsPost.insertMany(newsToInsert);
    console.log('News posts seeded successfully');

    // Seed Team
    const teamToInsert = teamMembers.map((member, index) => ({
      ...member,
      order: index,
      isActive: true
    }));
    await TeamMember.insertMany(teamToInsert);
    console.log('Team members seeded successfully');

    console.log('All data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();
