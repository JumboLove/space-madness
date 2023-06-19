import type { SVGAttributes } from "react";

export default function PopoverBubble(props: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M 2.25 12.76 C 2.25 14.36 3.373 15.754 4.957 15.987 C 6.086 16.153 7.227 16.28 8.379999999999999 16.366 C 8.729999999999999 16.392 9.049999999999999 16.576 9.245 16.867 L 12 21 L 14.754999999999999 16.867 C 14.950839941854143 16.575750864253962 15.269918354298483 16.39094360120688 15.62 16.366 C 16.765152683878647 16.2805063361917 17.906882039836873 16.154092239618144 19.043 15.987 C 20.627 15.754 21.75 14.361 21.75 12.759 L 21.75 6.741 C 21.75 5.138999999999999 20.627 3.7459999999999996 19.043 3.5129999999999995 C 16.71094028603547 3.1707110118201696 14.357045545881345 2.9992546367244564 12 3 C 9.608 3 7.256 3.175 4.957 3.513 C 3.373 3.746 2.25 5.14 2.25 6.741 L 2.25 12.759 L 2.25 12.76 Z"
      />
    </svg>
  );
}
