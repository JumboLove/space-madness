/**
 * @example:
 * <Popover>
 *  <>
 *    <PopoverTrigger>Click me</Popover>
 *    <PopoverContent>To show this</PopoverContent>
 *  </>
 * </Popover>
 *
 * This component will only handle rendering of content.
 * All interactivity will be handled by src/scripts/popover.ts
 */

import * as React from "react";
import { generateUniqueId } from "@/lib/stringUtils";
import PopoverBubble from "@/components/svg/PopoverBubble";

import { cn } from "@/lib/utils";

const Popover = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const uniqueId = `popover-${generateUniqueId()}`;

  return (
    <button
      ref={ref}
      data-popover-id={uniqueId}
      className={cn("popover-link", className)}
      aria-expanded="false"
      aria-haspopup="dialog"
      aria-describedby={uniqueId}
      {...props}
    >
      {children}
      <PopoverBubble className="inline h-4 w-4 text-sky-500" />
    </button>
  );
});
Popover.displayName = "Popover";

const PopoverTrigger = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("", className)} {...props} />
));
PopoverTrigger.displayName = "PopoverTrigger";

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "pt-popover not-prose rounded-md border-2 border-gray-200 bg-gray-50 p-4 drop-shadow-lg dark:border-zinc-700 dark:bg-zinc-800",
      className
    )}
    {...props}
    style={{ display: "none" }}
  >
    {children}
    <div className="pt-popover-arrow" />
  </div>
));
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
