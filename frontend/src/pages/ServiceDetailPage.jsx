import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaEnvelope, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import NotFound from '../components/NotFound';
import { getServiceBySlug, getServiceUrl, services } from '../data/services';
import { SeoHead } from '../components/seo/SeoHead';
import { siteUrl, siteConfig } from '../lib/siteConfig';
import { breadcrumbSchema, faqPageSchema, serviceSchema } from '../lib/schema';

const relatedServices = (currentSlug) =>
  services.filter((service) => service.slug !== currentSlug).slice(0, 3);

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <>
        <SeoHead
          title="Service Not Found | Himanshhu Tiwari"
          description="The requested service page could not be found."
          canonical={`${siteUrl}/services/${slug || ''}`}
          robots="noindex, follow"
        />
        <NotFound />
      </>
    );
  }

  const Icon = service.icon;
  const otherServices = relatedServices(service.slug);
  const serviceUrl = getServiceUrl(service.slug);

  const breadcrumbItems = [
    { name: 'Home', url: `${siteUrl}/` },
    { name: 'Services', url: `${siteUrl}/#services` },
    { name: service.title, url: serviceUrl },
  ];

  return (
    <main className="bg-neutral-950 text-orange-50">
      <SeoHead
        title={service.seoTitle}
        description={service.seoDescription}
        canonical={serviceUrl}
        jsonLd={[
          serviceSchema(service, serviceUrl),
          faqPageSchema(service.faqs),
          breadcrumbSchema(breadcrumbItems),
        ]}
      />

      <section className="relative isolate overflow-hidden px-4 py-14 md:px-8 md:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neutral-950 via-black to-neutral-900"></div>
        <div className="absolute left-0 top-16 -z-10 h-56 w-56 rounded-full bg-orange-500/15 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 -z-10 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl"></div>

        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-medium text-orange-200/70">
            <ol className="flex items-center gap-2">
              <li><Link to="/" className="hover:text-orange-300">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/#services" className="hover:text-orange-300">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-orange-300" aria-current="page">{service.title}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-orange-200 transition hover:text-orange-400"
              >
                <FaArrowLeft className="text-xs" />
                Back to services
              </Link>
              <div className="mt-6 inline-flex rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-orange-200 ml-2">
                {service.shortTitle} Service
              </div>
              <h1 className="mt-5 max-w-5xl text-xl font-semibold leading-8 md:leading-tight text-white md:text-4xl">
                {service.headline}
              </h1>
              <p className="mt-3 md:mt-5 max-w-3xl text-base leading-8 text-orange-100/75 md:text-lg">
                {service.intro}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/40 transition hover:-translate-y-0.5"
                >
                  Start a Project
                </a>
                <a
                  href="https://wa.me/917633093222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-orange-500/30 bg-white/5 px-6 py-3 text-sm font-semibold text-orange-100 transition hover:border-orange-400 hover:text-orange-300"
                >
                  <FaWhatsapp className="text-green-400" />
                  WhatsApp
                </a>
              </div>
            </div>

            <aside className="rounded-3xl border border-orange-500/20 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm">
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.accent} text-white shadow-lg`}>
                <Icon className="text-3xl" />
              </div>
              <h2 className="mt-5 text-lg md:text-2xl font-semibold text-white">{service.title}</h2>
              <p className="mt-3 text-sm leading-7 text-orange-100/70">{service.description}</p>
              <div className="mt-6 grid gap-3">
                {service.includes.slice(0, 4).map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-orange-100/80">
                    <FaCheckCircle className="shrink-0 text-orange-400" />
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-4 py-7 md:px-8 max-w-7xl mx-auto">
        <div className="  ">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">What You Get</p>
            <h2 className="mt-3 text-xl font-semibold md:font-bold text-white md:text-4xl">
              A complete, business-ready {service.shortTitle.toLowerCase()} solution
            </h2>
            <p className="mt-4 text-sm leading-7 text-orange-100/70">
              Every page and feature is planned around usability, performance, search visibility, and the real action you want visitors or users to take.
            </p>
          </div>
         
        </div>
         <div className="grid gap-4 sm:grid-cols-2 mt-3">
            {service.highlights.map((item) => (
              <article key={item} className="rounded-2xl border border-orange-500/15 bg-white/5 p-5">
                <FaCheckCircle className="text-xl text-orange-400" />
                <p className="mt-3 text-sm leading-7 text-orange-100/80">{item}</p>
              </article>
            ))}
          </div>
      </section>

      <section className="bg-black px-4 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">Process</p>
            <h2 className="mt-3 text-xl font-semibold md:font-bold text-white md:text-4xl">How I build and launch your project</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {service.process.map((step, index) => (
              <article key={step} className="rounded-2xl border border-orange-500/15 bg-neutral-950 p-5">
                <span className="text-sm font-bold text-orange-400">0{index + 1}</span>
                <p className="mt-3 text-sm leading-7 text-orange-100/75">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {service.subSections?.map((sub) => (
        <section key={sub.heading} className="px-4 py-5 md:py-14 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold text-white md:text-4xl">{sub.heading}</h2>
              <p className="mt-4 text-sm leading-7 text-orange-100/70">{sub.intro}</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {sub.points.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-xl border border-orange-500/15 bg-white/5 px-4 py-3 text-sm text-orange-100/80">
                  <FaCheckCircle className="mt-0.5 shrink-0 text-orange-400" />
                  {point}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {service.comparison ? (
        <section className="bg-black px-4 py-5 md:py-14 md:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-xl font-bold text-white md:text-4xl">{service.comparison.heading}</h2>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-orange-500/15">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-white/5 text-orange-200">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Aspect</th>
                    <th className="px-4 py-3 font-semibold">Custom Build</th>
                    <th className="px-4 py-3 font-semibold">Shopify</th>
                  </tr>
                </thead>
                <tbody>
                  {service.comparison.rows.map((row) => (
                    <tr key={row.aspect} className="border-t border-orange-500/10 text-orange-100/80">
                      <td className="px-4 py-3 font-semibold text-orange-200">{row.aspect}</td>
                      <td className="px-4 py-3">{row.custom}</td>
                      <td className="px-4 py-3">{row.shopify}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-4 py-14 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-white">Technologies Used</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {service.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-orange-500/20 bg-white/5 px-4 py-2 text-xs font-semibold text-orange-100/80">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Industries Served</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {service.industries.map((industry) => (
                <span key={industry} className="rounded-full border border-orange-500/20 bg-white/5 px-4 py-2 text-xs font-semibold text-orange-100/80">
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black px-4 py-7 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-bold text-white md:text-3xl">Why Choose This Service</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {service.whyChooseUs.map((reason) => (
              <article key={reason} className="flex items-start gap-3 rounded-2xl border border-orange-500/15 bg-neutral-950 p-5">
                <FaCheckCircle className="mt-1 shrink-0 text-orange-400" />
                <p className="text-sm leading-7 text-orange-100/80">{reason}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-5 md:py-14 md:px-8">
        <div className="mx-auto">
          <div className="rounded-3xl border border-orange-500/15 bg-white/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white">Service Includes</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.includes.map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-orange-100/75">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-orange-500/15 bg-white/5 p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-4">
              {service.faqs.map((faq) => (
                <article key={faq.question} className="border-b border-orange-500/15 pb-4">
                  <h3 className="font-semibold text-orange-200">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-orange-100/70">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact-service" className="bg-black px-4 md:py-14 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-3xl border border-orange-500/15 bg-neutral-950 p-6 md:grid-cols-[1fr_0.8fr] md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">Start Your Project</p>
            <h2 className="mt-3 text-xl font-semibold md:font-bold text-white md:text-4xl">Need {service.title}?</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-orange-100/70">
              Share your idea, current website, or business goal. I will help you plan the right structure, features, and launch path.
            </p>
          </div>
          <div className="grid content-center gap-3">
            <a href={`tel:${siteConfig.phoneE164}`} className="flex items-center gap-3 rounded-xl border border-orange-500/20 bg-white/5 px-4 py-3 text-orange-100 transition hover:border-orange-400">
              <FaPhoneAlt className="text-orange-400" />
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 rounded-xl border border-orange-500/20 bg-white/5 px-4 py-3 text-orange-100 transition hover:border-orange-400">
              <FaEnvelope className="text-orange-400" />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-white">Related Services</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {otherServices.map((item) => {
              const OtherIcon = item.icon;
              return (
                <Link
                  key={item.slug}
                  to={`/services/${item.slug}`}
                  className="group rounded-2xl border border-orange-500/15 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-orange-400/50"
                >
                  <OtherIcon className={`text-2xl ${item.color}`} />
                  <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-orange-100/65">{item.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};
