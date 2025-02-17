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

  const insertNode = (
    root: TreeNode | null,
    value: number,
    x = 500,
    y = 50,
    depth = 1
  ): TreeNode => {
    if (root === null) {
      return { value, left: null, right: null, x, y };
    }
    const shift = 300 / depth;
    if (value < root.value) {
      root.left = insertNode(root.left, value, x - shift, y + 70, depth + 1);
    } else {
      root.right = insertNode(root.right, value, x + shift, y + 70, depth + 1);
    }
    return root;
  };

  const handleInsert = () => {
    const value = parseFloat(inputValue);
    if (!isNaN(value) && value <= 99999) {
      if (!nodeExists(tree, value)) {
        setTree((prevTree) => insertNode(prevTree, value));
      }
      setInputValue("");
    }
  };

  const nodeExists = (node: TreeNode | null, value: number): boolean => {
    if (!node) return false;
    if (node.value === value) return true;
    return nodeExists(node.left, value) || nodeExists(node.right, value);
  };

  const renderTree = (node: TreeNode | null): JSX.Element | null => {
    if (node === null) {
      return null;
    }

    return (
      <>
        {node.left && (
          <motion.line
            x1={node.x}
            y1={node.y}
            x2={node.left.x}
            y2={node.left.y}
            stroke="black"
            initial={{ strokeWidth: 0 }}
            animate={{ strokeWidth: 2 }}
            transition={{ duration: 0.5 }}
          />
        )}
        {node.right && (
          <motion.line
            x1={node.x}
            y1={node.y}
            x2={node.right.x}
            y2={node.right.y}
            stroke="black"
            initial={{ strokeWidth: 0 }}
            animate={{ strokeWidth: 2 }}
            transition={{ duration: 0.5 }}
          />
        )}
        <AnimatePresence>
          <motion.circle
            key={node.value}
            cx={node.x}
            cy={node.y}
            r="20"
            fill="lightblue"
            stroke="black"
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
          dy="5"
          fontSize="14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {node.value}
        </motion.text>
        {renderTree(node.left)}
        {renderTree(node.right)}
      </>
    );
  };

  useEffect(() => {
    const updateViewBox = () => {
      const maxDepth = getMaxDepth(tree);
      const width = 1000 + maxDepth * 100;
      const height = 600 + maxDepth * 70;
      setViewBox(`0 0 ${width} ${height}`);
    };

    const getMaxDepth = (node: TreeNode | null, depth = 0): number => {
      if (node === null) return depth;
      return Math.max(
        getMaxDepth(node.left, depth + 1),
        getMaxDepth(node.right, depth + 1)
      );
    };

    updateViewBox();
  }, [tree]);

  return (
    <div className="text-center mt-5">
      <h1 className="text-2xl font-bold">Binary Tree Visualizer</h1>
      <input
        type="number"
        step="any"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a number (max 5 digits)"
        maxLength={5}
        className="border border-gray-300 rounded px-2 py-1"
      />
      <button
        onClick={handleInsert}
        className="ml-2 px-4 py-1 bg-blue-500 text-white rounded"
      >
        Insert
      </button>
      <svg
        width="1000"
        height="600"
        viewBox={viewBox}
        className="border border-black mt-5"
      >
        {renderTree(tree)}
      </svg>
    </div>
  );
};

export default BinaryTree;
