import { describe, it, expect } from "vitest";
import {
  createBinomialNode,
  binomialUnion,
  binomialInsert,
  binomialFindMin,
  binomialExtractMin,
} from "./tree";
import { bstInsert, bstDelete, avlInsert, rbtInsert } from "./tree";
import type { BinomialNode, TreeNode } from "./tree";

function inorder(root: TreeNode | null): number[] {
  if (!root) return [];
  return [...inorder(root.left), root.value, ...inorder(root.right)];
}

describe("Binomial Heap operations", () => {
  it("creates a single-node B0 tree", () => {
    const node = createBinomialNode(10);
    expect(node.degree).toBe(0);
    expect(node.key).toBe(10);
    expect(node.parent).toBeNull();
  });

  it("merges two B0 trees into B1", () => {
    const a = createBinomialNode(5);
    const b = createBinomialNode(3);
    const merged = binomialUnion(a, b) as BinomialNode;
    // After union, head degree should be 1
    expect(merged.degree).toBe(1);
    // Min-heap: root key should be 3
    expect(merged.key).toBe(3);
    // Child should exist with key 5
    expect(merged.child?.key).toBe(5);
    expect(merged.child?.parent).toBe(merged);
  });

  it("inserts multiple keys and finds min correctly", () => {
    let heap = null as BinomialNode | null;
    [7, 1, 9, 2, 5].forEach((key) => {
      heap = binomialInsert(heap, key);
    });
    const minNode = binomialFindMin(heap);
    expect(minNode).not.toBeNull();
    expect(minNode?.key).toBe(1);
  });

  it("extracts the minimum node and updates heap", () => {
    let heap = null as BinomialNode | null;
    [4, 8, 6, 1, 3].forEach((key) => {
      heap = binomialInsert(heap, key);
    });
    const [newHeap, minNode] = binomialExtractMin(heap);
    expect(minNode).not.toBeNull();
    expect(minNode?.key).toBe(1);
    // Ensure new heap does not contain the extracted key
    const min2 = binomialFindMin(newHeap);
    expect(min2?.key).not.toBe(1);
  });
});

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
