import type { TreeKind } from "../utils/tree";
import { Button } from "../../components/shared/Button";
import { Input } from "../../components/shared/Input";
import { Select } from "../../components/shared/Select";

/**
 * Props for the Controls component used to interact with the tree.
 */
interface ControlsProps {
  kind: TreeKind;
  setKind: (kind: TreeKind) => void;
  input: string;
  setInput: (input: string) => void;
  onInsert: () => void;
  onRemove: () => void;
}

/**
 * Renders UI controls for selecting tree type, inputting values, and triggering insert/delete operations.
 * @param props - The ControlsProps object.
 * @returns JSX element containing the controls.
 */
export default function Controls({
  kind,
  setKind,
  input,
  setInput,
  onInsert,
  onRemove,
}: ControlsProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center justify-center p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-xl">
      <div className="flex flex-col items-center gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Tree Type
        </label>
        <Select
          value={kind}
          onChange={(e) => setKind(e.target.value as TreeKind)}
          className="min-w-[180px]"
        >
          <option value="BST">Binary Search Tree</option>
          <option value="AVL">AVL Tree</option>
          <option value="RBT">Red-Black Tree</option>
          <option value="BH">Binomial Heap</option>
        </Select>
      </div>

      <div className="flex flex-col items-center gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Value
        </label>
        <Input
          type="number"
          className="w-32"
          placeholder="Enter value"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="flex gap-3 mt-6">
        <Button onClick={onInsert} variant="primary" size="md">
          Insert
        </Button>
        {kind === "BH" ? (
          <Button onClick={onRemove} variant="danger" size="md">
            Extract Min
          </Button>
        ) : (
          <Button onClick={onRemove} variant="danger" size="md">
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
