import { useState } from "react";

export function WhatIsBinaryTree() {
  const [selectedLanguage, setSelectedLanguage] = useState<
    "Java" | "CSharp" | "JavaScript" | "TypeScript" | "Python"
  >("Java");

  const examples: {
    [key in "Java" | "CSharp" | "JavaScript" | "TypeScript" | "Python"]: string;
  } = {
    Java: `class Node {
  int value;
  Node left, right;

  Node(int value) {
    this.value = value;
    left = right = null;
  }
}

public class BinaryTree {
  Node root;

  BinaryTree(int value) {
    root = new Node(value);
  }

  void insert(int value) {
    root = insertRec(root, value);
  }

  Node insertRec(Node root, int value) {
    if (root == null) {
      root = new Node(value);
      return root;
    }
    if (value < root.value)
      root.left = insertRec(root.left, value);
    else if (value > root.value)
      root.right = insertRec(root.right, value);
    return root;
  }

  public static void main(String[] args) {
    BinaryTree tree = new BinaryTree(1);
    tree.insert(2);
    tree.insert(3);
  }
}`,
    CSharp: `class Node {
  public int value;
  public Node left, right;

  public Node(int value) {
    this.value = value;
    left = right = null;
  }
}

class BinaryTree {
  public Node root;

  public BinaryTree(int value) {
    root = new Node(value);
  }

  public void Insert(int value) {
    root = InsertRec(root, value);
  }

  private Node InsertRec(Node root, int value) {
    if (root == null) {
      root = new Node(value);
      return root;
    }
    if (value < root.value)
      root.left = InsertRec(root.left, value);
    else if (value > root.value)
      root.right = InsertRec(root.right, value);
    return root;
  }

  static void Main(string[] args) {
    BinaryTree tree = new BinaryTree(1);
    tree.Insert(2);
    tree.Insert(3);
  }
}`,
    JavaScript: `class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor(value) {
    this.root = new Node(value);
  }

  insert(value) {
    this.root = this.insertRec(this.root, value);
  }

  insertRec(root, value) {
    if (root === null) {
      root = new Node(value);
      return root;
    }
    if (value < root.value)
      root.left = this.insertRec(root.left, value);
    else if (value > root.value)
      root.right = this.insertRec(root.right, value);
    return root;
  }
}

const tree = new BinaryTree(1);
tree.insert(2);
tree.insert(3);`,
    TypeScript: `class Node {
  value: number;
  left: Node | null;
  right: Node | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  root: Node;

  constructor(value: number) {
    this.root = new Node(value);
  }

  insert(value: number) {
    this.root = this.insertRec(this.root, value);
  }

  insertRec(root: Node | null, value: number): Node {
    if (root === null) {
      root = new Node(value);
      return root;
    }
    if (value < root.value)
      root.left = this.insertRec(root.left, value);
    else if (value > root.value)
      root.right = this.insertRec(root.right, value);
    return root;
  }
}

const tree = new BinaryTree(1);
tree.insert(2);
tree.insert(3);`,
    Python: `class Node:
  def __init__(self, value):
    self.value = value
    self.left = None
    self.right = None

class BinaryTree:
  def __init__(self, value):
    self.root = Node(value)

  def insert(self, value):
    self.root = self._insert(self.root, value)

  def _insert(self, root, value):
    if root is None:
      return Node(value)
    if value < root.value:
      root.left = self._insert(root.left, value)
    else:
      root.right = self._insert(root.right, value)
    return root

tree = BinaryTree(1)
tree.insert(2)
tree.insert(3)`,
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">What is a Binary Tree?</h2>
      <p className="mb-2">
        A binary tree is a hierarchical data structure where each node can have
        at most two children, typically referred to as the left child and right
        child. Each node contains a value and pointers to its children.
      </p>
      <p className="mb-2">
        The topmost node is called the root, nodes with no children are called
        leaves, and nodes with at least one child are called internal nodes. The
        connection between nodes is called an edge.
      </p>
      <p className="mb-2">
        Binary trees are fundamental in computer science and have numerous
        applications:
      </p>
      <ul className="list-disc ml-6 mb-2">
        <li>Binary Search Trees (BST) - For efficient searching and sorting</li>
        <li>Expression Trees - For representing mathematical expressions</li>
        <li>Huffman Coding Trees - For data compression</li>
        <li>
          Priority Queues and Heaps - For efficient priority-based operations
        </li>
      </ul>
      <p className="mb-2">Common operations on binary trees include:</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Insertion - Adding new nodes</li>
        <li>Deletion - Removing existing nodes</li>
        <li>
          Traversal - Visiting nodes in different orders (in-order, pre-order,
          post-order)
        </li>
        <li>Searching - Finding specific values</li>
        <li>Balancing - Maintaining optimal tree structure</li>
      </ul>
      <p className="mb-4">
        The efficiency of binary tree operations typically depends on the tree's
        height. In a balanced binary tree, most operations have a time
        complexity of O(log n), making them highly efficient for large datasets.
      </p>
      <h3 className="text-xl font-semibold mb-2">Examples:</h3>
      <div className="mb-4">
        <label htmlFor="language" className="block mb-2 font-semibold">
          Select Language:
        </label>
        <select
          id="language"
          className="p-2 bg-white border rounded"
          value={selectedLanguage}
          onChange={(e) =>
            setSelectedLanguage(
              e.target.value as
                | "Java"
                | "CSharp"
                | "JavaScript"
                | "TypeScript"
                | "Python"
            )
          }
        >
          <option value="Java">Java</option>
          <option value="CSharp">C#</option>
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
          <option value="Python">Python</option>
        </select>
      </div>
      <div className="mb-4">
        <pre className="bg-gray-200 p-2 rounded">
          <code>{examples[selectedLanguage]}</code>
        </pre>
      </div>
    </div>
  );
}
