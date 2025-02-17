import BinaryTree from "./BinaryTree";
import { WhatIsBinaryTree } from "./WhatIs";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-4 text-center">
        WELCOME TO ELIYAHU'S BINARY TREE
      </h1>
      <BinaryTree />
      <p className="text-base sm:text-lg md:text-xl text-gray-700 mt-4 text-center">
        <WhatIsBinaryTree />
      </p>

      <footer className="mt-8 text-gray-500 text-sm sm:text-base md:text-lg text-center">
        &copy; Eliyahu Huri 2025
      </footer>
    </div>
  );
}

export default App;
