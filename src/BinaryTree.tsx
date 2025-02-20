import React, { useState, useEffect, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TreeNode = {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  x: number;
  y: number;
};

const BinaryTree: React.FC = () => {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [viewBox, setViewBox] = useState("0 0 1000 600");

  // Fixed sizes for nodes and text.
  const NODE_RADIUS = 20;
  const FONT_SIZE = 16;

  /**
   * Check if a node already exists in the tree.
   */
  const nodeExists = (node: TreeNode | null, value: number): boolean => {
    if (!node) return false;
    if (node.value === value) return true;
    return nodeExists(node.left, value) || nodeExists(node.right, value);
  };

  /**
   * Insert node into the BST.
   * Adjust the shift to keep the tree from getting too wide.
   */
  const insertNode = (
    root: TreeNode | null,
    value: number,
    x = 500,
    y = 50,
    depth = 1
  ): TreeNode => {
    if (!root) {
      return { value, left: null, right: null, x, y };
    }

    // Try reducing this to 200 or 150 if you want a narrower tree.
    const shift = 200 / depth;
    const verticalGap = 80;

    if (value < root.value) {
      root.left = insertNode(
        root.left,
        value,
        x - shift,
        y + verticalGap,
        depth + 1
      );
    } else {
      root.right = insertNode(
        root.right,
        value,
        x + shift,
        y + verticalGap,
        depth + 1
      );
    }
    return root;
  };

  /**
   * Handle the insert action.
   * Only allow non-negative numbers (>= 0) and numbers with up to 5 digits.
   */
  const handleInsert = () => {
    const value = parseFloat(inputValue);
    if (!isNaN(value) && value <= 99999 && value >= 0) {
      if (!nodeExists(tree, value)) {
        setTree((prevTree) => insertNode(prevTree, value));
      }
      setInputValue("");
    } else {
      alert("Please enter a non-negative number with up to 5 digits.");
    }
  };

  /**
   * Given a number, return an array of strings.
   * If the number’s string is more than 3 characters long,
   * split it into two lines.
   */
  const wrapNumber = (num: number): string[] => {
    const str = num.toString();
    if (str.length <= 3) return [str];
    const mid = Math.ceil(str.length / 2);
    return [str.slice(0, mid), str.slice(mid)];
  };

  /**
   * Recursively render the tree.
   */
  const renderTree = (node: TreeNode | null): JSX.Element | null => {
    if (!node) return null;
    const lines = wrapNumber(node.value);

    return (
      <>
        {node.left && (
          <motion.line
            x1={node.x}
            y1={node.y}
            x2={node.left.x}
            y2={node.left.y}
            stroke="#666"
            strokeWidth={2}
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
        {node.right && (
          <motion.line
            x1={node.x}
            y1={node.y}
            x2={node.right.x}
            y2={node.right.y}
            stroke="#666"
            strokeWidth={2}
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
        <AnimatePresence>
          <motion.circle
            key={node.value}
            cx={node.x}
            cy={node.y}
            r={NODE_RADIUS}
            fill="url(#circleGradient)"
            stroke="black"
            strokeWidth={2}
            filter="url(#dropShadow)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <motion.text
          x={node.x}
          y={node.y}
          textAnchor="middle"
          fill="#333"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {lines.map((line, index) => (
            <tspan
              key={index}
              x={node.x}
              // If there is more than one line, adjust the dy to vertically center the text.
              dy={
                index === 0
                  ? lines.length === 1
                    ? "0.35em"
                    : "-0.2em"
                  : "1.2em"
              }
              fontSize={FONT_SIZE}
            >
              {line}
            </tspan>
          ))}
        </motion.text>
        {renderTree(node.left)}
        {renderTree(node.right)}
      </>
    );
  };

  /**
   * Compute bounding box of the entire tree:
   * min/max X/Y among all nodes, then adapt viewBox to fit them.
   */
  const getBoundingBox = (
    node: TreeNode | null,
    bounds = {
      minX: Infinity,
      maxX: -Infinity,
      minY: Infinity,
      maxY: -Infinity,
    }
  ) => {
    if (!node) return bounds;

    bounds.minX = Math.min(bounds.minX, node.x);
    bounds.maxX = Math.max(bounds.maxX, node.x);
    bounds.minY = Math.min(bounds.minY, node.y);
    bounds.maxY = Math.max(bounds.maxY, node.y);

    getBoundingBox(node.left, bounds);
    getBoundingBox(node.right, bounds);
    return bounds;
  };

  /**
   * Update viewBox whenever the tree changes.
   */
  useEffect(() => {
    if (!tree) {
      setViewBox("0 0 1000 600");
      return;
    }

    // 1) Calculate bounding box
    const { minX, maxX, minY, maxY } = getBoundingBox(tree);

    // 2) Add some margin around the extreme nodes
    const margin = 50;
    const width = maxX - minX + margin * 2;
    const height = maxY - minY + margin * 2;

    // 3) Enforce a minimum width and height
    const minWidth = 1000;
    const minHeight = 600;
    const finalWidth = Math.max(minWidth, width);
    const finalHeight = Math.max(minHeight, height);

    // 4) Center the bounding box if it’s smaller than the minimum dimensions
    let offsetX = minX - margin;
    let offsetY = minY - margin;
    const extraSpaceX = finalWidth - width;
    offsetX -= extraSpaceX / 2;
    const extraSpaceY = finalHeight - height;
    offsetY -= extraSpaceY / 2;

    // 5) Set the viewBox
    setViewBox(`${offsetX} ${offsetY} ${finalWidth} ${finalHeight}`);
  }, [tree]);

  return (
    <div className="flex flex-col items-center mt-5 px-4 dark:bg-gray-900 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-1">Binary Tree Visualizer</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Insert non-negative numbers to build a Binary Search Tree.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-4">
        <input
          type="number"
          min="0"
          step="any"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleInsert();
            }
          }}
          placeholder="Enter a non-negative number (max 5 digits)"
          maxLength={5}
          className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full sm:w-auto
                     focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500"
        />
        <button
          onClick={handleInsert}
          className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600
                     transition-colors w-full sm:w-auto"
        >
          Insert
        </button>
      </div>

      <div className="overflow-x-auto w-full border border-gray-200 dark:border-gray-700 rounded-lg">
        <svg width="100%" height="600" viewBox={viewBox} className="w-full">
          <defs>
            {/* Drop Shadow Filter */}
            <filter
              id="dropShadow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
              <feOffset in="blur" dx="2" dy="2" result="offsetBlur" />
              <feMerge>
                <feMergeNode in="offsetBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradient for circles */}
            <linearGradient id="circleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="100%" stopColor="#bfdbfe" />
            </linearGradient>
          </defs>

          {renderTree(tree)}
        </svg>
      </div>
    </div>
  );
};

export default BinaryTree;
