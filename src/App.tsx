import BinaryTree from "./BinaryTree";
import { WhatIsBinaryTree } from "./WhatIs";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-6">
      <Analytics />
      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-blue-600 mb-6 text-center leading-tight">
        WELCOME TO ELIYAHU'S BINARY TREE
      </h1>

      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
        <BinaryTree />
      </div>

      <div className="text-sm sm:text-base md:text-lg text-gray-700 mt-5 text-center leading-relaxed">
        <WhatIsBinaryTree />
      </div>

      <footer className="mt-10 text-gray-500 text-xs sm:text-sm md:text-base text-center">
        &copy; Eliyahu Huri 2025
      </footer>
    </div>
  );
}

export default App;
