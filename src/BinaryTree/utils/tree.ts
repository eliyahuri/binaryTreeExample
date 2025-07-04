/**
 * Union type representing the kinds of binary trees supported.
 */
export type TreeKind = "BST" | "AVL" | "RBT" | "BH"; // Added Binomial Heap option

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

/**
 * Global counter used to generate unique node identifiers.
 */
let nodeIdCounter = 0;

/**
 * Creates a {@link TreeNode} with default positional values.
 *
 * @param value - Numeric value to store in the node.
 * @param color - Initial color of the node.
 * @returns Newly created tree node instance.
 */
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

/** Horizontal spacing between tree nodes when laid out. */
const H_GAP = 70;
/** Vertical spacing between tree levels when laid out. */
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

/** Checks whether a node is red in a Red-Black tree. */
const isRed = (n: TreeNode | null) => n !== null && n.color === Color.RED;
/**
 * Recursively computes the height of a tree.
 * @param n - Node to measure from.
 */
const height = (n: TreeNode | null): number =>
  n ? 1 + Math.max(height(n.left), height(n.right)) : 0;
/**
 * Calculates the balance factor of a node used in AVL rebalancing.
 */
const balanceFactor = (n: TreeNode | null) =>
  n ? height(n.left) - height(n.right) : 0;

/**
 * Performs a left rotation around the given node.
 */
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

/**
 * Performs a right rotation around the given node.
 */
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

/**
 * Radius of rendered nodes used when calculating view box padding.
 */
export const NODE_R = 18;
