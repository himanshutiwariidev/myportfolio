import {
  FaCode,
  FaCogs,
  FaMobileAlt,
  FaSearch,
  FaShoppingCart,
  FaTools,
} from 'react-icons/fa';

const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://technicaltiwariji.com').replace(/\/$/, '');

export const services = [
  {
    slug: 'custom-website-development',
    title: 'Custom Website Development',
    shortTitle: 'Web Development',
    description:
      'Tailored website solutions with responsive design, fast load speeds, and scalable architecture.',
    icon: FaCode,
    color: 'text-sky-400',
    accent: 'from-sky-400 via-orange-500 to-amber-300',
    seoTitle: 'Custom Website Development Services | Himanshhu Tiwari',
    seoDescription:
      'Get a fast, responsive, SEO-friendly business website built with modern frontend, backend, CMS, and deployment practices by Himanshhu Tiwari.',
    headline: 'Custom Website Development Services for Fast, SEO-Friendly Business Growth',
    intro:
      'A website should do more than look good. I build custom websites that load quickly, guide visitors clearly, and give your business a reliable digital foundation for leads, sales, and long-term growth.',
    highlights: [
      'Responsive website design for mobile, tablet, and desktop users',
      'Clean React, Next.js, MERN, or custom stack development',
      'Conversion-focused landing pages, portfolio sites, and business websites',
      'SEO-friendly structure, metadata, internal links, and performance tuning',
      'Secure forms, integrations, hosting setup, and launch support',
    ],
    process: [
      'Discovery: understand your business goals, audience, competitors, and pages required.',
      'Planning: create a clear page structure, content flow, user journey, and technology plan.',
      'Design and build: develop a modern interface with reusable components and responsive layouts.',
      'Optimization: improve speed, accessibility, technical SEO, schema readiness, and browser compatibility.',
      'Launch: deploy the website, connect domain, configure analytics, and provide handover guidance.',
    ],
    includes: [
      'Business website development',
      'Portfolio website development',
      'Landing page development',
      'MERN stack web apps',
      'Website redesign',
      'CMS or admin dashboard setup',
    ],
    faqs: [
      {
        question: 'What type of website can you build?',
        answer:
          'I can build business websites, portfolio sites, landing pages, ecommerce websites, service websites, dashboards, and full-stack web applications.',
      },
      {
        question: 'Will the website be SEO-friendly?',
        answer:
          'Yes. I structure pages with search-friendly headings, metadata, clean URLs, fast loading, mobile responsiveness, and content sections that help users and search engines understand the service.',
      },
      {
        question: 'Can you redesign my existing website?',
        answer:
          'Yes. I can improve an existing website with a cleaner UI, better performance, stronger SEO structure, and clearer conversion paths.',
      },
    ],
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    shortTitle: 'Mobile Apps',
    description:
      'Cross-platform mobile apps with smooth interfaces, reliable performance, and scalable architecture.',
    icon: FaMobileAlt,
    color: 'text-pink-400',
    accent: 'from-pink-400 via-orange-500 to-amber-300',
    seoTitle: 'Mobile App Development Services | Himanshhu Tiwari',
    seoDescription:
      'Build cross-platform mobile applications with clean UI, scalable APIs, secure authentication, and smooth user experiences.',
    headline: 'Mobile App Development for Modern, Reliable, User-Friendly Products',
    intro:
      'I design and develop mobile apps that help businesses serve customers, manage operations, and launch digital products with a smooth experience across devices.',
    highlights: [
      'Cross-platform mobile app development',
      'App screens designed for clarity and speed',
      'API integration, authentication, and secure data flows',
      'Admin dashboards and backend support',
      'Testing, deployment guidance, and future-ready architecture',
    ],
    process: [
      'Define app goals, core features, user roles, and launch priorities.',
      'Plan screens, navigation, data models, and API requirements.',
      'Build the mobile interface and connect it with backend services.',
      'Test performance, usability, forms, authentication, and key workflows.',
      'Prepare release assets, deployment steps, and maintenance plan.',
    ],
    includes: [
      'React Native app development',
      'Customer apps',
      'Booking apps',
      'Business management apps',
      'API-backed mobile apps',
      'App maintenance',
    ],
    faqs: [
      {
        question: 'Do you build Android and iOS apps?',
        answer:
          'I build cross-platform apps that can support Android and iOS from a shared codebase, depending on project requirements.',
      },
      {
        question: 'Can you build the backend too?',
        answer:
          'Yes. I can build the API, database, authentication, admin panel, and deployment flow required for the app.',
      },
    ],
  },
  {
    slug: 'ecommerce-solutions',
    title: 'E-commerce Solutions',
    shortTitle: 'E-commerce',
    description:
      'Secure, full-featured online stores with inventory management, payment integration, and analytics.',
    icon: FaShoppingCart,
    color: 'text-emerald-400',
    accent: 'from-emerald-400 via-orange-500 to-amber-300',
    seoTitle: 'E-commerce Website Development Services | Himanshhu Tiwari',
    seoDescription:
      'Launch a secure ecommerce website with product catalog, cart, checkout, payment integration, inventory, and SEO-friendly product pages.',
    headline: 'E-commerce Website Development That Turns Products Into Online Sales',
    intro:
      'I build ecommerce websites that make products easy to browse, trust easy to build, and checkout simple for customers.',
    highlights: [
      'Product catalog, category pages, cart, and checkout',
      'Payment gateway integration and secure order handling',
      'Inventory, order management, coupons, and admin workflows',
      'SEO-friendly product pages and category structure',
      'Performance optimization for mobile shoppers',
    ],
    process: [
      'Map product categories, payment needs, shipping rules, and customer journey.',
      'Create the store structure, product page layout, and checkout flow.',
      'Build frontend, backend, cart, payment, and admin features.',
      'Test orders, payment status, inventory updates, and email flows.',
      'Launch the store with analytics, search indexing basics, and handover.',
    ],
    includes: [
      'Online store development',
      'Product catalog websites',
      'Payment gateway setup',
      'Order management systems',
      'Inventory management',
      'Ecommerce SEO structure',
    ],
    faqs: [
      {
        question: 'Can you integrate payment gateways?',
        answer:
          'Yes. Payment integration can be added based on the gateway and business requirements.',
      },
      {
        question: 'Will I be able to manage products?',
        answer:
          'Yes. I can build an admin panel so you can add products, update prices, manage inventory, and review orders.',
      },
    ],
  },
  {
    slug: 'website-maintenance',
    title: 'Website Maintenance',
    shortTitle: 'Maintenance',
    description:
      'Ongoing updates, backups, security patches, and feature upgrades to keep your site fresh.',
    icon: FaTools,
    color: 'text-amber-400',
    accent: 'from-amber-300 via-orange-500 to-yellow-400',
    seoTitle: 'Website Maintenance Services | Himanshhu Tiwari',
    seoDescription:
      'Keep your website secure, updated, fast, and reliable with professional maintenance, backups, bug fixes, and feature support.',
    headline: 'Website Maintenance Services to Keep Your Site Secure, Updated, and Fast',
    intro:
      'A live website needs regular care. I help businesses keep websites stable, protected, updated, and ready for new content or features.',
    highlights: [
      'Bug fixes, content updates, and layout improvements',
      'Security updates, dependency checks, and backup planning',
      'Speed optimization and technical health checks',
      'Form, link, and user flow testing',
      'Feature upgrades and ongoing development support',
    ],
    process: [
      'Audit the current website for bugs, speed, security, and content issues.',
      'Prioritize fixes based on risk, business impact, and launch urgency.',
      'Apply updates, test key pages, and verify important workflows.',
      'Monitor performance, forms, links, and hosting setup.',
      'Plan future improvements so the website keeps getting stronger.',
    ],
    includes: [
      'Monthly website support',
      'Bug fixing',
      'Content updates',
      'Performance cleanup',
      'Backup support',
      'Feature enhancements',
    ],
    faqs: [
      {
        question: 'Can you maintain a website you did not build?',
        answer:
          'Yes. I can review the existing codebase or platform and maintain it if the setup is accessible and technically workable.',
      },
      {
        question: 'Do you handle urgent fixes?',
        answer:
          'Yes, urgent fixes can be handled based on availability and the severity of the issue.',
      },
    ],
  },
  {
    slug: 'crm-erp-systems',
    title: 'CRM & ERP Systems',
    shortTitle: 'CRM & ERP',
    description:
      'We build custom CRM and ERP dashboards to streamline operations, customer workflows, reporting, and team collaboration.',
    icon: FaCogs,
    color: 'text-violet-400',
    accent: 'from-violet-400 via-orange-500 to-amber-300',
    seoTitle: 'Custom CRM and ERP Development Services | Himanshhu Tiwari',
    seoDescription:
      'Build custom CRM and ERP systems for leads, customers, sales, operations, reporting, dashboards, and team workflows.',
    headline: 'Custom CRM and ERP Systems Built Around Your Business Workflow',
    intro:
      'I build practical CRM and ERP systems that help teams manage leads, customers, orders, tasks, reporting, and daily operations from one organized dashboard.',
    highlights: [
      'Lead, customer, order, and task management modules',
      'Role-based dashboards and secure authentication',
      'Custom reports, filters, analytics, and export-ready data',
      'Automated workflows for sales, support, or operations',
      'Scalable backend, database design, and admin controls',
    ],
    process: [
      'Understand team roles, current workflow, data sources, and reporting needs.',
      'Design modules, permissions, dashboard views, and database structure.',
      'Build the CRM or ERP system with clean forms, tables, filters, and actions.',
      'Test workflows with real scenarios and refine usability for repeated use.',
      'Deploy, train users, and support improvements after launch.',
    ],
    includes: [
      'CRM development',
      'ERP dashboard development',
      'Lead management systems',
      'Admin panels',
      'Reporting dashboards',
      'Workflow automation',
    ],
    faqs: [
      {
        question: 'Can the CRM match our existing process?',
        answer:
          'Yes. The system can be built around your exact lead, customer, task, sales, or operations workflow.',
      },
      {
        question: 'Can different users have different permissions?',
        answer:
          'Yes. Role-based access can be added for admins, managers, sales teams, support teams, and other user roles.',
      },
    ],
  },
  {
    slug: 'seo-services',
    title: 'SEO Services',
    shortTitle: 'SEO',
    description:
      'Search-friendly website optimization to improve visibility, structure, performance, and organic reach.',
    icon: FaSearch,
    color: 'text-cyan-400',
    accent: 'from-cyan-400 via-orange-500 to-amber-300',
    seoTitle: 'SEO Services for Business Websites | Himanshhu Tiwari',
    seoDescription:
      'Improve website visibility with technical SEO, on-page optimization, metadata, site structure, performance, and content recommendations.',
    headline: 'SEO Services That Make Your Website Easier to Find and Easier to Trust',
    intro:
      'I improve website structure, speed, metadata, headings, internal links, and content clarity so your pages are easier for search engines and customers to understand.',
    highlights: [
      'Technical SEO audit and page structure improvements',
      'Title tags, meta descriptions, headings, and canonical URLs',
      'Mobile performance, speed, image, and Core Web Vitals improvements',
      'Service page optimization and internal linking strategy',
      'Schema-ready content structure and search-friendly copy guidance',
    ],
    process: [
      'Audit the current website structure, speed, metadata, and indexing basics.',
      'Identify keyword opportunities, service page gaps, and technical issues.',
      'Optimize titles, headings, descriptions, internal links, and page content.',
      'Improve performance, image handling, mobile experience, and crawl clarity.',
      'Track improvements and plan new content pages for long-term growth.',
    ],
    includes: [
      'Technical SEO',
      'On-page SEO',
      'Service page SEO',
      'SEO-friendly web development',
      'Metadata optimization',
      'Performance optimization',
    ],
    faqs: [
      {
        question: 'Is SEO included in website development?',
        answer:
          'Basic technical and on-page SEO structure is included in website development. Dedicated SEO service goes deeper with audits, optimization, and content planning.',
      },
      {
        question: 'How long does SEO take?',
        answer:
          'SEO usually improves over time. Technical fixes can help quickly, while organic ranking growth depends on competition, content quality, authority, and consistency.',
      },
    ],
  },
];

export const getServiceBySlug = (slug) => services.find((service) => service.slug === slug);

export const getServiceUrl = (slug) => `${siteUrl}/services/${slug}`;
