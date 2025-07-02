import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900" />

      {/* Animated Spheres */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl"
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, -50, 100, 50, 0],
          scale: [1, 1.2, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-pink-400/20 to-yellow-400/20 blur-3xl"
        animate={{
          x: [0, -80, 0, 120, 0],
          y: [0, 80, -100, -20, 0],
          scale: [1, 0.9, 1.3, 0.7, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-3/4 w-64 h-64 rounded-full bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-3xl"
        animate={{
          x: [0, -120, 0, 80, 0],
          y: [0, 60, -80, 40, 0],
          scale: [1, 1.1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white/30 dark:bg-white/10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
