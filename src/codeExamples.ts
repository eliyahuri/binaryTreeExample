// filepath: /c:/Users/אליהו/OneDrive/שולחן העבודה/coding/binaryTreeExample/src/codeExamples.ts
export const examples: {
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
