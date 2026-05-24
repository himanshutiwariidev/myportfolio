import React from 'react';
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
  FaWhatsapp,
} from 'react-icons/fa';
import { services } from '../data/services';
import { useSeo } from '../hooks/useSeo';

const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://technicaltiwariji.com').replace(/\/$/, '');

export const ContactPage = () => {
  useSeo({
    title: 'Contact Himanshhu Tiwari | Web Developer in Delhi',
    description:
      'Contact Himanshhu Tiwari for website development, ecommerce, CRM, mobile app, maintenance, and SEO projects.',
    canonical: `${siteUrl}/contact`,
  });

  return (
    <main className="bg-neutral-950 text-orange-50">
      <section className="relative isolate overflow-hidden px-4 py-14 md:px-8 md:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neutral-950 via-black to-neutral-900"></div>
        <div className="absolute left-0 top-12 -z-10 h-60 w-60 rounded-full bg-orange-500/15 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 -z-10 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl"></div>

        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-orange-200">
              Contact
            </p>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-white md:text-5xl">
              Let&apos;s build your website, app, or business system
            </h1>
            <p className="mt-5 text-base leading-8 text-orange-100/75 md:text-lg">
              Share your idea, current website, or project requirement. I will help you plan the right pages, features, timeline, and launch path.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <form className="rounded-3xl border border-orange-500/15 bg-white/5 p-6 shadow-2xl shadow-black/20 md:p-8">
            <h2 className="text-2xl font-bold text-white">Project Inquiry</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Full Name *"
                className="w-full rounded-md border border-orange-500/20 bg-neutral-900 px-4 py-3 text-sm text-orange-50 outline-none placeholder:text-orange-100/40 focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="email"
                placeholder="Email Address *"
                className="w-full rounded-md border border-orange-500/20 bg-neutral-900 px-4 py-3 text-sm text-orange-50 outline-none placeholder:text-orange-100/40 focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input
                type="tel"
                placeholder="Phone Number *"
                className="w-full rounded-md border border-orange-500/20 bg-neutral-900 px-4 py-3 text-sm text-orange-50 outline-none placeholder:text-orange-100/40 focus:ring-2 focus:ring-orange-400"
              />
              <select className="w-full rounded-md border border-orange-500/20 bg-neutral-900 px-4 py-3 text-sm text-orange-100/70 outline-none focus:ring-2 focus:ring-orange-400">
                <option value="">Select Service</option>
                {services.map((service) => (
                  <option key={service.slug} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              rows="6"
              placeholder="Tell me about your project *"
              className="mt-4 w-full rounded-md border border-orange-500/20 bg-neutral-900 px-4 py-3 text-sm text-orange-50 outline-none placeholder:text-orange-100/40 focus:ring-2 focus:ring-orange-400"
            ></textarea>
            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              <FaPaperPlane />
              Send Message
            </button>
          </form>

          <aside className="grid gap-5">
            <div className="rounded-3xl border border-orange-500/15 bg-white/5 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white">Contact Details</h2>
              <div className="mt-6 space-y-5 text-orange-100/75">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 text-orange-400" />
                  <div>
                    <h3 className="font-semibold text-orange-200">Location</h3>
                    <p className="mt-1 text-sm leading-7">C-546, Block C, New Ashok Nagar, New Delhi, 110096</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaEnvelope className="mt-1 text-orange-400" />
                  <div>
                    <h3 className="font-semibold text-orange-200">Email</h3>
                    <a href="mailto:Himanshhu.tiwarii.dev@gmail.com" className="mt-1 block text-sm hover:text-orange-300">
                      Himanshhu.tiwarii.dev@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaPhoneAlt className="mt-1 text-orange-400" />
                  <div>
                    <h3 className="font-semibold text-orange-200">Phone</h3>
                    <a href="tel:+917633093222" className="mt-1 block text-sm hover:text-orange-300">
                      +91 76330 93222
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-orange-500/15 bg-white/5 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white">Direct Links</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href="https://wa.me/917633093222"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-md border border-orange-500/25 px-4 py-3 text-sm font-semibold text-orange-100 transition hover:border-green-400 hover:text-green-300"
                >
                  <FaWhatsapp />
                  WhatsApp
                </a>
                <a
                  href="https://www.linkedin.com/in/himanshutiwarii221"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-md border border-orange-500/25 px-4 py-3 text-sm font-semibold text-orange-100 transition hover:border-sky-400 hover:text-sky-300"
                >
                  <FaLinkedin />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/himanshutiwariidev"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-md border border-orange-500/25 px-4 py-3 text-sm font-semibold text-orange-100 transition hover:border-white hover:text-white"
                >
                  <FaGithub />
                  GitHub
                </a>
                <a
                  href="mailto:Himanshhu.tiwarii.dev@gmail.com"
                  className="flex items-center justify-center gap-2 rounded-md border border-orange-500/25 px-4 py-3 text-sm font-semibold text-orange-100 transition hover:border-orange-400 hover:text-orange-300"
                >
                  <FaEnvelope />
                  Email
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

