import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { getCodeExample } from "./translations/codeExamples";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import type { Languages } from "./types/language";
import { TreeKind } from "./BinaryTree";
import { CopyToClipboard } from "react-copy-to-clipboard";

export function WhatIsBinaryTree() {
  const [selectedLanguage, setSelectedLanguage] = useState<Languages>("Java");
  const [selectedKind, setSelectedKind] = useState<TreeKind>("BST");
  const [copied, setCopied] = useState(false);

  const languages: Languages[] = [
    "Java",
    "CSharp",
    "JavaScript",
    "TypeScript",
    "Python",
  ];

  const kinds: TreeKind[] = ["BST", "AVL", "RBT", "Binomial"];

  const handleCarouselChange = (index: number) => {
    setSelectedLanguage(languages[index]);
    setCopied(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
        What is a Binary Tree?
      </h2>

      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
        A <strong>Binary Tree</strong> is a hierarchical data structure in which
        each node has at most two children, referred to as the <em>left</em>{" "}
        child and the <em>right</em> child. It is used in various algorithms and
        systems such as searching, sorting, and expression parsing. There are
        multiple types of binary trees, such as:
        <ul className="list-disc list-inside mt-2">
          <li>
            <strong>BST (Binary Search Tree)</strong> – keeps elements ordered
            to allow fast lookup, insertion, and deletion.
          </li>
          <li>
            <strong>AVL Tree</strong> – a self-balancing BST ensuring
            logarithmic height by performing rotations.
          </li>
          <li>
            <strong>Red-Black Tree</strong> – a balanced BST using color
            properties to maintain efficient operations.
          </li>
        </ul>
      </p>

      <div className="mb-4">
        <label
          htmlFor="treeKind"
          className="block mb-2 font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100"
        >
          Tree Type:
        </label>
        <select
          id="treeKind"
          className="p-2 border border-gray-300 dark:border-gray-700 rounded w-full sm:w-64 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={selectedKind}
          onChange={(e) => setSelectedKind(e.target.value as TreeKind)}
        >
          {kinds.map((kind) => (
            <option key={kind} value={kind}>
              {kind}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="language"
          className="block mb-2 font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100"
        >
          Select Language:
        </label>
        <select
          id="language"
          className="p-2 border border-gray-300 dark:border-gray-700 rounded w-full sm:w-64 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value as Languages)}
        >
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2 overflow-x-auto">
        <Carousel
          selectedItem={languages.indexOf(selectedLanguage)}
          onChange={handleCarouselChange}
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          useKeyboardArrows
        >
          {languages.map((language) => {
            const code =
              getCodeExample(language, selectedKind) ??
              "// Code not available.";
            return (
              <div key={language}>
                <div className="relative">
                  <SyntaxHighlighter
                    language={language.toLowerCase()}
                    style={dracula}
                    customStyle={{ fontSize: "0.75rem", textAlign: "left" }}
                  >
                    {code}
                  </SyntaxHighlighter>
                  <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
                    <button className="absolute top-2 right-2 p-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded">
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
