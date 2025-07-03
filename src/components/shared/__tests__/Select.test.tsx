import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Select } from '../Select';

describe("Select component", () => {
  it('renders options and calls onChange on user input', () => {
    const handleChange = vi.fn();
    const { getByRole, getByText } = render(
      <Select value="a" onChange={handleChange}>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </Select>
    );
    const select = getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('a');
    // ensure options render
    expect(getByText('Option A')).toBeInTheDocument();
    expect(getByText('Option B')).toBeInTheDocument();
    // user selects new option
    fireEvent.change(select, { target: { value: 'b' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: expect.objectContaining({ value: 'b' }) })
    );
  });
});
