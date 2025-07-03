import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Controls from "../Controls";
import type { TreeKind } from "../../utils/tree";

describe("Controls component", () => {
  const mockSetKind = vi.fn();
  const mockSetInput = vi.fn();
  const mockOnInsert = vi.fn();
  const mockOnRemove = vi.fn();
  const mockOnExtract = vi.fn();
  const baseProps = {
    kind: "BST" as TreeKind,
    setKind: mockSetKind,
    input: "",
    setInput: mockSetInput,
    onInsert: mockOnInsert,
    onRemove: mockOnRemove,
    onExtractMin: mockOnExtract,
  };

  it("renders controls and calls callbacks", () => {
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Controls {...baseProps} />
    );
    // Select change for Tree Type
    const select = getByRole("combobox") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "AVL" } });
    expect(mockSetKind).toHaveBeenCalledWith("AVL");
    // Input change for Value
    const input = getByPlaceholderText("Enter value") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "42" } });
    expect(mockSetInput).toHaveBeenCalledWith("42");
    // Buttons
    fireEvent.click(getByText("Insert"));
    expect(mockOnInsert).toHaveBeenCalled();
    fireEvent.click(getByText("Delete"));
    expect(mockOnRemove).toHaveBeenCalled();
  });

  it("shows extract button for Binomial", () => {
    const { getByText } = render(<Controls {...baseProps} kind="Binomial" />);
    expect(getByText("Extract Min")).toBeInTheDocument();
    fireEvent.click(getByText("Extract Min"));
    expect(mockOnExtract).toHaveBeenCalled();
  });
});
