import React, { useEffect, useState } from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGithub, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiNextdotjs, SiPython, SiSelenium } from 'react-icons/si';
import { FaUsers, FaCode, FaProjectDiagram, FaLaptopCode,FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaLinkedin, FaPaperPlane,
} from 'react-icons/fa';
import { Link } from "react-router-dom";
import projectImage1 from "../assets/keytel-design-studio-website-preview.png";
import projectImage2 from "../assets/policy-bima-karalo-insurance-website-preview.png";
import projectImage3 from "../assets/shri-balaji-enterprise-website-preview.png";
import projectImage4 from "../assets/medishipper-healthcare-logistics-website-preview.png";
import projectImage5 from "../assets/rsb-medicare-website-preview.png";
import projectImage6 from "../assets/taxi-tribe-transport-website-preview.png";
import projectImage7 from "../assets/cutlery-web-app-product-showcase-preview.png";
import projectImagemyriss from "../assets/myriss.png"
import ToolsOrbit from "./Toolorbit";
import { BlogListingPage } from "./blog/BlogListingPage";
import { services } from "../data/services";
import { SeoHead } from "../components/seo/SeoHead";
import { siteUrl } from "../lib/siteConfig";
import { faqPageSchema, portfolioSchema } from "../lib/schema";

export const Home = () => {

  const PROJECTS_VISIBLE_COUNT = 6;
  const words = ["Himanshhu Tiwari", "A Web Developer"];
  const colors = ["text-orange-400", "text-amber-300"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const currentWord = words[currentIndex];
  const currentColor = colors[currentIndex];
  const socialLinks = [
    { href: "https://www.facebook.com/profile.php?id=100026762781780", icon: <FaFacebookF /> },
    { href: "https://www.instagram.com/himanshhutiwari09?igsh=dTRyaDdubThndjI2", icon: <FaInstagram /> },
    { href: "https://x.com/Tiwariji0121", icon: <FaTwitter /> },
    { href: "https://www.linkedin.com/in/himanshutiwarii221", icon: <FaLinkedin /> },
  ];

  useEffect(() => {
    let timeoutId;

    if (!isDeleting && displayedText === currentWord) {
      timeoutId = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    } else {
      timeoutId = setTimeout(() => {
        setDisplayedText((prevText) =>
          isDeleting
            ? currentWord.slice(0, prevText.length - 1)
            : currentWord.slice(0, prevText.length + 1)
        );
      }, isDeleting ? 45 : 90);
    }

    return () => clearTimeout(timeoutId);
  }, [currentWord, displayedText, isDeleting, words.length]);

  const stats = [
    {
      icon: <FaProjectDiagram className="text-3xl text-white" />,
      count: 50,
      label: "Projects Completed",
      detail: "Business websites and full-stack builds delivered with care.",
      accent: "from-orange-400 via-orange-500 to-amber-300",
      glow: "shadow-orange-950/40",
    },
    {
      icon: <FaUsers className="text-3xl text-white" />,
      count: 30,
      label: "Happy Clients",
      detail: "Trusted by startups, local brands, and service businesses.",
      accent: "from-orange-500 via-amber-400 to-orange-300",
      glow: "shadow-orange-950/40",
    },
    {
      icon: <FaCode className="text-3xl text-white" />,
      count: 20,
      label: "Technologies Used",
      detail: "Modern tools across frontend, backend, databases, and deployment.",
      accent: "from-amber-300 via-orange-500 to-orange-600",
      glow: "shadow-orange-950/40",
    },
    {
      icon: <FaLaptopCode className="text-3xl text-white" />,
      count: 5,
      label: "Years of Experience",
      detail: "Hands-on experience building responsive and conversion-focused products.",
      accent: "from-orange-300 via-orange-500 to-amber-500",
      glow: "shadow-orange-950/40",
    },
  ];

  const [activeTab, setActiveTab] = useState("skills");

  const skills = [
    { name: "Frontend", value: 75, color: "bg-orange-500" },
    { name: "Database", value: 80, color: "bg-orange-500" },
    { name: "Backend", value: 60, color: "bg-orange-500" },
    { name: "Framework & Library", value: 85, color: "bg-orange-500" },
    { name: "Tools", value: 80, color: "bg-orange-500" },
  ];
  const education = [
    {
      title: "M.TECH IN COMPUTER SCIENCE",
      subtitle: "M.D.U, Rohtak (2025-2027)",
      detail: "Focused on building Generative Ai and Machine Learning models, with a thesis on AI-driven web development tools.",
    },
    {
      title: "B.TECH IN COMPUTER SCIENCE",
      subtitle: "M.D.U, Rohtak (2021-2025)",
      detail: "Focused on building modern web apps with frontend, backend, database, and deployment workflows.",
    },
  ];
const skillstwo = [
  { name: "HTML", icon: <FaHtml5 className="text-orange-500 text-4xl group-hover:scale-110 transition duration-300" />, border: "border-white/10", glow: "shadow-black/30", motion: "animate-icon-loop" },
  { name: "CSS", icon: <FaCss3Alt className="text-blue-500 text-4xl group-hover:scale-110 transition duration-300" />, border: "border-white/10", glow: "shadow-black/30", motion: "animate-icon-loop" },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400 text-4xl group-hover:scale-110 transition duration-300" />, border: "border-white/10", glow: "shadow-black/30", motion: "animate-icon-loop" },
  { name: "React.js", icon: <FaReact className="text-cyan-400 text-4xl group-hover:scale-110 transition duration-300 animate-spin" style={{ animationDuration: "8s" }} />, border: "border-white/10", glow: "shadow-black/30", motion: "animate-icon-loop" },
  { name: "Next.js", icon: <SiNextdotjs className="text-white text-4xl group-hover:scale-110 transition duration-300" />, border: "border-white/10", glow: "shadow-black/30", motion: "animate-icon-loop" },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-4xl group-hover:scale-110 transition duration-300" />, border: "border-white/10", glow: "shadow-black/30", motion: "animate-icon-loop" },
  { name: "Express.js", icon: <SiExpress className="text-slate-100 text-4xl group-hover:scale-110 transition duration-300" />, border: "border-white/10", glow: "shadow-black/30", motion: "animate-icon-loop" },
  { name: "MongoDB", icon: <SiMongodb className="text-emerald-500 text-4xl group-hover:scale-110 transition duration-300" />, border: "border-white/10", glow: "shadow-black/30", motion: "animate-icon-loop" },
  { name: "React Native", icon: <FaReact className="text-sky-400 text-4xl group-hover:scale-110 transition duration-300 animate-spin" style={{ animationDuration: "8s" }} />, border: "border-white/10", glow: "shadow-black/30", motion: "animate-icon-loop" },
  { name: "Python", icon: <SiPython className="text-blue-400 text-4xl group-hover:scale-110 transition duration-300" />, border: "border-white/10", glow: "shadow-black/30", motion: "animate-icon-loop" },
  { name: "Selenium", icon: <SiSelenium className="text-green-400 text-4xl group-hover:scale-110 transition duration-300" />, border: "border-white/10", glow: "shadow-black/30", motion: "animate-icon-loop" },
  { name: "Git & GitHub", icon: <FaGithub className="text-white text-4xl group-hover:scale-110 transition duration-300" />, border: "border-white/10", glow: "shadow-black/30", motion: "animate-icon-loop" },
];
const projects = [
  {
  title: 'Myriss',
  url: 'https://myriss.technicaltiwariji.com/',
  image: projectImagemyriss,
  domain: 'myriss.technicaltiwariji.com',
  category: 'Fashion & Ecommerce',
  accent: 'from-orange-500 via-amber-400 to-orange-300',
  description:
    'A modern fashion ecommerce store for men, women, and kids — built for smooth and a confident shopping experience.',
},
  
  {
    title: 'Policy Bima Karalo',
    url: 'https://policybimakaralo.com/',
    image: projectImage2,
    domain: 'policybimakaralo.com',
    category: 'Insurance',
    accent: 'from-orange-500 via-amber-400 to-orange-300',
    description: 'A professional service website built to communicate trust, clarity, and customer support for policy inquiries.',
  },
  {
    title: 'MediShipper',
    url: 'https://medishipper.com/',
    image: projectImage4,
    domain: 'medishipper.com',
    category: 'Healthcare Logistics',
    accent: 'from-orange-500 via-orange-400 to-amber-300',
    description: 'A modern healthcare-oriented web experience highlighting delivery, reliability, and digital accessibility.',
  },
  {
    title: 'RSB Medicare',
    url: 'https://rsbmedicare.netlify.app/',
    image: projectImage5,
    domain: 'rsbmedicare.netlify.app',
    category: 'Medical Services',
    accent: 'from-orange-600 via-orange-500 to-amber-400',
    description: 'A healthcare business website built to present services, credibility, and patient-focused communication.',
  },
  {
    title: 'Cutlery Web App',
    url: 'https://cutlerywebapp.netlify.app/',
    image: projectImage7,
    domain: 'cutlerywebapp.netlify.app',
    category: 'Product Showcase',
    accent: 'from-orange-500 via-neutral-700 to-neutral-900',
    description: 'A product-focused website created to present inventory with a simple, elegant, and commerce-ready layout.',
  },
  {
    title: 'Shri Balaji Enterprise',
    url: 'https://shribalajienterprise.netlify.app/',
    image: projectImage3,
    domain: 'shribalajienterprise.netlify.app',
    category: 'Enterprise',
    accent: 'from-orange-400 via-amber-500 to-yellow-500',
    description: 'A company presence website designed to showcase services, trust signals, and business information clearly.',
  },
  
  {
    title: 'Taxi Tribe',
    url: 'https://taxitribe.in/',
    image: projectImage6,
    domain: 'taxitribe.in',
    category: 'Transport',
    accent: 'from-orange-500 via-amber-400 to-orange-300',
    description: 'A fast, conversion-friendly transportation website designed to promote booking and service visibility.',
  },
  {
    title: 'Super Screw Fasteners',
    url: 'https://superscrewfasterners.netlify.app/',
    image: 'https://image.thum.io/get/width/1200/noanimate/https://superscrewfasterners.netlify.app/',
    domain: 'superscrewfasterners.netlify.app',
    category: 'Industrial',
    accent: 'from-orange-500 via-neutral-700 to-neutral-900',
    description: 'An industrial catalog-style business site structured to highlight products, reliability, and business expertise.',
  },
  {
    title: 'Homez99',
    url: 'https://homez99webapp.netlify.app/',
    image: 'https://image.thum.io/get/width/1200/noanimate/https://homez99webapp.netlify.app/',
    domain: 'homez99webapp.netlify.app',
    category: 'Real Estate',
    accent: 'from-orange-400 via-orange-500 to-amber-300',
    description: 'A real estate web app crafted to spotlight listings, trust, and a clean browsing experience.',
  },
  
  {
    title: 'HiTech Real Estates',
    url: 'https://hitechrealestates.netlify.app/',
    image: 'https://image.thum.io/get/width/1200/noanimate/https://hitechrealestates.netlify.app/',
    domain: 'hitechrealestates.netlify.app',
    category: 'Property',
    accent: 'from-orange-500 via-amber-400 to-orange-300',
    description: 'A real estate business website tailored for modern property presentation and lead generation.',
  },
  {
    title: 'Keytel Design Studio',
    url: 'https://keyteldesignstudio.com/',
    image: projectImage1,
    domain: 'keyteldesignstudio.com',
    category: 'Brand & Design',
    accent: 'from-orange-400 via-orange-500 to-amber-300',
    description: 'A polished business website focused on presenting creative services with a strong visual identity.',
  },
];
const faqs = [
  {
    question: "What services do you offer?",
    answer: "I offer full-stack web development, mobile app development, SEO services, ecommerce solutions, and website maintenance services.",
  },
  {
    question: "How can I contact you for a project?",
    answer: "You can contact me through the contact form, email, or directly via LinkedIn or WhatsApp.",
  },
  {
    question: "Do you work on freelance projects?",
    answer: "Yes, I actively take on freelance projects for startups, businesses, and individuals.",
  },
  {
    question: "What technologies do you use?",
    answer: "I work with React, Next.js, Node.js, Express, MongoDB, Tailwind CSS, and more.",
  },
  {
    question: "How long does it take to complete a project?",
    answer: "It depends on the project scope, but typical websites take 1–4 weeks from start to launch.",
  },
];
 const [openIndex, setOpenIndex] = useState(null);
 const [showAllProjects, setShowAllProjects] = useState(false);

  const visibleProjects = showAllProjects
    ? projects
    : projects.slice(0, PROJECTS_VISIBLE_COUNT);
  const skillRows = [
    skillstwo.slice(0, 6),
    skillstwo.slice(6, 12),
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
    <main className="bg-neutral-950 text-orange-50 overflow-x-hidden">
    <SeoHead
      title="Himanshhu Tiwari | Best Website Developer in India | CRM, Ecommerce & Android App Developer"
      description="Affordable, custom website development, ecommerce, CRM, School ERP, and Android app development services for startups and small businesses across India. Explore live projects and start your build."
      canonical={`${siteUrl}/`}
      jsonLd={[faqPageSchema(faqs), portfolioSchema(projects)]}
    />
<section className="relative isolate overflow-hidden px-4 py-10 md:px-10 md:pt-16">
  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neutral-950 via-black to-neutral-900"></div>
  <div className="absolute -left-12 top-8 -z-10 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl md:h-72 md:w-72"></div>
  <div className="absolute right-0 top-1/3 -z-10 h-48 w-48 rounded-full bg-amber-400/15 blur-3xl md:h-80 md:w-80"></div>

  <div className="mx-auto w-full max-w-7xl lg:grid lg:items-center lg:gap-12 lg:grid-cols-[1.15fr_0.85fr]">
    <div className="min-w-0 w-full text-center lg:text-left">
      <div className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-orange-300 shadow-sm">
        Full Stack Developer
      </div>
     
      <div className="md:hidden mt-7 min-h-[3rem] text-2xl ">
        <span className="font-bold text-orange-100/80">Hi, I&apos;m </span> 
        <span className={`${currentColor} inline-block`}>
          {displayedText}
          <span className="ml-0.5 inline-block animate-pulse text-orange-200">|</span>
        </span>
      </div>

      <p className="hidden md:block md:mt-6 text-3xl font-bold md:font-extrabold leading-tight text-orange-50 md:text-5xl">
        Building websites that feel
        <span className="block bg-gradient-to-r from-orange-300 via-orange-500 to-amber-300 bg-clip-text text-transparent">
          bold, fast, and memorable.
        </span>
      </p>

      <div className="hidden md:block mt-5 min-h-[3rem] text-2xl font-bold md:min-h-[3.5rem] md:text-4xl">
        <span className="text-orange-100/80">Hi, I&apos;m </span>
        <span className={`${currentColor} inline-block`}>
          {displayedText}
          <span className="ml-1 inline-block animate-pulse text-orange-200">|</span>
        </span>
      </div>
<div className="md:hidden  mt-6 flex flex-row justify-center gap-2 ">
        <div className="rounded-2xl border border-orange-500/15 bg-white/5 md:px-4 px-3 py-3 shadow-md backdrop-blur-sm">
          <p className="text-2xl md:font-bold text-orange-50">50+</p>
          <p className="text-xs md:text-sm text-orange-100/60">Projects Delivered</p>
        </div>
        <div className="rounded-2xl border border-orange-500/15 bg-white/5 md:px-4 px-3 py-3 shadow-md backdrop-blur-sm">
          <p className="text-2xl md:font-bold text-orange-50">30+</p>
          <p className="text-xs md:text-sm text-orange-100/60">Happy Clients</p>
        </div>
        <div className="rounded-2xl border border-orange-500/15 bg-white/5 md:px-4 px-3 py-3 shadow-md backdrop-blur-sm">
          <p className="text-2xl md:font-bold text-orange-50">5+</p>
          <p className="text-sm text-orange-100/60">Years Experience</p>
        </div>
      </div>

       <h1 className="md:hidden mt-6 text-xl font-semibold md:font-extrabold leading-relaxed text-orange-50 ">
        Building websites that feel
        <span className="block bg-gradient-to-r from-orange-300 via-orange-500 to-amber-300 bg-clip-text text-transparent uppercase">
          bold, fast, and memorable.
        </span>
      </h1>
       <div className="mt-8 flex flex-row items-center gap-5 justify-center ">
        <a
          href="#projects"
          className="md:hidden inline-flex items-center justify-center rounded-xs bg-gradient-to-r from-orange-500 to-amber-400 px-7 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-950/50 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          My Projects
        </a>
         <a
          href="#contact"
          className="md:hidden inline-flex items-center justify-center rounded-xs border border-orange-500/30 bg-neutral-900 px-7 py-2 text-sm font-semibold text-orange-100 transition hover:border-orange-400 hover:text-orange-300"
        >
          Let&apos;s Work
        </a>
        </div>
        <div className="md:hidden mt-8 flex justify-center gap-4 lg:justify-start">
        {socialLinks.map((socialLink, index) => (
          <a key={index} href={socialLink.href} className="rounded-full border border-orange-500/20 bg-white/5 p-3 text-orange-300 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-400">
            {socialLink.icon}
          </a>
        ))}
      </div>
      
      <p className="hidden md:block mx-auto  max-w-2xl text-base leading-7 text-white md:text-lg lg:mx-0">
        I design and develop responsive business websites and full-stack web apps with company-grade quality at small-business-friendly pricing — from custom website development to ecommerce, CRM, School ERP, and Android app development for clients across India.
      </p>

      <div className="mt-8 flex flex-row items-center gap-4 justify-center lg:justify-start">
        <a
          href="#projects"
          className="hidden md:inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/50 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          View My Projects
        </a>
       
        <a
          href="#contact"
          className="hidden md:inline-flex items-center justify-center rounded-full border border-orange-500/30 bg-neutral-900 px-7 py-3 text-sm font-semibold text-orange-100 transition hover:border-orange-400 hover:text-orange-300"
        >
          Let&apos;s Work Together
        </a>
       
      </div>

      <div className="hidden md:inline-flex mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
        <div className="rounded-2xl border border-orange-500/15 bg-white/5 px-4 py-3 shadow-md backdrop-blur-sm">
          <p className="text-2xl font-bold text-orange-50">50+</p>
          <p className="text-sm text-orange-100/60">Projects Delivered</p>
        </div>
        <div className="rounded-2xl border border-orange-500/15 bg-white/5 px-4 py-3 shadow-md backdrop-blur-sm">
          <p className="text-2xl font-bold text-orange-50">30+</p>
          <p className="text-sm text-orange-100/60">Happy Clients</p>
        </div>
        <div className="rounded-2xl border border-orange-500/15 bg-white/5 px-4 py-3 shadow-md backdrop-blur-sm">
          <p className="text-2xl font-bold text-orange-50">5+</p>
          <p className="text-sm text-orange-100/60">Years Experience</p>
        </div>
      </div>

      <div className="hidden md:flex mt-8 justify-center gap-4 lg:justify-start">
        {socialLinks.map((socialLink, index) => (
          <a key={index} href={socialLink.href} className="rounded-full border border-orange-500/20 bg-white/5 p-3 text-orange-300 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-400">
            {socialLink.icon}
          </a>
        ))}
      </div>
    </div>

		    <div className="flex flex-col relative mx-auto w-full max-w-md">
		
	      <div className="absolute -right-3 bottom-10 hidden rounded-2xl border border-orange-500/20 bg-black px-4 py-3 text-white shadow-xl md:block animate-pulse">
	        <p className="text-xs uppercase tracking-[0.25em] text-orange-300">Available</p>
	        <p className="mt-1 text-sm font-semibold">For freelance projects</p>
	      </div>

	      <div className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-2xl border border-orange-500/20 bg-neutral-900 px-4 py-3 text-orange-400 shadow-lg md:flex md:items-center md:gap-3 animate-pulse">
	        <FaReact className="text-3xl" />
	        <span className="text-sm font-semibold text-orange-100">Interactive UI</span>
	      </div>
	      <div className="absolute right-2 top-16 z-10 hidden rounded-2xl border border-orange-500/20 bg-neutral-900 px-4 py-3 text-orange-400 shadow-lg md:flex md:items-center md:gap-3 animate-bounce">
	        <FaNodeJs className="text-3xl" />
	        <span className="text-sm font-semibold text-orange-100">Scalable Backend</span>
	      </div>
	      <div className="absolute bottom-2 left-16 z-10 hidden rounded-2xl border border-orange-500/20 bg-neutral-900 px-4 py-3 text-green-400 shadow-lg md:flex md:items-center md:gap-3 animate-pulse">
	        <SiMongodb className="text-3xl" />
	        <span className="text-sm font-semibold text-orange-100">Clean Data Layer</span>
	      </div>

	      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-orange-400 via-orange-500 to-amber-400 p-1 shadow-2xl shadow-orange-950/40">
	        <div className="relative rounded-[30px] bg-slate-950 p-6">
	          <div className="absolute -left-10 top-10 h-28 w-28 rounded-full bg-orange-400/20 blur-3xl"></div>
	          <div className="absolute -right-10 bottom-8 h-28 w-28 rounded-full bg-amber-400/20 blur-3xl"></div>

	          <div className="relative rounded-[26px] border border-white/10 bg-slate-900/95 p-5">
	            <div className="flex items-center justify-between border-b border-white/10 pb-4">
	              <div className="flex items-center gap-2">
	                <span className="h-3 w-3 rounded-full bg-rose-400"></span>
	                <span className="h-3 w-3 rounded-full bg-amber-300"></span>
	                <span className="h-3 w-3 rounded-full bg-emerald-400"></span>
	              </div>
	              <div className="rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-orange-300">
	                live build
	              </div>
	            </div>

	            <div className="mt-5 space-y-4">
	              <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
	                <FaCode className="text-2xl text-orange-400 animate-pulse" />
	                <div>
	                  <p className="text-sm font-semibold text-white">Frontend Development</p>
	                  <p className="text-xs text-orange-100/55">Responsive layouts, polished UI, smooth interactions</p>
	                </div>
	              </div>

	              <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
	                <FaLaptopCode className="text-2xl text-orange-300 animate-bounce" />
	                <div>
	                  <p className="text-sm font-semibold text-white">Full Stack Solutions</p>
	                  <p className="text-xs text-orange-100/55">Business websites and web apps built end to end</p>
	                </div>
	              </div>

	              <div className="grid grid-cols-3 gap-3">
	                <div className="rounded-2xl border border-orange-400/20 bg-orange-400/10 p-4 text-center">
	                  <FaReact className="mx-auto text-3xl text-sky-300 animate-spin" style={{ animationDuration: "8s" }} />
	                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-orange-100">React</p>
	                </div>
	                <div className="rounded-2xl border border-orange-400/20 bg-orange-400/10 p-4 text-center">
	                  <FaNodeJs className="mx-auto text-3xl text-green-400 animate-pulse" />
	                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-orange-100">Node</p>
	                </div>
	                <div className="rounded-2xl border border-orange-400/20 bg-orange-400/10 p-4 text-center">
	                  <FaJs className="mx-auto text-3xl text-amber-300 animate-bounce" />
	                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-orange-100">JS</p>
	                </div>
	              </div>

	              <div className="rounded-2xl border border-white/8 bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-4">
	                <div className="mb-3 flex items-center justify-between">
	                  <p className="text-sm font-semibold text-white">Workflow</p>
	                  <p className="text-xs uppercase md:tracking-[0.2em] text-orange-100/50">design to deploy</p>
	                </div>
	                <div className="flex items-center gap-2 md:gap-3 text-xs font-medium text-orange-100/70">
	                  <span className="rounded-full bg-white/5 px-3 py-1">UI/UX</span>
	                  <span className="rounded-full bg-white/5 px-3 py-1">Develope</span>
	                  <span className=" rounded-full bg-white/5 px-3 py-1">Launch</span>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
          
	      </div>
        
		    </div>
        
	  </div>

    
	</section>


<section className="relative overflow-hidden px-4 pt-3 pb-8 md:px-6 md:py-12">
  <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-neutral-900"></div>
  <div className="absolute left-0 top-10 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl"></div>
  <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl"></div>

  <div className="relative mx-auto max-w-6xl">
    <div className="mx-auto max-w-4xl text-center">
      <p className="inline-flex rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-orange-200">
        My Achievements
      </p>
      <h2 className="mt-4 text-2xl md:font-semibold text-white leading-relaxed md:text-3xl">
        Results shaped by consistency, trust, and real project work
      </h2>
      <p className="mt-3 text-sm leading-6 text-orange-100/70">
        A compact snapshot of the experience, delivery volume, and technical range behind the products I build.
      </p>
    </div>

    <div className="mt-10 grid gap-x-6 gap-y-10 grid-cols-2 md:grid-cols-4">
      {stats.map((item, index) => (
        <article key={index} className="group relative flex justify-center transition duration-300 hover:-translate-y-2">
          <div className="relative flex w-full max-w-[190px] flex-col items-center pt-6 md:max-w-[220px] md:pt-8">
            <div className={`absolute top-0 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${item.accent} shadow-xl shadow-black/40 ring-4 ring-white/10 md:h-16 md:w-16`}>
              <div className="scale-90">{item.icon}</div>
            </div>

            <div className={`relative flex h-[126px] w-[126px] rotate-45 items-center justify-center rounded-[24px] border border-white/20 bg-gradient-to-br from-white via-white to-orange-50 shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition duration-300 group-hover:scale-[1.03] md:h-[150px] md:w-[150px] md:rounded-[28px] ${item.glow}`}>
              <div className="absolute inset-[7px] rounded-[18px] border border-orange-100/80 md:inset-[8px] md:rounded-[22px]"></div>
              <div className="-rotate-45 text-center">
                <h3 className="text-[2rem] font-extrabold tracking-tight text-neutral-800 md:text-3xl">
                  {item.count}+
                </h3>
                <p className="mt-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 md:mt-2 md:px-3 md:text-[11px] md:tracking-[0.22em]">
                  Portfolio
                </p>
              </div>
            </div>

            <div className={`absolute bottom-0 z-20 min-w-[142px] rounded-full bg-gradient-to-r ${item.accent} px-4 py-2.5 text-center shadow-lg shadow-black/30 md:min-w-[170px] md:px-5 md:py-3`}>
              <p className="text-[13px] font-semibold tracking-[0.05em] text-white md:text-sm md:tracking-[0.08em]">
                {item.label}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>


	      {/* About Section */}
	      <section className="relative overflow-hidden py-16 px-5 md:px-20">
	        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-black to-neutral-900"></div>
	        <div className="absolute left-0 top-10 h-44 w-44 rounded-full bg-orange-500/10 blur-3xl"></div>
	        <div className="absolute right-0 bottom-0 h-52 w-52 rounded-full bg-amber-400/10 blur-3xl"></div>

	        <div className="relative mx-auto w-full max-w-7xl grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
	          <div className="relative w-full">
	            <div className="absolute -left-4 top-8 hidden rounded-2xl border border-orange-500/20 bg-neutral-900/90 px-4 py-3 shadow-xl backdrop-blur-sm md:block">
	              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-300">Creative</p>
	              <p className="mt-1 text-sm font-semibold text-orange-50">Clean and modern UI</p>
	            </div>
	            <div className="absolute -right-4 bottom-8 hidden rounded-2xl border border-orange-500/20 bg-black px-4 py-3 text-white shadow-xl md:block">
	              <p className="text-xs uppercase tracking-[0.25em] text-orange-300">Focused</p>
	              <p className="mt-1 text-sm font-semibold">Performance and usability</p>
	            </div>

	          
              <ToolsOrbit/>
	          </div>

	          <div className="rounded-[32px] border border-orange-500/20 bg-white/5 p-6 shadow-xl shadow-orange-950/30 backdrop-blur-sm md:p-8">
	            <p className="inline-flex rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
	              About Me
	            </p>
	            <h2 className="mt-4 text-2xl md:font-bold text-orange-50 md:text-3xl">
	              Turning ideas into clean, scalable, and user-friendly digital experiences
	            </h2>
	            <p className="mt-4 text-sm leading-7 text-orange-100/70 md:text-base">
	              With a strong foundation in both front-end and back-end development, I build websites and web applications that balance visual appeal, usability, and real business value. From <Link to="/services/custom-website-development" className="text-orange-300 underline-offset-2 hover:underline">custom website development</Link> for startups to <Link to="/services/ecommerce-solutions" className="text-orange-300 underline-offset-2 hover:underline">ecommerce and Shopify store development</Link>, every project is built to be modern, reliable, and ready to grow.
	            </p>
	            <p className="mt-3 text-sm leading-7 text-orange-100/70 md:text-base">
	              <Link to="/about-himanshhu-tiwari" className="text-orange-300 underline-offset-2 hover:underline">
	                About Himanshhu Tiwari
	              </Link>
	              , Full Stack Web Developer.
	            </p>

	            <div className="mt-6 grid gap-4 sm:grid-cols-3">
	              <div className="rounded-2xl border border-orange-500/15 bg-black/40 px-4 py-4">
	                <p className="text-2xl font-bold text-orange-50">50+</p>
	                <p className="mt-1 text-sm text-orange-100/60">Completed Projects</p>
	              </div>
	              <div className="rounded-2xl border border-orange-500/15 bg-black/40 px-4 py-4">
	                <p className="text-2xl font-bold text-orange-50">30+</p>
	                <p className="mt-1 text-sm text-orange-100/60">Satisfied Clients</p>
	              </div>
	              <div className="rounded-2xl border border-orange-500/15 bg-black/40 px-4 py-4">
	                <p className="text-2xl font-bold text-orange-50">5+</p>
	                <p className="mt-1 text-sm text-orange-100/60">Years of Experience</p>
	              </div>
	            </div>

	            <div className="mt-8 inline-flex rounded-full border border-orange-500/20 bg-black/40 p-1">
	              <button
	                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${activeTab === "skills" ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-md" : "text-orange-100/60"}`}
	                onClick={() => setActiveTab("skills")}
	              >
	                Skills
	              </button>
	              <button
	                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${activeTab === "education" ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-md" : "text-orange-100/60"}`}
	                onClick={() => setActiveTab("education")}
	              >
	                Education
	              </button>
	            </div>

	            <div className="mt-6 rounded-[28px] border border-orange-500/15 bg-black/40 p-5 shadow-sm">
	              {activeTab === "skills" && (
	                <div className="space-y-4">
	                  {skills.map((skill, index) => (
	                    <div key={index}>
	                      <div className="flex justify-between text-sm font-semibold text-orange-100">
	                        <span>{skill.name}</span>
	                        <span>{skill.value}%</span>
	                      </div>
	                      <div className="mt-3 h-3 w-full rounded-full bg-neutral-800">
	                        <div className={`${skill.color} h-3 rounded-full`} style={{ width: `${skill.value}%` }}></div>
	                      </div>
	                    </div>
	                  ))}
	                </div>
	              )}

	              {activeTab === "education" && (
	                <div className="space-y-4">
	                  {education.map((item, index) => (
	                    <div key={index} className="rounded-2xl border border-orange-500/15 bg-neutral-900 p-4">
	                      <p className="text-lg font-bold text-orange-50">{item.title}</p>
	                      <p className="mt-1 text-sm font-medium text-orange-400">{item.subtitle}</p>
	                      <p className="mt-2 text-sm leading-6 text-orange-100/70">{item.detail}</p>
	                    </div>
	                  ))}
	                </div>
	              )}
	            </div>
	          </div>
	        </div>
	      </section>
	      {/* My skills  */}
<section className="relative overflow-hidden py-16">
  <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-black to-neutral-900"></div>
  <div className="absolute left-0 top-0 h-52 w-52 rounded-full bg-orange-500/10 blur-3xl"></div>
  <div className="absolute right-0 bottom-0 h-60 w-60 rounded-full bg-amber-400/10 blur-3xl"></div>

  <div className="relative max-w-7xl mx-auto px-4">
    <div className="text-center">
      <p className="inline-flex rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-orange-200">
        My Skills
      </p>
      <h2 className="mt-4 text-2xl md:font-bold text-white md:text-4xl">
        Tools and technologies I use to build modern web experiences
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-orange-100/70 md:text-base">
        A mix of frontend, backend, database, and workflow tools that help me craft responsive, scalable, and polished digital products.
      </p>
    </div>

    <div className="services-marquee-list mt-10 space-y-5 overflow-hidden">
      {skillRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="services-marquee overflow-hidden"
        >
          <div className={`services-marquee-track ${rowIndex === 0 ? "services-marquee-left" : "services-marquee-right"}`}>
            {[0, 1].map((groupIndex) => (
              <div
                key={groupIndex}
                className="services-marquee-group"
                aria-hidden={groupIndex === 1}
              >
                {row.map((skilltwo, index) => (
                  <article
                    key={`${skilltwo.name}-${groupIndex}-${index}`}
                    className={`group relative w-44 shrink-0 overflow-hidden rounded-[28px] border ${skilltwo.border} bg-neutral-900/70 p-5 text-center shadow-2xl backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:bg-neutral-900 md:w-52 md:p-6 ${skilltwo.glow}`}
                  >
                    <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/6 blur-2xl"></div>

                    <div className="relative">
                      <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-black/70 shadow-lg md:h-20 md:w-20 ${skilltwo.motion}`}>
                        {skilltwo.icon}
                      </div>
                      <p className="mt-4 text-sm font-semibold text-white md:mt-5 md:text-lg">{skilltwo.name}</p>
                      <div className="mt-4 flex items-center justify-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-white/50"></span>
                        <span className="text-[9px] md:text-[11px] font-semibold uppercase tracking-[0.25em] text-white/55">
                          Active Stack
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* services */}
  <section id="services" className="bg-black py-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm uppercase text-orange-200/60 tracking-wide mb-2">What We Do</p>
        <h2 className="text-2xl md:text-4xl font-bold text-orange-400 mb-4">Our Services</h2>
        <p className="text-orange-100/70 max-w-2xl mx-auto mb-12">
          Website development, ecommerce and Shopify store development, custom CRM software, School ERP, and Android app development — built and supported across India.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group flex items-start gap-4 rounded-3xl border border-orange-500/15 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:bg-white/10"
                aria-label={`View ${service.title} details`}
              >
                <div className={`mt-1 ${service.color}`}>
                  <Icon className="text-2xl" />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${service.color}`}>
                    {service.title}
                  </h3>
                  <p className="text-orange-100/65 text-sm mt-1">
                    {service.description}
                  </p>
                  <div className={`mt-3 h-px w-10 ${service.color} bg-current transition-all duration-300 group-hover:w-20`}></div>
                  <span className="mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-orange-200/70">
                    View Details
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
   
    {/* our projects */}
     <section id="projects" className="relative overflow-hidden py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-black to-neutral-900"></div>
      <div className="absolute -top-24 left-0 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-orange-300 shadow-sm">
            Featured Work
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl  md:font-bold text-orange-50 leading-tight">Projects That Are Live On The Web</h2>
          <p className="text-orange-100/70 max-w-2xl mx-auto mt-3">
            A curated selection of business, healthcare, transport, real estate, and product websites built to look sharp and convert well.
          </p>
        </div>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project, idx) => (
            <article
              key={idx}
              className="group relative overflow-hidden rounded-[28px] border border-orange-500/15 bg-white/5 p-6 shadow-lg shadow-orange-950/30 backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.accent}`}></div>

              <div className="relative aspect-[16/8] overflow-hidden  border border-orange-500/15 ">
                <img
                  src={project.image}
                  alt={`${project.title} - ${project.category} website built by Himanshhu Tiwari`}
                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
            </div>

              <div className="mt-6 flex items-start justify-between gap-4">
             
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-100/70">
                  {project.category}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-orange-300">Project {(idx + 1).toString().padStart(2, "0")}</p>
                <h3 className="mt-2 text-xl font-bold text-orange-50">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-orange-100/70">{project.description}</p>
              </div>

              <div className="mt-5 rounded-2xl border border-orange-500/15 bg-black/40 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-100/50">Live URL</p>
                <p className="mt-1 break-all text-sm text-orange-100">{project.domain}</p>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center justify-center rounded-sm bg-gradient-to-r px-5 py-2.5 text-sm font-semibold text-white shadow-md transition group-hover:shadow-lg ${project.accent}`}
                >
                  Visit Live Site
                </a>
                <span className="text-sm font-medium text-orange-100/60">Responsive Build</span>
              </div>
            </article>
          ))}
        </div>

        {projects.length > PROJECTS_VISIBLE_COUNT && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllProjects((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-full border border-orange-500/30 bg-white/5 px-6 py-3 text-sm font-semibold text-orange-100 transition hover:border-orange-400 hover:text-orange-300"
            >
              {showAllProjects ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </div>
    </section>
  
    {/*faq  */}

    <section className="py-16 bg-black">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-xl md:text-3xl font-bold text-center text-orange-400 mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-neutral-900 border border-orange-500/15 rounded-lg overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left px-6 py-4 font-medium text-orange-50 focus:outline-none"
              >
                {faq.question}
                {openIndex === index ? (
                  <FaChevronUp className="text-orange-400" />
                ) : (
                  <FaChevronDown className="text-orange-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-orange-100/70 text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
    <BlogListingPage disableSeo />
    {/* contact */}
    <section id="contact" className="bg-neutral-950 py-5 md:px-4 ">
      <h2 className=" text-2xl text-orange-400 text-center font-semibold py-5">GET IN TOUCH </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white/5 border border-orange-500/15 rounded-xl shadow-md p-6 sm:p-10">
        {/* Contact Form */}
        <div>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name *"
                className="w-full border border-orange-500/20 bg-neutral-900 rounded px-4 py-3 text-sm text-orange-50 placeholder:text-orange-100/40 focus:ring-2 focus:ring-orange-400 outline-none"
              />
              <input
                type="email"
                placeholder="Email Address *"
                className="w-full border border-orange-500/20 bg-neutral-900 rounded px-4 py-3 text-sm text-orange-50 placeholder:text-orange-100/40 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
            <input
              type="tel"
              placeholder="Phone Number *"
              className="w-full border border-orange-500/20 bg-neutral-900 rounded px-4 py-3 text-sm text-orange-50 placeholder:text-orange-100/40 focus:ring-2 focus:ring-orange-400 outline-none"
            />
            <select className="w-full border border-orange-500/20 bg-neutral-900 rounded px-4 py-3 text-orange-100/70 text-sm focus:ring-2 focus:ring-orange-400 outline-none">
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service.slug} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
            <textarea
              rows="4"
              placeholder="Your Message *"
              className="w-full border border-orange-500/20 bg-neutral-900 rounded px-4 py-3 text-sm text-orange-50 placeholder:text-orange-100/40 focus:ring-2 focus:ring-orange-400 outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white font-semibold py-3 rounded hover:bg-orange-600 transition"
            >
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="text-orange-100/75 text-lg sm:text-base md:px-5">
          <h3 className="text-xl font-semibold text-orange-50 mb-6">Contact Information</h3>
          <div className="flex items-center gap-3 my-2">
            <FaMapMarkerAlt className="text-orange-400 " />
             <strong className="text-lg text-orange-200">Location</strong></div>
             <div>
            <p>
             
              C-546, Block C, New Ashok Nagar<br />
              New Delhi, 110096
            </p>
          </div>
          <div className="flex  items-center gap-3 my-2">
            <FaEnvelope className="text-orange-400" />
            <strong className="text-lg text-orange-200">Email</strong></div>
            <div>
            <p>
              
              Himanshhu.tiwarii.dev@gmail.com
            </p>
          </div>
          <div className="flex items-center gap-3 my-2">
            <FaPhoneAlt className="text-orange-400" />
             <strong className="text-lg text-orange-200">Phone</strong></div>
             <div>
            <p>
             
              +91 76330 93222
            </p>
          </div>

          <hr className="my-6 border-orange-500/15" />
          <p className="font-medium mb-2 text-orange-200">Connect With Me</p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://linkedin.com"
              className="border border-orange-500 text-orange-400 px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition flex items-center gap-2"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin /> LinkedIn
            </a>
            <a
              href="https://github.com/himanshutiwariidev"
              className="border border-orange-500 text-orange-400 px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition flex items-center gap-2"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub /> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
      </main>
    </>
  );
};
