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

/**
 * Creates a node for a binomial tree/heap.
 *
 * @param key - Numeric key associated with the node.
 * @returns Newly created binomial node.
 */
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

/**
 * Merges two binomial heap root lists ordered by degree.
 */
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

/**
 * Links two binomial trees of the same degree, maintaining min-heap property.
 * The node with smaller key becomes the parent.
 */
function linkTrees(y: BinomialNode, z: BinomialNode): BinomialNode {
  // Ensure min-heap property: smaller key becomes parent
  if (y.key > z.key) {
    const temp = y;
    y = z;
    z = temp;
  }
  
  z.parent = y;
  z.sibling = y.child;
  y.child = z;
  y.degree++;
  return y;
}

/**
 * Unites two binomial heaps and returns the new heap head.
 * Ensures proper consolidation and min-heap property.
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
      // Case 1: Degrees don't match or there are three trees with same degree
      prev = curr;
      curr = next;
    } else {
      // Case 2: Link trees with same degree, maintaining min-heap property
      const linkedRoot = linkTrees(curr!, next);
      
      if (prev) {
        prev.sibling = linkedRoot;
      } else {
        head = linkedRoot;
      }
      
      linkedRoot.sibling = next.sibling;
      curr = linkedRoot;
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
 * Ensures proper spacing and visual separation between trees of different degrees.
 * @param head - The head of the binomial forest.
 */
export function layoutBinomialForest(head: BinomialNode | null) {
  let x = 100; // Start with padding from left edge
  const y = 80; // Top padding
  let curr = head;
  
  while (curr) {
    const treeWidth = calculateTreeWidth(curr);
    layoutBinomialTree(curr, x + treeWidth / 2, y);
    x += treeWidth + 60; // Add spacing between trees
    curr = curr.sibling;
  }
}

/**
 * Calculates the width needed for a binomial tree layout.
 * @param node - The root of the binomial tree.
 * @returns The width needed for the tree.
 */
function calculateTreeWidth(node: BinomialNode): number {
  if (node.degree === 0) return 40;
  return Math.max(80 * node.degree, 100);
}

/**
 * Recursively computes layout coordinates for nodes in a single binomial tree.
 * Uses proper binomial tree structure for positioning.
 *
 * @param node - Root node of the binomial tree.
 * @param x - Starting x-coordinate for this subtree.
 * @param y - Starting y-coordinate for this subtree.
 */
function layoutBinomialTree(node: BinomialNode, x: number, y: number) {
  node.x = x;
  node.y = y;
  
  if (node.degree === 0) return;
  
  let child = node.child;
  let childIndex = 0;
  const totalChildren = node.degree;
  const childSpacing = 70;
  const startX = x - ((totalChildren - 1) * childSpacing) / 2;
  
  while (child) {
    const childX = startX + childIndex * childSpacing;
    const childY = y + 90; // Vertical spacing between levels
    layoutBinomialTree(child, childX, childY);
    child = child.sibling;
    childIndex++;
  }
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
 * Finds and returns the minimum key node in a binomial heap.
 * @param head - The head of the binomial forest.
 * @returns The node with minimum key or null if heap is empty.
 */
export function binomialFindMin(head: BinomialNode | null): BinomialNode | null {
  if (!head) return null;
  
  let minNode = head;
  let curr = head.sibling;
  
  while (curr) {
    if (curr.key < minNode.key) {
      minNode = curr;
    }
    curr = curr.sibling;
  }
  
  return minNode;
}

/**
 * Extracts the minimum key from a binomial heap.
 * @param head - The head of the binomial forest.
 * @returns A tuple of [new heap head, extracted minimum node] or [null, null] if heap is empty.
 */
export function binomialExtractMin(
  head: BinomialNode | null
): [BinomialNode | null, BinomialNode | null] {
  if (!head) return [null, null];
  
  // Find minimum node and its predecessor
  let minNode = head;
  let minPrev: BinomialNode | null = null;
  let prev: BinomialNode | null = null;
  let curr: BinomialNode | null = head;
  
  while (curr) {
    if (curr.key < minNode.key) {
      minNode = curr;
      minPrev = prev;
    }
    prev = curr;
    curr = curr.sibling;
  }
  
  // Remove minimum node from root list
  if (minPrev) {
    minPrev.sibling = minNode.sibling;
  } else {
    head = minNode.sibling;
  }
  
  // Reverse the children list of the minimum node to create a new heap
  let newHead: BinomialNode | null = null;
  let child = minNode.child;
  
  while (child) {
    const next = child.sibling;
    child.sibling = newHead;
    child.parent = null;
    newHead = child;
    child = next;
  }
  
  // Merge the original heap (without min) with the children heap
  const mergedHead = binomialUnion(head, newHead);
  
  return [mergedHead, minNode];
}

/**
 * Radius of rendered nodes used when calculating view box padding.
 */
export const NODE_R = 18;
