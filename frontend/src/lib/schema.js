import { siteConfig, siteUrl } from './siteConfig';

export const personSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: siteConfig.name,
  url: siteUrl,
  // A real profile photo for entity/Knowledge Graph recognition.
  image: siteConfig.profileImage,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  jobTitle: siteConfig.jobTitle,
  knowsAbout: siteConfig.knowsAbout,
  sameAs: siteConfig.sameAs,
  address: {
    '@type': 'PostalAddress',
    ...siteConfig.address,
  },
  subjectOf: { '@id': `${siteUrl}/#authorpage` },
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: siteConfig.name,
  publisher: { '@id': `${siteUrl}/#person` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/blog?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const serviceSchema = (service, serviceUrl) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${serviceUrl}/#service`,
  name: service.title,
  description: service.seoDescription,
  serviceType: service.shortTitle,
  url: serviceUrl,
  provider: {
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: siteConfig.name,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    url: siteUrl,
  },
  areaServed: siteConfig.areaServed,
  audience: {
    '@type': 'Audience',
    audienceType: service.industries?.length ? service.industries.join(', ') : 'Businesses and startups',
  },
});

export const faqPageSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const collectionPageSchema = ({ name, description, url }) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name,
  description,
  url,
  isPartOf: { '@id': `${siteUrl}/#website` },
});

export const contactPageSchema = (url) => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: `Contact ${siteConfig.name}`,
  url,
  about: { '@id': `${siteUrl}/#person` },
});

export const aboutPageSchema = (url) => ({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: `About ${siteConfig.name}`,
  url,
  mainEntity: { '@id': `${siteUrl}/#person` },
});

export const blogPostingSchema = (blog, url) => {
  const authorName = blog.author || siteConfig.name;
  const isSiteOwner = authorName.trim().toLowerCase() === siteConfig.name.toLowerCase();

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.shortDescription || blog.metaDescription,
    url,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    author: {
      '@type': 'Person',
      name: authorName,
      // Only link to the founder's entity profile when the post is actually attributed
      // to them, to avoid mis-attributing guest/admin-authored posts.
      ...(isSiteOwner ? { '@id': `${siteUrl}/#person`, url: siteConfig.authorPageUrl } : {}),
    },
    publisher: { '@id': `${siteUrl}/#person` },
    image: blog.image || siteConfig.defaultOgImage,
  };
};

export const profilePageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${siteUrl}/#authorpage`,
  name: `${siteConfig.name} - ${siteConfig.jobTitle}`,
  url: siteConfig.authorPageUrl,
  mainEntity: { '@id': `${siteUrl}/#person` },
});

export const imageObjectSchema = ({ url, caption, width, height }) => ({
  '@context': 'https://schema.org',
  '@type': 'ImageObject',
  contentUrl: url,
  url,
  caption,
  ...(width ? { width } : {}),
  ...(height ? { height } : {}),
  creator: { '@id': `${siteUrl}/#person` },
});

export const portfolioSchema = (projects) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${siteUrl}/#portfolio`,
  name: `${siteConfig.name} - Portfolio`,
  url: `${siteUrl}/#projects`,
  creator: { '@id': `${siteUrl}/#person` },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        url: project.url,
        creator: { '@id': `${siteUrl}/#person` },
      },
    })),
  },
});
