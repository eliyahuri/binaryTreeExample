import BinaryTree from "./BinaryTree";
import { WhatIsBinaryTree } from "./WhatIs";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div
      className={`dark-min-h-screen bg-gradient-to-br from-blue-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8`}
    >
      <Analytics />

      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-blue-300">
          Welcome to Eliyahu&apos;s Binary Tree
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Explore the fascinating world of binary trees.
        </p>
      </header>

      {/* Main Content Section */}
      <main className="w-full max-w-3xl bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <BinaryTree />
      </main>

      {/* Additional Information Section */}
      <section className="mt-8 w-full max-w-3xl text-center">
        <WhatIsBinaryTree />
      </section>

      {/* Footer Section */}
      <footer className="mt-12 text-gray-500 dark:text-gray-400 text-sm text-center">
        &copy; {new Date().getFullYear()} Eliyahu Huri. All rights reserved.
        <p className="mt-2">
          <a
            href="https://github.com/eliyahuri/binaryTreeExample"
            className="text-blue-500 dark:text-blue-300 hover:underline"
          >
            Please star me on GitHub!
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
