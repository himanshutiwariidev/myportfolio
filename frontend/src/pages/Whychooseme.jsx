import React from "react";
import {
  FaBolt,
  FaComments,
  FaLayerGroup,
  FaShieldAlt,
} from "react-icons/fa";
import profileImage from "../assets/mypic.jpeg";

export default function WhyChooseme() {
  const features = [
    {
      icon: <FaLayerGroup className="text-2xl text-orange-300" />,
      title: "Strategy To System",
      desc: "Every project starts with structure, user flow, and a clear delivery plan before the build begins.",
    },
    {
      icon: <FaBolt className="text-2xl text-orange-300" />,
      title: "Fast Execution",
      desc: "Clean builds, focused timelines, and performance-minded implementation keep launches moving smoothly.",
    },
    {
      icon: <FaComments className="text-2xl text-orange-300" />,
      title: "Clear Communication",
      desc: "You get direct updates, transparent feedback, and a collaborative process from start to finish.",
    },
    {
      icon: <FaShieldAlt className="text-2xl text-orange-300" />,
      title: "Reliable Support",
      desc: "Post-launch fixes, improvements, and maintenance are handled with the same care as the initial release.",
    },
  ];

  const highlights = [
    { value: "50+", label: "Projects Shipped" },
    { value: "30+", label: "Clients Served" },
    { value: "5+", label: "Years Building" },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_28%)]"></div>

      <div className="relative mx-auto max-w-7xl px-3 md:px-6">
        <div className="mb-12 w-full">
          <p className="inline-flex rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-orange-300">
            Why Choose Me
          </p>
          <h2 className="mt-5 text-2xl font-semibold md:font-bold md:leading-tight text-orange-50 md:text-4xl">
            A sharper process, stronger delivery, and products built to last.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-orange-100/70 md:text-base">
            I combine product thinking, clean development, and dependable support to create websites and systems that look premium and work hard for the business behind them.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] border border-orange-500/15 bg-white/5 p-6 backdrop-blur-sm">
            <div className="">
              <div className="relative overflow-hidden rounded-[28px] border border-orange-500/20 bg-neutral-950 p-3">
                <img
                  src={profileImage}
                  alt="Himanshhu Tiwari"
                  className="relative h-full min-h-[320px] w-full rounded-[22px] object-cover"
                />
              </div>

            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((item, index) => (
              <article
                key={item.title}
                className={`rounded-[28px] border border-orange-500/15 bg-gradient-to-br from-white/6 to-orange-500/5 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 ${
                  index % 2 === 1 ? "sm:translate-y-8" : ""
                }`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/20 bg-neutral-950">
                  {item.icon}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-orange-50">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-orange-100/65">{item.desc}</p>
              </article>
            ))}
          </div>

        </div>

              <div className="flex flex-col justify-between gap-6 mt-5">
                <div className="rounded-[28px] border border-orange-500/15 bg-neutral-950 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
                    Build Philosophy
                  </p>
                  <p className="mt-4 text-lg font-semibold text-orange-50">
                    Modern design, dependable code, and practical business focus.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-orange-100/65">
                    From landing pages to full business platforms, the goal is always the same: make the product feel polished, useful, and easy to grow.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {highlights.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-orange-500/15 bg-orange-500/8 px-4 py-4 text-center"
                    >
                      <p className="text-2xl font-bold text-orange-300">{item.value}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-orange-100/55">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
      </div>
    </section>
  );
}
