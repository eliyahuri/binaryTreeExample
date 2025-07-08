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

/**
 * BinaryTree component renders the interactive tree visualizer UI.
 * @returns JSX element containing controls and SVG visualization for binary/binomial trees.
 */
export default function BinaryTree() {
  const [kind, setKind] = useState<TreeKind>("BST");
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [input, setInput] = useState("");
  const [viewBox, setViewBox] = useState("0 0 800 500");

  useEffect(() => {
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
  }, [root, kind]);

  const handleInsert = () => {
    const val = parseInt(input, 10);
    if (isNaN(val)) return;

    switch (kind) {
      case "BST":
        setRoot(bstInsert(root, val));
        break;
      case "AVL":
        setRoot(avlInsert(root, val));
        break;
      case "RBT":
        setRoot(rbtInsert(root, val));
        break;
      default:
        break;
    }
    setInput("");
  };

  const handleDelete = () => {
    const val = parseInt(input, 10);
    if (isNaN(val)) return;

    switch (kind) {
      case "BST":
        setRoot(bstDelete(root, val));
        break;
      case "AVL":
        // setRoot(avlDelete(root, val));
        break;
      case "RBT":
        // setRoot(rbtDelete(root, val));
        break;
      default:
        break;
    }
    setInput("");
  };

  const handleRandom = () => {
    const val = Math.floor(Math.random() * 100);
    switch (kind) {
      case "BST":
        setRoot(bstInsert(root, val));
        break;
      case "AVL":
        setRoot(avlInsert(root, val));
        break;
      case "RBT":
        setRoot(rbtInsert(root, val));
        break;
      default:
        break;
    }
  };

  const handleClear = () => {
    setRoot(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-full w-full flex-col items-center justify-center gap-4 p-4"
    >
      <Controls
        kind={kind}
        setKind={setKind}
        input={input}
        setInput={setInput}
        onInsert={handleInsert}
        onDelete={handleDelete}
        onRandom={handleRandom}
        onClear={handleClear}
      />
      <TreeSVG root={root} viewBox={viewBox} />
    </motion.div>
  );
}
