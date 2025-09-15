import { Tag } from "./Tag.tsx";

export const TagsInput = ({
  tags,
  onSetTags,
}: {
  tags: string[];
  onSetTags: (tags: string[]) => void;
}) => {
  const addTag = (input: HTMLInputElement) => {
    if (input.value === "") return;
    onSetTags([...tags, input.value]);
    input.value = "";
  };

  const removeTag = (tag: string) => onSetTags(tags.filter((t) => t !== tag));

  return (
    <div>
      {tags.map((tag) => (
        <Tag value={tag} onRemove={removeTag} key={tag} />
      ))}
      <input
        type="text"
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            addTag(ev.currentTarget);
          }
        }}
        onBlur={(ev) => addTag(ev.currentTarget)}
      />
    </div>
  );
};
