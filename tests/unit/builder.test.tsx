// @vitest-environment jsdom
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { Builder } from "@/components/builder/Builder";
import { DRAFT_KEY } from "@/lib/storage/draft";

vi.mock("next/link", () => ({ default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => <a href={href} {...rest}>{children}</a> }));

beforeAll(() => {
  // jsdom lacks these browser APIs.
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
  Element.prototype.scrollIntoView = () => {};
});

beforeEach(() => {
  localStorage.clear();
  window.history.replaceState(null, "", "/builder");
});

const stored = () => JSON.parse(localStorage.getItem(DRAFT_KEY) ?? "null");
const preview = () => document.querySelector<HTMLElement>('[aria-label="CV preview"]')!;

async function setup() {
  const user = userEvent.setup();
  render(<Builder />);
  await screen.findByLabelText("Full name");
  return user;
}

describe("Builder", () => {
  it("starts without an account and saves typing to this device", async () => {
    const user = await setup();
    await user.type(screen.getByLabelText("Full name"), "Ama Owusu");
    expect(within(preview()).getByText("Ama Owusu")).toBeInTheDocument();
    await waitFor(() => expect(stored()?.cv.personal.fullName).toBe("Ama Owusu"));
    expect(screen.getByText("Saved on this device")).toBeInTheDocument();
  });

  it("restores a saved draft when the page is opened again", async () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ templateId: "classic", cv: { personal: { fullName: "Kofi Mensah" } } }));
    await setup();
    expect(screen.getByLabelText("Full name")).toHaveValue("Kofi Mensah");
    expect(screen.getByRole("radio", { name: "Classic" })).toBeChecked();
  });

  it("adds, edits and reorders experience entries", async () => {
    const user = await setup();
    await user.click(screen.getByRole("button", { name: /Work experience/ }));
    await user.click(screen.getByRole("button", { name: "Add experience" }));
    await user.type(screen.getByLabelText("Job title"), "Teacher");
    await user.click(screen.getByRole("button", { name: "Add experience" }));
    const titles = screen.getAllByLabelText("Job title");
    await user.type(titles[1], "Head Teacher");

    expect(within(preview()).getByText("Teacher")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Move Head Teacher up" }));
    const order = within(preview()).getAllByText(/Teacher$/).map((n) => n.textContent);
    expect(order).toEqual(["Head Teacher", "Teacher"]);
  });

  it("asks for confirmation before deleting an entry with content", async () => {
    const user = await setup();
    await user.click(screen.getByRole("button", { name: /Work experience/ }));
    await user.click(screen.getByRole("button", { name: "Add experience" }));
    await user.type(screen.getByLabelText("Job title"), "Nurse");
    await user.click(screen.getByRole("button", { name: "Delete Nurse" }));

    const dialog = screen.getByRole("dialog", { name: "Delete this position?" });
    await user.click(within(dialog).getByRole("button", { name: "Cancel" }));
    expect(screen.getByLabelText("Job title")).toHaveValue("Nurse");

    await user.click(screen.getByRole("button", { name: "Delete Nurse" }));
    await user.click(within(screen.getByRole("dialog", { name: "Delete this position?" })).getByRole("button", { name: "Delete" }));
    expect(screen.queryByLabelText("Job title")).not.toBeInTheDocument();
  });

  it("shows format errors after leaving a field", async () => {
    const user = await setup();
    await user.type(screen.getByLabelText(/^Email/), "ama@");
    expect(screen.queryByText(/Enter a valid email/)).not.toBeInTheDocument();
    await user.tab();
    expect(screen.getByText(/Enter a valid email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email/)).toHaveAttribute("aria-invalid", "true");
  });

  it("blocks export until problems are fixed and focuses the first one", async () => {
    const user = await setup();
    await user.click(screen.getAllByRole("button", { name: /PDF/ })[0]);
    expect(screen.getByRole("alert")).toHaveTextContent("Add your full name.");
    await waitFor(() => expect(screen.getByLabelText("Full name")).toHaveFocus());
    expect(screen.getByText("Needs attention")).toBeInTheDocument();
  });

  it("switches templates and remembers the choice", async () => {
    const user = await setup();
    await user.click(screen.getByRole("radio", { name: "Minimal" }));
    await waitFor(() => expect(stored()?.templateId).toBe("minimal"));
  });

  it("starts a new CV only after confirmation", async () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ templateId: "modern", cv: { personal: { fullName: "Kofi" } } }));
    const user = await setup();
    await user.click(screen.getByRole("button", { name: "Menu" }));
    await user.click(screen.getByRole("button", { name: "Start a new CV" }));
    await user.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Clear and start again" }));
    expect(screen.getByLabelText("Full name")).toHaveValue("");
  });

  it("loads an example from the URL", async () => {
    window.history.replaceState(null, "", "/builder?example=teacher");
    render(<Builder />);
    await waitFor(() => expect(screen.getByLabelText("Full name")).toHaveValue("Comfort Akosua Ansah"));
    expect(window.location.search).toBe("");
  });

  it("keeps working when browser storage is blocked", async () => {
    const spy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    await act(async () => {
      render(<Builder />);
    });
    expect(await screen.findByText(/Not saved/)).toBeInTheDocument();
    spy.mockRestore();
  });
});
