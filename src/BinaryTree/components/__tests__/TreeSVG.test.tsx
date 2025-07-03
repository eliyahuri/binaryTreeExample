import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  createBinomialNode,
  layoutBinomialForest,
  bstInsert,
  layoutTree,
} from "../../utils/tree";
import { TreeSVG } from "../TreeSVG";
import type { TreeNode } from "../../utils/tree";

describe("TreeSVG component", () => {
  it("renders BST nodes with correct values", () => {
    // Build simple BST with values 2,1,3
    let root: TreeNode | null = null;
    [2, 1, 3].forEach((v) => {
      root = bstInsert(root, v);
    });
    layoutTree(root);
    const { getByText } = render(
      <svg>
        <TreeSVG
          kind="BST"
          root={root}
          binomialHead={null}
          viewBox="0 0 200 200"
        />
      </svg>
    );
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
  });

  it("renders Binomial heap nodes with correct keys", () => {
    // Create two B0 trees as siblings and layout
    const a = createBinomialNode(5);
    const b = createBinomialNode(3);
    a.sibling = b;
    // layoutBinomialForest mutates positions of sibling chain
    layoutBinomialForest(a);
    const { getByText } = render(
      <svg>
        <TreeSVG
          kind="Binomial"
          root={null}
          binomialHead={a}
          viewBox="0 0 300 200"
        />
      </svg>
    );
    expect(getByText("5")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
  });
});
