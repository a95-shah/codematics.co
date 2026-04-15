export interface Product {
  slug: string;
  title: string;
  description: string;
  color: string;
  longDescription: string;
  features: string[];
  platforms: string[];
  image?: string;
}

export const products: Product[] = [
  {
    slug: "universal-tv-remote",
    title: "Universal TV Remote",
    description: "Over 180 million users worldwide. The ultimate smart remote control app compatible with all TV brands — Samsung, LG, Sony, and more.",
    color: "#c92228",
    longDescription: "Universal TV Remote is our flagship product with over 180 million users worldwide. This powerful app transforms your smartphone into a fully functional remote control for virtually any TV brand. With an intuitive interface and comprehensive device compatibility, it has become the go-to solution for smart home entertainment control. The app supports Samsung, LG, Sony, Panasonic, Vizio, and dozens of other brands, offering features like channel guide, voice control, and smart home integration.",
    features: ["Compatible with 100+ TV brands", "Intuitive touchpad navigation", "Voice control integration", "Smart home device management", "Channel guide and favorites", "Custom remote layouts", "IR and WiFi connectivity", "Regular updates with new device support"],
    platforms: ["iOS", "Android"],
  },
  {
    slug: "invoice-billing-receipt-maker",
    title: "InvoiceBilling | Receipt Maker",
    description: "Fast invoices, quick payments. A comprehensive billing and receipt solution for businesses of all sizes.",
    color: "#2563eb",
    longDescription: "InvoiceBilling is a professional invoicing and receipt management solution designed for freelancers, small businesses, and enterprises. Create beautifully formatted invoices in seconds, track payments, manage clients, and generate detailed financial reports. The app streamlines your billing workflow, helping you get paid faster while maintaining a professional image with your clients.",
    features: ["Professional invoice templates", "Automatic payment reminders", "Multi-currency support", "Tax calculation and management", "Client database management", "Financial reports and analytics", "PDF and email sharing", "Recurring invoice automation"],
    platforms: ["iOS", "Android", "Web"],
  },
  {
    slug: "codematics-point-of-sale",
    title: "Codematics Point of Sale",
    description: "A full-featured POS system for modern retail and business management with inventory tracking and analytics.",
    color: "#059669",
    longDescription: "Codematics Point of Sale is a comprehensive retail management solution that combines powerful sales processing with intelligent inventory management and business analytics. Designed for modern retailers, restaurants, and service businesses, our POS system offers everything you need to run your business efficiently — from transaction processing to customer management, staff tracking, and real-time reporting.",
    features: ["Fast checkout processing", "Inventory management with alerts", "Customer loyalty programs", "Staff management and time tracking", "Real-time sales analytics", "Multi-location support", "Barcode and QR scanning", "Integration with payment gateways"],
    platforms: ["iOS", "Android", "Web", "Desktop"],
  },
  {
    slug: "citizen-master",
    title: "Citizen Master",
    description: "Your ID, civil records, services & more — all in one secure digital platform for citizen services.",
    color: "#7c3aed",
    longDescription: "Citizen Master is a secure digital platform that brings government services to citizens' fingertips. The app provides a centralized hub for managing civil records, identity documents, service requests, and civic engagement. Built with enterprise-grade security and privacy in mind, Citizen Master streamlines the interaction between citizens and government agencies, reducing paperwork and wait times while improving transparency.",
    features: ["Digital identity management", "Civil records access", "Service request tracking", "Document verification", "Secure data encryption", "Multi-language support", "Push notification alerts", "Offline access to key documents"],
    platforms: ["iOS", "Android"],
  },
  {
    slug: "cv-maker-resume-builder",
    title: "CV Maker | Resume Builder",
    description: "Create standardized and personalized resumes instantly with our professional, easy-to-use resume builder.",
    color: "#d97706",
    longDescription: "CV Maker is the ultimate resume building companion for job seekers at every career stage. With dozens of professionally designed templates, intelligent content suggestions, and easy-to-use editing tools, creating a standout resume has never been easier. The app guides users through each section, helps optimize content for applicant tracking systems (ATS), and exports polished, print-ready documents in multiple formats.",
    features: ["40+ professional resume templates", "ATS-friendly formatting", "Smart content suggestions", "Multiple export formats (PDF, DOCX)", "Cover letter builder", "LinkedIn profile import", "Real-time preview", "Cloud sync across devices"],
    platforms: ["iOS", "Android"],
  },
  {
    slug: "smart-roku-remote",
    title: "Smart Roku Remote",
    description: "Your Roku devices and streaming — a smart remote control app with all features for Roku TVs.",
    color: "#0891b2",
    longDescription: "Smart Roku Remote is the perfect companion app for Roku device owners. It offers all the functionality of a physical Roku remote plus advanced features like keyboard input, voice search, and channel management. The app connects seamlessly to your Roku devices over WiFi, providing a reliable and feature-rich alternative to the standard remote with an intuitive, modern interface.",
    features: ["Full Roku device control", "Voice search integration", "Keyboard for easy text input", "Channel management and favorites", "Media casting support", "Multiple device support", "Customizable button layout", "Sleep timer functionality"],
    platforms: ["iOS", "Android"],
  },
  {
    slug: "bomber-warrior-game",
    title: "Bomber Warrior Game",
    description: "Find the spirit of challenges — an exciting action-packed gaming experience by Codematics.",
    color: "#dc2626",
    longDescription: "Bomber Warrior is an action-packed arcade game that tests your reflexes and strategic thinking. Navigate through challenging levels filled with obstacles, enemies, and power-ups. With its vibrant graphics, engaging sound design, and progressively difficult gameplay, Bomber Warrior keeps players coming back for more. Compete with friends on global leaderboards and unlock special abilities as you advance through the game.",
    features: ["Multiple challenging levels", "Power-ups and special abilities", "Global leaderboards", "Achievement system", "Stunning visual effects", "Engaging soundtrack", "Daily challenges and rewards", "Social sharing features"],
    platforms: ["iOS", "Android"],
  },
  {
    slug: "blood-community-app",
    title: "Blood Community App",
    description: "Give blood, save lives — a community-driven mobile app connecting blood donors with recipients.",
    color: "#e11d48",
    longDescription: "Blood Community is a life-saving mobile application that bridges the gap between blood donors and recipients. The app creates a connected community where registered donors can be quickly located and contacted in emergencies. With real-time notifications, location-based matching, and blood bank directory integration, Blood Community makes the process of finding and donating blood faster, easier, and more efficient — potentially saving countless lives.",
    features: ["Donor registration and profiles", "Real-time blood request alerts", "Location-based donor matching", "Blood bank directory", "Donation history tracking", "Emergency SOS feature", "Blood type compatibility info", "Community engagement features"],
    platforms: ["iOS", "Android"],
  },
  {
    slug: "fund-raising-record-keeping",
    title: "Fund Raising Record Keeping",
    description: "Easily manage and monitor all fundraising activities with our comprehensive record-keeping solution.",
    color: "#65a30d",
    longDescription: "Fund Raising Record Keeping is a comprehensive management tool designed for organizations that conduct fundraising activities. The app simplifies the process of tracking donations, managing donor relationships, generating receipts, and creating financial reports. Whether you're running a small community drive or a large-scale fundraising campaign, this solution provides the tools you need to stay organized, transparent, and accountable.",
    features: ["Donation tracking and management", "Donor relationship management", "Automated receipt generation", "Financial reporting and analytics", "Campaign management tools", "Multi-user access and roles", "Export to Excel/PDF", "Audit trail for transparency"],
    platforms: ["iOS", "Android", "Web"],
  },
  {
    slug: "flicky-chicky-arcader",
    title: "Flicky Chicky Arcader",
    description: "A delightful jumping and running game — fun for all ages with colorful graphics and engaging gameplay.",
    color: "#f59e0b",
    longDescription: "Flicky Chicky is a charming arcade platformer that brings joy to players of all ages. Guide your adorable chick character through colorful worlds filled with obstacles, collect coins, and discover hidden secrets. With its simple one-tap controls, vibrant art style, and progressively challenging levels, Flicky Chicky offers endless entertainment. The game features multiple themed worlds, unlockable characters, and daily rewards to keep the fun going.",
    features: ["Simple one-tap controls", "Multiple themed worlds", "Unlockable characters and skins", "Coin collection and in-game shop", "Daily rewards and challenges", "Colorful 2D graphics", "Fun sound effects and music", "Offline play support"],
    platforms: ["iOS", "Android"],
  },
];
