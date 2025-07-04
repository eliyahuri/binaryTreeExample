import { AnimatePresence, motion } from "framer-motion";
import type { JSX } from "react";
import type { BHNode, BinomialHeap } from "../utils/binomialHeap";

interface BHSVGProps {
  heap: BinomialHeap;
  viewBox: string;
}

const NODE_R = 20;
const FONT = 14;

/**
 * SVG visualization for Binomial Heap.
 */
export function BHSVG({ heap, viewBox }: BHSVGProps) {
  // Render lines between parent and child nodes
  const renderEdges = (node: BHNode | null): JSX.Element[] => {
    if (!node) return [];
    let edges: JSX.Element[] = [];
    node.children.forEach((child) => {
      edges.push(
        <motion.line
          key={`${node.id}-${child.id}`}
          x1={node.x}
          y1={node.y}
          x2={child.x}
          y2={child.y}
          stroke="url(#edgeGradient)"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      );
      edges = edges.concat(renderEdges(child));
    });
    return edges;
  };

  // Render nodes recursively
  const renderNodes = (
    node: BHNode | null,
    isMinRoot: boolean
  ): JSX.Element[] => {
    if (!node) return [];
    const items: JSX.Element[] = [];
    const isRoot = node.parent === null;
    const nodeColor = isRoot && isMinRoot ? "#e74c3c" : "#3498db";

    items.push(
      <motion.g
        key={node.id}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1, x: node.x, y: node.y }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.circle
          r={NODE_R}
          fill={nodeColor}
          stroke="#ffffff"
          strokeWidth={3}
          filter="url(#glow)"
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
          {node.key}
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
            order-{node.order}
          </motion.text>
        )}
      </motion.g>
    );
    node.children.forEach((c) => items.push(...renderNodes(c, isMinRoot)));
    return items;
  };

  // Determine minimum root
  const minNode = heap.roots.reduce((min: BHNode | null, r) => {
    if (!min || r.key < min.key) return r;
    return min;
  }, null as BHNode | null);

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
          <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {heap.roots.map((r) => renderEdges(r))}
        <AnimatePresence>
          {heap.roots.map((r) => renderNodes(r, r === minNode))}
        </AnimatePresence>
      </svg>
    </div>
  );
}
