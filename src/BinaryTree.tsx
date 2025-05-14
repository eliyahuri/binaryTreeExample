import { useEffect, useState } from "react";
import Controls from "./BinaryTree/components/Controls";
import { TreeSVG } from "./BinaryTree/components/TreeSVG";
import {
  avlInsert,
  binomialInsert,
  BinomialNode,
  bstDelete,
  bstInsert,
  layoutBinomialForest,
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
  const [binomialHead, setBinomialHead] = useState<BinomialNode | null>(null);
  const [input, setInput] = useState("");
  const [viewBox, setViewBox] = useState("0 0 800 500");

  useEffect(() => {
    if (kind === "Binomial") {
      // Only layout when there's a binomial forest to display
      if (!binomialHead) return;
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
      // Shift down so tree isn't clipped at top
      const yShift = -minY + padding;
      const shiftTree = (node: BinomialNode | null) => {
        if (!node) return;
        node.y! += yShift;
        let child = node.child;
        while (child) {
          shiftTree(child);
          child = child.sibling;
        }
        shiftTree(node.sibling);
      };
      shiftTree(binomialHead);
      minY += yShift;
      maxY += yShift;

      const viewX = minX - padding;
      const viewY = 0;
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

  return (
    <div className="flex flex-col items-center p-2 sm:p-4 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-center">
        Tree Visualiser
      </h1>
      <Controls
        kind={kind}
        setKind={setKind}
        input={input}
        setInput={setInput}
        onInsert={insert}
        onRemove={remove}
      />
      <div className="w-full border rounded shadow-inner overflow-hidden">
        <TreeSVG
          kind={kind}
          root={root}
          binomialHead={binomialHead}
          viewBox={viewBox}
        />
      </div>
    </div>
  );
}
