import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from "../ThemeContext";
import { ThemeToggle } from "../ThemeToggle";

describe("ThemeToggle component", () => {
  it("toggles theme on click and updates aria-label", () => {
    const { getByRole } = render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    const btn = getByRole("button");
    const initialLabel = btn.getAttribute("aria-label");
    fireEvent.click(btn);
    const newLabel = btn.getAttribute("aria-label");
    expect(initialLabel).not.toBe(newLabel);
  });
});
