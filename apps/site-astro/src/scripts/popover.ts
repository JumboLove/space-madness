import {
  computePosition,
  autoUpdate,
  flip,
  shift,
  limitShift,
  offset,
  arrow,
} from "@floating-ui/dom";

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
  initPopper(btn, popover);
  btn.addEventListener("click", () => togglePopover(popover));
});

function setupButtonPopover(btn: PopoverButton) {
  const uniqueId = btn.dataset.popoverId;
  const popover = btn.querySelector<HTMLDivElement>(".pt-popover")!;
  popover.id = uniqueId;
  document.body.appendChild(popover as Node);
  popover.style.display = "";
  return popover;
}

function initPopper(btn: PopoverButton, popover: HTMLDivElement) {
  const arrowEl: HTMLDivElement = popover.querySelector(".pt-popover-arrow")!;
  const cleanup = autoUpdate(
    btn,
    popover,
    () => {
      computePosition(btn, popover, {
        placement: "top",
        middleware: [
          offset(10),
          flip(),
          shift({ padding: 10, limiter: limitShift(), mainAxis: true }),
          arrow({ element: arrowEl }),
        ],
      }).then(({ x, y, placement, middlewareData }) => {
        Object.assign(popover.style, {
          left: `${x}px`,
          top: `${y}px`,
        });

        const side = placement.split("-")[0];

        const staticSide = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right",
        }[side]!;

        if (middlewareData.arrow) {
          const { x, y } = middlewareData.arrow;
          Object.assign(arrowEl.style, {
            left: x != null ? `${x}px` : "",
            top: y != null ? `${y}px` : "",
            [staticSide]: `${-arrowEl.offsetWidth / 2}px`,
            transform: "rotate(45deg)",
          });
        }
      });
    },
    { animationFrame: true }
  );
}

function togglePopover(popover: HTMLDivElement) {
  popover.hasAttribute("data-show") ? hide(popover) : show(popover);
}

function show(popover: HTMLDivElement) {
  popover.setAttribute("data-show", "");
  hideOnClickOutsideOrEscape(popover);

  setOpenAttributes(popover);
  moveFocusToDialog(popover);
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
