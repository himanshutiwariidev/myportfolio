import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import WhyChooseme from './Whychooseme';
import { SeoHead } from '../components/seo/SeoHead';
import { siteConfig, siteUrl } from '../lib/siteConfig';
import {
  breadcrumbSchema,
  imageObjectSchema,
  personSchema,
  profilePageSchema,
} from '../lib/schema';
import { services } from '../data/services';

export const AboutFounderPage = () => {
  const canonical = siteConfig.authorPageUrl;

  return (
    <main className="bg-neutral-950 text-orange-50">
      <SeoHead
        title="Himanshhu Tiwari | Full Stack Web Developer"
        description="Meet Himanshhu Tiwari, a Full Stack Web Developer specializing in website development, ecommerce, CRM, School ERP, and Android app development across India."
        canonical={canonical}
        ogType="profile"
        jsonLd={[
          personSchema(),
          profilePageSchema(),
          breadcrumbSchema([
            { name: 'Home', url: `${siteUrl}/` },
            { name: 'About Himanshhu Tiwari', url: canonical },
          ]),
          imageObjectSchema({
            url: siteConfig.profileImage,
            caption: 'Himanshhu Tiwari - Full Stack Website Developer',
          }),
        ]}
      />

      <section className="relative isolate overflow-hidden px-4 py-14 md:px-8 md:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neutral-950 via-black to-neutral-900"></div>
        <div className="absolute left-0 top-12 -z-10 h-60 w-60 rounded-full bg-orange-500/15 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 -z-10 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl"></div>

        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-medium text-orange-200/70">
            <ol className="flex items-center gap-2">
              <li><Link to="/" className="hover:text-orange-300">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-orange-300" aria-current="page">About Himanshhu Tiwari</li>
            </ol>
          </nav>

          <div className="w-full">
            <p className="inline-flex rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-orange-200">
              Full Stack Web Developer
            </p>
            <h1 className="mt-5 text-2xl font-semibold  md:font-bold md:leading-tight text-white md:text-5xl">
              Himanshhu Tiwari — Full Stack Web Developer
            </h1>
            <p className="mt-3 md:mt-5 text-sm md:leading-8 text-orange-100/75 md:text-lg">
              Himanshhu Tiwari is a Full Stack Web Developer specializing in Website Development,
              Ecommerce Solutions, Custom CRM Software, School ERP Systems, Android Applications, and
              Custom Web Applications. He helps startups, businesses, educational institutions, and
              organizations build fast, scalable, and modern digital solutions, leading every project
              directly from planning through launch and post-launch support.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-2xl border border-orange-500/15 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-300">Role</p>
              <p className="mt-2 text-sm text-orange-100/80">Full Stack Web Developer</p>
            </div>
            <div className="rounded-2xl border border-orange-500/15 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-300">Specialization</p>
              <p className="mt-2 text-sm text-orange-100/80">Website, Ecommerce, CRM &amp; App Development</p>
            </div>
            <div className="rounded-2xl border border-orange-500/15 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-300">Experience</p>
              <p className="mt-2 text-sm text-orange-100/80">5+ years building production websites and web apps</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-4 md:px-8 md:py-10">
  <div className="mx-auto max-w-7xl">
    <div className="grid gap-12 lg:grid-cols-2">

      {/* Expertise */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
          Skills
        </span>

        <h2 className="mt-2 text-2xl md:text-3xl font-semibold md:font-bold text-white">
          Expertise
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {siteConfig.knowsAbout.map((skill) => (
            <div
              key={skill}
              className="group flex items-center rounded-2xl border border-orange-500/20 bg-white/[0.04] px-2 py-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:bg-orange-500/10"
            >
              <FaCheckCircle className="mr-3 shrink-0 text-orange-400 transition group-hover:scale-110" />

              <span className="text-sm font-medium text-orange-100">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
          Solutions
        </span>

        <h2 className="mt-2 text-2xl md:text-3xl font-semibold md:font-bold text-white">
          Services Offered
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:bg-orange-500/10"
            >
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-orange-400 transition group-hover:scale-110" />

                <span className="text-sm font-medium text-orange-100">
                  {service.shortTitle}
                </span>
              </div>

              <span className="translate-x-0 text-orange-400 transition group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  </div>
</section>

      <WhyChooseme />

      <section className="px-4 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-white">Portfolio &amp; Client Work</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-orange-100/70">
            Live projects built by Himanshhu Tiwari across insurance, healthcare, real estate, transport,
            and enterprise clients are showcased on the{' '}
            <Link to="/#projects" className="text-orange-300 underline-offset-2 hover:underline">
              homepage portfolio section
            </Link>.
          </p>
        </div>
      </section>

      <section className="bg-black px-4 py-5 md:py-14 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-3xl border border-orange-500/15 bg-neutral-950 p-6 md:grid-cols-[1fr_0.8fr] md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">Get In Touch</p>
            <h2 className="mt-3 text-xl font-bold text-white md:text-4xl">Work with Himanshhu Tiwari</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-orange-100/70">
              Reach out directly to discuss a website, ecommerce, CRM, School ERP, or Android app project.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center justify-center rounded-md bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/40 transition hover:-translate-y-0.5"
            >
              Contact Himanshhu Tiwari
            </Link>
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
    </main>
  );
};
