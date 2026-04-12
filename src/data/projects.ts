export interface ProjectStat {
  value: string;
  label: string;
  trend?: string;
  icon?: string;
}

export interface ChallengeCard {
  icon: string;
  title: string;
  desc: string;
}

export interface SolutionFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  tags: string[];
  cardTags: string[];
  cardDesc: string;
  stats: ProjectStat[];
  challenge: string[];
  challengeCards: ChallengeCard[];
  solution: {
    description: string;
    image: string;
    features: SolutionFeature[];
  };
  results: {
    description: string;
    testimonial: Testimonial;
  };
  gallery?: { src: string; caption: string; tall?: boolean }[];
  techStack?: string[];
  nextProjectSlug: string;
}

export const projects: Project[] = [
  {
    slug: "custom-enterprise-crm",
    title: "Ethos: ESG Compliance & Reporting Platform",
    subtitle: "ESG Compliance & Reporting Platform",
    heroImage: "/images/project-pics/Ethos/cover.png",
    tags: ["React", "Node.js", "ESG", "SaaS", "Enterprise"],
    cardTags: ["SaaS", "React"],
    cardDesc:
      "Enterprise ESG compliance platform with environmental reporting, dynamic forms, and shared packages for multi-company governance.",
    stats: [
      {
        value: "ESG",
        label: "Full environmental, social & governance reporting",
        icon: "eco",
      },
      {
        value: "Multi-Co",
        label: "Multi-company dashboard with shared packages",
        icon: "apartment",
      },
      {
        value: "Dynamic",
        label: "Custom form builder with reusable functions",
        icon: "dynamic_form",
      },
    ],
    challenge: [
      "Organizations face increasing pressure to track, report, and comply with ESG (Environmental, Social, Governance) regulations. Existing tools were fragmented, requiring companies to juggle spreadsheets, siloed reporting tools, and manual compliance checks across departments and subsidiaries.",
      "The core challenge was building a unified platform where multiple companies could share compliance packages, build dynamic reporting forms, and generate environmental reports, all while maintaining data isolation, auditability, and role-based access across organizational boundaries.",
    ],
    challengeCards: [
      {
        icon: "description",
        title: "Fragmented Reporting",
        desc: "Scattered compliance data across tools and spreadsheets",
      },
      {
        icon: "apartment",
        title: "Multi-Company Governance",
        desc: "Isolating data while enabling shared compliance packages",
      },
    ],
    solution: {
      description:
        "Ethos is a comprehensive ESG compliance and reporting platform that unifies environmental reporting, form management, and shared compliance packages into a single enterprise-grade dashboard. Designed for multi-company environments, it enables organizations to streamline governance workflows at scale.",
      image: "/images/project-pics/Ethos/environmental-reporting.jpg",
      features: [
        {
          icon: "eco",
          title: "Environmental Reporting Dashboard",
          desc: "Centralized environmental data collection and reporting with automated metric tracking, visual analytics, and export-ready compliance reports for regulatory submissions.",
        },
        {
          icon: "dynamic_form",
          title: "Dynamic Form Builder",
          desc: "Create, preview, and deploy custom compliance forms with reusable functions, conditional logic, and shared templates across teams and subsidiaries.",
        },
        {
          icon: "inventory_2",
          title: "Shared Compliance Packages",
          desc: "Build and distribute standardized compliance packages across multiple companies, ensuring consistent governance frameworks while maintaining data isolation.",
        },
        {
          icon: "business",
          title: "Multi-Company Management",
          desc: "A unified dashboard for managing multiple organizations with role-based access, company-level reporting, and cross-organization analytics.",
        },
      ],
    },
    results: {
      description:
        "Ethos transformed how organizations handle ESG compliance by consolidating fragmented workflows into a single platform. Companies using the platform reduced compliance reporting time significantly, while shared packages ensured consistent governance standards across subsidiaries and partner organizations.",
      testimonial: {
        quote:
          "Ethos completely changed how we approach ESG compliance. The shared packages and dynamic forms saved us hundreds of hours, and the environmental reporting dashboard gives leadership the visibility they need.",
        author: "Ethos Team",
        role: "Product & Compliance",
      },
    },
    gallery: [
      { src: "/images/project-pics/Ethos/cover.png", caption: "Dashboard Home" },
      { src: "/images/project-pics/Ethos/companies-dashboard.jpg", caption: "Companies Management" },
      { src: "/images/project-pics/Ethos/environmental-reporting.jpg", caption: "Environmental Reporting" },
      { src: "/images/project-pics/Ethos/shared-packages.jpg", caption: "Shared Compliance Packages" },
      { src: "/images/project-pics/Ethos/forms-preview.jpg", caption: "Forms Preview" },
      { src: "/images/project-pics/Ethos/create-form.jpg", caption: "Dynamic Form Builder" },
      { src: "/images/project-pics/Ethos/add-function.jpg", caption: "Add Reusable Function" },
      { src: "/images/project-pics/Ethos/shared-forms.jpg", caption: "Shared Forms Library" },
      { src: "/images/project-pics/Ethos/login.png", caption: "Login Page" },
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "AWS", "TypeScript"],
    nextProjectSlug: "self-hosted-gateway",
  },
  {
    slug: "self-hosted-gateway",
    title: "CardEye: Self-Hosted Payment Gateway",
    subtitle: "Self-Hosted Payment Gateway",
    heroImage: "/images/project-pics/self-hosted-payment-gateway/cover.png",
    tags: ["Vue.js", "Nuxt.js", "Laravel", "AWS", "PCI Compliance"],
    cardTags: ["Fintech", "Vue.js"],
    cardDesc:
      "Removing friction between merchants and customers while encrypting transactional data for a risk-free payment experience.",
    stats: [
      {
        value: "PCI",
        label: "Fully PCI-DSS compliant platform",
        icon: "verified_user",
      },
      {
        value: "Real-Time",
        label: "Instant payment processing on AWS",
        icon: "bolt",
      },
      {
        value: "100%",
        label: "Encrypted end-to-end transactions",
        icon: "lock",
      },
    ],
    challenge: [
      "Facilitating a frictionless flow of payments while keeping transaction data encrypted between merchants and customers for a risk-free experience. The client needed a self-hosted solution that gave them full control over their payment infrastructure without relying on third-party gateways.",
      "Existing solutions were either too expensive for the transaction volume, lacked customization for their specific merchant workflows, or could not guarantee the level of data sovereignty required for their compliance standards.",
    ],
    challengeCards: [
      {
        icon: "credit_card_off",
        title: "Payment Friction",
        desc: "High drop-off rates during checkout due to clunky third-party redirects",
      },
      {
        icon: "shield",
        title: "Data Sovereignty",
        desc: "Full control over transaction data with PCI-compliant self-hosted infrastructure",
      },
    ],
    solution: {
      description:
        "Built a self-hosted payment gateway on AWS infrastructure, enabling merchants and customers to make payments in real-time while increasing agility and building confidence in the most secure and resilient cloud.",
      image: "/images/project-pics/self-hosted-payment-gateway/transactions.jpg",
      features: [
        {
          icon: "contactless",
          title: "Touchless Payment Options",
          desc: "Enabling customers to make transactions anytime, anywhere with industry-grade contactless payment options and virtual card support.",
        },
        {
          icon: "verified_user",
          title: "PCI Compliant Platform",
          desc: "Fully PCI-DSS compliant payment solution providing secure, encrypted channels for every transaction from swipe to settlement.",
        },
        {
          icon: "bolt",
          title: "Real-Time Processing on AWS",
          desc: "AWS cloud infrastructure powers real-time payment processing, allowing merchants and customers to transact without friction or delays.",
        },
        {
          icon: "security",
          title: "Data Protection & Secure Transactions",
          desc: "Self-hosted gateway encrypts all transaction data end-to-end, providing a secure route for customers and complete data ownership for merchants.",
        },
      ],
    },
    results: {
      description:
        "The platform went live with real-time transaction processing, full PCI compliance, and a seamless checkout experience that reduced cart abandonment. Merchants gained complete control over their payment data while customers enjoyed frictionless, secure transactions.",
      testimonial: {
        quote:
          "They built exactly what we envisioned: a payment system we fully own, with zero compromises on security or speed. Our merchants and customers both noticed the difference immediately.",
        author: "CardEye Team",
        role: "Founding Team, CardEye",
      },
    },
    gallery: [
      { src: "/images/project-pics/self-hosted-payment-gateway/cover.png", caption: "Dashboard Overview" },
      { src: "/images/project-pics/self-hosted-payment-gateway/transactions.jpg", caption: "Transaction Management" },
      { src: "/images/project-pics/self-hosted-payment-gateway/transaction-detail.jpg", caption: "Transaction Detail View" },
      { src: "/images/project-pics/self-hosted-payment-gateway/user-details.jpg", caption: "Fraud Detection & User Details" },
      { src: "/images/project-pics/self-hosted-payment-gateway/notifications.png", caption: "Notification System" },
      { src: "/images/project-pics/self-hosted-payment-gateway/sign-in.png", caption: "Secure Sign-In" },
    ],
    techStack: ["Vue.js", "Nuxt.js", "Laravel 10", "Vuetify", "Pusher", "SingleStore", "AWS"],
    nextProjectSlug: "sparkdoc-ai",
  },
  {
    slug: "sparkdoc-ai",
    title: "SparkDoc AI: Intelligent Document Collaboration",
    subtitle: "AI Document Collaboration Platform",
    heroImage: "/images/project-pics/sparkdoc/Dashboard.png",
    tags: ["Next.js", "Nest.js", "TypeScript", "MongoDB", "AWS"],
    cardTags: ["AI/ML", "Next.js"],
    cardDesc:
      "A next-gen collaborative editor with AI-powered summarization, knowledge extraction, and real-time document insights.",
    stats: [
      {
        value: "AI",
        label: "Powered summarization & knowledge extraction",
        icon: "psychology",
      },
      {
        value: "Real-Time",
        label: "Multi-user collaborative editing",
        icon: "groups",
      },
      {
        value: "Live",
        label: "Production platform at sparkdoc.com",
        icon: "rocket_launch",
      },
    ],
    challenge: [
      "Modern teams are drowning in documents. Knowledge is scattered across files, collaboration is disjointed, and extracting insights from lengthy documents requires manual effort that kills productivity.",
      "Existing tools offer either collaboration or AI features, but not both in a seamless experience. The client needed a platform where teams could write, research, cite sources, and extract key insights all within a single intelligent editor.",
    ],
    challengeCards: [
      {
        icon: "description",
        title: "Knowledge Silos",
        desc: "Critical insights buried across disconnected documents and tools",
      },
      {
        icon: "group_off",
        title: "Fragmented Collaboration",
        desc: "Teams forced to switch between writing, researching, and communicating",
      },
    ],
    solution: {
      description:
        "I led the engineering of SparkDoc, a next-generation collaborative editor that integrates AI-powered summarization, smart search, citation analysis, and real-time collaboration into a single platform built on Next.js, Nest.js, and AWS.",
      image: "/images/project-pics/sparkdoc/editor-citation.png",
      features: [
        {
          icon: "auto_awesome",
          title: "AI Summarization & Knowledge Extraction",
          desc: "Built-in AI reads entire documents and generates concise summaries, key takeaways, and structured insights, saving hours of manual review per document.",
        },
        {
          icon: "search",
          title: "Smart Search & Research Assistant",
          desc: "An AI-powered research chatbot lets users ask questions about their documents, find relevant sources, and get contextual answers without leaving the editor.",
        },
        {
          icon: "edit_note",
          title: "Real-Time Collaborative Editing",
          desc: "WebSocket-powered multi-user editing with live cursors, presence indicators, and conflict resolution. Teams write and review simultaneously without sync issues.",
        },
        {
          icon: "format_quote",
          title: "Citation Analysis & Source Management",
          desc: "Automatic citation detection, source verification, and a centralized view of all referenced materials with one-click access to original sources.",
        },
      ],
    },
    results: {
      description:
        "SparkDoc launched as a production platform at sparkdoc.com, delivering AI-powered document collaboration to teams. The AI summarization feature alone reduced document review time significantly, while real-time collaboration eliminated the back-and-forth of traditional document workflows.",
      testimonial: {
        quote:
          "SparkDoc completely transformed how our team handles documentation. The AI features are not gimmicks; they genuinely save us hours every week. The real-time collaboration feels instant.",
        author: "SparkDoc Team",
        role: "Founding Team, SparkDoc AI",
      },
    },
    gallery: [
      { src: "/images/project-pics/sparkdoc/Dashboard.png", caption: "Dashboard Overview" },
      { src: "/images/project-pics/sparkdoc/auto-suggestion.png", caption: "AI Auto-Suggestions" },
      { src: "/images/project-pics/sparkdoc/ai-chatbot.png", caption: "AI Research Chatbot" },
      { src: "/images/project-pics/sparkdoc/cite-analysis.png", caption: "Citation Analysis" },
      { src: "/images/project-pics/sparkdoc/view-sources.png", caption: "Source Management" },
      { src: "/images/project-pics/sparkdoc/document-settings.png", caption: "Document Settings" },
      { src: "/images/project-pics/sparkdoc/Register.png", caption: "User Registration" },
    ],
    techStack: ["Next.js", "Nest.js", "TypeScript", "MongoDB", "WebSockets", "AWS"],
    nextProjectSlug: "3d-generative-nft-builder",
  },
  {
    slug: "3d-generative-nft-builder",
    title: "NFT Builder: 3D Avatar Customization Platform",
    subtitle: "3D NFT Builder",
    heroImage: "/images/project-pics/3D Builder/cover.png",
    tags: ["Next.js", "GoLang", "Three.js", "Web3"],
    cardTags: ["Web3", "Three.js"],
    cardDesc:
      "Design and personalize your 3D avatar with unique assets, accessories, and outfits in a seamless NFT marketplace.",
    stats: [
      {
        value: "3D",
        label: "Real-time avatar customization engine",
        icon: "view_in_ar",
      },
      {
        value: "NFT",
        label: "Blockchain-secured digital asset ownership",
        icon: "token",
      },
      {
        value: "Live",
        label: "Marketplace with seamless trading",
        icon: "storefront",
      },
    ],
    challenge: [
      "The NFT space lacked immersive 3D avatar customization tools. Users were limited to flat, 2D profile pictures with no real personalization. The client needed a platform where users could fully customize 3D avatars with real-time rendering, own digital assets on-chain, and trade them in a built-in marketplace.",
      "The core technical challenge was delivering high-quality real-time 3D rendering in the browser while managing a complex marketplace of digital assets, wardrobe management, and blockchain integration for secure ownership and trading.",
    ],
    challengeCards: [
      {
        icon: "view_in_ar",
        title: "Real-Time 3D Rendering",
        desc: "High-fidelity avatar rendering in-browser without downloads",
      },
      {
        icon: "swap_horiz",
        title: "Seamless Asset Trading",
        desc: "Secure NFT marketplace with ownership verification",
      },
    ],
    solution: {
      description:
        "NFT Builder is an innovative 3D customization platform that empowers users to fully personalize their digital avatars with unique assets, accessories, and outfits. The platform provides a built-in marketplace, a wardrobe for managing purchased items, and a preview section for upcoming releases.",
      image: "/images/project-pics/3D Builder/marketplace.png",
      features: [
        {
          icon: "face",
          title: "Advanced 3D Avatar Customization",
          desc: "Modify every detail of your avatar to reflect your unique style with real-time rendering powered by Three.js, delivering smooth 60fps interactions across devices.",
        },
        {
          icon: "storefront",
          title: "NFT Asset Store & Trading",
          desc: "Browse, purchase, and trade exclusive digital accessories, outfits, and more. Blockchain integration ensures secure ownership and seamless buy/sell experiences.",
        },
        {
          icon: "checkroom",
          title: "Wardrobe Management",
          desc: "Keep track of all purchased assets with an intuitive wardrobe system. Mix and match items, preview combinations, and manage your entire digital collection.",
        },
        {
          icon: "smart_toy",
          title: "AI-Powered Recommendations",
          desc: "An AI recommendation engine suggests assets based on user preferences, ensuring a tailored and personalized shopping experience across the marketplace.",
        },
      ],
    },
    results: {
      description:
        "Built on cloud-based infrastructure, NFT Builder ensures high availability, security, and scalability. The self-hosted system encrypts asset ownership data, guaranteeing secure transactions and digital rights management. The platform supports compatibility with multiple metaverse environments, enabling avatars to be used across different virtual worlds.",
      testimonial: {
        quote:
          "The NFT Builder redefined how we think about digital identity. The 3D customization is incredibly smooth, and the marketplace makes trading assets effortless. It set a new standard for avatar platforms.",
        author: "NFT Builder Team",
        role: "Product & Engineering",
      },
    },
    gallery: [
      { src: "/images/project-pics/3D Builder/cover.png", caption: "3D Avatar Builder Overview" },
      { src: "/images/project-pics/3D Builder/marketplace.png", caption: "NFT Asset Marketplace" },
      { src: "/images/project-pics/3D Builder/customization.png", caption: "Avatar Customization" },
      { src: "/images/project-pics/3D Builder/wardrobe.png", caption: "Wardrobe Management" },
    ],
    techStack: ["Next.js", "GoLang", "Three.js", "React Three Fiber", "Web 3.0", "3D NFT"],
    nextProjectSlug: "ducorr",
  },
  {
    slug: "ducorr",
    title: "Ducorr: Cathodic Protection Specialists",
    subtitle: "Cathodic Protection & Corrosion Solutions",
    heroImage: "/images/project-pics/ducorr/home.png",
    tags: ["Next.js", "Corporate", "SEO", "Industrial"],
    cardTags: ["Corporate", "Next.js"],
    cardDesc:
      "A vertically integrated digital platform for UAE and KSA's leading cathodic protection specialists, featuring product catalog, project showcases, and e-commerce.",
    stats: [
      {
        value: "15+",
        label: "Years of cathodic protection expertise showcased",
        icon: "engineering",
      },
      {
        value: "SEO",
        label: "Optimized for regional search dominance",
        icon: "search",
      },
      {
        value: "E-Com",
        label: "Integrated product store and inquiries",
        icon: "storefront",
      },
    ],
    challenge: [
      "Ducorr is a leading cathodic protection specialist operating across UAE and KSA, offering corrosion solutions for marine structures, storage tanks, pipelines, and concrete installations. Their existing web presence failed to convey the depth of their technical expertise or capture leads effectively in a highly competitive industrial B2B market.",
      "The challenge was building a digital platform that could serve multiple purposes: a professional corporate presence, a detailed product catalog covering marine, concrete, and tank protection systems, a project portfolio showcasing landmark Middle East infrastructure projects, and an integrated e-commerce store for direct product sales.",
    ],
    challengeCards: [
      {
        icon: "language",
        title: "Multi-Purpose Platform",
        desc: "Corporate site, product catalog, portfolio, and store in one",
      },
      {
        icon: "search",
        title: "Regional SEO Dominance",
        desc: "Ranking for cathodic protection across UAE and KSA",
      },
    ],
    solution: {
      description:
        "We built a comprehensive digital platform for Ducorr that unifies their corporate identity, product lines, project portfolio, career portal, learning resources, and e-commerce store into a single performant, SEO-optimized website. The platform positions Ducorr as the authority in cathodic protection across the Middle East.",
      image: "/images/project-pics/ducorr/products-details.png",
      features: [
        {
          icon: "inventory_2",
          title: "Product Catalog & Details",
          desc: "Detailed product pages for marine (Marineshield, Powercell, Powertide, Unicell), concrete (Ioncrete), and tank (Tankbox, Platepro) protection systems with technical specifications and inquiry forms.",
        },
        {
          icon: "construction",
          title: "Project Showcase",
          desc: "Interactive portfolio featuring landmark projects like Dubai Water Canal, Anantara Resort Qatar, Emirates Aluminum, and Sokhna Port Egypt with detailed case studies and imagery.",
        },
        {
          icon: "school",
          title: "Learning & Resources Hub",
          desc: "Educational content hub with case studies, technical documentation, and industry insights, establishing Ducorr as a thought leader in corrosion protection engineering.",
        },
        {
          icon: "storefront",
          title: "Integrated E-Commerce Store",
          desc: "Built-in store for direct product purchases with inquiry management, enabling both online sales and lead generation from a single platform.",
        },
      ],
    },
    results: {
      description:
        "The new platform transformed Ducorr's digital presence, significantly improving search visibility for cathodic protection queries across UAE and KSA. The unified platform streamlined lead generation, product inquiries, and career applications while showcasing 15+ years of expertise across landmark Middle East infrastructure projects.",
      testimonial: {
        quote:
          "The new website perfectly represents who we are as a company. It captures our technical depth, showcases our track record across the Middle East, and the integrated store has opened a new revenue channel we didn't have before.",
        author: "Hassan Sheikh",
        role: "CEO & Founder, Ducorr",
      },
    },
    gallery: [
      { src: "/images/project-pics/ducorr/home.png", caption: "Homepage", tall: true },
      { src: "/images/project-pics/ducorr/products-details.png", caption: "Product Details" },
      { src: "/images/project-pics/ducorr/career.png", caption: "Career Portal" },
      { src: "/images/project-pics/ducorr/projects.png", caption: "Project Showcase", tall: true },
      { src: "/images/project-pics/ducorr/case-studies-learning.png", caption: "Case Studies & Learning", tall: true },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "SEO", "Headless CMS"],
    nextProjectSlug: "autogather",
  },
  {
    slug: "autogather",
    title: "AutoGather: AI-Powered Influencer Discovery",
    subtitle: "AI Influencer Marketing Platform",
    heroImage: "/images/project-pics/autogather/cover.png",
    tags: ["Next.js", "AI/ML", "SaaS", "Marketing"],
    cardTags: ["AI/ML", "SaaS"],
    cardDesc:
      "AI-powered platform that helps marketers search, evaluate, and collect influencers across Instagram, YouTube, and TikTok automatically.",
    stats: [
      {
        value: "AI",
        label: "Autonomous influencer search and evaluation",
        icon: "smart_toy",
      },
      {
        value: "3",
        label: "Platforms: Instagram, YouTube, TikTok",
        icon: "groups",
      },
      {
        value: "Real-Time",
        label: "Live social media data, no stale databases",
        icon: "bolt",
      },
    ],
    challenge: [
      "Influencer marketing teams spend countless hours manually searching social media platforms, evaluating profiles, and building spreadsheets of potential partners. Existing influencer databases rely on stale, pre-indexed data that quickly becomes outdated, leading to wasted outreach and missed opportunities.",
      "The core challenge was building an AI agent that could replicate the entire human research workflow: searching platforms in real time, reading profiles, evaluating influencers against custom criteria, and delivering filtered, assessed results, all without relying on pre-built databases or APIs with limited coverage.",
    ],
    challengeCards: [
      {
        icon: "schedule",
        title: "Manual Research Bottleneck",
        desc: "Hours spent per campaign on influencer discovery",
      },
      {
        icon: "sync_problem",
        title: "Stale Data Problem",
        desc: "Pre-indexed databases with outdated influencer metrics",
      },
    ],
    solution: {
      description:
        "AutoGather is an AI-powered platform that automates the entire influencer discovery process. It works like a human researcher, searching, reading profiles, evaluating, and filtering, but at scale and in real time across TikTok, Instagram, and YouTube.",
      image: "/images/project-pics/autogather/assessment.png",
      features: [
        {
          icon: "smart_toy",
          title: "AI Agent-Based Search",
          desc: "Advanced AI agent technology understands your specific needs and automatically searches social platforms on the fly, in real time, with no limits on the number of influencers it can discover.",
        },
        {
          icon: "checklist",
          title: "Criteria-Based Assessment",
          desc: "Detailed evaluation of whether each influencer matches your specific criteria, providing a comprehensive assessment that saves hours of manual research and vetting.",
        },
        {
          icon: "payments",
          title: "Credit-Based Pricing",
          desc: "Pay-per-result model where you only pay for relevant matches. Credits are refunded for irrelevant results, ensuring you only invest in valuable influencer data.",
        },
        {
          icon: "download",
          title: "Export & Email Unlock",
          desc: "Export curated influencer lists to CSV and unlock verified contact emails directly from the platform for seamless outreach campaigns.",
        },
      ],
    },
    results: {
      description:
        "AutoGather transformed how marketing teams discover influencers by eliminating manual research entirely. The platform delivers real-time, assessed influencer profiles across three major social platforms, with a pay-only-for-relevance model that ensures maximum ROI on influencer discovery spend.",
      testimonial: {
        quote:
          "AutoGather completely changed our influencer workflow. What used to take our team days of manual research now happens in minutes. The AI assessment is remarkably accurate, and the real-time data means we are always working with fresh profiles.",
        author: "Ruban & Chanelle",
        role: "Amsive",
      },
    },
    gallery: [
      { src: "/images/project-pics/autogather/cover.png", caption: "Login & Onboarding" },
      { src: "/images/project-pics/autogather/dashboard.png", caption: "Influencer Search Dashboard" },
      { src: "/images/project-pics/autogather/assessment.png", caption: "AI Assessment Results" },
      { src: "/images/project-pics/autogather/full-page.png", caption: "Full Platform Overview", tall: true },
    ],
    techStack: ["Next.js", "TypeScript", "Python", "AI/ML", "PostgreSQL", "AWS"],
    nextProjectSlug: "forborga",
  },
  {
    slug: "forborga",
    title: "Forborga: Customizable Virtual Payment Cards",
    subtitle: "Virtual Payment Card Platform",
    heroImage: "/images/project-pics/Forborga/cover.png",
    tags: ["Vue.js", "Nuxt.js", "Fintech", "Crypto"],
    cardTags: ["Fintech", "Vue.js"],
    cardDesc:
      "Flexible payment solution with virtual card creation, spend limits, subscription management, and secure crypto transactions via QB.se.",
    stats: [
      {
        value: "Virtual",
        label: "Instant virtual card creation for online payments",
        icon: "credit_card",
      },
      {
        value: "Crypto",
        label: "QB.se integrated secure crypto transactions",
        icon: "currency_bitcoin",
      },
      {
        value: "Flexible",
        label: "Subscription and one-time purchase options",
        icon: "tune",
      },
    ],
    challenge: [
      "Individuals needed a secure, hassle-free way to create virtual cards for online payments with full control over spend limits and card types. Traditional banking solutions were slow, rigid, and lacked support for cryptocurrency payments, leaving users with no unified platform for both fiat and crypto spending.",
      "The challenge was building a seamless virtual card platform that supports both subscription-based and one-time purchase cards, integrates crypto payment rails via QB.se, and delivers a user-friendly experience with KYC verification, vendor management, and real-time transaction tracking.",
    ],
    challengeCards: [
      {
        icon: "credit_card_off",
        title: "Rigid Card Options",
        desc: "No flexible virtual card creation with spend controls",
      },
      {
        icon: "currency_bitcoin",
        title: "Crypto Gap",
        desc: "No unified platform for fiat and crypto payments",
      },
    ],
    solution: {
      description:
        "Forborga offers payment solutions to individuals through a virtual card account platform. Users can securely create virtual cards for online payments with a seamless, user-friendly design that smoothens the entire virtual debit card experience with no hassle.",
      image: "/images/project-pics/Forborga/cards-overview.png",
      features: [
        {
          icon: "add_card",
          title: "Virtual Card Creation",
          desc: "Instantly create customizable virtual cards with configurable spend limits, expiry dates, and usage controls for secure online transactions.",
        },
        {
          icon: "autorenew",
          title: "Subscription & One-Time Cards",
          desc: "Flexible card types supporting recurring subscription payments and single-use purchase cards, giving users complete control over their spending.",
        },
        {
          icon: "currency_bitcoin",
          title: "Crypto Payments via QB.se",
          desc: "Integrated QB.se for secure cryptocurrency transactions, enabling users to fund virtual cards and make payments using crypto alongside traditional methods.",
        },
        {
          icon: "verified_user",
          title: "KYC & Vendor Management",
          desc: "Built-in KYC verification flow for regulatory compliance, along with vendor registration and management for merchant-side operations.",
        },
      ],
    },
    results: {
      description:
        "Forborga delivered a frictionless virtual card experience that bridged the gap between traditional payments and cryptocurrency. The platform enabled users to create, manage, and control virtual cards instantly while supporting both fiat and crypto payment rails in a single unified interface.",
      testimonial: {
        quote:
          "Forborga made virtual card management effortless. The ability to set spend limits, switch between subscription and one-time cards, and pay with crypto all in one place is exactly what our users needed.",
        author: "Forborga Team",
        role: "Product & Operations",
      },
    },
    gallery: [
      { src: "/images/project-pics/Forborga/cover.png", caption: "Landing Page" },
      { src: "/images/project-pics/Forborga/cards-overview.png", caption: "Cards Overview" },
      { src: "/images/project-pics/Forborga/payment-flow.png", caption: "Payment Flow" },
      { src: "/images/project-pics/Forborga/dashboard.png", caption: "Dashboard" },
      { src: "/images/project-pics/Forborga/card-management.png", caption: "Card Management" },
      { src: "/images/project-pics/Forborga/transactions.png", caption: "Transactions" },
      { src: "/images/project-pics/Forborga/kyc-verification.png", caption: "KYC Verification" },
      { src: "/images/project-pics/Forborga/crypto-payments.png", caption: "Crypto Payments" },
    ],
    techStack: ["Vue.js", "Nuxt.js", "Vuex", "Vuetify", "PHP", "PostgreSQL", "Stripe API", "QB.se"],
    nextProjectSlug: "managed-hosting-dashboard",
  },
  {
    slug: "managed-hosting-dashboard",
    title: "Premium Managed WordPress Hosting Platform",
    subtitle: "Web Hosting Management Dashboard",
    heroImage: "/images/project-pics/bigscoots/cover.jpg",
    tags: ["React", "Node.js", "WordPress", "Cloud Infrastructure"],
    cardTags: ["SaaS", "Cloud"],
    cardDesc:
      "Fully managed WordPress hosting platform serving 17,000+ clients with real-time site monitoring, seamless migrations, and 24/7 expert support.",
    stats: [
      {
        value: "17K+",
        label: "Active clients across managed hosting plans",
        icon: "groups",
      },
      {
        value: "99.99%",
        label: "Guaranteed uptime delivered year after year",
        icon: "check_circle",
      },
      {
        value: "~90s",
        label: "Average expert support response time 24/7/365",
        icon: "support_agent",
      },
    ],
    challenge: [
      "The managed WordPress hosting industry is dominated by impersonal, ticket-driven platforms where clients wait hours for generic support responses. Existing hosting dashboards lack real-time site-specific monitoring, proactive performance optimization, and the personal touch that growing businesses need.",
      "The challenge was building a hosting management platform that could handle billions of monthly page views across 17,000+ clients while delivering a human-to-human experience: personalized site management, real-time monitoring dashboards, seamless zero-downtime migrations, and expert support with ~90 second response times around the clock.",
    ],
    challengeCards: [
      {
        icon: "speed",
        title: "Performance at Scale",
        desc: "Billions of page views with sub-second load times",
      },
      {
        icon: "support_agent",
        title: "Human-to-Human Support",
        desc: "~90 second expert responses, not chatbot runarounds",
      },
    ],
    solution: {
      description:
        "A premium fully managed WordPress hosting platform built on the principle that hosting should be personal, expert, and always there. The platform combines enterprise-grade infrastructure with a management dashboard that gives both the support team and clients complete visibility into site health, performance, and security.",
      image: "/images/project-pics/bigscoots/management-panel.png",
      features: [
        {
          icon: "monitoring",
          title: "Real-Time Site Monitoring",
          desc: "Proactive 24/7 monitoring with site-specific dashboards tracking uptime, performance metrics, security events, and resource usage across all managed WordPress installations.",
        },
        {
          icon: "swap_horiz",
          title: "Zero-Downtime Migrations",
          desc: "Seamless, fully managed migration system with average completion in ~45 minutes, handled entirely by the expert team with guaranteed zero downtime.",
        },
        {
          icon: "shield",
          title: "Security & Performance Optimization",
          desc: "Integrated Cloudflare Enterprise CDN, daily backups, proactive threat monitoring, and site-specific performance tuning delivered through Boost by BigScoots technology.",
        },
        {
          icon: "people",
          title: "Expert Management Console",
          desc: "Internal dashboard enabling the support team to deliver personalized, site-specific management with deep system knowledge, powering the industry's fastest expert response times.",
        },
      ],
    },
    results: {
      description:
        "The platform successfully serves 17,000+ clients handling billions of page views monthly with 99.99% uptime. The human-to-human approach and expert management tools enabled ~90 second support response times 24/7/365, resulting in 14 years of nothing but positive reviews and industry-leading client retention.",
      testimonial: {
        quote:
          "BigScoots is not a set-it-and-forget-it hosting provider. If something is not working as expected, the team gets in there and provides solutions without a runaround. That's sorely lacking with many other hosting providers these days.",
        author: "Casey Markee",
        role: "Media Wyse",
      },
    },
    gallery: [
      { src: "/images/project-pics/bigscoots/cover.jpg", caption: "Hosting Platform Overview" },
      { src: "/images/project-pics/bigscoots/dashboard.jpg", caption: "Management Dashboard" },
      { src: "/images/project-pics/bigscoots/site-monitoring.jpg", caption: "Site Monitoring" },
      { src: "/images/project-pics/bigscoots/hosting-overview.jpg", caption: "Hosting Overview" },
    ],
    techStack: ["React", "Node.js", "WordPress", "Cloudflare", "AWS", "MySQL"],
    nextProjectSlug: "crypto-wallet",
  },
  {
    slug: "crypto-wallet",
    title: "CryptoVault",
    subtitle: "Web3 Crypto Management Dashboard",
    heroImage: "/images/project-pics/crypto-wallet/dashboard.png",
    tags: ["Web3", "Fintech", "Nuxt.js", "ERC-1155"],
    cardTags: ["Web3", "Fintech"],
    cardDesc:
      "A comprehensive cryptocurrency management dashboard for sending, receiving, tracking prices, and accessing DApps from a single streamlined interface.",
    stats: [
      { value: "5+", label: "Blockchain Networks", icon: "token" },
      { value: "< 1s", label: "Transaction Speed", icon: "bolt" },
      { value: "50K+", label: "Wallet Interactions", icon: "account_balance_wallet" },
      { value: "99.9%", label: "Uptime SLA", icon: "verified" },
    ],
    challenge: [
      "Crypto traders needed a unified platform to manage assets across multiple blockchains without switching between fragmented tools.",
      "Existing wallets offered basic send/receive but lacked portfolio analytics, DApp integration, and real-time price tracking in a single view.",
    ],
    challengeCards: [
      {
        icon: "scatter_plot",
        title: "Multi-Chain Complexity",
        desc: "Users juggled multiple wallets and interfaces for different blockchain networks, increasing friction and error risk.",
      },
      {
        icon: "analytics",
        title: "No Unified Analytics",
        desc: "Portfolio performance, token distribution, and market trends were scattered across multiple tools with no consolidated view.",
      },
      {
        icon: "shield",
        title: "Security vs. Usability",
        desc: "Balancing enterprise-grade security (private key management, 2FA) with an intuitive user experience for everyday transactions.",
      },
    ],
    solution: {
      description:
        "Built a modern cryptocurrency management dashboard that consolidates wallet management, portfolio tracking, DApp access, and real-time market data into a single, elegant interface. Leveraging Nuxt.js for server-side rendering and Vuetify for Material Design components, the platform delivers blazing-fast performance with a polished, professional UI that crypto traders trust.",
      image: "/images/project-pics/crypto-wallet/portfolio.png",
      features: [
        {
          icon: "send",
          title: "Instant Send & Receive",
          desc: "Streamlined transaction flows with QR scanning, address book, and gas fee optimization across multiple blockchain networks.",
        },
        {
          icon: "monitoring",
          title: "Real-Time Portfolio Tracking",
          desc: "Live price feeds, interactive Chart.js visualizations, token distribution breakdowns, and historical performance analytics.",
        },
        {
          icon: "apps",
          title: "Integrated DApp Store",
          desc: "Built-in decentralized application marketplace with direct wallet connectivity, allowing users to interact with DeFi protocols seamlessly.",
        },
        {
          icon: "security",
          title: "ERC-1155 Multi-Token Support",
          desc: "Native support for ERC-1155 standard enabling efficient batch transfers and management of both fungible and non-fungible tokens.",
        },
      ],
    },
    results: {
      description:
        "The dashboard became the go-to tool for the client's user base, reducing average transaction time by 60% and increasing daily active wallet interactions by 3x within the first quarter post-launch.",
      testimonial: {
        quote:
          "Ali delivered exactly what we needed. The dashboard is fast, clean, and our users love it. Transaction volume doubled within weeks of launch.",
        author: "Quincy Chapman",
        role: "Founder & CEO",
      },
    },
    gallery: [
      { src: "/images/project-pics/crypto-wallet/dashboard.png", caption: "Main Dashboard" },
      { src: "/images/project-pics/crypto-wallet/portfolio.png", caption: "Portfolio Analytics" },
      { src: "/images/project-pics/crypto-wallet/transactions.png", caption: "Transaction History" },
      { src: "/images/project-pics/crypto-wallet/wallet-overview.png", caption: "Wallet Overview" },
      { src: "/images/project-pics/crypto-wallet/dapp-store.png", caption: "DApp Store" },
    ],
    techStack: ["Nuxt.js", "Vuetify", "Chart.js", "Web3.js", "ERC-1155", "Node.js"],
    nextProjectSlug: "nft-marketplace",
  },
  {
    slug: "nft-marketplace",
    title: "NFT Nexus",
    subtitle: "NFT Marketplace for Digital Art & Collectibles",
    heroImage: "/images/project-pics/nft-marketplace/marketplace-home.png",
    tags: ["Web3", "React", "ERC-721", "Marketplace"],
    cardTags: ["Web3", "Marketplace"],
    cardDesc:
      "A futuristic NFT marketplace for buying, selling, and trading digital art, gaming assets, music, and collectibles with a sleek dark-themed UI.",
    stats: [
      { value: "10K+", label: "NFTs Listed", icon: "collections" },
      { value: "< 2s", label: "Listing Speed", icon: "bolt" },
      { value: "4", label: "Asset Categories", icon: "category" },
      { value: "ERC-721", label: "Token Standard", icon: "token" },
    ],
    challenge: [
      "The NFT space lacked marketplaces that combined a premium visual experience with genuinely fast, low-friction trading flows.",
      "Existing platforms felt utilitarian. Collectors and creators wanted a marketplace that matched the artistic quality of the assets being traded.",
    ],
    challengeCards: [
      {
        icon: "palette",
        title: "Premium Visual Experience",
        desc: "Collectors expected gallery-quality presentation for high-value digital art, not generic card grids with thumbnail previews.",
      },
      {
        icon: "swap_horiz",
        title: "Frictionless Trading",
        desc: "Multi-step wallet approvals and slow listing flows frustrated sellers. Every extra click meant lost listings and abandoned transactions.",
      },
      {
        icon: "category",
        title: "Multi-Category Support",
        desc: "Digital art, gaming items, music, and collectibles each have different metadata schemas and display requirements.",
      },
    ],
    solution: {
      description:
        "Designed and built a fully functional NFT marketplace with a dark-themed, futuristic UI that puts the artwork front and center. Built with React and Tailwind CSS for pixel-perfect responsiveness, integrated with Web3.js and ERC-721 for secure on-chain ownership, the platform supports multi-category browsing, instant wallet connectivity, and streamlined buy/sell/auction flows.",
      image: "/images/project-pics/nft-marketplace/marketplace-explore.png",
      features: [
        {
          icon: "storefront",
          title: "Multi-Category Marketplace",
          desc: "Dedicated sections for digital art, gaming assets, music NFTs, and collectibles, each with category-specific metadata and filters.",
        },
        {
          icon: "gavel",
          title: "Auction & Fixed Price",
          desc: "Flexible listing options including timed auctions with reserve prices and instant buy-now fixed-price sales.",
        },
        {
          icon: "account_balance_wallet",
          title: "Seamless Wallet Integration",
          desc: "One-click wallet connect with MetaMask and WalletConnect, plus real-time balance and transaction status updates.",
        },
        {
          icon: "verified",
          title: "ERC-721 On-Chain Provenance",
          desc: "Full ownership history and authenticity verification through ERC-721 smart contracts with transparent on-chain records.",
        },
      ],
    },
    results: {
      description:
        "The marketplace launched to strong reception from the creator community. The premium dark UI became a differentiator, with users consistently praising the visual experience and smooth trading flow.",
      testimonial: {
        quote:
          "Ali built exactly the marketplace we envisioned. The dark futuristic design sets us apart and our creators love how their art looks on the platform. Trading volume exceeded our first-month targets.",
        author: "Aldrey John Arellano",
        role: "Project Lead",
      },
    },
    gallery: [
      { src: "/images/project-pics/nft-marketplace/marketplace-home.png", caption: "Marketplace Homepage", tall: true },
      { src: "/images/project-pics/nft-marketplace/marketplace-explore.png", caption: "Explore & Collections", tall: true },
    ],
    techStack: ["React", "Tailwind CSS", "Web3.js", "ERC-721", "Node.js", "Ethereum"],
    nextProjectSlug: "campaign-builder",
  },
  {
    slug: "campaign-builder",
    title: "ScribeAI",
    subtitle: "AI Campaign Management Platform",
    heroImage: "/images/project-pics/campaign-builder/campaign-library.png",
    tags: ["SaaS", "AI/ML", "Laravel", "React"],
    cardTags: ["SaaS", "AI/ML"],
    cardDesc:
      "An AI-powered campaign management platform with a 3-module system (Train, Build, Review) and 6-step campaign workflow for data-driven marketing at scale.",
    stats: [
      { value: "3", label: "Core Modules", icon: "hub" },
      { value: "11", label: "Training Steps", icon: "school" },
      { value: "6", label: "Campaign Steps", icon: "campaign" },
      { value: "100%", label: "Figma Match", icon: "design_services" },
    ],
    challenge: [
      "Marketing teams lacked a unified platform that could train AI on their brand data, build campaigns with intelligent recommendations, and review performance in a single workflow.",
      "Existing tools offered fragmented experiences. Users had to jump between analytics, creative tools, and campaign managers, losing context and efficiency at every step.",
    ],
    challengeCards: [
      {
        icon: "model_training",
        title: "Complex Training Pipeline",
        desc: "Users needed to configure 11 interconnected steps covering objectives, brand, personas, products, customers, cohorts, and more before launching any campaign.",
      },
      {
        icon: "route",
        title: "Multi-Step Workflow",
        desc: "Campaign creation required a structured 6-step wizard from directive selection through asset delivery, each with validation, draft saving, and progression logic.",
      },
      {
        icon: "dashboard_customize",
        title: "Real-Time Review System",
        desc: "Stakeholders needed a live dashboard to monitor campaign performance, track status, and drill into individual campaign analytics without leaving the platform.",
      },
    ],
    solution: {
      description:
        "Designed and built a comprehensive AI campaign management platform with three tightly integrated modules. The Train module guides users through an 11-step data foundation process. The Build module delivers a 6-step campaign creation wizard with auto-save, step validation, and progressive disclosure. The Review module provides real-time dashboards with campaign analytics, status tracking, and performance deep-dives. Every screen was built to match Figma designs pixel-for-pixel.",
      image: "/images/project-pics/campaign-builder/cohort-campaign-selection.png",
      features: [
        {
          icon: "school",
          title: "11-Step AI Training Pipeline",
          desc: "Comprehensive setup covering objectives, brand guidelines, personas, products, customers, cohorts, directives, messaging, channels, rules, and integrations.",
        },
        {
          icon: "auto_fix_high",
          title: "6-Step Campaign Wizard",
          desc: "Structured workflow: Directive Selection, Cohort Selection, Core Creative, Channels, Plan Generation, and Assets & Deliverables with draft saving at every step.",
        },
        {
          icon: "monitoring",
          title: "Performance Review Dashboard",
          desc: "Campaign overview with summary statistics, search/filter, status tracking, and deep-dive performance metrics for each campaign.",
        },
        {
          icon: "save",
          title: "Auto-Save & Draft Recovery",
          desc: "Persistent draft saving at each workflow step with browser recovery, ensuring users never lose progress during campaign creation.",
        },
      ],
    },
    results: {
      description:
        "The platform launched as a fully functional MVP that demonstrated the complete user journey from AI training through campaign review. The pixel-perfect UI matched Figma designs exactly, and the structured workflow reduced campaign setup time significantly.",
      testimonial: {
        quote:
          "Ali turned our complex vision into a polished, working product. The 3-module system flows exactly how we designed it, and the campaign wizard is intuitive even for non-technical marketers. Exceeded our expectations.",
        author: "Jake Berton",
        role: "Founder, ScribeAI",
      },
    },
    gallery: [
      { src: "/images/project-pics/campaign-builder/campaign-library.png", caption: "Campaign Library" },
      { src: "/images/project-pics/campaign-builder/cohort-campaign-selection.png", caption: "Cohort Campaign Selection" },
      { src: "/images/project-pics/campaign-builder/cohort-library.png", caption: "Cohort Library" },
      { src: "/images/project-pics/campaign-builder/customer-library.png", caption: "Customer Library" },
      { src: "/images/project-pics/campaign-builder/product-library.png", caption: "Product Library" },
    ],
    techStack: ["React", "Laravel", "Tailwind CSS", "Chart.js", "MySQL", "Redis"],
    nextProjectSlug: "aladdin-catering",
  },
  {
    slug: "aladdin-catering",
    title: "Aladdin Mediterranean Cuisine",
    subtitle: "Restaurant Website & Online Ordering System",
    heroImage: "/images/project-pics/Aladdin-catering/home.png",
    tags: ["SaaS", "Vue.js", "E-commerce"],
    cardTags: ["E-commerce", "Vue.js"],
    cardDesc:
      "Full-stack restaurant website and catering ordering system for Houston's beloved halal Mediterranean restaurant, serving fresh food since 2006.",
    stats: [
      { value: "2", label: "Locations Served", icon: "location_on" },
      { value: "18+", label: "Years in Business", icon: "schedule" },
      { value: "100%", label: "Halal Certified", icon: "verified" },
      { value: "A-Z", label: "Built from Scratch", icon: "construction" },
    ],
    challenge: [
      "Aladdin Mediterranean Cuisine needed a modern digital presence that matched the quality of their food. Their existing setup lacked online ordering capabilities, making it difficult to serve the growing demand for catering and takeout orders.",
      "The restaurant required a seamless system that could handle dine-in menu browsing, catering orders with custom configurations, and a smooth checkout flow, all while reflecting the warmth and authenticity of their Mediterranean brand.",
    ],
    challengeCards: [
      {
        icon: "shopping_cart",
        title: "Online Ordering System",
        desc: "Building a complete catering and takeout ordering flow with cart management, item customization, and real-time order processing for two restaurant locations.",
      },
      {
        icon: "restaurant_menu",
        title: "Dynamic Menu Management",
        desc: "Creating an intuitive menu system that showcases diverse Mediterranean offerings across categories with dietary labels, pricing tiers, and seasonal specials.",
      },
      {
        icon: "devices",
        title: "Multi-Location Support",
        desc: "Serving both Montrose and Garden Oaks locations with location-specific menus, operating hours, and delivery zones through a unified platform.",
      },
    ],
    solution: {
      description:
        "Designed and developed a complete restaurant website and online ordering platform from scratch using Vue.js. The solution features a visually rich homepage showcasing the brand story, a dynamic menu with filtering and categories, a full catering ordering system with cart and checkout, and location-specific pages. Every component was built for speed, mobile responsiveness, and conversion optimization.",
      image: "/images/project-pics/Aladdin-catering/catering-menu.png",
      features: [
        {
          icon: "storefront",
          title: "Brand-First Design",
          desc: "Immersive homepage with hero imagery, customer testimonials, press features, and the brand story to build trust and drive conversions.",
        },
        {
          icon: "add_shopping_cart",
          title: "Catering Order System",
          desc: "Complete cart-based ordering flow with item selection, quantity management, add-to-cart functionality, and streamlined checkout for catering events.",
        },
        {
          icon: "menu_book",
          title: "Interactive Menu Experience",
          desc: "Beautifully designed menu pages with category navigation, dish descriptions, pricing, and dietary information for both dine-in and catering.",
        },
        {
          icon: "phone_android",
          title: "Mobile-First & Fast",
          desc: "Fully responsive design optimized for mobile ordering, with fast load times and smooth interactions for on-the-go customers.",
        },
      ],
    },
    results: {
      description:
        "The platform launched as a polished, production-ready website that transformed Aladdin's digital presence. The online ordering system enabled catering customers to place orders seamlessly, while the brand-rich design drove increased foot traffic and online engagement across both Houston locations.",
      testimonial: {
        quote:
          "Ali is an exceptional developer who exceeded all our expectations! He created a catering website in Vue.js for us from A-Z with incredible precision and attention to detail. His technical expertise, communication, and dedication were evident throughout the project. Not only did he deliver a sleek, functional, and user-friendly design, but he also ensured that every feature worked perfectly. If you're looking for a professional who can handle everything with perfection, Ali is your guy.",
        author: "Ali Nehhas",
        role: "Owner, Aladdin Mediterranean Cuisine",
      },
    },
    gallery: [
      { src: "/images/project-pics/Aladdin-catering/home.png", caption: "Homepage", tall: true },
      { src: "/images/project-pics/Aladdin-catering/menu.png", caption: "Full Menu", tall: true },
      { src: "/images/project-pics/Aladdin-catering/catering-menu.png", caption: "Catering Menu", tall: true },
      { src: "/images/project-pics/Aladdin-catering/about-us.png", caption: "About Us", tall: true },
      { src: "/images/project-pics/Aladdin-catering/add-to-cart.png", caption: "Add to Cart" },
    ],
    techStack: ["Vue.js", "Vuetify", "Nuxt.js", "Node.js", "JavaScript", "Stripe"],
    nextProjectSlug: "efxpro",
  },
  {
    slug: "efxpro",
    title: "efxPro",
    subtitle: "Forex & Global Markets Trading Platform",
    heroImage: "/images/project-pics/efxpro/home.png",
    tags: ["Fintech", "SaaS", "Trading"],
    cardTags: ["Fintech", "Trading"],
    cardDesc:
      "Full-featured forex and CFD trading platform with real-time market data, multi-account management, social trading, and regulatory-compliant onboarding.",
    stats: [
      { value: "1000+", label: "Trading Instruments", icon: "candlestick_chart" },
      { value: "150+", label: "Countries Served", icon: "public" },
      { value: "85M+", label: "Trades Executed", icon: "swap_horiz" },
      { value: "0.12s", label: "Avg Execution Time", icon: "speed" },
    ],
    challenge: [
      "efxPro needed a modern, high-performance trading platform that could handle real-time market data feeds, complex account management (MAM/PAMM), and regulatory-compliant onboarding across 150+ countries.",
      "The platform required lightning-fast execution, live pricing widgets, economic calendars, and a seamless experience across forex, metals, indices, energies, and futures markets, all while maintaining strict financial compliance standards.",
    ],
    challengeCards: [
      {
        icon: "trending_up",
        title: "Real-Time Market Data",
        desc: "Streaming live prices for 1,000+ instruments across forex, metals, indices, energies, and futures with sub-second execution times.",
      },
      {
        icon: "account_balance",
        title: "Multi-Account Architecture",
        desc: "Supporting Standard and Elite accounts with MAM/PAMM capabilities, social trading integration, and partner IB program management.",
      },
      {
        icon: "gavel",
        title: "Regulatory Compliance",
        desc: "AI-powered onboarding with KYC verification, risk disclaimers, and region-specific compliance for a globally regulated broker.",
      },
    ],
    solution: {
      description:
        "Built a comprehensive trading platform from the ground up featuring a high-impact landing page with animated market widgets, real-time trending markets display, and a streamlined 3-step account opening flow. The platform integrates live economic calendars, news feeds, and detailed product pages for every asset class. Every screen was designed for conversion optimization with clear CTAs, trust signals, and performance metrics prominently displayed.",
      image: "/images/project-pics/efxpro/detail-page.png",
      features: [
        {
          icon: "candlestick_chart",
          title: "Live Trading Widgets",
          desc: "Real-time price tickers, trending markets section, and interactive charts for forex, metals, indices, energies, and futures.",
        },
        {
          icon: "people",
          title: "Social & Copy Trading",
          desc: "Integrated social trading platform with MAM and PAMM account management for professional money managers and followers.",
        },
        {
          icon: "newspaper",
          title: "Economic Intelligence",
          desc: "Built-in economic calendar and news feed providing traders with real-time market-moving events and analysis.",
        },
        {
          icon: "rocket_launch",
          title: "3-Step Onboarding",
          desc: "AI-powered account registration flow: Register, Fund, Trade. Live in minutes with automated KYC verification.",
        },
      ],
    },
    results: {
      description:
        "The platform launched serving traders across 150+ countries with 1,000+ instruments, executing over 85 million trades with an average execution time of 0.12 seconds. The modern, conversion-optimized design significantly improved account signups and trading engagement.",
      testimonial: {
        quote:
          "It was a great experience working with Ali. He is highly professional, and his development skill set is truly impressive. Moreover, he is extremely responsive and communicative throughout the entire project. From start to finish, I didn't encounter any issues. I'm definitely looking forward to working with him again in the future and would 100% recommend him.",
        author: "Imran",
        role: "Founder, efxPro",
      },
    },
    gallery: [
      { src: "/images/project-pics/efxpro/home.png", caption: "Homepage", tall: true },
      { src: "/images/project-pics/efxpro/account.png", caption: "Account Types", tall: true },
      { src: "/images/project-pics/efxpro/detail-page.png", caption: "Product Detail", tall: true },
      { src: "/images/project-pics/efxpro/economic-news.png", caption: "Economic News", tall: true },
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "WebSockets"],
    nextProjectSlug: "custom-enterprise-crm",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
