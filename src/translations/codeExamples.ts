import type { Languages } from "../types/language";
import { TreeKind } from "../BinaryTree";

export const examples: Record<`${Languages},${TreeKind}`, string> = {
  /* ────────────────  Binary‑Search Tree (BST)  ──────────────── */

  "Java,BST": `class Node {
    int value;
    Node left, right;

    Node(int value) { this.value = value; }
  }

  public class BinaryTree {
    Node root;
    BinaryTree(int value) { root = new Node(value); }

    void insert(int value) { root = insertRec(root, value); }

    Node insertRec(Node root, int value) {
      if (root == null) return new Node(value);
      if (value < root.value) root.left  = insertRec(root.left, value);
      else if (value > root.value) root.right = insertRec(root.right, value);
      return root;
    }

    public static void main(String[] args) {
      BinaryTree t = new BinaryTree(1); t.insert(2); t.insert(3);
    }
  }`,

  "CSharp,BST": `class Node {
    public int value;
    public Node left, right;
    public Node(int value) { this.value = value; }
  }

  class BinaryTree {
    public Node root;
    public BinaryTree(int value) { root = new Node(value); }
    public void Insert(int value) { root = InsertRec(root, value); }

    private Node InsertRec(Node root, int value) {
      if (root == null) return new Node(value);
      if (value < root.value) root.left  = InsertRec(root.left, value);
      else if (value > root.value) root.right = InsertRec(root.right, value);
      return root;
    }
    static void Main() {
      var t = new BinaryTree(1); t.Insert(2); t.Insert(3);
    }
  }`,

  "JavaScript,BST": `class Node {
    constructor(value){ this.value = value; this.left = this.right = null; }
  }
  class BinaryTree {
    constructor(value){ this.root = new Node(value); }
    insert(value){ this.root = this.#insert(this.root, value); }
    #insert(root, value){
      if(!root) return new Node(value);
      if(value < root.value) root.left  = this.#insert(root.left, value);
      else if(value > root.value) root.right = this.#insert(root.right, value);
      return root;
    }
  }
  const t = new BinaryTree(1); t.insert(2); t.insert(3);`,

  "TypeScript,BST": `class Node {
    constructor(
      public value: number,
      public left: Node | null = null,
      public right: Node | null = null
    ) {}
  }
  class BinaryTree {
    constructor(public root: Node) {}
    insert(value: number) { this.root = this.insertRec(this.root, value); }
    private insertRec(root: Node | null, value: number): Node {
      if(!root) return new Node(value);
      if(value < root.value) root.left  = this.insertRec(root.left, value);
      else if(value > root.value) root.right = this.insertRec(root.right, value);
      return root;
    }
  }
  const t = new BinaryTree(new Node(1)); t.insert(2); t.insert(3);`,

  "Python,BST": `class Node:
    def __init__(self, value):
      self.value, self.left, self.right = value, None, None

  class BinaryTree:
    def __init__(self, value):
      self.root = Node(value)

    def insert(self, value):
      self.root = self._insert(self.root, value)

    def _insert(self, root, value):
      if root is None: return Node(value)
      if value < root.value:
        root.left = self._insert(root.left, value)
      elif value > root.value:
        root.right = self._insert(root.right, value)
      return root

  tree = BinaryTree(1); tree.insert(2); tree.insert(3)`,

  /* ──────────────────  Adelson‑Velsky & Landis (AVL)  ────────────────── */

  "Java,AVL": `class Node {
    int value, height;
    Node left, right;
    Node(int v){ value=v; height=1; }
  }
  public class AVLTree {
    Node root;
    int height(Node n){ return n==null?0:n.height; }
    int balance(Node n){ return n==null?0:height(n.left)-height(n.right); }

    Node rotateRight(Node y){
      Node x=y.left, T2=x.right;
      x.right=y; y.left=T2;
      y.height=Math.max(height(y.left),height(y.right))+1;
      x.height=Math.max(height(x.left),height(x.right))+1;
      return x;
    }
    Node rotateLeft(Node x){
      Node y=x.right, T2=y.left;
      y.left=x; x.right=T2;
      x.height=Math.max(height(x.left),height(x.right))+1;
      y.height=Math.max(height(y.left),height(y.right))+1;
      return y;
    }

    Node insert(Node node,int key){
      if(node==null) return new Node(key);
      if(key<node.value) node.left=insert(node.left,key);
      else if(key>node.value) node.right=insert(node.right,key);
      else return node;

      node.height=1+Math.max(height(node.left),height(node.right));
      int bal=balance(node);

      if(bal>1 && key<node.left.value) return rotateRight(node);
      if(bal<-1 && key>node.right.value) return rotateLeft(node);
      if(bal>1 && key>node.left.value){
        node.left=rotateLeft(node.left);
        return rotateRight(node);
      }
      if(bal<-1 && key<node.right.value){
        node.right=rotateRight(node.right);
        return rotateLeft(node);
      }
      return node;
    }
    void insert(int key){ root=insert(root,key); }

    public static void main(String[] a){
      AVLTree t=new AVLTree(); t.insert(10); t.insert(20); t.insert(30);
    }
  }`,

  "CSharp,AVL": `class Node {
    public int value, height=1;
    public Node left, right;
    public Node(int v){ value=v; }
  }
  class AVLTree {
    Node root;
    int Height(Node n)=> n==null?0:n.height;
    int Balance(Node n)=> n==null?0:Height(n.left)-Height(n.right);

    Node RotateRight(Node y){
      var x=y.left; var T2=x.right;
      x.right=y; y.left=T2;
      y.height = Math.Max(Height(y.left),Height(y.right))+1;
      x.height = Math.Max(Height(x.left),Height(x.right))+1;
      return x;
    }
    Node RotateLeft(Node x){
      var y=x.right; var T2=y.left;
      y.left=x; x.right=T2;
      x.height = Math.Max(Height(x.left),Height(x.right))+1;
      y.height = Math.Max(Height(y.left),Height(y.right))+1;
      return y;
    }

    Node Insert(Node node,int key){
      if(node==null) return new Node(key);
      if(key<node.value) node.left = Insert(node.left,key);
      else if(key>node.value) node.right = Insert(node.right,key);
      else return node;

      node.height = 1+Math.Max(Height(node.left),Height(node.right));
      int bal = Balance(node);

      if(bal>1 && key<node.left.value) return RotateRight(node);
      if(bal<-1 && key>node.right.value) return RotateLeft(node);
      if(bal>1 && key>node.left.value){ node.left=RotateLeft(node.left); return RotateRight(node);} 
      if(bal<-1 && key<node.right.value){ node.right=RotateRight(node.right); return RotateLeft(node);} 
      return node;
    }
    public void Insert(int key){ root=Insert(root,key); }

    static void Main(){
      var t=new AVLTree(); t.Insert(10); t.Insert(20); t.Insert(30);
    }
  }`,

  "JavaScript,AVL": `class Node{
    constructor(value){ this.value=value; this.left=this.right=null; this.height=1; }
  }
  class AVLTree{
    constructor(){ this.root=null; }
    _h(n){ return n? n.height:0; }
    _bal(n){ return n? this._h(n.left)-this._h(n.right):0; }

    _rotRight(y){
      const x=y.left, T2=x.right;
      x.right=y; y.left=T2;
      y.height=Math.max(this._h(y.left),this._h(y.right))+1;
      x.height=Math.max(this._h(x.left),this._h(x.right))+1;
      return x;
    }
    _rotLeft(x){
      const y=x.right, T2=y.left;
      y.left=x; x.right=T2;
      x.height=Math.max(this._h(x.left),this._h(x.right))+1;
      y.height=Math.max(this._h(y.left),this._h(y.right))+1;
      return y;
    }

    _insert(node,key){
      if(!node) return new Node(key);
      if(key<node.value) node.left=this._insert(node.left,key);
      else if(key>node.value) node.right=this._insert(node.right,key);
      else return node;

      node.height = 1+Math.max(this._h(node.left),this._h(node.right));
      const bal = this._bal(node);

      if(bal>1 && key<node.left.value) return this._rotRight(node);
      if(bal<-1 && key>node.right.value) return this._rotLeft(node);
      if(bal>1 && key>node.left.value){ node.left=this._rotLeft(node.left); return this._rotRight(node);} 
      if(bal<-1 && key<node.right.value){ node.right=this._rotRight(node.right); return this._rotLeft(node);} 
      return node;
    }
    insert(key){ this.root=this._insert(this.root,key); }
  }
  const avl=new AVLTree(); avl.insert(10); avl.insert(20); avl.insert(30);`,

  "TypeScript,AVL": `class Node{
    height=1;
    constructor(
      public value:number,
      public left:Node|null=null,
      public right:Node|null=null
    ){}
  }
  class AVLTree{
    root:Node|null=null;
    private h(n:Node|null){ return n? n.height:0; }
    private bal(n:Node|null){ return n? this.h(n.left)-this.h(n.right):0; }

    private rotRight(y:Node):Node{
      const x=y.left as Node, T2=x.right;
      x.right=y; y.left=T2;
      y.height=Math.max(this.h(y.left),this.h(y.right))+1;
      x.height=Math.max(this.h(x.left),this.h(x.right))+1;
      return x;
    }
    private rotLeft(x:Node):Node{
      const y=x.right as Node, T2=y.left;
      y.left=x; x.right=T2;
      x.height=Math.max(this.h(x.left),this.h(x.right))+1;
      y.height=Math.max(this.h(y.left),this.h(y.right))+1;
      return y;
    }

    private insertRec(n:Node|null,key:number):Node{
      if(!n) return new Node(key);
      if(key<n.value) n.left=this.insertRec(n.left,key);
      else if(key>n.value) n.right=this.insertRec(n.right,key);
      else return n;

      n.height=1+Math.max(this.h(n.left),this.h(n.right));
      const bal=this.bal(n);

      if(bal>1 && key<(n.left as Node).value) return this.rotRight(n);
      if(bal<-1 && key>(n.right as Node).value) return this.rotLeft(n);
      if(bal>1 && key>(n.left as Node).value){
        n.left=this.rotLeft(n.left as Node); return this.rotRight(n);
      }
      if(bal<-1 && key<(n.right as Node).value){
        n.right=this.rotRight(n.right as Node); return this.rotLeft(n);
      }
      return n;
    }
    insert(key:number){ this.root=this.insertRec(this.root,key); }
  }
  const t=new AVLTree(); t.insert(10); t.insert(20); t.insert(30);`,

  "Python,AVL": `class Node:
    def __init__(self, value):
      self.value = value
      self.left = self.right = None
      self.height = 1

  class AVLTree:
    def __init__(self):
      self.root = None

    def _h(self, n): return n.height if n else 0
    def _bal(self, n): return self._h(n.left) - self._h(n.right) if n else 0

    def _rot_right(self, y):
      x, T2 = y.left, y.left.right
      x.right, y.left = y, T2
      y.height = max(self._h(y.left), self._h(y.right)) + 1
      x.height = max(self._h(x.left), self._h(x.right)) + 1
      return x

    def _rot_left(self, x):
      y, T2 = x.right, x.right.left
      y.left, x.right = x, T2
      x.height = max(self._h(x.left), self._h(x.right)) + 1
      y.height = max(self._h(y.left), self._h(y.right)) + 1
      return y

    def _insert(self, node, key):
      if not node: return Node(key)
      if key < node.value: node.left = self._insert(node.left, key)
      elif key > node.value: node.right = self._insert(node.right, key)
      else: return node

      node.height = 1 + max(self._h(node.left), self._h(node.right))
      bal = self._bal(node)

      if bal > 1 and key < node.left.value:
        return self._rot_right(node)
      if bal < -1 and key > node.right.value:
        return self._rot_left(node)
      if bal > 1 and key > node.left.value:
        node.left = self._rot_left(node.left)
        return self._rot_right(node)
      if bal < -1 and key < node.right.value:
        node.right = self._rot_right(node.right)
        return self._rot_left(node)
      return node

    def insert(self, key):
      self.root = self._insert(self.root, key)

  avl = AVLTree(); avl.insert(10); avl.insert(20); avl.insert(30)`,

  /* ───────────────  Red‑Black Tree (RBT)  ─────────────── */

  "Java,RBT": `enum Color { RED, BLACK }
  class Node {
    int value; Node left, right, parent; Color color = Color.RED;
    Node(int v){ value=v; }
  }
  public class RedBlackTree {
    private Node root;
    private void rotateLeft(Node x){
      Node y=x.right; x.right=y.left;
      if(y.left!=null) y.left.parent=x;
      y.parent=x.parent;
      if(x.parent==null) root=y;
      else if(x==x.parent.left) x.parent.left=y; else x.parent.right=y;
      y.left=x; x.parent=y;
    }
    private void rotateRight(Node y){
      Node x=y.left; y.left=x.right;
      if(x.right!=null) x.right.parent=y;
      x.parent=y.parent;
      if(y.parent==null) root=x;
      else if(y==y.parent.left) y.parent.left=x; else y.parent.right=x;
      x.right=y; y.parent=x;
    }
    private void insertFix(Node z){
      while(z.parent!=null && z.parent.color==Color.RED){
        if(z.parent==z.parent.parent.left){
          Node y=z.parent.parent.right;
          if(y!=null && y.color==Color.RED){ z.parent.color=y.color=Color.BLACK; z.parent.parent.color=Color.RED; z=z.parent.parent; }
          else{
            if(z==z.parent.right){ z=z.parent; rotateLeft(z);} 
            z.parent.color=Color.BLACK; z.parent.parent.color=Color.RED; rotateRight(z.parent.parent);
          }
        }else{
          Node y=z.parent.parent.left;
          if(y!=null && y.color==Color.RED){ z.parent.color=y.color=Color.BLACK; z.parent.parent.color=Color.RED; z=z.parent.parent; }
          else{
            if(z==z.parent.left){ z=z.parent; rotateRight(z);} 
            z.parent.color=Color.BLACK; z.parent.parent.color=Color.RED; rotateLeft(z.parent.parent);
          }
        }
      }
      root.color=Color.BLACK;
    }
    private void bstInsert(Node z){
      Node y=null, x=root;
      while(x!=null){ y=x; x=z.value<x.value?x.left:x.right; }
      z.parent=y;
      if(y==null) root=z;
      else if(z.value<y.value) y.left=z; else y.right=z;
      insertFix(z);
    }
    public void insert(int key){ bstInsert(new Node(key)); }
    public static void main(String[] a){ RedBlackTree t=new RedBlackTree(); t.insert(10); t.insert(20); t.insert(15); }
  }`,

  "CSharp,RBT": `enum Color{ Red, Black }
  class Node{
    public int value; public Node left, right, parent; public Color color=Color.Red;
    public Node(int v){ value=v; }
  }
  class RedBlackTree{
    Node root;
    void RotateLeft(Node x){
      var y=x.right; x.right=y.left;
      if(y.left!=null) y.left.parent=x;
      y.parent=x.parent;
      if(x.parent==null) root=y;
      else if(x==x.parent.left) x.parent.left=y; else x.parent.right=y;
      y.left=x; x.parent=y;
    }
    void RotateRight(Node y){
      var x=y.left; y.left=x.right;
      if(x.right!=null) x.right.parent=y;
      x.parent=y.parent;
      if(y.parent==null) root=x;
      else if(y==y.parent.left) y.parent.left=x; else y.parent.right=x;
      x.right=y; y.parent=x;
    }
    void InsertFix(Node z){
      while(z.parent!=null && z.parent.color==Color.Red){
        if(z.parent==z.parent.parent.left){
          var y=z.parent.parent.right;
          if(y!=null && y.color==Color.Red){ z.parent.color=y.color=Color.Black; z.parent.parent.color=Color.Red; z=z.parent.parent; }
          else{
            if(z==z.parent.right){ z=z.parent; RotateLeft(z);} 
            z.parent.color=Color.Black; z.parent.parent.color=Color.Red; RotateRight(z.parent.parent);
          }
        }else{
          var y=z.parent.parent.left;
          if(y!=null && y.color==Color.Red){ z.parent.color=y.color=Color.Black; z.parent.parent.color=Color.Red; z=z.parent.parent; }
          else{
            if(z==z.parent.left){ z=z.parent; RotateRight(z);} 
            z.parent.color=Color.Black; z.parent.parent.color=Color.Red; RotateLeft(z.parent.parent);
          }
        }
      }
      root.color=Color.Black;
    }
    void BstInsert(Node z){
      Node y=null,x=root;
      while(x!=null){ y=x; x=z.value<x.value?x.left:x.right; }
      z.parent=y;
      if(y==null) root=z;
      else if(z.value<y.value) y.left=z; else y.right=z;
      InsertFix(z);
    }
    public void Insert(int key){ BstInsert(new Node(key)); }
    static void Main(){ var t=new RedBlackTree(); t.Insert(10); t.Insert(20); t.Insert(15); }
  }`,

  "JavaScript,RBT": `const RED=true, BLACK=false;
  class Node{
    constructor(value){ this.value=value; this.left=this.right=this.parent=null; this.color=RED; }
  }
  class RedBlackTree{
    constructor(){ this.root=null; }
    rotateLeft(x){ const y=x.right; x.right=y.left; if(y.left) y.left.parent=x; y.parent=x.parent;
      if(!x.parent) this.root=y; else if(x===x.parent.left) x.parent.left=y; else x.parent.right=y;
      y.left=x; x.parent=y; }
    rotateRight(y){ const x=y.left; y.left=x.right; if(x.right) x.right.parent=y; x.parent=y.parent;
      if(!y.parent) this.root=x; else if(y===y.parent.left) y.parent.left=x; else y.parent.right=x;
      x.right=y; y.parent=x; }
    insertFix(z){ while(z.parent && z.parent.color===RED){ if(z.parent===z.parent.parent.left){ const y=z.parent.parent.right;
          if(y && y.color===RED){ z.parent.color=y.color=BLACK; z.parent.parent.color=RED; z=z.parent.parent; }
          else{ if(z===z.parent.right){ z=z.parent; this.rotateLeft(z);} z.parent.color=BLACK; z.parent.parent.color=RED; this.rotateRight(z.parent.parent);} }
        else{ const y=z.parent.parent.left;
          if(y && y.color===RED){ z.parent.color=y.color=BLACK; z.parent.parent.color=RED; z=z.parent.parent; }
          else{ if(z===z.parent.left){ z=z.parent; this.rotateRight(z);} z.parent.color=BLACK; z.parent.parent.color=RED; this.rotateLeft(z.parent.parent);} } }
      if(this.root) this.root.color=BLACK; }
    bstInsert(z){ let y=null, x=this.root; while(x){ y=x; x=z.value<x.value?x.left:x.right; }
      z.parent=y; if(!y) this.root=z; else if(z.value<y.value) y.left=z; else y.right=z; this.insertFix(z); }
    insert(value){ this.bstInsert(new Node(value)); }
  }
  const rbt=new RedBlackTree(); rbt.insert(10); rbt.insert(20); rbt.insert(15);`,

  "TypeScript,RBT": `type Color="RED"|"BLACK";
  class Node{
    color:Color="RED"; left:Node|null=null; right:Node|null=null; parent:Node|null=null;
    constructor(public value:number){}
  }
  class RedBlackTree{
    root:Node|null=null;
    private rotateLeft(x:Node){ const y=x.right as Node; x.right=y.left; if(y.left) y.left.parent=x; y.parent=x.parent;
      if(!x.parent) this.root=y; else if(x===x.parent.left) x.parent.left=y; else x.parent.right=y;
      y.left=x; x.parent=y; }
    private rotateRight(y:Node){ const x=y.left as Node; y.left=x.right; if(x.right) x.right.parent=y; x.parent=y.parent;
      if(!y.parent) this.root=x; else if(y===y.parent.left) y.parent.left=x; else y.parent.right=x;
      x.right=y; y.parent=x; }
    private insertFix(z:Node){ while(z.parent && z.parent.color==="RED"){ if(z.parent===z.parent.parent!.left){ const y=z.parent.parent!.right;
          if(y && y.color==="RED"){ z.parent.color=y.color="BLACK"; z.parent.parent!.color="RED"; z=z.parent.parent!; }
          else{ if(z===z.parent.right){ z=z.parent; this.rotateLeft(z);} z.parent!.color="BLACK"; z.parent!.parent!.color="RED"; this.rotateRight(z.parent!.parent!);} }
        else{ const y=z.parent.parent!.left;
          if(y && y.color==="RED"){ z.parent.color=y.color="BLACK"; z.parent.parent!.color="RED"; z=z.parent.parent!; }
          else{ if(z===z.parent.left){ z=z.parent; this.rotateRight(z);} z.parent!.color="BLACK"; z.parent!.parent!.color="RED"; this.rotateLeft(z.parent!.parent!);} } }
      if(this.root) this.root.color="BLACK"; }
    private bstInsert(z:Node){ let y:Node|null=null, x=this.root; while(x){ y=x; x=z.value<x.value?x.left:x.right; }
      z.parent=y; if(!y) this.root=z; else if(z.value<y.value) y.left=z; else y.right=z; this.insertFix(z); }
    insert(value:number){ this.bstInsert(new Node(value)); }
  }
  const rbt=new RedBlackTree(); rbt.insert(10); rbt.insert(20); rbt.insert(15);`,

  "Python,RBT": `RED, BLACK = True, False
  class Node:
    def __init__(self, value):
      self.value=value; self.left=self.right=self.parent=None; self.color=RED

  class RedBlackTree:
    def __init__(self):
      self.root=None

    def _rotate_left(self, x):
      y=x.right; x.right=y.left
      if y.left: y.left.parent=x
      y.parent=x.parent
      if not x.parent: self.root=y
      elif x==x.parent.left: x.parent.left=y
      else: x.parent.right=y
      y.left=x; x.parent=y

    def _rotate_right(self, y):
      x=y.left; y.left=x.right
      if x.right: x.right.parent=y
      x.parent=y.parent
      if not y.parent: self.root=x
      elif y==y.parent.left: y.parent.left=x
      else: y.parent.right=x
      x.right=y; y.parent=x

    def _insert_fix(self, z):
      while z.parent and z.parent.color==RED:
        if z.parent==z.parent.parent.left:
          y=z.parent.parent.right
          if y and y.color==RED:
            z.parent.color=y.color=BLACK; z.parent.parent.color=RED; z=z.parent.parent
          else:
            if z==z.parent.right:
              z=z.parent; self._rotate_left(z)
            z.parent.color=BLACK; z.parent.parent.color=RED; self._rotate_right(z.parent.parent)
        else:
          y=z.parent.parent.left
          if y and y.color==RED:
            z.parent.color=y.color=BLACK; z.parent.parent.color=RED; z=z.parent.parent
          else:
            if z==z.parent.left:
              z=z.parent; self._rotate_right(z)
            z.parent.color=BLACK; z.parent.parent.color=RED; self._rotate_left(z.parent.parent)
      self.root.color=BLACK

    def _bst_insert(self, z):
      y=None; x=self.root
      while x:
        y=x; x = z.value < x.value and x.left or x.right
      z.parent=y
      if not y: self.root=z
      elif z.value<y.value: y.left=z
      else: y.right=z
      self._insert_fix(z)

    def insert(self, value):
      self._bst_insert(Node(value))

  rbt=RedBlackTree(); rbt.insert(10); rbt.insert(20); rbt.insert(15)`,
};
