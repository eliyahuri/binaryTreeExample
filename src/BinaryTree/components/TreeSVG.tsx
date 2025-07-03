import { AnimatePresence, motion } from "framer-motion";
import type { JSX } from "react";
import { Color, TreeNode } from "../utils/tree";

/**
 * Radius of each node circle in the SVG visualization.
 */
const NODE_R = 20;
/**
 * Font size for node value labels in the SVG.
 */
const FONT = 16;

/**
 * Props for the TreeSVG component.
 */
interface TreeSVGProps {
  root: TreeNode | null;
  viewBox: string;
}

/**
 * Renders an SVG visualization of the selected tree type (binary or binomial).
 * @param props - The properties including tree kind, data, and SVG viewBox.
 * @returns JSX element representing the tree SVG.
 */
export function TreeSVG({ root, viewBox }: TreeSVGProps) {
  const renderEdges = (n: TreeNode | null): JSX.Element[] => {
    if (!n) return [];
    const edges: JSX.Element[] = [];
    if (n.left) {
      edges.push(
        <motion.line
          key={`${n.id}-L`}
          x1={n.x}
          y1={n.y}
          x2={n.left.x}
          y2={n.left.y}
          stroke="url(#edgeGradient)"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      );
      edges.push(...renderEdges(n.left));
    }
    if (n.right) {
      edges.push(
        <motion.line
          key={`${n.id}-R`}
          x1={n.x}
          y1={n.y}
          x2={n.right.x}
          y2={n.right.y}
          stroke="url(#edgeGradient)"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      );
      edges.push(...renderEdges(n.right));
    }
    return edges;
  };

  const renderNodes = (n: TreeNode | null): JSX.Element[] => {
    if (!n) return [];
    const items: JSX.Element[] = [];

    const isRoot = !n.parent;
    const nodeColor = n.color === Color.RED ? "#f472b6" : "#38bdf8";

    items.push(
      <motion.g
        key={n.id}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1, x: n.x, y: n.y }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.circle
          r={isRoot ? NODE_R * 1.2 : NODE_R}
          fill={nodeColor}
          stroke="#ffffff"
          strokeWidth={3}
          filter={`url(#glow-${n.color})`}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.text
          y={6}
          textAnchor="middle"
          fontSize={FONT}
          fontWeight="600"
          fill="#ffffff"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {n.value}
        </motion.text>
        {isRoot && (
          <motion.text
            y={-NODE_R * 1.5}
            textAnchor="middle"
            fontSize={12}
            fontWeight="500"
            fill="#6b7280"
            initial={{ opacity: 0, y: -NODE_R * 1.2 }}
            animate={{ opacity: 1, y: -NODE_R * 1.5 }}
            transition={{ delay: 0.5 }}
          >
            ROOT
          </motion.text>
        )}
      </motion.g>
    );
    items.push(...renderNodes(n.left));
    items.push(...renderNodes(n.right));
    return items;
  };

  return (
    <div className="w-full bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-xl overflow-hidden">
      <svg
        width="100%"
        height="500"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block" }}
      >
        <defs>
          {/* Gradients for edges */}
          <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>

          {/* Glow filters */}
          <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow-black" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {renderEdges(root)}
        <AnimatePresence>{renderNodes(root)}</AnimatePresence>
      </svg>
    </div>
  );
}
