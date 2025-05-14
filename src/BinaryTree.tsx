import { useState, useEffect, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
export type TreeKind = "BST" | "AVL" | "RBT" | "Binomial";

export enum Color {
  RED = "red",
  BLACK = "black",
}

interface TreeNode {
  id: string;
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  parent: TreeNode | null;
  color: Color;
  x: number;
  y: number;
}

let nodeIdCounter = 0;
function createNode(value: number, color: Color): TreeNode {
  return {
    id: `node-${nodeIdCounter++}`,
    value,
    left: null,
    right: null,
    parent: null,
    color,
    x: 0,
    y: 0,
  };
}

// --- Binomial Tree Types ---
interface BinomialNode {
  id: string;
  key: number;
  degree: number;
  parent: BinomialNode | null;
  child: BinomialNode | null;
  sibling: BinomialNode | null;
  x?: number;
  y?: number;
}

function createBinomialNode(key: number): BinomialNode {
  return {
    id: `bnode-${nodeIdCounter++}`,
    key,
    degree: 0,
    parent: null,
    child: null,
    sibling: null,
  };
}

function mergeRootLists(
  h1: BinomialNode | null,
  h2: BinomialNode | null
): BinomialNode | null {
  if (!h1) return h2;
  if (!h2) return h1;
  if (h1.degree <= h2.degree) {
    h1.sibling = mergeRootLists(h1.sibling, h2);
    return h1;
  } else {
    h2.sibling = mergeRootLists(h1, h2.sibling);
    return h2;
  }
}

function linkTrees(y: BinomialNode, z: BinomialNode) {
  y.parent = z;
  y.sibling = z.child;
  z.child = y;
  z.degree++;
}

function binomialUnion(
  h1: BinomialNode | null,
  h2: BinomialNode | null
): BinomialNode | null {
  let head = mergeRootLists(h1, h2);
  if (!head) return null;
  let prev: BinomialNode | null = null;
  let curr: BinomialNode | null = head;
  let next: BinomialNode | null = head.sibling;
  while (next) {
    if (
      curr!.degree !== next.degree ||
      (next.sibling && next.sibling.degree === curr!.degree)
    ) {
      prev = curr;
      curr = next;
    } else if (curr!.key <= next.key) {
      curr!.sibling = next.sibling;
      linkTrees(next, curr!);
    } else {
      if (prev) prev.sibling = next;
      else head = next;
      linkTrees(curr!, next);
      curr = next;
    }
    next = curr!.sibling;
  }
  return head;
}

function binomialInsert(
  head: BinomialNode | null,
  key: number
): BinomialNode | null {
  const node = createBinomialNode(key);
  return binomialUnion(head, node) || null;
}

function layoutBinomialForest(head: BinomialNode | null) {
  let x = 0;
  const y = 0;
  let curr = head;
  while (curr) {
    layoutBinomialTree(curr, x, y);
    x += 120;
    curr = curr.sibling;
  }
}
function layoutBinomialTree(node: BinomialNode, x: number, y: number) {
  node.x = x;
  node.y = y;
  let child = node.child;
  let cx = x - 40 * node.degree;
  const cy = y + 80;
  while (child) {
    layoutBinomialTree(child, cx, cy);
    cx += 80;
    child = child.sibling;
  }
}

/* ------------------------------------------------------------------ */
const H_GAP = 70;
const V_GAP = 90;

function layoutTree(root: TreeNode | null) {
  let index = 0;
  const dfs = (node: TreeNode | null, depth: number) => {
    if (!node) return;
    dfs(node.left, depth + 1);
    node.x = index * H_GAP;
    node.y = depth * V_GAP;
    index += 1;
    dfs(node.right, depth + 1);
  };
  dfs(root, 0);
}

const isRed = (n: TreeNode | null) => n !== null && n.color === Color.RED;
const height = (n: TreeNode | null): number =>
  n ? 1 + Math.max(height(n.left), height(n.right)) : 0;
const balanceFactor = (n: TreeNode | null) =>
  n ? height(n.left) - height(n.right) : 0;

/* ------------------------------------------------------------------ */
function rotateLeft(x: TreeNode): TreeNode {
  const y = x.right!;
  x.right = y.left;
  if (y.left) y.left.parent = x;
  y.parent = x.parent;
  if (x.parent) {
    if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
  }
  y.left = x;
  x.parent = y;
  return y;
}

function rotateRight(y: TreeNode): TreeNode {
  const x = y.left!;
  y.left = x.right;
  if (x.right) x.right.parent = y;
  x.parent = y.parent;
  if (y.parent) {
    if (y === y.parent.left) y.parent.left = x;
    else y.parent.right = x;
  }
  x.right = y;
  y.parent = x;
  return x;
}

/* ------------------------------------------------------------------ */
function bstInsert(root: TreeNode | null, value: number): TreeNode {
  if (!root) return createNode(value, Color.BLACK);
  if (value < root.value) {
    const inserted = bstInsert(root.left, value);
    root.left = inserted;
    inserted.parent = root;
  } else {
    const inserted = bstInsert(root.right, value);
    root.right = inserted;
    inserted.parent = root;
  }
  return root;
}

/* ------------------------------------------------------------------ */
function avlInsert(root: TreeNode | null, value: number): TreeNode {
  root = bstInsert(root, value);

  const rebalance = (node: TreeNode | null): TreeNode | null => {
    if (!node) return node;
    node.left = rebalance(node.left);
    node.right = rebalance(node.right);
    const bf = balanceFactor(node);
    if (bf > 1 && balanceFactor(node.left) >= 0) return rotateRight(node);
    if (bf < -1 && balanceFactor(node.right) <= 0) return rotateLeft(node);
    if (bf > 1 && balanceFactor(node.left) < 0) {
      node.left = rotateLeft(node.left!);
      return rotateRight(node);
    }
    if (bf < -1 && balanceFactor(node.right) > 0) {
      node.right = rotateRight(node.right!);
      return rotateLeft(node);
    }
    return node;
  };

  return rebalance(root)!;
}

/* ------------------------------------------------------------------ */
function rbtInsert(root: TreeNode | null, value: number): TreeNode {
  let inserted: TreeNode | null = null;

  const bstInsertRed = (node: TreeNode | null, value: number): TreeNode => {
    if (!node) {
      inserted = createNode(value, Color.RED);
      return inserted;
    }
    if (value < node.value) {
      const kid = bstInsertRed(node.left, value);
      node.left = kid;
      kid.parent = node;
    } else {
      const kid = bstInsertRed(node.right, value);
      node.right = kid;
      kid.parent = node;
    }
    return node;
  };

  root = bstInsertRed(root, value);
  let z = inserted!;
  while (z.parent && z.parent.color === Color.RED) {
    const gp = z.parent.parent!;
    if (z.parent === gp.left) {
      const y = gp.right;
      if (isRed(y)) {
        z.parent.color = Color.BLACK;
        if (y) y.color = Color.BLACK;
        gp.color = Color.RED;
        z = gp;
      } else {
        if (z === z.parent.right) {
          z = z.parent;
          const newSub = rotateLeft(z);
          if (newSub.parent === null) root = newSub;
        }
        z.parent!.color = Color.BLACK;
        gp.color = Color.RED;
        const newSub = rotateRight(gp);
        if (newSub.parent === null) root = newSub;
      }
    } else {
      const y = gp.left;
      if (isRed(y)) {
        z.parent.color = Color.BLACK;
        if (y) y.color = Color.BLACK;
        gp.color = Color.RED;
        z = gp;
      } else {
        if (z === z.parent.left) {
          z = z.parent;
          const newSub = rotateRight(z);
          if (newSub.parent === null) root = newSub;
        }
        z.parent!.color = Color.BLACK;
        gp.color = Color.RED;
        const newSub = rotateLeft(gp);
        if (newSub.parent === null) root = newSub;
      }
    }
  }
  root.color = Color.BLACK;
  return root;
}

/* ------------------------------------------------------------------ */
function bstDelete(root: TreeNode | null, value: number): TreeNode | null {
  if (!root) return null;
  if (value < root.value) root.left = bstDelete(root.left, value);
  else if (value > root.value) root.right = bstDelete(root.right, value);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    let succ = root.right;
    while (succ.left) succ = succ.left;
    root.value = succ.value;
    root.right = bstDelete(root.right, succ.value);
  }
  return root;
}

