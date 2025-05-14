import BinaryTree from "./BinaryTree";
import { WhatIsBinaryTree } from "./WhatIs";
import { Analytics } from "@vercel/analytics/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
    <div
      className={`dark-min-h-screen bg-gradient-to-br from-blue-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8`}
    >
      <Analytics />

      {/* Header Section */}
      <motion.header
        className="text-center mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-blue-300">
          Welcome to Eliyahu&apos;s Binary Tree
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Explore the fascinating world of binary trees.
        </p>
      </motion.header>

      {/* Main Content Section */}
      <motion.main
        className="w-full max-w-3xl bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <BinaryTree />
      </motion.main>

      {/* Additional Information Section */}
      <motion.section
        ref={ref}
        className="mt-8 w-full max-w-3xl text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {inView && <WhatIsBinaryTree />}
      </motion.section>

      {/* Footer Section */}
      <motion.footer
        className="mt-12 text-gray-500 dark:text-gray-400 text-sm text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        &copy; {new Date().getFullYear()} Eliyahu Huri. All rights reserved.
        <p className="mt-2">
          <a
            href="https://github.com/eliyahuri/binaryTreeExample"
            className="text-blue-500 dark:text-blue-300 hover:underline"
          >
            Please star me on GitHub!
          </a>
        </p>
      </motion.footer>
    </div>
  );
}

export default App;
