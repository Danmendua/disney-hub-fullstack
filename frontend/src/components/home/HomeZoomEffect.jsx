import styles from "../../styles/page.home.module.scss";
import Picture1 from "../../assets/images/logo.png";
import Picture2 from "../../assets/images/2.png";
import Picture3 from "../../assets/images/disney.png";
import Picture4 from "../../assets/images/4.png";
import Picture5 from "../../assets/images/5.png";
import Picture6 from "../../assets/images/6.png";
import Picture7 from "../../assets/images/7.png";
import Lenis from "lenis";
import { HiChevronDown } from "react-icons/hi2";
import starwars from "../../assets/videos/star-wars.mp4";
import ButtonsWithVideo from "../multicomponent/ButtonsWithVideo";

import { useScroll, useTransform, motion } from "framer-motion";
import React, { useRef, useEffect } from "react";

export default function HomeZoomEffect({ children }) {
  const sectionRef = useRef(null);

  const scrollToBottom = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: Picture1,
      scale: scale4,
    },
    {
      src: Picture2,
      scale: scale5,
    },
    {
      src: Picture3,
      scale: scale6,
    },
    {
      src: Picture4,
      scale: scale5,
    },
    {
      src: Picture5,
      scale: scale6,
    },
    {
      src: Picture6,
      scale: scale8,
    },
    {
      src: Picture7,
      scale: scale9,
    },
  ];
  return (
    <div
      ref={container}
      className={`${styles.container}  select-none relative`}
    >
      <div className={`${styles.sticky} `}>
        {pictures.map(({ src, scale }, index) => (
          <motion.div key={index} style={{ scale }} className={`${styles.el}`}>
            <div className={`${styles.imageContainer}  `}>
              <img
                draggable="false"
                src={src}
                alt="image"
                className={`${styles.image}`}
              />
            </div>
          </motion.div>
        ))}
        <button onClick={scrollToBottom}>
          <HiChevronDown className="absolute bottom-0 right-0 size-12 md:size-14 m-5 animate-bounce opacity-40" />
        </button>
        <ButtonsWithVideo
          target="/auth/login"
          text="ENTRAR"
          src={starwars}
          className="absolute right-12 top-6 ml-5 w-[90px] h-[45px] size-470:w-[150px] size-470:h-[50px] size-656:w-[200px] size-656:h-[50px] bg-[#0063e5] "
        />
      </div>
      <div ref={sectionRef} />
      {children}
    </div>
  );
}