/* ------------------------------------------------------------------ */
const NODE_R = 18;
const FONT = 22;

export default function BinaryTree() {
  const [kind, setKind] = useState<TreeKind>("BST");
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [binomialHead, setBinomialHead] = useState<BinomialNode | null>(null);
  const [input, setInput] = useState("");
  const [viewBox, setViewBox] = useState("0 0 800 500");

  useEffect(() => {
    if (kind === "Binomial") {
      layoutBinomialForest(binomialHead);
      // Compute extents
      let minX = Infinity,
        maxX = -Infinity,
        minY = Infinity,
        maxY = -Infinity;
      const collect = (node: BinomialNode | null) => {
        if (!node) return;
        if (node.x != null && node.y != null) {
          minX = Math.min(minX, node.x);
          maxX = Math.max(maxX, node.x);
          minY = Math.min(minY, node.y);
          maxY = Math.max(maxY, node.y);
        }
        let child = node.child;
        while (child) {
          collect(child);
          child = child.sibling;
        }
        collect(node.sibling);
      };
      collect(binomialHead);

      const padding = NODE_R * 2;
      const viewX = minX - padding;
      const viewY = minY - padding;
      const viewW = maxX - minX + padding * 2;
      const viewH = maxY - minY + padding * 2;
      setViewBox(`${viewX} ${viewY} ${viewW} ${viewH}`);
    } else {
      if (root) {
        layoutTree(root);
        // Compute extents
        let minX = Infinity,
          maxX = -Infinity,
          minY = Infinity,
          maxY = -Infinity;
        const visit = (n: TreeNode | null) => {
          if (!n) return;
          minX = Math.min(minX, n.x);
          maxX = Math.max(maxX, n.x);
          minY = Math.min(minY, n.y);
          maxY = Math.max(maxY, n.y);
          visit(n.left);
          visit(n.right);
        };
        visit(root);

        const padding = NODE_R * 1.5;
        // Shift tree down so it's not clipped at top
        const yShift = -minY + padding;
        const applyYShift = (n: TreeNode | null) => {
          if (!n) return;
          n.y += yShift;
          applyYShift(n.left);
          applyYShift(n.right);
        };
        applyYShift(root);

        const viewX = minX - padding;
        const viewY = 0; // already shifted y
        const viewW = maxX - minX + padding * 2;
        const viewH = maxY - minY + padding * 3;

        setViewBox(`${viewX} ${viewY} ${viewW} ${viewH}`);
      }
    }
  }, [root, binomialHead, kind]);

  useEffect(() => {
    setRoot(null);
    setBinomialHead(null);
    setInput("");
  }, [kind]);

  const insert = () => {
    const val = Number(input);
    if (isNaN(val)) return;
    if (kind === "Binomial") {
      setBinomialHead((prev) => binomialInsert(prev, val));
      setInput("");
      return;
    }
    let updated: TreeNode;
    if (kind === "AVL") updated = avlInsert(root, val);
    else if (kind === "RBT") updated = rbtInsert(root, val);
    else updated = bstInsert(root, val);
    setRoot({ ...updated });
    setInput("");
  };

  const remove = () => {
    const val = Number(input);
    if (isNaN(val)) return;
    if (kind === "Binomial") {
      setInput("");
      return;
    }
    const updated = bstDelete(root, val);
    setRoot(updated ? { ...updated } : null);
    setInput("");
  };

  const renderEdges = (n: TreeNode | null): JSX.Element[] => {
    if (!n) return [];
    const edges: JSX.Element[] = [];
    if (n.left)
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
        />,
        ...renderEdges(n.left)
      );
    if (n.right)
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
        />,
        ...renderEdges(n.right)
      );
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
          r={
            n.parent
              ? NODE_R
              : NODE_R * Math.max(0.5, 1 - (height(root) - 1) * 0.05)
          }
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
    <div className="flex flex-col items-center p-2 sm:p-4 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-center">
        Tree Visualiser
      </h1>
      <div className="flex flex-wrap gap-2 mb-3 sm:mb-4 items-center w-full justify-center">
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value as TreeKind)}
          className="border px-2 py-1 rounded dark:bg-gray-800 text-base sm:text-lg"
        >
          <option value="BST">Binary Search Tree</option>
          <option value="AVL">AVL Tree</option>
          <option value="RBT">Red‑Black Tree</option>
          <option value="Binomial">Binomial Tree</option>
        </select>
        <input
          type="number"
          className="border rounded px-3 py-2 w-28 sm:w-32 text-base sm:text-lg"
          placeholder="value"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={insert}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-base sm:text-lg"
        >
          Insert
        </button>
        <button
          onClick={remove}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-base sm:text-lg"
        >
          Delete
        </button>
      </div>

      <div className="w-full border rounded shadow-inner overflow-hidden">
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
      </div>
    </div>
  );
}
