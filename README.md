# Binary Tree Visualiser

This repository contains the source for the
[online binary tree visualiser](https://binary-tree-example.vercel.app/).
It allows you to interactively build and explore several types of
binary trees directly in the browser.

## Features

- Visualise **BST**, **AVL**, **Red-Black**, and **Binomial** trees.
- Insert and delete values to see how each tree structure changes.
- Animated transitions make rotations and rebalancing easy to follow.
- Code examples are available in multiple programming languages with a
  convenient copy button.

A binary tree is a hierarchical data structure in which each node has at most two children, referred to as the left child and the right child.

## Key Concepts

- **Node**: The basic unit of a binary tree containing a value and pointers to its children.
- **Root**: The topmost node of the tree.
- **Leaf**: A node with no children.
- **Subtree**: A tree consisting of a node and its descendants.

## Types of Binary Trees

- **Full Binary Tree**: Every node has 0 or 2 children.
- **Complete Binary Tree**: All levels are completely filled except possibly the last level, which is filled from left to right.
- **Perfect Binary Tree**: All internal nodes have two children and all leaves are at the same level.
- **Balanced Binary Tree**: The height of the left and right subtrees of any node differ by at most one.

## Common Operations

- **Insertion**: Adding a node to the tree.
- **Deletion**: Removing a node from the tree.
- **Traversal**: Visiting all the nodes in a specific order (e.g., in-order, pre-order, post-order).

## Example

Here is a simple example of a binary tree:

```
    1
   / \
  2   3
 / \
4   5
```

In this example:

- `1` is the root.
- `2` and `3` are children of `1`.
- `4` and `5` are children of `2`.

## Running Locally

1. Install dependencies using `pnpm install`.
2. Start the development server with `pnpm dev` and open the printed URL in your browser.

The project uses [Vite](https://vitejs.dev/) and React. A production build can be generated with `pnpm build`.

## Applications

Binary trees are used in various applications such as expression parsing, searching algorithms, and hierarchical data representation.

## References

- [Wikipedia: Binary Tree](https://en.wikipedia.org/wiki/Binary_tree)
- [GeeksforGeeks: Binary Tree](https://www.geeksforgeeks.org/binary-tree-data-structure/)

## Documentation Style

The source code is thoroughly documented using JSDoc-style comments. When contributing, please keep these annotations up to date.

## Contributing

1. Install dependencies with `pnpm install`.
2. Ensure code passes lint checks using `npm run lint`.
3. Submit a pull request with a clear description of your changes.
