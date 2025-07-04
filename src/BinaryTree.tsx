import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Controls from "./BinaryTree/components/Controls";
import { TreeSVG } from "./BinaryTree/components/TreeSVG";
import {
  avlInsert,
  bstDelete,
  bstInsert,
  layoutTree,
  NODE_R,
  rbtInsert,
  TreeKind,
  TreeNode,
} from "./BinaryTree/utils/tree";
import {
  bhCreate,
  bhExtractMin,
  bhInsert,
  BinomialHeap,
  // bhFindMin, (unused)
  layoutBH,
} from "./components/BinomialHeap/utils/binomialHeap";

/**
 * BinaryTree component renders the interactive tree visualizer UI.
 * @returns JSX element containing controls and SVG visualization for binary/binomial trees.
 */
export default function BinaryTree() {
  const [kind, setKind] = useState<TreeKind>("BST");
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [input, setInput] = useState("");
  const [viewBox, setViewBox] = useState("0 0 800 500");
  const [bh, setBh] = useState<BinomialHeap>(bhCreate());

  useEffect(() => {
    if (kind !== "BH" && root) {
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
    if (kind === "BH") {
      layoutBH(bh);
      // compute extents
      let minX = Infinity,
        maxX = -Infinity,
        minY = Infinity,
        maxY = -Infinity;
      const visit = (n: any) => {
        if (!n) return;
        minX = Math.min(minX, n.x);
        maxX = Math.max(maxX, n.x);
        minY = Math.min(minY, n.y);
        maxY = Math.max(maxY, n.y);
        n.children.forEach((c: any) => visit(c));
      };
      bh.roots.forEach((r) => visit(r));
      const padding = NODE_R * 1.5;
      const yShift = -minY + padding;
      const applyY = (n: any) => {
        if (!n) return;
        n.y += yShift;
        n.children.forEach((c: any) => applyY(c));
      };
      bh.roots.forEach((r) => applyY(r));
      const viewX = minX - padding;
      const viewY = 0;
      const viewW = maxX - minX + padding * 2;
      const viewH = maxY - minY + padding * 3;
      setViewBox(`${viewX} ${viewY} ${viewW} ${viewH}`);
    }
  }, [root, kind]);

  useEffect(() => {
    setRoot(null);
    setInput("");
  }, [kind]);

  /**
   * Inserts the numeric value currently typed into the input.
   *
   * Handles the logic for the selected tree kind and clears the input.
   */
  const insert = () => {
    const val = Number(input);
    if (isNaN(val)) return;
    if (kind === "BH") {
      // Insert into Binomial Heap
      setBh(bhInsert(bh, val));
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

  /**
   * Removes the node matching the value in the input from the tree.
   *
   * Only applicable for binary search based trees; binomial trees are
   * immutable in this demo and thus ignore removal.
   */
  const remove = () => {
    const val = Number(input);
    if (isNaN(val)) return;
    if (kind === "BH") {
      // Extract min from Binomial Heap
      setBh(bhExtractMin(bh));
      setInput("");
      return;
    }
    const updated = bstDelete(root, val);
    setRoot(updated ? { ...updated } : null);
    setInput("");
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Tree Visualizer
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Interactive visualization of binary search trees, AVL trees, and
          red-black trees
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-6xl"
      >
        <Controls
          kind={kind}
          setKind={setKind}
          input={input}
          setInput={setInput}
          onInsert={insert}
          onRemove={remove}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full max-w-6xl"
      >
        <TreeSVG root={root} viewBox={viewBox} />
      </motion.div>
    </div>
  );
}
