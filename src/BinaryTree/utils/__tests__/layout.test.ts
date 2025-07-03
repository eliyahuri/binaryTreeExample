import { describe, it, expect } from "vitest";
import { createBinomialNode, layoutBinomialForest } from "../tree";

// Test layout positions roughly increase for sibling trees

describe("layoutBinomialForest", () => {
  it("assigns x and y to nodes in forest without error", () => {
    const head = createBinomialNode(1);
    // layoutBinomialForest mutates nodes, returns void
    layoutBinomialForest(head);
    // head node should have x and y defined
    expect(head.x).toBeTypeOf("number");
    expect(head.y).toBeTypeOf("number");
  });
});
