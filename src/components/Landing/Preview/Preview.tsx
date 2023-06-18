"use client";
import React from "react";
import { useInView } from "react-intersection-observer";
import styles from "./Preview.module.css";

const Preview: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.45, triggerOnce: true });

  return (
    <section ref={ref} className={styles.preview}>
      <div
        className={`${styles.preview_conatiner_2} ${styles.preview_container} ${
          inView && styles.visible
        }`}
      >
        <div className={styles.shadow_light} />
        <div className={styles.load_component} />
        <svg
          width="100%"
          viewBox="0 0 1499 778"
          fill="none"
          className={styles.svg}
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
            className={styles.img}
            style={{ color: "transparent", width: "100%", height: "100%" }}
            src="/assets/workspace.png"
          />
        </div>
      </div>
    </section>
  );
};

export default Preview;
