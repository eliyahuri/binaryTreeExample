import { describe, it, expect } from 'vitest';
import { createNode, Color, bstInsert, avlInsert, rbtInsert } from './tree';

// helper to reset global counter? It's not exported. Maybe we can't test unique id easily.
// Instead we can create two nodes and check that ids are unique and start with 'node-'.

describe('createNode', () => {
  it('creates a node with unique id and given value', () => {
    const n1 = createNode(1, Color.RED);
    const n2 = createNode(2, Color.BLACK);
    expect(n1.id).not.toBe(n2.id);
    expect(n1.value).toBe(1);
    expect(n1.color).toBe(Color.RED);
    expect(n2.color).toBe(Color.BLACK);
  });
});

describe('bstInsert', () => {
  it('inserts values maintaining BST property', () => {
    let root = createNode(5, Color.BLACK);
    root = bstInsert(root, 3);
    root = bstInsert(root, 7);
    expect(root.left?.value).toBe(3);
    expect(root.right?.value).toBe(7);
  });
});

describe('avlInsert', () => {
  it('rebalances the tree', () => {
    let root = null;
    root = avlInsert(root, 3);
    root = avlInsert(root, 2);
    root = avlInsert(root, 1);
    expect(root?.value).toBe(2);
    expect(root?.left?.value).toBe(1);
    expect(root?.right?.value).toBe(3);
  });
});

describe('rbtInsert', () => {
  it('keeps root black after insertions', () => {
    let root = null;
    [5, 3, 7].forEach(v => {
      root = rbtInsert(root, v);
    });
    expect(root?.color).toBe(Color.BLACK);
  });
});
