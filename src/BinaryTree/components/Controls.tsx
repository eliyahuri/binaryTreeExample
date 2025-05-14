import type { TreeKind } from "../utils/tree";

interface ControlsProps {
  kind: TreeKind;
  setKind: (kind: TreeKind) => void;
  input: string;
  setInput: (input: string) => void;
  onInsert: () => void;
  onRemove: () => void;
}

export default function Controls({
  kind,
  setKind,
  input,
  setInput,
  onInsert,
  onRemove,
}: ControlsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-3 sm:mb-4 items-center w-full justify-center">
      <select
        value={kind}
        onChange={(e) => setKind(e.target.value as TreeKind)}
        className="border px-2 py-1 rounded dark:bg-gray-800 text-base sm:text-lg"
      >
        <option value="BST">Binary Search Tree</option>
        <option value="AVL">AVL Tree</option>
        <option value="RBT">Red-Black Tree</option>
        <option value="Binomial">Binomial Tree</option>
      </select>
      <input
        type="number"
        className="border rounded px-3 py-2 w-28 sm:w-32 text-base sm:text-lg"
        placeholder="value"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={onInsert}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-base sm:text-lg"
      >
        Insert
      </button>
      <button
        onClick={onRemove}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-base sm:text-lg"
      >
        Delete
      </button>
    </div>
  );
}
