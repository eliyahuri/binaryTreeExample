/**
 * Union type representing the kinds of binary trees supported.
 */
export type TreeKind = "BST" | "AVL" | "RBT" | "Binomial";

/**
 * Enumeration of node colors for red-black trees.
 */
export enum Color {
  RED = "red",
  BLACK = "black",
}

/**
 * Represents a node in a binary tree for visualization.
 */
export interface TreeNode {
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
export function createNode(value: number, color: Color): TreeNode {
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
/**
 * Represents a node in a binomial heap structure.
 */
export interface BinomialNode {
  id: string;
  key: number;
  degree: number;
  parent: BinomialNode | null;
  child: BinomialNode | null;
  sibling: BinomialNode | null;
  x?: number;
  y?: number;
}

export function createBinomialNode(key: number): BinomialNode {
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

/**
 * Unites two binomial heaps and returns the new heap head.
 * @param h1 - The first binomial heap head.
 * @param h2 - The second binomial heap head.
 * @returns The head of the combined binomial heap.
 */
export function binomialUnion(
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

/**
 * Inserts a key into a binomial heap.
 * @param head - The current heap head.
 * @param key - The key to insert into the heap.
 * @returns The new heap head after insertion.
 */
export function binomialInsert(
  head: BinomialNode | null,
  key: number
): BinomialNode | null {
  const node = createBinomialNode(key);
  return binomialUnion(head, node) || null;
}

/**
 * Computes layout positions for each tree in a binomial forest for rendering.
 * @param head - The head of the binomial forest.
 */
export function layoutBinomialForest(head: BinomialNode | null) {
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

const H_GAP = 70;
const V_GAP = 90;
/**
 * Computes x and y positions for nodes in a binary tree.
 * @param root - The root node of the binary tree.
 */
export function layoutTree(root: TreeNode | null) {
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

/**
 * Inserts a value into a binary search tree and returns the new root.
 * @param root - The root of the BST.
 * @param value - The numeric value to insert.
 * @returns The root of the BST after insertion.
 */
export function bstInsert(root: TreeNode | null, value: number): TreeNode {
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

/**
 * Inserts a value into an AVL tree and rebalances it.
 * @param root - The root of the AVL tree.
 * @param value - The value to insert.
 * @returns The new root of the AVL tree.
 */
export function avlInsert(root: TreeNode | null, value: number): TreeNode {
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

/**
 * Inserts a value into a Red-Black tree and rebalances it.
 * @param root - The root of the Red-Black tree.
 * @param value - The value to insert.
 * @returns The new root of the Red-Black tree.
 */
export function rbtInsert(root: TreeNode | null, value: number): TreeNode {
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

/**
 * Deletes a value from a binary search tree and returns the new root.
 * @param root - The root of the BST.
 * @param value - The value to delete.
 * @returns The root of the BST after deletion, or null if tree is empty.
 */
export function bstDelete(
  root: TreeNode | null,
  value: number
): TreeNode | null {
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

// Node radius constant for layout calculations
export const NODE_R = 18;
