import BinaryTree from "./BinaryTree";
import { WhatIsBinaryTree } from "./WhatIs";
import { Analytics } from "@vercel/analytics/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ThemeProvider } from "./components/shared/ThemeContext";
import { ThemeToggle } from "./components/shared/ThemeToggle";
import { AnimatedBackground } from "./components/shared/AnimatedBackground";

/**
 * Root component of the application.
 * @returns The rendered App component JSX.
 */
function App() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <ThemeProvider>
      <div className="min-h-screen relative overflow-x-hidden">
        <AnimatedBackground />
        <ThemeToggle />
        <Analytics />

        <div className="relative z-10 px-4 sm:px-6 md:px-8 py-8 space-y-12">
          {/* Header Section */}
          <motion.header
            className="text-center pt-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Eliyahu&apos;s Tree Visualizer
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Explore the fascinating world of data structures with interactive
              visualizations
            </motion.p>
          </motion.header>

          {/* Main Content Section */}
          <motion.main
            className="w-full max-w-7xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <BinaryTree />
          </motion.main>

          {/* Additional Information Section */}
          <motion.section
            ref={ref}
            className="w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {inView && <WhatIsBinaryTree />}
          </motion.section>

          {/* Footer Section */}
          <motion.footer
            className="text-center text-gray-500 dark:text-gray-400 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-white/20 dark:border-gray-700/20">
              <p className="text-sm mb-3">
                &copy; {new Date().getFullYear()} Eliyahu Huri. All rights
                reserved.
              </p>
              <a
                href="https://github.com/eliyahuri/binaryTreeExample"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Star on GitHub
              </a>
            </div>
          </motion.footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
