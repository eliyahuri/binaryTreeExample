import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Input } from "../Input";

describe("Input component", () => {
  it("renders initial value and calls onChange on user input", () => {
    const handleChange = vi.fn();
    const { getByPlaceholderText } = render(
      <Input
        value="initial"
        onChange={handleChange}
        placeholder="Enter value"
      />
    );
    const input = getByPlaceholderText("Enter value") as HTMLInputElement;
    expect(input.value).toBe("initial");
    fireEvent.change(input, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "test" }),
      })
    );
  });
});
