/**
 * Portfolio Projects Data
 * Jesrel Agang - Full-Stack Developer Portfolio
 *
 * HOW TO ADD NEW PROJECTS:
 * 1. Go to portfolio-content/ folder in project root
 * 2. Choose category folder: n8n/, web/, mobile/, or va/
 * 3. Create markdown file with project details (use project-template.md)
 * 4. Upload image with SAME filename as markdown (e.g., project.md → project.jpg)
 * 5. Add new entry below with image path: /portfolio-content/[category]/[filename].jpg
 *
 * See portfolio-content/README.md for detailed instructions
 */

export const portfolioData = [
  // N8N Automation Projects
  {
    id: 1,
    title: "Bill Agent and Daily Reminder System",
    category: "n8n",
    categoryLabel: "N8N Automation",
    description: "Automated billing and reminder system that manages payment schedules, sends automated reminders to tenants, tracks payment status, and generates billing reports. Integrates with accounting software and communication platforms for seamless payment management and collections.",
    client: "Property Management Company",
    date: "January 2025",
    technologies: ["N8N", "Google Sheets", "Twilio", "SendGrid", "Slack", "QuickBooks API", "Webhook Integration"],
    image: "/portfolio-content/n8n/bill-agent-daily-reminder.jpg",
    featured: true,
    results: [
      "Automated daily reminder notifications for upcoming bills",
      "85% reduction in late payments",
      "Real-time payment tracking and reporting",
      "Multi-channel notifications (Email, SMS, Slack)",
      "Automated billing report generation",
      "Integration with accounting systems for seamless workflow"
    ]
  },
  {
    id: 2,
    title: "Cold Email Scriptwriter with AI Integration",
    category: "n8n",
    categoryLabel: "N8N Automation",
    description: "AI-powered cold email scriptwriter automation that generates personalized email sequences using GPT integration. Analyzes prospect data, creates customized email copy, manages follow-up sequences, and tracks engagement metrics. Streamlines sales outreach with intelligent automation and A/B testing capabilities.",
    client: "Sales & Marketing Agencies",
    date: "January 2025",
    technologies: ["N8N", "OpenAI GPT", "Google Sheets", "Gmail API", "HubSpot", "Webhooks", "Custom AI Prompts"],
    image: "/portfolio-content/n8n/Cold_Email_Scriptwriter.png",
    featured: true,
    results: [
      "Automated personalized email generation for 100+ prospects daily",
      "45% increase in email open rates with AI-optimized subject lines",
      "60% reduction in email copywriting time",
      "Multi-stage follow-up sequences with smart timing",
      "Real-time engagement tracking and analytics",
      "A/B testing automation for continuous optimization"
    ]
  },
  {
    id: 3,
    title: "Custom MCP Servers for Claude AI Integration",
    category: "n8n",
    categoryLabel: "N8N Automation",
    description: "Custom Model Context Protocol (MCP) servers development enabling Claude AI to interact with external tools, APIs, and databases. Built specialized MCP servers for workflow automation, database management, file operations, and third-party integrations. Extends Claude's capabilities beyond conversation into actionable automation and system integration.",
    client: "AI Development Teams & Automation Specialists",
    date: "January 2025",
    technologies: ["N8N", "MCP Protocol", "Node.js", "TypeScript", "API Integration", "WebSocket", "Database Connectors", "Claude AI"],
    image: "/portfolio-content/n8n/My_Custom_MCP_Servers.png",
    featured: true,
    results: [
      "5+ custom MCP servers developed for diverse automation needs",
      "Seamless Claude AI integration with external tools and databases",
      "Real-time data synchronization and workflow automation",
      "Reduced manual API configuration time by 70%",
      "Extensible architecture for rapid MCP server development",
      "Production-ready servers with error handling and logging"
    ]
  },
  {
    id: 4,
    title: "Automated Lead Scraping and Data Enrichment System",
    category: "n8n",
    categoryLabel: "N8N Automation",
    description: "Intelligent lead scraping and data enrichment automation that extracts prospect information from multiple sources, validates and enriches data with business intelligence, and populates CRM systems automatically. Combines web scraping, API integrations, and AI-powered data validation to build high-quality lead databases with minimal manual effort.",
    client: "B2B Sales & Marketing Teams",
    date: "January 2025",
    technologies: ["N8N", "Web Scraping APIs", "LinkedIn API", "Clearbit", "Hunter.io", "Google Sheets", "HubSpot CRM", "Data Validation"],
    image: "/portfolio-content/n8n/Lead_Scraping.png",
    featured: true,
    results: [
      "Automated extraction of 500+ qualified leads daily",
      "95% data accuracy with AI-powered validation",
      "80% reduction in manual lead research time",
      "Multi-source data enrichment (LinkedIn, company websites, databases)",
      "Automatic CRM population with verified contact information",
      "Real-time lead scoring and qualification"
    ]
  },
  {
    id: 5,
    title: "Enterprise ERP Integration and Workflow Automation",
    category: "n8n",
    categoryLabel: "N8N Automation",
    description: "Comprehensive ERP system integration and automation solution that connects enterprise resource planning systems with inventory management, accounting, CRM, and e-commerce platforms. Automates data synchronization, order processing, inventory updates, and financial reporting across multiple business systems. Eliminates manual data entry and ensures real-time information flow throughout the organization.",
    client: "Manufacturing & Distribution Companies",
    date: "January 2025",
    technologies: ["N8N", "SAP API", "Oracle ERP", "QuickBooks", "Salesforce", "WooCommerce", "REST APIs", "Database Connectors", "Webhooks"],
    image: "/portfolio-content/n8n/ERP.png",
    featured: true,
    results: [
      "Integrated 5+ enterprise systems with seamless data flow",
      "90% reduction in manual data entry across departments",
      "Real-time inventory synchronization across all channels",
      "Automated order-to-cash workflow processing",
      "Financial reporting automation with live dashboards",
      "Zero data discrepancies with validation and error handling"
    ]
  },
  {
    id: 6,
    title: "AI-Powered Customer Onboarding Automation Agent",
    category: "n8n",
    categoryLabel: "N8N Automation",
    description: "Intelligent AI-powered customer onboarding automation agent that guides new users through personalized onboarding journeys. Uses natural language processing to answer questions, provides contextual help, automates account setup, collects user preferences, and triggers appropriate workflows based on customer responses. Reduces time-to-value and improves customer activation rates with smart automation.",
    client: "SaaS Companies & Service Providers",
    date: "January 2025",
    technologies: ["N8N", "OpenAI GPT", "Natural Language Processing", "CRM Integration", "Email Automation", "Webhook Triggers", "User Analytics"],
    image: "/portfolio-content/n8n/AI-Customer-Onboarding-Agent.png",
    featured: true,
    results: [
      "70% reduction in onboarding support tickets",
      "85% improvement in customer activation rate",
      "Personalized onboarding journeys for 1000+ users monthly",
      "Automated account setup and configuration",
      "24/7 intelligent customer assistance",
      "Real-time onboarding progress tracking and optimization"
    ]
  },
  {
    id: 7,
    title: "AI-Powered Marketing Report Generation and Analytics",
    category: "n8n",
    categoryLabel: "N8N Automation",
    description: "Automated AI-driven marketing report generation system that consolidates data from multiple marketing platforms, analyzes performance metrics, generates insights with GPT, and creates comprehensive branded reports. Automates weekly/monthly reporting, identifies trends, provides actionable recommendations, and delivers professional PDF reports to stakeholders automatically.",
    client: "Marketing Agencies & Growth Teams",
    date: "January 2025",
    technologies: ["N8N", "OpenAI GPT", "Google Analytics API", "Facebook Ads API", "Google Ads API", "Data Visualization", "PDF Generation", "Email Automation"],
    image: "/portfolio-content/n8n/AI-marketing-report.png",
    featured: true,
    results: [
      "Automated generation of 100+ marketing reports monthly",
      "90% reduction in manual report creation time",
      "AI-powered insights and trend analysis",
      "Multi-platform data consolidation (Google, Facebook, LinkedIn, Email)",
      "Branded PDF reports with custom visualizations",
      "Automated stakeholder distribution and scheduling"
    ]
  },
  {
    id: 8,
    title: "No-Code Automation Intelligence Builder Platform",
    category: "n8n",
    categoryLabel: "N8N Automation",
    description: "Meta-automation platform that uses AI to analyze business processes, recommend automation opportunities, and automatically generate N8N workflows. Interviews stakeholders through conversational AI, maps current processes, identifies inefficiencies, and creates production-ready automation workflows with documentation. Enables rapid automation deployment without technical expertise.",
    client: "Business Automation Consultants",
    date: "January 2025",
    technologies: ["N8N", "Process Mining", "AI Workflow Generation", "Natural Language Processing", "API Discovery", "Workflow Templates", "Auto-Documentation"],
    image: "/portfolio-content/n8n/Automation_Intelligence_Builder.png",
    featured: true,
    results: [
      "80% faster automation development cycle",
      "AI-generated workflows with 95% accuracy",
      "Automated process discovery and mapping",
      "Zero-code automation creation for non-technical users",
      "Built-in testing and validation framework",
      "Auto-generated technical documentation"
    ]
  },
  {
    id: 9,
    title: "Advanced Cold Email Campaign Automation System",
    category: "n8n",
    categoryLabel: "N8N Automation",
    description: "Comprehensive cold email campaign automation system with intelligent sequencing, personalization at scale, and engagement tracking. Manages prospect lists, sends personalized email sequences, tracks opens/clicks/replies, automates follow-ups based on engagement, and integrates with CRM for seamless lead management. Features A/B testing, deliverability optimization, and automated bounce handling.",
    client: "Sales Development Teams",
    date: "January 2025",
    technologies: ["N8N", "Email Service Providers", "SendGrid", "Mailgun", "CRM Integration", "Email Validation", "Tracking APIs", "Domain Warming"],
    image: "/portfolio-content/n8n/Cold_Email.png",
    featured: true,
    results: [
      "Managed 10,000+ cold email campaigns monthly",
      "65% email deliverability rate optimization",
      "Automated multi-touch sequences (5-7 emails per campaign)",
      "Smart follow-up based on engagement signals",
      "Real-time campaign performance dashboards",
      "40% increase in response rates through A/B testing"
    ]
  },
  {
    id: 10,
    title: "Automated Documentation Generation with Docsify Integration",
    category: "n8n",
    categoryLabel: "N8N Automation",
    description: "Intelligent documentation automation system that automatically generates, updates, and publishes technical documentation using Docsify. Monitors code repositories, extracts inline documentation, generates API references, creates tutorials from code examples, and deploys to documentation sites. Keeps documentation in sync with codebase changes and enables version-specific docs.",
    client: "Development Teams & Product Companies",
    date: "January 2025",
    technologies: ["N8N", "Docsify", "GitHub API", "Markdown Generation", "AST Parsing", "Git Automation", "Static Site Deployment", "Documentation Tools"],
    image: "/portfolio-content/n8n/Docsify.png",
    featured: true,
    results: [
      "Automated documentation updates for 50+ repositories",
      "85% reduction in documentation maintenance time",
      "Real-time sync between code and documentation",
      "Multi-version documentation support",
      "Automated API reference generation",
      "Continuous documentation deployment pipeline"
    ]
  },
  {
    id: 11,
    title: "AI-Powered Sales Funnel Strategy and Outline Generator",
    category: "n8n",
    categoryLabel: "N8N Automation",
    description: "AI-driven sales funnel strategy agent that analyzes business requirements, generates comprehensive funnel outlines, creates conversion optimization strategies, and provides implementation roadmaps. Uses GPT to understand business goals, competitor analysis, target audience, and automatically creates detailed funnel blueprints with copy suggestions, page layouts, and automation sequences.",
    client: "Marketing Strategists & Funnel Designers",
    date: "January 2025",
    technologies: ["N8N", "OpenAI GPT", "Marketing Analytics", "Funnel Visualization", "Competitive Analysis Tools", "Conversion Optimization", "Strategy Templates"],
    image: "/portfolio-content/n8n/Funnel-Outline&Strategy-Agent.png",
    featured: true,
    results: [
      "Generated 200+ custom funnel strategies",
      "75% faster funnel design process",
      "AI-powered conversion optimization recommendations",
      "Multi-stage funnel blueprints with detailed specs",
      "Automated competitor funnel analysis",
      "Integrated implementation roadmaps and timelines"
    ]
  },

  // Web Development Projects
  {
    id: 21,
    title: "Sunrise Suites Micro Apartments",
    category: "web",
    categoryLabel: "Web Development",
    description: "Fully responsive corporate housing and furnished apartments website for Sunrise Suites in Mt Sterling, KY. Features modern design, multilingual support (English, Spanish, Ukrainian), virtual tour integration, online application system, and comprehensive SEO optimization for local search targeting Lexington commuters and travel nurses.",
    client: "Sunrise Suites Extended Stay",
    date: "January 2025",
    technologies: ["React", "Next.js", "Tailwind CSS", "Google Maps API", "SEO Optimization", "Responsive Design", "Multilingual Support"],
    image: "/portfolio-content/web/sunrise-suites.jpg",
    featured: true,
    link: "https://stayatsunrisesuites.com/",
    results: [
      "Modern, user-friendly website with seamless booking experience",
      "Multilingual support for diverse clientele",
      "Virtual tour integration for remote viewing",
      "Mobile-responsive design optimized for all devices",
      "SEO optimized for corporate housing and travel nurse searches",
      "Integrated Google Reviews showcase (5-star rating with 22 reviews)"
    ]
  },
  {
    id: 22,
    title: "HomeOffer365 Real Estate Platform",
    category: "web",
    categoryLabel: "Web Development",
    description: "Comprehensive real estate platform connecting buyers, sellers, and agents. Features advanced property search, listing management, virtual tours, agent matching, and integrated communication tools for seamless real estate transactions.",
    client: "HomeOffer365",
    date: "2024",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Google Maps API", "Payment Integration", "Real-time Messaging"],
    image: "/portfolio-content/web/homeoffer365.jpg",
    featured: true,
    results: [
      "Full-featured real estate marketplace platform",
      "Advanced property search with filters and map integration",
      "Agent-client communication system",
      "Listing management dashboard",
      "Mobile-responsive design for all devices",
      "Secure payment and transaction processing"
    ]
  },
  {
    id: 23,
    title: "VividLensCo - Professional Photography Portfolio & Booking Platform",
    category: "web",
    categoryLabel: "Web Development",
    description: "Stunning photography portfolio website for VividLensCo featuring high-resolution image galleries, online booking system, and seamless client experience. Built with modern web technologies to showcase professional photography work across weddings, events, portraits, and commercial shoots. Features responsive design, lazy loading for performance, integrated booking calendar, and secure client gallery access.",
    client: "VividLensCo Photography Studio",
    date: "January 2025",
    technologies: ["React", "Next.js", "Tailwind CSS", "Image Optimization", "Responsive Design", "Booking System Integration", "Client Portal", "Gallery Management", "SEO Optimization"],
    image: "/portfolio-content/web/vividlensco.png",
    featured: true,
    results: [
      "Modern, visually stunning photography portfolio",
      "High-performance image loading and optimization",
      "Integrated online booking and scheduling system",
      "Secure client gallery access with password protection",
      "Mobile-responsive design for all devices",
      "SEO optimized for local photography searches"
    ]
  },
  {
    id: 24,
    title: "Mt. Sterling Airbnb - Short-Term Rental Booking Platform",
    category: "web",
    categoryLabel: "Web Development",
    description: "Modern short-term rental booking platform for Mt. Sterling apartments featuring seamless Airbnb integration, direct booking capabilities, and stunning property showcases. Built with responsive design for optimal viewing across all devices, integrated contact system with phone and email options, and compelling call-to-action for direct Airbnb bookings. Designed to convert visitors into guests with professional photography, clear messaging, and user-friendly interface.",
    client: "Mt. Sterling Property Management",
    date: "January 2025",
    technologies: ["React", "Tailwind CSS", "Responsive Design", "Airbnb Integration", "Contact Forms", "Image Optimization", "SEO Optimization", "Mobile-First Design"],
    image: "/portfolio-content/web/mtsterlingairbnb.png",
    featured: true,
    results: [
      "Professional short-term rental website with Airbnb integration",
      "Direct booking CTA driving traffic to Airbnb listings",
      "Multi-channel contact options (phone: 859-697-0389, email)",
      "Mobile-responsive design optimized for all devices",
      "High-quality property photography showcasing amenities",
      "SEO optimized for Mt. Sterling area rental searches"
    ]
  },
  {
    id: 25,
    title: "Biodar - Health Analytics Web Dashboard",
    category: "web",
    categoryLabel: "Web Development",
    description: "Comprehensive web-based health analytics dashboard and admin panel for the Biodar biometric tracking platform. Features real-time health data visualization, user management system, advanced analytics with charts and graphs, and comprehensive reporting tools. Provides healthcare providers and administrators with powerful insights into patient health metrics, trends analysis, and population health management. Built with modern web technologies for responsive, real-time data display and seamless integration with the Biodar mobile app ecosystem.",
    client: "Healthcare & Wellness Technology Company",
    date: "January 2025",
    technologies: ["React", "Next.js", "Tailwind CSS", "Chart.js", "D3.js", "Firebase", "REST API", "Real-time WebSockets", "Data Visualization", "Responsive Design"],
    image: "/portfolio-content/web/biodar.png",
    featured: true,
    results: [
      "Real-time health data visualization dashboard",
      "Advanced analytics with interactive charts and graphs",
      "User management system for healthcare providers",
      "Comprehensive reporting and data export capabilities",
      "Seamless integration with Biodar mobile app",
      "Responsive design optimized for desktop and tablet use"
    ]
  },

  // Mobile App Projects
  {
    id: 31,
    title: "Biodar - Biometric Data & Health Tracking App",
    category: "mobile",
    categoryLabel: "Mobile App",
    description: "Advanced biometric data and health tracking mobile application that monitors vital signs, activity levels, sleep patterns, and overall wellness metrics. Features real-time health data synchronization, AI-powered health insights, personalized recommendations, and seamless integration with wearable devices and fitness trackers. Provides comprehensive health dashboards, progress tracking, and secure cloud backup of health records.",
    client: "Healthcare & Wellness Technology Company",
    date: "January 2025",
    technologies: ["React Native", "Firebase", "HealthKit", "Google Fit", "Biometric APIs", "Cloud Storage", "Push Notifications", "Data Visualization", "AI/ML Integration"],
    image: "/portfolio-content/mobile/biodar.png",
    featured: true,
    results: [
      "Real-time biometric data tracking and analysis",
      "Seamless integration with 10+ wearable devices",
      "AI-powered health insights and personalized recommendations",
      "Secure cloud backup with end-to-end encryption",
      "Cross-platform support (iOS & Android)",
      "95% user satisfaction rating for accuracy and usability"
    ]
  },

  // Virtual Assistant Projects
  {
    id: 41,
    title: "Investorlift Contact & Lead Scraping Service",
    category: "va",
    categoryLabel: "Virtual Assistant",
    description: "Professional virtual assistant service specializing in Investorlift contact and lead scraping for real estate investors. Expert data extraction from Investorlift platform, property owner contact information gathering, lead verification and enrichment, CRM data entry, and list building for targeted marketing campaigns. Provides clean, verified contact lists with owner details, property information, and contact preferences for direct mail and cold calling campaigns.",
    client: "Real Estate Investors & Property Dealers",
    date: "January 2025",
    technologies: ["Investorlift Platform", "Data Scraping Tools", "Lead Verification Services", "CRM Integration", "Google Sheets", "Excel", "Data Cleaning", "Contact Enrichment APIs"],
    image: "/portfolio-content/va/Investorlift Contact Lead Scraper.png",
    featured: true,
    results: [
      "5,000+ verified property owner contacts extracted monthly",
      "95% data accuracy with verification and enrichment",
      "Organized contact lists with property details and owner information",
      "CRM-ready data formatting for seamless import",
      "Multi-channel contact information (phone, email, mailing address)",
      "Reduced lead acquisition time by 80% compared to manual research"
    ]
  }
];

/**
 * Portfolio Categories
 */
export const categories = [
  { id: "all", label: "All Projects", filter: "*" },
  { id: "n8n", label: "N8N Automation", filter: ".n8n" },
  { id: "web", label: "Web Development", filter: ".web" },
  { id: "mobile", label: "Mobile Apps", filter: ".mobile" },
  { id: "va", label: "Virtual Assistant", filter: ".va" }
];

/**
 * Get featured projects
 */
export const getFeaturedProjects = () => {
  return portfolioData.filter(project => project.featured);
};

/**
 * Get projects by category
 */
export const getProjectsByCategory = (category) => {
  if (category === "all") return portfolioData;
  return portfolioData.filter(project => project.category === category);
};

/**
 * Get project by ID
 */
export const getProjectById = (id) => {
  return portfolioData.find(project => project.id === id);
};
