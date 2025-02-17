import BinaryTree from "./BinaryTree";
import { WhatIsBinaryTree } from "./WhatIs";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        WELCOME TO ELIYAHU'S BINARY TREE
      </h1>
      <BinaryTree />
      <p className="text-lg text-gray-700 mt-4">
        <WhatIsBinaryTree />
      </p>

      <footer className="mt-8 text-gray-500">&copy; Eliyahu Huri 2025</footer>
    </div>
  );
}

export default App;
