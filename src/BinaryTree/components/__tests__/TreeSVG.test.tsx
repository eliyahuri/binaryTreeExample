import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { bstInsert, layoutTree } from "../../utils/tree";
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
        <TreeSVG root={root} viewBox="0 0 200 200" />
      </svg>
    );
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
  });
});
