export const LocationIcon = ({
  width = "20",
  height = "20",
  color = "#BD9574",
  ...props
}) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.625 10.2949C18.625 16.1283 11.125 21.1283 11.125 21.1283C11.125 21.1283 3.625 16.1283 3.625 10.2949C3.625 8.3058 4.41518 6.39815 5.8217 4.99162C7.22822 3.5851 9.13587 2.79492 11.125 2.79492C13.1141 2.79492 15.0218 3.5851 16.4283 4.99162C17.8349 6.39815 18.625 8.3058 18.625 10.2949Z"
        stroke={color}
        strokeWidth="1.56"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.125 12.7949C12.5057 12.7949 13.625 11.6756 13.625 10.2949C13.625 8.91422 12.5057 7.79492 11.125 7.79492C9.74431 7.79492 8.625 8.91422 8.625 10.2949C8.625 11.6756 9.74431 12.7949 11.125 12.7949Z"
        stroke={color}
        strokeWidth="1.56"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
