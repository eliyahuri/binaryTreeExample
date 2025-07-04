export interface BHNode {
  id: string;
  key: number;
  children: BHNode[];
  order: number;
  parent: BHNode | null;
  x: number;
  y: number;
}

let nodeCounter = 0;
/**
 * Creates a new Binomial Heap node with default values.
 */
export function createBHNode(key: number): BHNode {
  return {
    id: `bh-${nodeCounter++}`,
    key,
    children: [],
    order: 0,
    parent: null,
    x: 0,
    y: 0,
  };
}

/**
 * Represents a Binomial Heap.
 */
export interface BinomialHeap {
  roots: BHNode[];
}

/**
 * Creates an empty Binomial Heap.
 */
export function bhCreate(): BinomialHeap {
  return { roots: [] };
}

/**
 * Links two Binomial Trees of the same order, making the smaller key the parent.
 */
function linkTrees(b1: BHNode, b2: BHNode): BHNode {
  if (b1.key <= b2.key) {
    b2.parent = b1;
    b1.children.unshift(b2);
    b1.order += 1;
    return b1;
  } else {
    b1.parent = b2;
    b2.children.unshift(b1);
    b2.order += 1;
    return b2;
  }
}

/**
 * Merges two Binomial Heaps into one.
 */
export function bhMerge(h1: BinomialHeap, h2: BinomialHeap): BinomialHeap {
  const roots = [...h1.roots, ...h2.roots].sort((a, b) => a.order - b.order);
  const result: BHNode[] = [];
  for (let i = 0; i < roots.length; i++) {
    let curr = roots[i];
    const next = roots[i + 1];
    if (next && curr.order === next.order) {
      curr = linkTrees(curr, next);
      i++;
      roots.splice(i, 0, curr);
    } else {
      result.push(curr);
    }
  }
  return { roots: result };
}

/**
 * Inserts a key into the Binomial Heap.
 */
export function bhInsert(heap: BinomialHeap, key: number): BinomialHeap {
  const node = createBHNode(key);
  const newHeap = { roots: [node] };
  return bhMerge(heap, newHeap);
}

/**
 * Finds the node with the minimum key among the roots.
 */
export function bhFindMin(heap: BinomialHeap): BHNode | null {
  if (heap.roots.length === 0) return null;
  return heap.roots.reduce(
    (min, n) => (n.key < min.key ? n : min),
    heap.roots[0]
  );
}

/**
 * Extracts (removes) the minimum key node from the heap and restructures it.
 */
export function bhExtractMin(heap: BinomialHeap): BinomialHeap {
  const minNode = bhFindMin(heap);
  if (!minNode) return heap;
  const newRoots = heap.roots.filter((n) => n !== minNode);
  const childRoots = minNode.children
    .map((c) => {
      c.parent = null;
      return c;
    })
    .reverse();
  const newHeap = { roots: newRoots };
  const childHeap = { roots: childRoots };
  return bhMerge(newHeap, childHeap);
}

/**
 * Layout positions for Binomial Heap nodes for SVG rendering.
 */
export function layoutBH(heap: BinomialHeap) {
  const H_GAP = 70;
  const V_GAP = 90;
  heap.roots.forEach((root, idx) => {
    const offsetX = idx * (H_GAP * Math.pow(2, root.order) + H_GAP);
    let count = 0;
    function dfs(node: BHNode, depth: number) {
      node.x = offsetX + count * H_GAP;
      node.y = depth * V_GAP;
      count++;
      node.children.forEach((child) => dfs(child, depth + 1));
    }
    dfs(root, 0);
  });
}
