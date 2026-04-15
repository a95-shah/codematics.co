export interface Service {
  slug: string;
  iconName: string;
  image?: string;
  title: string;
  description: string;
  longDescription: string;
  details: string[];
  features: string[];
  technologies: string[];
}

export const services: Service[] = [
  {
    slug: "mobile-apps-development",
    iconName: "HiDeviceMobile",
    title: "Mobile Apps Development",
    description: "The global scenario of Mobile Apps Development is currently witnessing an enormous growth. With so many apps coming up, we deliver high-quality, scalable mobile solutions for iOS and Android platforms using the latest frameworks and technologies.",
    longDescription: "At Codematics, we specialize in building cutting-edge mobile applications that transform how businesses connect with their customers. Our team of experienced mobile developers creates intuitive, high-performance apps for both iOS and Android platforms. From concept to deployment, we ensure every app we build delivers an exceptional user experience, robust security, and seamless performance. Whether you need a consumer-facing app, an enterprise solution, or a cross-platform application, our expertise spans the full mobile development spectrum.",
    details: ["iOS & Android Native Apps", "Cross-Platform Development", "App Store Optimization", "Maintenance & Support"],
    features: ["Custom UI/UX tailored to your brand", "Real-time push notifications & analytics", "Offline-first architecture for seamless experience", "Integration with third-party APIs and services", "Scalable backend infrastructure", "Continuous updates and performance monitoring"],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "REST APIs"],
  },
  {
    slug: "web-development",
    iconName: "HiCode",
    title: "Web Development",
    description: "Team Codematics possesses excellent web development skills. Our web designers and developers know their job well when it comes to building world-class, responsive, and performant web applications.",
    longDescription: "Our web development team combines creativity with technical expertise to build websites and web applications that drive business results. We leverage modern frameworks and best practices to create fast, secure, and scalable web solutions. From single-page applications to complex enterprise platforms, we deliver pixel-perfect designs with robust functionality. Our agile development process ensures rapid delivery without compromising quality.",
    details: ["Full-Stack Web Applications", "Progressive Web Apps (PWA)", "E-Commerce Solutions", "CMS Development"],
    features: ["Responsive design across all devices", "SEO-optimized architecture", "Performance-first development approach", "Secure authentication and data handling", "Cloud-native deployment strategies", "Real-time features with WebSocket integration"],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
  },
  {
    slug: "game-development",
    iconName: "HiDesktopComputer",
    title: "Game Development",
    description: "Making and developing games from an idea to its functional stage is where all the fun lies. For our team, it's more fascinating to create immersive gaming experiences across platforms.",
    longDescription: "Our game development studio brings creative visions to life with engaging, immersive gaming experiences. From casual mobile games to complex multiplayer experiences, we combine artistic talent with technical prowess to create games that captivate players. Our team works across multiple platforms and engines, ensuring your game reaches the widest possible audience while maintaining top-tier performance and visual quality.",
    details: ["Unity & Unreal Engine", "2D & 3D Games", "AR/VR Experiences", "Cross-Platform Gaming"],
    features: ["Engaging gameplay mechanics and level design", "High-quality 2D and 3D graphics", "Multiplayer and social features", "In-app purchases and monetization", "Cross-platform compatibility", "Regular content updates and live ops"],
    technologies: ["Unity", "Unreal Engine", "C#", "C++", "Blender", "Photon"],
  },
  {
    slug: "ux-ui-graphic-design",
    iconName: "HiColorSwatch",
    title: "UX/UI & Graphic Design",
    description: "In a world increasingly driven by visual content, businesses and individuals are constantly searching for the best way to communicate through stunning, user-centric design.",
    longDescription: "Great design is the bridge between your brand and your audience. At Codematics, our design team creates visually stunning, user-centric interfaces that not only look beautiful but drive engagement and conversions. We follow a research-driven approach, combining user insights with creative excellence to craft designs that resonate with your target audience. From brand identity to complete design systems, we deliver visual solutions that elevate your business.",
    details: ["User Experience Research", "Interface Design", "Brand Identity", "Design Systems"],
    features: ["User research and persona development", "Wireframing and interactive prototyping", "Visual design with pixel-perfect precision", "Comprehensive brand guidelines", "Accessibility-first design principles", "Design system creation and documentation"],
    technologies: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "After Effects", "InVision"],
  },
  {
    slug: "3d-modeling-animation",
    iconName: "HiCube",
    title: "3D Modeling & Animation",
    description: "We blend creativity with technical precision to transform visual storytelling into motions, influencing how brands connect with their audiences worldwide.",
    longDescription: "Our 3D modeling and animation studio transforms ideas into breathtaking visual experiences. Whether it's product visualization, architectural rendering, character animation, or motion graphics, our skilled artists and animators deliver output that exceeds expectations. We use industry-leading tools and techniques to create realistic 3D models and fluid animations that bring your stories to life across film, gaming, advertising, and digital media.",
    details: ["Character Modeling", "Product Visualization", "Motion Graphics", "Architectural Rendering"],
    features: ["Photorealistic 3D rendering", "Character rigging and animation", "Product visualization for e-commerce", "Architectural walkthroughs and fly-throughs", "Motion graphics for marketing", "VFX and compositing for film"],
    technologies: ["Maya", "3ds Max", "Blender", "ZBrush", "Cinema 4D", "After Effects"],
  },
  {
    slug: "digital-marketing",
    iconName: "HiSpeakerphone",
    title: "Digital Marketing",
    description: "We at Codematics have the expertise of working on how to use the web and digital space to achieve core business goals and drive measurable results.",
    longDescription: "In today's digital-first world, a strong online presence is essential for business success. Our digital marketing team combines data-driven strategies with creative content to help you reach, engage, and convert your target audience. From SEO and social media to paid advertising and content marketing, we craft comprehensive digital strategies that deliver measurable ROI and sustained growth for your business.",
    details: ["SEO & SEM", "Social Media Marketing", "Content Strategy", "Analytics & Reporting"],
    features: ["Comprehensive SEO audits and optimization", "Targeted social media campaigns", "Pay-per-click advertising management", "Content creation and marketing", "Email marketing automation", "Performance tracking and ROI analysis"],
    technologies: ["Google Analytics", "SEMrush", "HubSpot", "Meta Ads", "Google Ads", "Mailchimp"],
  },
  {
    slug: "generative-ai",
    iconName: "HiLightningBolt",
    title: "Generative AI",
    description: "We are at the forefront of AI innovation, utilizing the latest models and techniques to help you drive sustained growth and competitive advantage in the age of AI.",
    longDescription: "Artificial Intelligence is reshaping every industry, and Codematics is at the forefront of this revolution. Our AI team leverages cutting-edge models and techniques to build intelligent solutions that automate processes, generate insights, and create new possibilities for your business. From custom AI models to integrating pre-trained LLMs, we help you harness the full potential of generative AI to drive innovation, efficiency, and competitive advantage.",
    details: ["Custom AI Models", "LLM Integration", "AI-Powered Automation", "Chatbot Development"],
    features: ["Custom large language model fine-tuning", "AI-powered content generation", "Intelligent document processing", "Conversational AI and chatbots", "Predictive analytics and forecasting", "Computer vision solutions"],
    technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI API", "LangChain", "Hugging Face"],
  },
  {
    slug: "natural-language-processing",
    iconName: "HiChat",
    title: "Natural Language Processing",
    description: "Codematics' unique approach to NLP helps clients create smarter, more intuitive systems that transform how they engage with technology and users.",
    longDescription: "Natural Language Processing is the key to making technology understand and communicate like humans. Our NLP team builds sophisticated language-aware systems that can analyze text, understand sentiment, translate languages, and power conversational interfaces. We help businesses unlock the value hidden in unstructured text data, enabling smarter decision-making and more natural human-computer interactions.",
    details: ["Text Analytics", "Sentiment Analysis", "Language Models", "Voice Assistants"],
    features: ["Advanced text classification and extraction", "Real-time sentiment and emotion analysis", "Multi-language translation systems", "Named entity recognition", "Speech-to-text and text-to-speech", "Custom knowledge base Q&A systems"],
    technologies: ["spaCy", "NLTK", "BERT", "GPT Models", "Whisper", "Python"],
  },
  {
    slug: "blockchain-technology",
    iconName: "HiLink",
    title: "Blockchain Technology",
    description: "As a trusted provider of blockchain development and consulting services, we help businesses create secure, transparent, and decentralized solutions.",
    longDescription: "Blockchain technology is revolutionizing how businesses handle transactions, data, and trust. At Codematics, our blockchain experts help you navigate this transformative technology, from strategy and consulting to full-scale development and deployment. We build secure, scalable, and transparent decentralized applications that enhance trust, reduce costs, and open new business models across industries.",
    details: ["Smart Contracts", "DeFi Solutions", "NFT Marketplaces", "Blockchain Consulting"],
    features: ["Smart contract development and auditing", "Decentralized application (dApp) development", "Token creation and ICO/IDO platforms", "Supply chain transparency solutions", "Digital identity and authentication", "Blockchain integration with existing systems"],
    technologies: ["Solidity", "Ethereum", "Web3.js", "Hardhat", "IPFS", "Polygon"],
  },
];
