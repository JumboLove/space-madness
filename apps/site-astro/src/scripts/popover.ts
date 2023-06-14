import type { Instance } from "@popperjs/core/lib/types";
import { createPopper } from "@popperjs/core";

export {};

interface PopoverButton extends HTMLButtonElement {
  dataset: {
    popoverId: string;
  };
}

const popoverButtons: NodeListOf<PopoverButton> =
  document.querySelectorAll("[data-popover-id]");
popoverButtons.forEach((btn) => {
  const popover = setupButtonPopover(btn);
  const popperInstance = initPopper(btn, popover);
  btn.addEventListener("click", () => togglePopover(popover, popperInstance));
});

function setupButtonPopover(btn: PopoverButton) {
  const popover = btn.querySelector<HTMLDivElement>(".pt-popover")!;
  document.body.appendChild(popover as Node);
  popover.style.display = "";
  return popover;
}

function initPopper(btn: PopoverButton, popover: HTMLDivElement) {
  return createPopper(btn, popover, {
    placement: "top",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
      {
        name: "preventOverflow",
        options: {
          altAxis: true,
          padding: 10,
        },
      },
    ],
  });
}

function togglePopover(popover: HTMLDivElement, popperInstance: Instance) {
  popover.hasAttribute("data-show")
    ? hide(popover)
    : show(popover, popperInstance);
}

function show(popover: HTMLDivElement, popperInstance: Instance) {
  popover.setAttribute("data-show", "");
  hideOnClickOutsideOrEscape(popover);

  setOpenAttributes(popover);
  moveFocusToDialog(popover);

  // We need to tell Popper to update the tooltip position
  // after we show the tooltip, otherwise it will be incorrect
  popperInstance.update();
}

function hide(popover: HTMLDivElement) {
  popover.removeAttribute("data-show");
  setClosedAttributes(popover);
  moveFocusToButton(popover);
}

function setOpenAttributes(popover: HTMLDivElement) {
  const btn = getPopoverBtn(popover);
  if (!btn) {
    return;
  }
  btn.ariaExpanded = "true";
}

function setClosedAttributes(popover: HTMLDivElement) {
  const btn = getPopoverBtn(popover);
  if (!btn) {
    return;
  }
  btn.ariaExpanded = "false";
}

function moveFocusToDialog(popover: HTMLDivElement) {
  popover.querySelector("a")?.focus();
}

function moveFocusToButton(popover: HTMLDivElement) {
  const btn = getPopoverBtn(popover);
  if (!btn) {
    return;
  }
  btn.focus();
}

function hideOnClickOutsideOrEscape(element: HTMLDivElement) {
  const outsideClickListener = (event: MouseEvent) => {
    if (!element.contains(event.target as Node)) {
      hide(element);
      removeClickListener();
      remmoveKeyHandler();
    }
  };

  const escapeKeyListener = (event: KeyboardEvent) => {
    const { key } = event;
    if (key === "Escape") {
      hide(element);
      removeClickListener();
      remmoveKeyHandler();
    }
  };

  const remmoveKeyHandler = () => {
    document.removeEventListener("keydown", escapeKeyListener);
  };

  const removeClickListener = () => {
    document.removeEventListener("click", outsideClickListener);
  };

  window.setTimeout(() => {
    document.addEventListener("click", outsideClickListener);
    document.addEventListener("keydown", escapeKeyListener);
  }, 0);
}

function getPopoverBtn(popover: HTMLDivElement): HTMLButtonElement | null {
  const id = popover.id;
  return document.querySelector(`[data-popover-id="${id}"]`);
}
