import React from "react";

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
}

const GadLogoBgNone: React.FC<SvgProps> = ({
  height = 32,
  width,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width}
    height={height}
    viewBox="0 0 25.596 32"
    {...props}
  >
    <path d="m 12.787,0 c -1.771,0 -3.4369998,0.335 -4.9989998,1.004 -1.547,0.67 -2.901,1.584 -4.061,2.745 -1.146,1.16 -2.053,2.522 -2.723,4.084 C 0.33500017,9.38 1.6784667e-7,11.038 1.6784667e-7,12.809 V 32 H 6.3820002 V 19.213 12.809 c 0,-0.878 0.163,-1.703 0.491,-2.477 0.342,-0.788 0.803,-1.473 1.384,-2.053 0.58,-0.58 1.257,-1.034 2.0309998,-1.361 0.788,-0.342 1.621,-0.513 2.499,-0.513 0.878,0 1.703,0.171 2.477,0.513 0.788,0.327 1.473,0.781 2.053,1.361 0.58,0.58 1.034,1.265 1.361,2.053 0.342,0.774 0.513,1.599 0.513,2.477 V 19.213 32 h 6.405 V 12.809 c 0,-1.77 -0.335,-3.429 -1.004,-4.976 C 23.922,6.271 23.007,4.909 21.847,3.749 20.686,2.588 19.325,1.674 17.763,1.004 16.216,0.335 14.557,0 12.787,0 Z m -2.15,19.17 A 3.209,3.209 0 0 0 7.4280002,22.379 3.209,3.209 0 0 0 10.637,25.588 3.209,3.209 0 0 0 13.846,22.379 3.209,3.209 0 0 0 10.637,19.17 Z" />
  </svg>
);

export default GadLogoBgNone;
