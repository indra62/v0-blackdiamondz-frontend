import { motion } from "motion/react";

/**
 * SlideInOnView
 * @param {'left'|'right'} direction - Direction to slide in from
 * @param {React.ReactNode} children - Content to animate
 * @param {object} rest - Additional motion props
 */
export default function SlideInOnView({
  direction = "left",
  children,
  ...rest
}) {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -80 : 80,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      {...rest}
    >
      {children}
    </motion.div>
  );
}