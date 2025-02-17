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
    // Use responsive padding and max-width
    <div className="w-full max-w-3xl mx-auto px-4 py-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center">
        What is a Binary Tree?
      </h2>
      <p className="mb-3 text-gray-700 text-sm sm:text-base">
        A binary tree is a hierarchical data structure where each node has at
        most two children: a left child and a right child. The tree starts from
        a root node and extends downward through connected nodes.
      </p>
      <p className="mb-2 text-gray-700 text-sm sm:text-base">
        Binary trees have many applications in computer science, including:
      </p>
      <ul className="list-disc ml-5 mb-3 text-gray-700 text-sm sm:text-base">
        <li>Binary Search Trees (BSTs) for efficient searching and sorting</li>
        <li>Expression Trees to represent mathematical expressions</li>
        <li>Huffman Trees for data compression algorithms</li>
        <li>Priority Queues and Heaps for scheduling and optimization</li>
      </ul>
      <p className="mb-2 text-gray-700 text-sm sm:text-base">
        Key operations on binary trees include:
      </p>
      <ul className="list-disc ml-5 mb-4 text-gray-700 text-sm sm:text-base">
        <li>Insertion: Adding nodes</li>
        <li>Deletion: Removing nodes</li>
        <li>
          Traversal: Visiting nodes in different orders (in-order, pre-order,
          post-order)
        </li>
        <li>Searching: Finding specific values</li>
        <li>Balancing: Maintaining optimal tree structure</li>
      </ul>
      <p className="mb-6 text-gray-700 text-sm sm:text-base">
        In balanced binary trees, operations like insertion, deletion, and
        search can often be performed in O(log n) time, making them efficient
        for large datasets.
      </p>
      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3">
        Code Examples:
      </h3>
      <div className="mb-4">
        <label
          htmlFor="language"
          className="block mb-2 font-medium text-sm sm:text-base"
        >
          Select Language:
        </label>
        <select
          id="language"
          className="p-2 border border-gray-300 rounded w-full sm:w-64 text-sm"
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
      <div className="mb-2 overflow-x-auto">
        <pre className="bg-gray-900 text-green-300 p-4 rounded text-xs sm:text-sm md:text-base overflow-x-auto">
          <code>{examples[selectedLanguage]}</code>
        </pre>
      </div>
    </div>
  );
}
