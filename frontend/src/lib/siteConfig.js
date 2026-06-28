export const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://technicaltiwariji.com').replace(/\/$/, '');

export const siteConfig = {
  name: 'Himanshhu Tiwari',
  jobTitle: 'Full Stack Web Developer',
  email: 'technicaltiwariji01@gmail.com',
  phone: '+91 7633093222',
  phoneE164: '+917633093222',
  address: {
    streetAddress: 'C-546, Block C, New Ashok Nagar',
    addressLocality: 'New Delhi',
    addressRegion: 'Delhi',
    postalCode: '110096',
    addressCountry: 'IN',
  },
  areaServed: ['India', 'United States', 'Worldwide'],
  sameAs: [
    'https://www.facebook.com/profile.php?id=100026762781780',
    'https://www.instagram.com/himanshhutiwari09',
    'https://x.com/Tiwariji0121',
    'https://www.linkedin.com/in/himanshutiwarii221',
    'https://github.com/himanshutiwariidev',
  ],
  defaultOgImage: `${siteUrl}/unnamed.png`,
  logo: `${siteUrl}/unnamed.png`,
  knowsAbout: [
    'Website Development',
    'Ecommerce Development',
    'Shopify Development',
    'CRM Software Development',
    'School ERP Development',
    'Android App Development',
    'Custom Web Application Development',
    'MERN Stack',
    'SEO',
  ],
  // Dedicated profile photo (distinct from the site logo above), used for
  // Person entity recognition (Knowledge Graph / Google Search entity card).
  profileImage: `${siteUrl}/himanshhu-tiwari-profile-photo.jpg`,
  authorPageUrl: `${siteUrl}/about-himanshhu-tiwari`,
};
