"use client";
import React from "react";
import { useInView } from "react-intersection-observer";

const HeroSection: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.45, triggerOnce: true });

  return (
    <div className="py-6">
      <div
        className="hero-header max-w-[800px] mx-auto
        flex flex-col items-center justify-center text-center"
      >
        <p className="hero-section-heading">
          Linear is a better way to build products
        </p>
        <p
          className="mt-4 xs:mt-6 md:my-8 text-base xs:text-lg sm:text-xl text-gray-200
          w-full max-w-[650px]"
          style={{ animationDelay: "400ms" }}
        >
          Meet the new standard for modern software development. Streamline
          issues, sprints, and product roadmaps.
        </p>
        <button
          type="button"
          className="bg-orange-500 outline-none rounded-full py-2.5 px-6 text-sm font-semibold mt-6"
          style={{ animationDelay: "800ms" }}
        >
          Get Started
        </button>
      </div>
      <section ref={ref} className="max-w-6xl mx-auto my-10 md:my-16 dxsLAN">
        <div
          className={`sc-a65afc8f-5 sc-4081ec30-8 tsweV kuGJXQ ${
            inView ? "visible" : ""
          }`}
        >
          <div className="sc-4081ec30-6 kIzgXf"></div>
          <div className="sc-4081ec30-3 jVBVKM"></div>
          <svg
            width="100%"
            viewBox="0 0 1499 778"
            fill="none"
            className="sc-4081ec30-5 byQggk"
          >
            <path pathLength="1" d="M1500 72L220 72"></path>
            <path pathLength="1" d="M1500 128L220 128"></path>
            <path pathLength="1" d="M1500 189L220 189"></path>
            <path pathLength="1" d="M220 777L220 1"></path>
            <path pathLength="1" d="M538 777L538 128"></path>
          </svg>
          <div data-nosnippet="true">
            <img
              alt="Screenshot of the Linear app showing the sidebar for the Encom workspace and a few of their projects in the roadmap."
              data-nosnippet="true"
              data-loaded="false"
              width="5480"
              height="3104"
              decoding="async"
              data-nimg="1"
              className="sc-c76aa5a6-0 jBzGhZ sc-4081ec30-7 fJTGCY"
              style={{ color: "transparent" }}
              src="http://localhost:3000/assets/workspace.png"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
