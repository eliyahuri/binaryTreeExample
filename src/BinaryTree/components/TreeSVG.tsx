import { AnimatePresence, motion } from "framer-motion";
import type { JSX } from "react";
import { BinomialNode, Color, TreeKind, TreeNode } from "../utils/tree";

/**
 * Radius of each node circle in the SVG visualization.
 */
const NODE_R = 18;
/**
 * Font size for node value labels in the SVG.
 */
const FONT = 22;

/**
 * Props for the TreeSVG component.
 */
interface TreeSVGProps {
  kind: TreeKind;
  root: TreeNode | null;
  binomialHead: BinomialNode | null;
  viewBox: string;
}

/**
 * Renders an SVG visualization of the selected tree type (binary or binomial).
 * @param props - The properties including tree kind, data, and SVG viewBox.
 * @returns JSX element representing the tree SVG.
 */
export default function TreeSVG({
  kind,
  root,
  binomialHead,
  viewBox,
}: TreeSVGProps) {
  const renderEdges = (n: TreeNode | null): JSX.Element[] => {
    if (!n) return [];
    const edges: JSX.Element[] = [];
    if (n.left) {
      edges.push(
        <line
          key={`${n.id}-L`}
          x1={n.x}
          y1={n.y}
          x2={n.left.x}
          y2={n.left.y}
          stroke="#666"
          strokeWidth={2}
          strokeDasharray="4 4"
        />
      );
      edges.push(...renderEdges(n.left));
    }
    if (n.right) {
      edges.push(
        <line
          key={`${n.id}-R`}
          x1={n.x}
          y1={n.y}
          x2={n.right.x}
          y2={n.right.y}
          stroke="#666"
          strokeWidth={2}
          strokeDasharray="4 4"
        />
      );
      edges.push(...renderEdges(n.right));
    }
    return edges;
  };

  const renderNodes = (n: TreeNode | null): JSX.Element[] => {
    if (!n) return [];
    const items: JSX.Element[] = [];
    items.push(
      <motion.g
        key={n.id}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, x: n.x, y: n.y }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.circle
          r={n.parent ? NODE_R : NODE_R * Math.max(0.5, 1 - 0 * 0.05)}
          animate={{ fill: n.color === Color.RED ? "#fecaca" : "#bfdbfe" }}
          transition={{ duration: 0.3 }}
          stroke="#000"
          strokeWidth={2}
        />
        <text y={6} textAnchor="middle" fontSize={FONT} fill="#111">
          {n.value}
        </text>
      </motion.g>
    );
    items.push(...renderNodes(n.left));
    items.push(...renderNodes(n.right));
    return items;
  };

  const renderBinomialEdges = (node: BinomialNode | null): JSX.Element[] => {
    if (!node) return [];
    const edges: JSX.Element[] = [];
    let child = node.child;
    while (child) {
      edges.push(
        <line
          key={`${node.id}-${child.id}`}
          x1={node.x!}
          y1={node.y!}
          x2={child.x!}
          y2={child.y!}
          stroke="#666"
          strokeWidth={2}
        />
      );
      edges.push(...renderBinomialEdges(child));
      child = child.sibling;
    }
    return edges;
  };

  const renderBinomialNodes = (node: BinomialNode | null): JSX.Element[] => {
    if (!node) return [];
    const items: JSX.Element[] = [];
    items.push(
      <motion.g
        key={node.id}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, x: node.x, y: node.y }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.circle
          r={NODE_R}
          animate={{ fill: "#fde68a" }}
          transition={{ duration: 0.3 }}
          stroke="#000"
          strokeWidth={2}
        />
        <text y={6} textAnchor="middle" fontSize={FONT} fill="#111">
          {node.key}
        </text>
      </motion.g>
    );
    let child = node.child;
    while (child) {
      items.push(...renderBinomialNodes(child));
      child = child.sibling;
    }
    items.push(...renderBinomialNodes(node.sibling));
    return items;
  };

  return (
    <svg
      width="100%"
      height="auto"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block" }}
    >
      {kind === "Binomial"
        ? renderBinomialEdges(binomialHead)
        : renderEdges(root)}
      <AnimatePresence>
        {kind === "Binomial"
          ? renderBinomialNodes(binomialHead)
          : renderNodes(root)}
      </AnimatePresence>
    </svg>
  );
}
