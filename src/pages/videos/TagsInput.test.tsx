import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TagsInput } from "./TagsInput.tsx";

describe("TagsInput", () => {
  test("renders tags", () => {
    render(<TagsInput tags={["Tag 1", "Tag 2"]} onSetTags={() => {}} />);
    expect(screen.getByText("Tag 1")).toBeInTheDocument();
    expect(screen.getByText("Tag 2")).toBeInTheDocument();
  });

  test("sets new tag on blur", async () => {
    const onSetTags = vi.fn();
    render(<TagsInput tags={[]} onSetTags={onSetTags} />);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    await userEvent.type(input, "My Tag");
    await userEvent.tab();

    expect(onSetTags).toHaveBeenCalledWith(["My Tag"]);
    expect(input.value).toEqual("");
  });

  test("sets new tag on Enter", async () => {
    const onSetTags = vi.fn();
    render(<TagsInput tags={[]} onSetTags={onSetTags} />);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    await userEvent.type(input, "My Tag{Enter}");

    expect(onSetTags).toHaveBeenCalledWith(["My Tag"]);
    expect(input.value).toEqual("");
  });

  test("doesn't submit form on Enter", async () => {
    const onSubmit = vi.fn();
    render(
      <form onSubmit={onSubmit}>
        <TagsInput tags={[]} onSetTags={() => {}} />
      </form>,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    await userEvent.type(input, "My Tag{Enter}");

    expect(onSubmit).not.toHaveBeenCalled();
  });

  test("doesn't allow adding empty tag", async () => {
    const onSetTags = vi.fn();
    render(<TagsInput tags={[]} onSetTags={onSetTags} />);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    await userEvent.type(input, "{Enter}");

    expect(onSetTags).not.toHaveBeenCalled();
  });

  test("includes previous tags when setting new one", async () => {
    const onSetTags = vi.fn();
    render(<TagsInput tags={["Tag 1"]} onSetTags={onSetTags} />);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    await userEvent.type(input, "Tag 2{Enter}");

    expect(onSetTags).toHaveBeenCalledWith(["Tag 1", "Tag 2"]);
  });

  test("removes tag when clicking on 'x' button", async () => {
    const onSetTags = vi.fn();
    render(<TagsInput tags={["Tag 1", "Tag 2"]} onSetTags={onSetTags} />);

    await userEvent.click(screen.getByLabelText("Remove Tag 1"));

    expect(onSetTags).toHaveBeenCalledWith(["Tag 2"]);
  });

  test("doesn't submit form on removing tag", async () => {
    const onSubmit = vi.fn();
    render(
      <form onSubmit={onSubmit}>
        <TagsInput tags={["My Tag"]} onSetTags={() => {}} />
      </form>,
    );

    await userEvent.click(screen.getByLabelText("Remove My Tag"));

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
