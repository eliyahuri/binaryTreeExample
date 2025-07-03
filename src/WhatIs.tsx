import { useState } from "react";
import { motion } from "framer-motion";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { getCodeExample } from "./translations/codeExamples";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import type { Languages } from "./types/language";
import { CopyToClipboard } from "react-copy-to-clipboard";
import type { TreeKind } from "./BinaryTree/utils/tree";
import { Select } from "./components/shared/Select";

/**
 * Component that displays information and code examples for binary tree types in various languages.
 * @returns JSX element containing explanatory text, selectors, and code carousel with copy functionality.
 */
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

  const kinds: TreeKind[] = ["BST", "AVL", "RBT"];

  const handleCarouselChange = (index: number) => {
    setSelectedLanguage(languages[index]);
    setCopied(false);
  };

  const treeDescriptions = {
    BST: "Binary Search Tree keeps elements ordered to allow fast lookup, insertion, and deletion operations.",
    AVL: "AVL Tree is a self-balancing BST ensuring logarithmic height by performing rotations when needed.",
    RBT: "Red-Black Tree is a balanced BST using color properties to maintain efficient operations with guaranteed O(log n) complexity.",
  };

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl border border-white/20 dark:border-gray-700/20 shadow-2xl p-8 space-y-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Understanding Data Structures
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore different tree data structures and their implementations
            across multiple programming languages
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="space-y-6">
            <div>
              <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-300">
                Tree Type
              </label>
              <Select
                value={selectedKind}
                onChange={(e) => setSelectedKind(e.target.value as TreeKind)}
                className="w-full"
              >
                {kinds.map((kind) => (
                  <option key={kind} value={kind}>
                    {kind === "BST"
                      ? "Binary Search Tree"
                      : kind === "AVL"
                      ? "AVL Tree"
                      : "Red-Black Tree"}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-300">
                Programming Language
              </label>
              <Select
                value={selectedLanguage}
                onChange={(e) =>
                  setSelectedLanguage(e.target.value as Languages)
                }
                className="w-full"
              >
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language === "CSharp" ? "C#" : language}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
              {selectedKind === "BST"
                ? "Binary Search Tree"
                : selectedKind === "AVL"
                ? "AVL Tree"
                : "Red-Black Tree"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {treeDescriptions[selectedKind]}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl overflow-hidden shadow-xl"
        >
          <Carousel
            selectedItem={languages.indexOf(selectedLanguage)}
            onChange={handleCarouselChange}
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            useKeyboardArrows
            className="code-carousel"
          >
            {languages.map((language) => {
              const code =
                getCodeExample(language, selectedKind) ??
                "// Code not available for this combination.";
              return (
                <div key={language} className="relative">
                  <div className="relative">
                    <SyntaxHighlighter
                      language={language.toLowerCase()}
                      style={dracula}
                      customStyle={{
                        fontSize: "14px",
                        textAlign: "left",
                        margin: 0,
                        borderRadius: "0",
                        minHeight: "300px",
                      }}
                    >
                      {code}
                    </SyntaxHighlighter>
                    <CopyToClipboard
                      text={code}
                      onCopy={() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                    >
                      <motion.button
                        className="absolute top-4 right-4 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {copied ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Copied!
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            Copy
                          </span>
                        )}
                      </motion.button>
                    </CopyToClipboard>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </motion.div>
      </div>
    </motion.div>
  );
}
