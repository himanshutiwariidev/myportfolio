import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { App } from './App'
import './index.css'
import { getServiceBySlug, getServiceUrl } from './data/services'

const defaultSeo = {
  title: 'Himanshhu Tiwari | Full Stack Web Developer | CRM Developer | Ecommerce Developer',
  description:
    'Himanshhu Tiwari is a skilled Full Stack Web Developer specializing in MERN stack, CRM development, and ecommerce solutions. Explore portfolio, projects, and blogs.',
  canonical: 'https://technicaltiwariji.com/',
}

function getSeo(url) {
  const pathname = url.split('?')[0]
  const serviceMatch = pathname.match(/^\/services\/([^/]+)$/)

  if (pathname === '/contact') {
    return {
      title: 'Contact Himanshhu Tiwari | Web Developer in Delhi',
      description:
        'Contact Himanshhu Tiwari for website development, ecommerce, CRM, mobile app, maintenance, and SEO projects.',
      canonical: 'https://technicaltiwariji.com/contact',
    }
  }

  if (serviceMatch) {
    const service = getServiceBySlug(decodeURIComponent(serviceMatch[1]))

    if (service) {
      return {
        title: service.seoTitle,
        description: service.seoDescription,
        canonical: getServiceUrl(service.slug),
      }
    }
  }

  return defaultSeo
}

export async function render(url) {
  const appHtml = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )

  return {
    appHtml,
    seo: getSeo(url),
  }
}
