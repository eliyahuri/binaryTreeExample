import type { TreeKind } from "../BinaryTree/utils/tree";
import type { Languages } from "../types/language";

// Nested object for code examples by language and tree type
const codeTemplates: Record<Languages, Record<TreeKind, string>> = {
  Java: {
    BST: `// Node class represents each node in the tree
class Node {
    int value; // Value of the node
    Node left, right; // Left and right children

    Node(int value) { this.value = value; } // Constructor
}

// BinaryTree class manages the tree
public class BinaryTree {
    Node root; // Root node
    BinaryTree(int value) { root = new Node(value); } // Constructor

    void insert(int value) { root = insertRec(root, value); } // Insert method

    Node insertRec(Node root, int value) { // Recursive insert helper
      if (root == null) return new Node(value); // Insert at null position
      if (value < root.value) root.left  = insertRec(root.left, value); // Go left
      else if (value > root.value) root.right = insertRec(root.right, value); // Go right
      return root; // Return updated root
    }

    public static void main(String[] args) {
      BinaryTree t = new BinaryTree(1); t.insert(2); t.insert(3); // Example usage
    }
  }`,
    AVL: `// Node class represents each node in the AVL tree
class Node {
    int value; // Value of the node
    int height; // Height of the node
    Node left, right; // Left and right children
    Node(int v) {
        value = v; // Set value
        height = 1; // Initial height is 1
    }
}

// AVLTree class manages the AVL tree
public class AVLTree {
    Node root; // Root node

    int height(Node n) {
        return n == null ? 0 : n.height; // Return height or 0 if null
    }

    int balance(Node n) {
        return n == null ? 0 : height(n.left) - height(n.right); // Balance factor
    }

    Node rotateRight(Node y) {
        Node x = y.left; // Left child
        Node T2 = x.right; // Right subtree of x
        x.right = y; // Perform rotation
        y.left = T2; // Update left child
        y.height = Math.max(height(y.left), height(y.right)) + 1; // Update height
        x.height = Math.max(height(x.left), height(x.right)) + 1; // Update height
        return x; // Return new root
    }

    Node rotateLeft(Node x) {
        Node y = x.right; // Right child
        Node T2 = y.left; // Left subtree of y
        y.left = x; // Perform rotation
        x.right = T2; // Update right child
        x.height = Math.max(height(x.left), height(x.right)) + 1; // Update height
        y.height = Math.max(height(y.left), height(y.right)) + 1; // Update height
        return y; // Return new root
    }

    Node insert(Node node, int key) {
        if (node == null) {
            return new Node(key); // Insert new node
        }
        if (key < node.value) {
            node.left = insert(node.left, key); // Insert left
        } else if (key > node.value) {
            node.right = insert(node.right, key); // Insert right
        } else {
            return node; // Duplicate keys not allowed
        }
        node.height = 1 + Math.max(height(node.left), height(node.right)); // Update height
        int bal = balance(node); // Get balance factor
        if (bal > 1 && key < node.left.value) {
            return rotateRight(node); // Left Left Case
        }
        if (bal < -1 && key > node.right.value) {
            return rotateLeft(node); // Right Right Case
        }
        if (bal > 1 && key > node.left.value) {
            node.left = rotateLeft(node.left); // Left Right Case
            return rotateRight(node);
        }
        if (bal < -1 && key < node.right.value) {
            node.right = rotateRight(node.right); // Right Left Case
            return rotateLeft(node);
        }
        return node; // Return updated node
    }

    void insert(int key) {
        root = insert(root, key); // Insert key
    }

    public static void main(String[] a) {
        AVLTree t = new AVLTree(); // Create AVL tree
        t.insert(10); // Insert 10
        t.insert(20); // Insert 20
        t.insert(30); // Insert 30
    }
  }`,
    RBT: `// Enum for node color
enum Color {
    RED, // Red color
    BLACK // Black color
}

// Node class for Red-Black tree
class Node {
    int value; // Value of the node
    Color color; // Node color
    Node left, right, parent; // Children and parent
    Node(int v) {
        value = v; // Set value
        color = Color.RED; // New nodes are red
    }
}

// RedBlackTree class manages the tree
public class RedBlackTree {
    Node root; // Root node

    // Left rotate utility
    void rotateLeft(Node x) {
        Node y = x.right; // Right child
        x.right = y.left; // Move y's left subtree
        if (y.left != null) y.left.parent = x; // Update parent
        y.parent = x.parent; // Update parent
        if (x.parent == null) root = y; // Update root
        else if (x == x.parent.left) x.parent.left = y; // Update left child
        else x.parent.right = y; // Update right child
        y.left = x; // Rotate
        x.parent = y; // Update parent
    }

    // Right rotate utility
    void rotateRight(Node y) {
        Node x = y.left; // Left child
        y.left = x.right; // Move x's right subtree
        if (x.right != null) x.right.parent = y; // Update parent
        x.parent = y.parent; // Update parent
        if (y.parent == null) root = x; // Update root
        else if (y == y.parent.left) y.parent.left = x; // Update left child
        else y.parent.right = x; // Update right child
        x.right = y; // Rotate
        y.parent = x; // Update parent
    }

    // Insert a new value
    void insert(int value) {
        Node node = new Node(value); // Create new node
        root = bstInsert(root, node); // BST insert
        fixInsert(node); // Fix Red-Black properties
    }

    // Standard BST insert
    Node bstInsert(Node root, Node node) {
        if (root == null) return node; // Insert at null
        if (node.value < root.value) {
            root.left = bstInsert(root.left, node); // Go left
            root.left.parent = root; // Set parent
        } else if (node.value > root.value) {
            root.right = bstInsert(root.right, node); // Go right
            root.right.parent = root; // Set parent
        }
        return root; // Return updated root
    }

    // Fix Red-Black tree after insert
    void fixInsert(Node k) {
        while (k != root && k.parent.color == Color.RED) {
            if (k.parent == k.parent.parent.left) {
                Node u = k.parent.parent.right; // Uncle
                if (u != null && u.color == Color.RED) {
                    k.parent.color = Color.BLACK; // Case 1
                    u.color = Color.BLACK; // Case 1
                    k.parent.parent.color = Color.RED; // Case 1
                    k = k.parent.parent; // Move up
                } else {
                    if (k == k.parent.right) {
                        k = k.parent; // Case 2
                        rotateLeft(k); // Case 2
                    }
                    k.parent.color = Color.BLACK; // Case 3
                    k.parent.parent.color = Color.RED; // Case 3
                    rotateRight(k.parent.parent); // Case 3
                }
            } else {
                Node u = k.parent.parent.left; // Uncle
                if (u != null && u.color == Color.RED) {
                    k.parent.color = Color.BLACK; // Case 1
                    u.color = Color.BLACK; // Case 1
                    k.parent.parent.color = Color.RED; // Case 1
                    k = k.parent.parent; // Move up
                } else {
                    if (k == k.parent.left) {
                        k = k.parent; // Case 2
                        rotateRight(k); // Case 2
                    }
                    k.parent.color = Color.BLACK; // Case 3
                    k.parent.parent.color = Color.RED; // Case 3
                    rotateLeft(k.parent.parent); // Case 3
                }
            }
        }
        root.color = Color.BLACK; // Root is always black
    }

    public static void main(String[] args) {
        RedBlackTree t = new RedBlackTree(); // Create Red-Black tree
        t.insert(10); // Insert 10
        t.insert(20); // Insert 20
        t.insert(30); // Insert 30
    }
  }`,
    Binomial: `// Binomial Tree Node
class Node {
    int key;
    int degree;
    Node parent, child, sibling;
    Node(int key) {
        this.key = key;
        this.degree = 0;
        this.parent = this.child = this.sibling = null;
    }
}

// Binomial Heap (Forest of Binomial Trees)
public class BinomialHeap {
    Node head;
    // Insert a new key
    void insert(int key) {
        BinomialHeap temp = new BinomialHeap();
        temp.head = new Node(key);
        this.head = union(this, temp);
    }
    // Union operation (simplified)
    Node union(BinomialHeap h1, BinomialHeap h2) {
        // ...merge root lists and link trees of same degree...
        return h1.head != null ? h1.head : h2.head;
    }
    public static void main(String[] args) {
        BinomialHeap heap = new BinomialHeap();
        heap.insert(10);
        heap.insert(20);
    }
  }`,
  },
  CSharp: {
    BST: `// Node class represents each node
class Node {
    public int value; // Value of the node
    public Node left, right; // Left and right children
    public Node(int value) { this.value = value; } // Constructor
}

// BinaryTree class manages the tree
class BinaryTree {
    public Node root; // Root node
    public BinaryTree(int value) { root = new Node(value); } // Constructor
    public void Insert(int value) { root = InsertRec(root, value); } // Insert method

    private Node InsertRec(Node root, int value) { // Recursive insert helper
      if (root == null) return new Node(value); // Insert at null
      if (value < root.value) root.left  = InsertRec(root.left, value); // Go left
      else if (value > root.value) root.right = InsertRec(root.right, value); // Go right
      return root; // Return updated root
    }
    static void Main() {
      var t = new BinaryTree(1); t.Insert(2); t.Insert(3); // Example usage
    }
  }`,
    AVL: `// Node class represents each node in the AVL tree
class Node {
    public int value; // Value of the node
    public int height = 1; // Height of the node
    public Node left, right; // Left and right children
    public Node(int v) {
        value = v; // Set value
    }
}

// AVLTree class manages the AVL tree
class AVLTree {
    Node root; // Root node

    int Height(Node n) => n == null ? 0 : n.height; // Return height or 0 if null
    int Balance(Node n) => n == null ? 0 : Height(n.left) - Height(n.right); // Balance factor

    Node RotateRight(Node y) {
        var x = y.left; // Left child
        var T2 = x.right; // Right subtree of x
        x.right = y; // Perform rotation
        y.left = T2; // Update left child
        y.height = Math.Max(Height(y.left), Height(y.right)) + 1; // Update height
        x.height = Math.Max(Height(x.left), Height(x.right)) + 1; // Update height
        return x; // Return new root
    }

    Node RotateLeft(Node x) {
        var y = x.right; // Right child
        var T2 = y.left; // Left subtree of y
        y.left = x; // Perform rotation
        x.right = T2; // Update right child
        x.height = Math.Max(Height(x.left), Height(x.right)) + 1; // Update height
        y.height = Math.Max(Height(y.left), Height(y.right)) + 1; // Update height
        return y; // Return new root
    }

    Node Insert(Node node, int key) {
        if (node == null) {
            return new Node(key); // Insert new node
        }
        if (key < node.value) {
            node.left = Insert(node.left, key); // Insert left
        } else if (key > node.value) {
            node.right = Insert(node.right, key); // Insert right
        } else {
            return node; // Duplicate keys not allowed
        }
        node.height = 1 + Math.Max(Height(node.left), Height(node.right)); // Update height
        int bal = Balance(node); // Get balance factor
        if (bal > 1 && key < node.left.value) {
            return RotateRight(node); // Left Left Case
        }
        if (bal < -1 && key > node.right.value) {
            return RotateLeft(node); // Right Right Case
        }
        if (bal > 1 && key > node.left.value) {
            node.left = RotateLeft(node.left); // Left Right Case
            return RotateRight(node);
        }
        if (bal < -1 && key < node.right.value) {
            node.right = RotateRight(node.right); // Right Left Case
            return RotateLeft(node);
        }
        return node; // Return updated node
    }

    public void Insert(int key) {
        root = Insert(root, key); // Insert key
    }

    static void Main() {
        var t = new AVLTree(); // Create AVL tree
        t.Insert(10); // Insert 10
        t.Insert(20); // Insert 20
        t.Insert(30); // Insert 30
    }
  }`,
    RBT: `// Enum for node color
enum Color {
    RED, // Red color
    BLACK // Black color
}

// Node class for Red-Black tree
class Node {
    public int value; // Value of the node
    public Color color; // Node color
    public Node left, right, parent; // Children and parent
    public Node(int v) {
        value = v; // Set value
        color = Color.RED; // New nodes are red
    }
}

// RedBlackTree class manages the tree
class RedBlackTree {
    Node root; // Root node

    // Left rotate utility
    void RotateLeft(Node x) {
        Node y = x.right; // Right child
        x.right = y.left; // Move y's left subtree
        if (y.left != null) y.left.parent = x; // Update parent
        y.parent = x.parent; // Update parent
        if (x.parent == null) root = y; // Update root
        else if (x == x.parent.left) x.parent.left = y; // Update left child
        else x.parent.right = y; // Update right child
        y.left = x; // Rotate
        x.parent = y; // Update parent
    }

    // Right rotate utility
    void RotateRight(Node y) {
        Node x = y.left; // Left child
        y.left = x.right; // Move x's right subtree
        if (x.right != null) x.right.parent = y; // Update parent
        x.parent = y.parent; // Update parent
        if (y.parent == null) root = x; // Update root
        else if (y == y.parent.left) y.parent.left = x; // Update left child
        else y.parent.right = x; // Update right child
        x.right = y; // Rotate
        y.parent = x; // Update parent
    }

    // Insert a new value
    public void Insert(int value) {
        Node node = new Node(value); // Create new node
        root = BstInsert(root, node); // BST insert
        FixInsert(node); // Fix Red-Black properties
    }

    // Standard BST insert
    Node BstInsert(Node root, Node node) {
        if (root == null) return node; // Insert at null
        if (node.value < root.value) {
            root.left = BstInsert(root.left, node); // Go left
            root.left.parent = root; // Set parent
        } else if (node.value > root.value) {
            root.right = BstInsert(root.right, node); // Go right
            root.right.parent = root; // Set parent
        }
        return root; // Return updated root
    }

    // Fix Red-Black tree after insert
    void FixInsert(Node k) {
        while (k != root && k.parent.color == Color.RED) {
            if (k.parent == k.parent.parent.left) {
                Node u = k.parent.parent.right; // Uncle
                if (u != null && u.color == Color.RED) {
                    k.parent.color = Color.BLACK; // Case 1
                    u.color = Color.BLACK; // Case 1
                    k.parent.parent.color = Color.RED; // Case 1
                    k = k.parent.parent; // Move up
                } else {
                    if (k == k.parent.right) {
                        k = k.parent; // Case 2
                        RotateLeft(k); // Case 2
                    }
                    k.parent.color = Color.BLACK; // Case 3
                    k.parent.parent.color = Color.RED; // Case 3
                    RotateRight(k.parent.parent); // Case 3
                }
            } else {
                Node u = k.parent.parent.left; // Uncle
                if (u != null && u.color == Color.RED) {
                    k.parent.color = Color.BLACK; // Case 1
                    u.color = Color.BLACK; // Case 1
                    k.parent.parent.color = Color.RED; // Case 1
                    k = k.parent.parent; // Move up
                } else {
                    if (k == k.parent.left) {
                        k = k.parent; // Case 2
                        RotateRight(k); // Case 2
                    }
                    k.parent.color = Color.BLACK; // Case 3
                    k.parent.parent.color = Color.RED; // Case 3
                    RotateLeft(k.parent.parent); // Case 3
                }
            }
        }
        root.color = Color.BLACK; // Root is always black
    }

    static void Main() {
        var t = new RedBlackTree(); // Create Red-Black tree
        t.Insert(10); // Insert 10
        t.Insert(20); // Insert 20
        t.Insert(30); // Insert 30
    }
  }`,
    Binomial: `// Binomial Tree Node
class Node {
    int key;
    int degree;
    Node parent, child, sibling;
    Node(int key) {
        this.key = key;
        this.degree = 0;
        this.parent = this.child = this.sibling = null;
    }
}

// Binomial Heap (Forest of Binomial Trees)
public class BinomialHeap {
    Node head;
    // Insert a new key
    void insert(int key) {
        BinomialHeap temp = new BinomialHeap();
        temp.head = new Node(key);
        this.head = union(this, temp);
    }
    // Union operation (simplified)
    Node union(BinomialHeap h1, BinomialHeap h2) {
        // ...merge root lists and link trees of same degree...
        return h1.head != null ? h1.head : h2.head;
    }
    public static void main(String[] args) {
        BinomialHeap heap = new BinomialHeap();
        heap.insert(10);
        heap.insert(20);
    }
  }`,
  },
  JavaScript: {
    BST: `// Node class for tree nodes
class Node {
    constructor(value){ this.value = value; this.left = this.right = null; } // Initialize value and children
}
// BinaryTree class manages the tree
class BinaryTree {
    constructor(value){ this.root = new Node(value); } // Set root
    insert(value){ this.root = this.#insert(this.root, value); } // Insert method
    #insert(root, value){ // Private recursive insert
      if(!root) return new Node(value); // Insert at null
      if(value < root.value) root.left  = this.#insert(root.left, value); // Go left
      else if(value > root.value) root.right = this.#insert(root.right, value); // Go right
      return root; // Return updated root
    }
}
const t = new BinaryTree(1); t.insert(2); t.insert(3); // Example usage`,
    AVL: `// Node class for AVL tree nodes
class Node {
    constructor(value) {
        this.value = value; // Value of the node
        this.left = null; // Left child
        this.right = null; // Right child
        this.height = 1; // Height of the node
    }
}

// AVLTree class manages the AVL tree
class AVLTree {
    constructor() {
        this.root = null; // Root node
    }
    _h(n) {
        return n ? n.height : 0; // Return height or 0 if null
    }
    _bal(n) {
        return n ? this._h(n.left) - this._h(n.right) : 0; // Balance factor
    }
    _rotRight(y) {
        const x = y.left; // Left child
        const T2 = x.right; // Right subtree of x
        x.right = y; // Perform rotation
        y.left = T2; // Update left child
        y.height = Math.max(this._h(y.left), this._h(y.right)) + 1; // Update height
        x.height = Math.max(this._h(x.left), this._h(x.right)) + 1; // Update height
        return x; // Return new root
    }
    _rotLeft(x) {
        const y = x.right; // Right child
        const T2 = y.left; // Left subtree of y
        y.left = x; // Perform rotation
        x.right = T2; // Update right child
        x.height = Math.max(this._h(x.left), this._h(x.right)) + 1; // Update height
        y.height = Math.max(this._h(y.left), this._h(y.right)) + 1; // Update height
        return y; // Return new root
    }
    _insert(node, key) {
        if (!node) {
            return new Node(key); // Insert new node
        }
        if (key < node.value) {
            node.left = this._insert(node.left, key); // Insert left
        } else if (key > node.value) {
            node.right = this._insert(node.right, key); // Insert right
        } else {
            return node; // Duplicate keys not allowed
        }
        node.height = 1 + Math.max(this._h(node.left), this._h(node.right)); // Update height
        const bal = this._bal(node); // Get balance factor
        if (bal > 1 && key < node.left.value) {
            return this._rotRight(node); // Left Left Case
        }
        if (bal < -1 && key > node.right.value) {
            return this._rotLeft(node); // Right Right Case
        }
        if (bal > 1 && key > node.left.value) {
            node.left = this._rotLeft(node.left); // Left Right Case
            return this._rotRight(node);
        }
        if (bal < -1 && key < node.right.value) {
            node.right = this._rotRight(node.right); // Right Left Case
            return this._rotLeft(node);
        }
        return node; // Return updated node
    }
    insert(key) {
        this.root = this._insert(this.root, key); // Insert key
    }
}
const avl = new AVLTree(); // Create AVL tree
avl.insert(10); // Insert 10
avl.insert(20); // Insert 20
avl.insert(30); // Insert 30`,
    RBT: `const RED = true, BLACK = false; // Node colors

// Node class for Red-Black tree
class Node {
    constructor(value) {
        this.value = value; // Value of the node
        this.color = RED; // New nodes are red
        this.left = null; // Left child
        this.right = null; // Right child
        this.parent = null; // Parent
    }
}

// RedBlackTree class manages the tree
class RedBlackTree {
    constructor() {
        this.root = null; // Root node
    }

    // Left rotate utility
    rotateLeft(x) {
        const y = x.right; // Right child
        x.right = y.left; // Move y's left subtree
        if (y.left) y.left.parent = x; // Update parent
        y.parent = x.parent; // Update parent
        if (!x.parent) this.root = y; // Update root
        else if (x === x.parent.left) x.parent.left = y; // Update left child
        else x.parent.right = y; // Update right child
        y.left = x; // Rotate
        x.parent = y; // Update parent
    }

    // Right rotate utility
    rotateRight(y) {
        const x = y.left; // Left child
        y.left = x.right; // Move x's right subtree
        if (x.right) x.right.parent = y; // Update parent
        x.parent = y.parent; // Update parent
        if (!y.parent) this.root = x; // Update root
        else if (y === y.parent.left) y.parent.left = x; // Update left child
        else y.parent.right = x; // Update right child
        x.right = y; // Rotate
        y.parent = x; // Update parent
    }

    // Insert a new value
    insert(value) {
        const node = new Node(value); // Create new node
        this.root = this.bstInsert(this.root, node); // BST insert
        this.fixInsert(node); // Fix Red-Black properties
    }

    // Standard BST insert
    bstInsert(root, node) {
        if (!root) return node; // Insert at null
        if (node.value < root.value) {
            root.left = this.bstInsert(root.left, node); // Go left
            root.left.parent = root; // Set parent
        } else if (node.value > root.value) {
            root.right = this.bstInsert(root.right, node); // Go right
            root.right.parent = root; // Set parent
        }
        return root; // Return updated root
    }

    // Fix Red-Black tree after insert
    fixInsert(k) {
        while (k !== this.root && k.parent.color === RED) {
            if (k.parent === k.parent.parent.left) {
                const u = k.parent.parent.right; // Uncle
                if (u && u.color === RED) {
                    k.parent.color = BLACK; // Case 1
                    u.color = BLACK; // Case 1
                    k.parent.parent.color = RED; // Case 1
                    k = k.parent.parent; // Move up
                } else {
                    if (k === k.parent.right) {
                        k = k.parent; // Case 2
                        this.rotateLeft(k); // Case 2
                    }
                    k.parent.color = BLACK; // Case 3
                    k.parent.parent.color = RED; // Case 3
                    this.rotateRight(k.parent.parent); // Case 3
                }
            } else {
                const u = k.parent.parent.left; // Uncle
                if (u && u.color === RED) {
                    k.parent.color = BLACK; // Case 1
                    u.color = BLACK; // Case 1
                    k.parent.parent.color = RED; // Case 1
                    k = k.parent.parent; // Move up
                } else {
                    if (k === k.parent.left) {
                        k = k.parent; // Case 2
                        this.rotateRight(k); // Case 2
                    }
                    k.parent.color = BLACK; // Case 3
                    k.parent.parent.color = RED; // Case 3
                    this.rotateLeft(k.parent.parent); // Case 3
                }
            }
        }
        this.root.color = BLACK; // Root is always black
    }
}

const rbt = new RedBlackTree(); // Create Red-Black tree
rbt.insert(10); // Insert 10
rbt.insert(20); // Insert 20
rbt.insert(30); // Insert 30`,
    Binomial: `// Binomial Tree Node
class Node {
    constructor(key) {
        this.key = key;
        this.degree = 0;
        this.parent = this.child = this.sibling = null;
    }
}

// Binomial Heap (Forest of Binomial Trees)
class BinomialHeap {
    constructor() {
        this.head = null;
    }
    insert(key) {
        const temp = new BinomialHeap();
        temp.head = new Node(key);
        this.head = this.union(this, temp);
    }
    // Union operation (simplified)
    union(h1, h2) {
        // ...merge root lists and link trees of same degree...
        return h1.head || h2.head;
    }
}
const heap = new BinomialHeap();
heap.insert(10);
heap.insert(20);`,
  },
  TypeScript: {
    BST: `// Node class for tree nodes
class Node {
    constructor(
      public value: number, // Value of the node
      public left: Node | null = null, // Left child
      public right: Node | null = null // Right child
    ) {}
}
// BinaryTree class manages the tree
class BinaryTree {
    constructor(public root: Node) {} // Set root
    insert(value: number) { this.root = this.insertRec(this.root, value); } // Insert method
    private insertRec(root: Node | null, value: number): Node { // Recursive insert
      if(!root) return new Node(value); // Insert at null
      if(value < root.value) root.left  = this.insertRec(root.left, value); // Go left
      else if(value > root.value) root.right = this.insertRec(root.right, value); // Go right
      return root; // Return updated root
    }
}
const t = new BinaryTree(new Node(1)); t.insert(2); t.insert(3); // Example usage`,
    AVL: `// Node class for AVL tree nodes
class Node {
    height = 1; // Height of the node
    constructor(
        public value: number, // Value of the node
        public left: Node | null = null, // Left child
        public right: Node | null = null // Right child
    ) {}
}

// AVLTree class manages the AVL tree
class AVLTree {
    root: Node | null = null; // Root node
    private h(n: Node | null) {
        return n ? n.height : 0; // Return height or 0 if null
    }
    private bal(n: Node | null) {
        return n ? this.h(n.left) - this.h(n.right) : 0; // Balance factor
    }
    private rotRight(y: Node): Node {
        const x = y.left as Node; // Left child
        const T2 = x.right; // Right subtree of x
        x.right = y; // Perform rotation
        y.left = T2; // Update left child
        y.height = Math.max(this.h(y.left), this.h(y.right)) + 1; // Update height
        x.height = Math.max(this.h(x.left), this.h(x.right)) + 1; // Update height
        return x; // Return new root
    }
    private rotLeft(x: Node): Node {
        const y = x.right as Node; // Right child
        const T2 = y.left; // Left subtree of y
        y.left = x; // Perform rotation
        x.right = T2; // Update right child
        x.height = Math.max(this.h(x.left), this.h(x.right)) + 1; // Update height
        y.height = Math.max(this.h(y.left), this.h(y.right)) + 1; // Update height
        return y; // Return new root
    }
    private insert(node: Node | null, key: number): Node {
        if (!node) {
            return new Node(key); // Insert new node
        }
        if (key < node.value) {
            node.left = this.insert(node.left, key); // Insert left
        } else if (key > node.value) {
            node.right = this.insert(node.right, key); // Insert right
        } else {
            return node; // Duplicate keys not allowed
        }
        node.height = 1 + Math.max(this.h(node.left), this.h(node.right)); // Update height
        const bal = this.bal(node); // Get balance factor
        if (bal > 1 && key < node.left!.value) {
            return this.rotRight(node); // Left Left Case
        }
        if (bal < -1 && key > node.right!.value) {
            return this.rotLeft(node); // Right Right Case
        }
        if (bal > 1 && key > node.left!.value) {
            node.left = this.rotLeft(node.left!); // Left Right Case
            return this.rotRight(node);
        }
        if (bal < -1 && key < node.right!.value) {
            node.right = this.rotRight(node.right!); // Right Left Case
            return this.rotLeft(node);
        }
        return node; // Return updated node
    }
    insert(key: number) {
        this.root = this.insert(this.root, key); // Insert key
    }
}
const avl = new AVLTree(); // Create AVL tree
avl.insert(10); // Insert 10
avl.insert(20); // Insert 20
avl.insert(30); // Insert 30`,
    RBT: `type Color = "RED" | "BLACK"; // Node colors

// Node class for Red-Black tree
class Node {
    color: Color = "RED"; // New nodes are red
    left: Node | null = null; // Left child
    right: Node | null = null; // Right child
    parent: Node | null = null; // Parent
    constructor(public value: number) {} // Value of the node
}

// RedBlackTree class manages the tree
class RedBlackTree {
    root: Node | null = null; // Root node

    // Left rotate utility
    private rotateLeft(x: Node) {
        const y = x.right as Node; // Right child
        x.right = y.left; // Move y's left subtree
        if (y.left) y.left.parent = x; // Update parent
        y.parent = x.parent; // Update parent
        if (!x.parent) this.root = y; // Update root
        else if (x === x.parent.left) x.parent.left = y; // Update left child
        else x.parent.right = y; // Update right child
        y.left = x; // Rotate
        x.parent = y; // Update parent
    }

    // Right rotate utility
    private rotateRight(y: Node) {
        const x = y.left as Node; // Left child
        y.left = x.right; // Move x's right subtree
        if (x.right) x.right.parent = y; // Update parent
        x.parent = y.parent; // Update parent
        if (!y.parent) this.root = x; // Update root
        else if (y === y.parent.left) y.parent.left = x; // Update left child
        else y.parent.right = x; // Update right child
        x.right = y; // Rotate
        y.parent = x; // Update parent
    }

    // Insert a new value
    insert(value: number) {
        const node = new Node(value); // Create new node
        this.root = this.bstInsert(this.root, node); // BST insert
        this.fixInsert(node); // Fix Red-Black properties
    }

    // Standard BST insert
    private bstInsert(root: Node | null, node: Node): Node {
        if (!root) return node; // Insert at null
        if (node.value < root.value) {
            root.left = this.bstInsert(root.left, node); // Go left
            root.left.parent = root; // Set parent
        } else if (node.value > root.value) {
            root.right = this.bstInsert(root.right, node); // Go right
            root.right.parent = root; // Set parent
        }
        return root; // Return updated root
    }

    // Fix Red-Black tree after insert
    private fixInsert(k: Node) {
        while (k !== this.root && k.parent!.color === "RED") {
            if (k.parent === k.parent!.parent!.left) {
                const u = k.parent!.parent!.right; // Uncle
                if (u && u.color === "RED") {
                    k.parent!.color = "BLACK"; // Case 1
                    u.color = "BLACK"; // Case 1
                    k.parent!.parent!.color = "RED"; // Case 1
                    k = k.parent!.parent!; // Move up
                } else {
                    if (k === k.parent!.right) {
                        k = k.parent!; // Case 2
                        this.rotateLeft(k); // Case 2
                    }
                    k.parent!.color = "BLACK"; // Case 3
                    k.parent!.parent!.color = "RED"; // Case 3
                    this.rotateRight(k.parent!.parent!); // Case 3
                }
            } else {
                const u = k.parent!.parent!.left; // Uncle
                if (u && u.color === "RED") {
                    k.parent!.color = "BLACK"; // Case 1
                    u.color = "BLACK"; // Case 1
                    k.parent!.parent!.color = "RED"; // Case 1
                    k = k.parent!.parent!; // Move up
                } else {
                    if (k === k.parent!.left) {
                        k = k.parent!; // Case 2
                        this.rotateRight(k); // Case 2
                    }
                    k.parent!.color = "BLACK"; // Case 3
                    k.parent!.parent!.color = "RED"; // Case 3
                    this.rotateLeft(k.parent!.parent!); // Case 3
                }
            }
        }
        if (this.root) this.root.color = "BLACK"; // Root is always black
    }
}

const rbt = new RedBlackTree(); // Create Red-Black tree
rbt.insert(10); // Insert 10
rbt.insert(20); // Insert 20
rbt.insert(30); // Insert 30`,
    Binomial: `// Binomial Tree Node
class Node {
    constructor(key) {
        this.key = key;
        this.degree = 0;
        this.parent = this.child = this.sibling = null;
    }
}

// Binomial Heap (Forest of Binomial Trees)
class BinomialHeap {
    constructor() {
        this.head = null;
    }
    insert(key) {
        const temp = new BinomialHeap();
        temp.head = new Node(key);
        this.head = this.union(this, temp);
    }
    // Union operation (simplified)
    union(h1, h2) {
        // ...merge root lists and link trees of same degree...
        return h1.head || h2.head;
    }
}
const heap = new BinomialHeap();
heap.insert(10);
heap.insert(20);`,
  },
  Python: {
    BST: `# Node class for tree nodes
class Node:
    def __init__(self, value):
      self.value, self.left, self.right = value, None, None # Initialize value and children

class BinaryTree:
    def __init__(self, value):
      self.root = Node(value) # Set root

    def insert(self, value):
      self.root = self._insert(self.root, value) # Insert method

    def _insert(self, root, value):
      if root is None: return Node(value) # Insert at null
      if value < root.value:
        root.left = self._insert(root.left, value) # Go left
      elif value > root.value:
        root.right = self._insert(root.right, value) # Go right
      return root # Return updated root

# Example usage
tree = BinaryTree(1); tree.insert(2); tree.insert(3)`,
    AVL: `# Node class for AVL tree nodes
class Node:
    def __init__(self, value):
        self.value  = value    # Value of the node
        self.left   = None     # Left child
        self.right  = None     # Right child
        self.height = 1        # Height of the node

class AVLTree:
    def __init__(self):
        self.root = None       # Root node

    # ── helpers ────────────────────────────────────────────────
    def _h(self, n):
        return n.height if n else 0                # Height

    def _bal(self, n):
        return self._h(n.left) - self._h(n.right)  # Balance factor

    def _rot_left(self, x):
        y, T2 = x.right, x.right.left              # Perform rotation
        y.left, x.right = x, T2
        x.height = 1 + max(self._h(x.left), self._h(x.right))
        y.height = 1 + max(self._h(y.left), self._h(y.right))
        return y                                   # New root

    def _rot_right(self, y):
        x, T2 = y.left, y.left.right               # Perform rotation
        x.right, y.left = y, T2
        y.height = 1 + max(self._h(y.left), self._h(y.right))
        x.height = 1 + max(self._h(x.left), self._h(x.right))
        return x                                   # New root

    # ── insertion ──────────────────────────────────────────────
    def _insert(self, node, key):
        if not node:                               # Insert new node
            return Node(key)
        if key < node.value:
            node.left  = self._insert(node.left,  key)
        elif key > node.value:
            node.right = self._insert(node.right, key)
        else:
            return node                            # Duplicate keys not allowed

        node.height = 1 + max(self._h(node.left), self._h(node.right))
        bal = self._bal(node)

        # ─ balance the tree ─
        if bal > 1 and key < node.left.value:      # Left‑Left
            return self._rot_right(node)
        if bal < -1 and key > node.right.value:    # Right‑Right
            return self._rot_left(node)
        if bal > 1 and key > node.left.value:      # Left‑Right
            node.left = self._rot_left(node.left)
            return self._rot_right(node)
        if bal < -1 and key < node.right.value:    # Right‑Left
            node.right = self._rot_right(node.right)
            return self._rot_left(node)

        return node

    def insert(self, key):
        self.root = self._insert(self.root, key)

# ── example usage ─────────────────────────────────────────────
avl = AVLTree()
avl.insert(10)
avl.insert(20)
avl.insert(30)
`,
    RBT: `RED, BLACK = True, False # Node colors

# Node class for Red-Black tree
class Node:
    def __init__(self, value):
        self.value = value # Value of the node
        self.color = RED # New nodes are red
        self.left = None # Left child
        self.right = None # Right child
        self.parent = None # Parent

# RedBlackTree class manages the tree
class RedBlackTree:
    def __init__(self):
        self.root = None # Root node

    # Left rotate utility
    def _rotate_left(self, x):
        y = x.right # Right child
        x.right = y.left # Move y's left subtree
        if y.left:
            y.left.parent = x # Update parent
        y.parent = x.parent # Update parent
        if not x.parent:
            self.root = y # Update root
        elif x == x.parent.left:
            x.parent.left = y # Update left child
        else:
            x.parent.right = y # Update right child
        y.left = x # Rotate
        x.parent = y # Update parent

    # Right rotate utility
    def _rotate_right(self, y):
        x = y.left # Left child
        y.left = x.right # Move x's right subtree
        if x.right:
            x.right.parent = y # Update parent
        x.parent = y.parent # Update parent
        if not y.parent:
            self.root = x # Update root
        elif y == y.parent.left:
            y.parent.left = x # Update left child
        else:
            y.parent.right = x # Update right child
        x.right = y # Rotate
        y.parent = x # Update parent

    # Insert a new value
    def insert(self, value):
        node = Node(value) # Create new node
        self.root = self._bst_insert(self.root, node) # BST insert
        self._fix_insert(node) # Fix Red-Black properties

    # Standard BST insert
    def _bst_insert(self, root, node):
        if not root:
            return node # Insert at null
        if node.value < root.value:
            root.left = self._bst_insert(root.left, node) # Go left
            root.left.parent = root # Set parent
        elif node.value > root.value:
            root.right = self._bst_insert(root.right, node) # Go right
            root.right.parent = root # Set parent
        return root # Return updated root

    # Fix Red-Black tree after insert
    def _fix_insert(self, k):
        while k != self.root and k.parent.color == RED:
            if k.parent == k.parent.parent.left:
                u = k.parent.parent.right # Uncle
                if u and u.color == RED:
                    k.parent.color = BLACK # Case 1
                    u.color = BLACK # Case 1
                    k.parent.parent.color = RED # Case 1
                    k = k.parent.parent # Move up
                else:
                    if k == k.parent.right:
                        k = k.parent # Case 2
                        self._rotate_left(k) # Case 2
                    k.parent.color = BLACK # Case 3
                    k.parent.parent.color = RED # Case 3
                    self._rotate_right(k.parent.parent) # Case 3
            else:
                u = k.parent.parent.left # Uncle
                if u and u.color == RED:
                    k.parent.color = BLACK # Case 1
                    u.color = BLACK # Case 1
                    k.parent.parent.color = RED # Case 1
                    k = k.parent.parent # Move up
                else:
                    if k == k.parent.left:
                        k = k.parent # Case 2
                        self._rotate_right(k) # Case 2
                    k.parent.color = BLACK # Case 3
                    k.parent.parent.color = RED # Case 3
                    self._rotate_left(k.parent.parent) # Case 3
        self.root.color = BLACK # Root is always black

rbt = RedBlackTree() # Create Red-Black tree
rbt.insert(10) # Insert 10
rbt.insert(20) # Insert 20
rbt.insert(30) # Insert 30`,
    Binomial: `# Binomial Tree Node
class Node:
    def __init__(self, key):
        self.key = key
        self.degree = 0
        self.parent = self.child = self.sibling = None

# Binomial Heap (Forest of Binomial Trees)
class BinomialHeap:
    def __init__(self):
        self.head = None
    def insert(self, key):
        temp = BinomialHeap()
        temp.head = Node(key)
        self.head = self.union(self, temp)
    # Union operation (simplified)
    def union(self, h1, h2):
        # ...merge root lists and link trees of same degree...
        return h1.head or h2.head

heap = BinomialHeap()
heap.insert(10)
heap.insert(20)`,
  },
};

// Function to get code example by language and tree type
export function getCodeExample(
  language: Languages,
  treeKind: TreeKind
): string | undefined {
  return codeTemplates[language]?.[treeKind];
}
