export const Tag = ({
  value,
  onRemove,
}: {
  value: string;
  onRemove: (tag: string) => void;
}) => (
  <div>
    {value}{" "}
    <button
      type="button"
      aria-label={`Remove ${value}`}
      onClick={() => onRemove(value)}
    >
      x
    </button>
  </div>
);
