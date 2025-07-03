import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../Button";

describe("Button component", () => {
  it("renders children and handles click", () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click Me</Button>
    );
    const btn = getByText("Click Me");
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies disabled state", () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );
    const btn = getByText("Disabled");
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
