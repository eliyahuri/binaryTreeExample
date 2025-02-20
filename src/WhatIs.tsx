import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { examples } from "./codeExamples";

export function WhatIsBinaryTree() {
  const [selectedLanguage, setSelectedLanguage] = useState<
    "Java" | "CSharp" | "JavaScript" | "TypeScript" | "Python"
  >("Java");

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center">
        What is a Binary Tree?
      </h2>
      <p className="mb-3 text-gray-700 text-sm sm:text-base">
        A binary tree is a hierarchical data structure where each node has at
        most two children: a left child and a right child. The tree starts from
        a root node and extends downward through connected nodes.
      </p>
      <p className="mb-2 text-gray-700 text-sm sm:text-base">
        Binary trees have many applications in computer science, including:
      </p>
      <ul className="list-disc ml-5 mb-3 text-gray-700 text-sm sm:text-base">
        <li>Binary Search Trees (BSTs) for efficient searching and sorting</li>
        <li>Expression Trees to represent mathematical expressions</li>
        <li>Huffman Trees for data compression algorithms</li>
        <li>Priority Queues and Heaps for scheduling and optimization</li>
      </ul>
      <p className="mb-2 text-gray-700 text-sm sm:text-base">
        Key operations on binary trees include:
      </p>
      <ul className="list-disc ml-5 mb-4 text-gray-700 text-sm sm:text-base">
        <li>Insertion: Adding nodes</li>
        <li>Deletion: Removing nodes</li>
        <li>
          Traversal: Visiting nodes in different orders (in-order, pre-order,
          post-order)
        </li>
        <li>Searching: Finding specific values</li>
        <li>Balancing: Maintaining optimal tree structure</li>
      </ul>
      <p className="mb-6 text-gray-700 text-sm sm:text-base">
        In balanced binary trees, operations like insertion, deletion, and
        search can often be performed in O(log n) time, making them efficient
        for large datasets.
      </p>
      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3">
        Code Examples:
      </h3>
      <div className="mb-4">
        <label
          htmlFor="language"
          className="block mb-2 font-medium text-sm sm:text-base"
        >
          Select Language:
        </label>
        <select
          id="language"
          className="p-2 border border-gray-300 rounded w-full sm:w-64 text-sm"
          value={selectedLanguage}
          onChange={(e) =>
            setSelectedLanguage(
              e.target.value as
                | "Java"
                | "CSharp"
                | "JavaScript"
                | "TypeScript"
                | "Python"
            )
          }
        >
          <option value="Java">Java</option>
          <option value="CSharp">C#</option>
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
          <option value="Python">Python</option>
        </select>
      </div>
      <div className="mb-2 overflow-x-auto">
        <SyntaxHighlighter
          language={selectedLanguage.toLowerCase()}
          style={docco}
          customStyle={{ fontSize: "0.75rem", textAlign: "left" }}
        >
          {examples[selectedLanguage]}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
