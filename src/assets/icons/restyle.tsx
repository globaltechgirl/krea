import type { SVGProps } from "react";

const RestyleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    width="24" 
    height="24" 
    className="absolute inset-0 bottom-[1px] left-0.5 m-auto text-white" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask id="cutoutMask">
      <rect x="1" y="5.11182" width="16" height="15" rx="4" fill="white"></rect>
      <g transform="translate(9, 12.6) scale(0.5) translate(-12, -12)">
        <g fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M22 12c0 6-4.39 10-9.806 10C7.792 22 4.24 19.665 3 16m-1-4C2 6 6.39 2 11.807 2C16.208 2 19.758 4.335 21 8"></path>
            <path d="m7 17l-4-1l-1 4M17 7l4 1l1-4"></path>
        </g>
      </g>
    </mask>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.263 7.174c-.626-.762-1.757-.873-2.52-.25l-1.226 1.004a1.002 1.002 0 00-.356.828v6.401c0 .375.167.73.458.964l1.214.998c.316.261.719.404 1.134.404a1.6 1.6 0 001.794-1.79l.012-7.598a1.6 1.6 0 00-.51-1.061z" fill="currentColor"></path>
    <rect x="1" y="5.11182" width="16" height="15" rx="4" fill="currentColor" mask="url(#cutoutMask)"></rect>
  </svg>
);

export default RestyleIcon;
