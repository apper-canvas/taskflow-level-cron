import { motion } from "framer-motion";

const ConfettiAnimation = () => {
  const confettiColors = ["#6366F1", "#EC4899", "#10B981", "#F59E0B", "#8B5CF6"];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="confetti-particle absolute"
          style={{
            backgroundColor: confettiColors[i % confettiColors.length],
            left: `${Math.random() * 20}px`,
            top: `${Math.random() * 20}px`,
          }}
          initial={{ opacity: 0, scale: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [-40, -80],
            x: [(Math.random() - 0.5) * 40],
          }}
          transition={{
            duration: 0.6,
            delay: i * 0.05,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiAnimation;