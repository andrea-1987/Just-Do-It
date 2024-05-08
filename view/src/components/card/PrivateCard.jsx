import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

export function PrivateCards({
  author,
  title,
  description,
  pubDate,
  img,
  location,
  _id,
  handleRemove,
}) {
  const local = useLocation();

  const shouldShowModifyButton = local.pathname === "/myWorks";

  return (
    <div class="transition delay-150 duration-300 ease-in-out hover:scale-110 relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
      <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
        <img src={img} alt="profile-picture" />
      </div>
      <div class="p-6 text-center">
        <Typography variant="h4" color="blue-gray" className="mb-4 uppercase">
          {author}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="mb-4 uppercase">
          {title}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {description}
        </Typography>
        <p class="my-4">{location}</p>
        <p class="mt-4">{pubDate}</p>
      </div>
      <Button
        onClick={handleRemove}
        variant="text"
        className="flex items-center gap-2"
      >
        Remove
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </Button>
      {shouldShowModifyButton && (
        <Button variant="text" className="flex items-center gap-2">
          Modify
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Button>
      )}
    </div>
  );
}
