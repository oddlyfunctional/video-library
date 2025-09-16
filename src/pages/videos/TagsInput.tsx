import { InputBase, InputWrapper } from "../../components/Input.tsx";
import { Tag } from "./Tag.tsx";

const RemovableTag = ({
  tag,
  onRemove,
}: {
  tag: string;
  onRemove: (tag: string) => void;
}) => (
  <button
    type="button"
    aria-label={`Remove ${tag}`}
    onClick={(ev) => {
      ev.preventDefault();
      onRemove(tag);
    }}
    className="cursor-pointer"
  >
    <Tag className="hover:bg-gray-500">
      <div className="flex items-center gap-2">
        <span>{tag}</span>
        {/* TODO: fix alignment issue */}
        <span className="-translate-y-0.5">&#10799;</span>
      </div>
    </Tag>
  </button>
);

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
    <InputWrapper>
      <div className="flex gap-1">
        {tags.map((tag) => (
          <RemovableTag tag={tag} onRemove={removeTag} key={tag} />
        ))}
      </div>
      <InputBase
        type="text"
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            addTag(ev.currentTarget);
          }
        }}
        onBlur={(ev) => addTag(ev.currentTarget)}
        placeholder={
          tags.length === 0 ? "Add tags (e.g. cats, memes, gaming)" : ""
        }
      />
    </InputWrapper>
  );
};
