import { describe, it, expect } from "vitest";
import { layoutTree, bstInsert } from "../tree";
import type { TreeNode } from "../tree";

// Binary tree layout

describe("Binary tree layout positions", () => {
  it("assigns x and y for simple tree", () => {
    // Build BST 1 -> 2 -> 3 (right-skewed)
    let root: TreeNode | null = null;
    [1, 2, 3].forEach((v) => {
      root = bstInsert(root, v);
    });
    // layoutTree mutates in place
    layoutTree(root);
    // root depth = 0
    expect(root!.y).toBe(0);
    // inorder order x should increase
    const xs: number[] = [];
    const collectX = (n: TreeNode | null) => {
      if (!n) return;
      collectX(n.left);
      xs.push(n.x);
      collectX(n.right);
    };
    collectX(root);
    expect(xs).toEqual([...xs].sort((a, b) => a - b));
    // y positions for nodes are 0, 90, 180
    const ys: number[] = [];
    const collectY = (n: TreeNode | null) => {
      if (!n) return;
      collectY(n.left);
      ys.push(n.y);
      collectY(n.right);
    };
    collectY(root);
    expect(ys).toEqual([0, 90, 180]);
  });
});
