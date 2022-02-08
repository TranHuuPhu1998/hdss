import React from 'react';

type Props = {};

const DangerCircle = (props: Props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18.5C14.687 18.5 18.5 14.687 18.5 10C18.5 5.313 14.687 1.5 10 1.5C5.313 1.5 1.5 5.313 1.5 10C1.5 14.687 5.313 18.5 10 18.5ZM10 0C15.514 0 20 4.486 20 10C20 15.514 15.514 20 10 20C4.486 20 0 15.514 0 10C0 4.486 4.486 0 10 0Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0059 8.62787C10.4199 8.62787 10.7559 8.96387 10.7559 9.37787V13.7969C10.7559 14.2109 10.4199 14.5469 10.0059 14.5469C9.59186 14.5469 9.25586 14.2109 9.25586 13.7969V9.37787C9.25586 8.96387 9.59186 8.62787 10.0059 8.62787Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.9961 5.20312C10.5491 5.20312 11.0011 5.65013 11.0011 6.20312C11.0011 6.75612 10.5581 7.20312 10.0061 7.20312H9.9961C9.4431 7.20312 8.9961 6.75612 8.9961 6.20312C8.9961 5.65013 9.4431 5.20312 9.9961 5.20312Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default DangerCircle;
