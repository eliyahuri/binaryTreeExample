import { describe, it, expect } from "vitest";
import { bstInsert, bstDelete, avlInsert, rbtInsert } from "./tree";
import type { TreeNode } from "./tree";

function inorder(root: TreeNode | null): number[] {
  if (!root) return [];
  return [...inorder(root.left), root.value, ...inorder(root.right)];
}

describe("Binary Search Tree operations", () => {
  it("inserts and deletes correctly in BST", () => {
    let root: TreeNode | null = null;
    [5, 3, 7, 2, 4, 6, 8].forEach((v) => {
      root = bstInsert(root, v);
    });
    expect(inorder(root)).toEqual([2, 3, 4, 5, 6, 7, 8]);
    // Delete leaf
    root = bstDelete(root, 2);
    expect(inorder(root)).toEqual([3, 4, 5, 6, 7, 8]);
    // Delete root
    root = bstDelete(root, 5);
    expect(inorder(root)).toEqual([3, 4, 6, 7, 8]);
  });
});

describe("AVL Tree operations", () => {
  it("balances tree on skewed insert", () => {
    let root: TreeNode | null = null;
    [3, 2, 1].forEach((v) => {
      root = avlInsert(root, v);
    });
    // After inserts, root should be 2 for LL rotation
    expect(root!.value).toBe(2);
    // Inorder still sorted
    expect(inorder(root)).toEqual([1, 2, 3]);
  });
});

describe("Red-Black Tree operations", () => {
  it("inserts and maintains root black", () => {
    let root: TreeNode | null = null;
    [10, 20, 30, 15, 25].forEach((v) => {
      root = rbtInsert(root, v);
      // root always returned as non-null
      expect(root).not.toBeNull();
      // root color must be black after each insert
      expect(root?.color).toBe("black");
      // inorder yields sorted list
      expect(inorder(root)).toEqual(
        [...new Set(inorder(root))].sort((a, b) => a - b)
      );
    });
  });
});
