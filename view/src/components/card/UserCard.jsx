import React from "react";
import { useNavigate } from "react-router-dom";
import { Button,Typography } from "@material-tailwind/react";

export function UserCards({ author, title, pubDate, img, location, _id }) {
  const navigate = useNavigate();

  const handleDetailPage = () => {
    navigate(`/allWorks/${_id}`);
  };

  return (
    <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
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
        <p class="my-4">{location}</p>
        <p class="mt-4">{pubDate}</p>
      </div>
      <Button
        onClick={handleDetailPage}
        variant="text"
        className="flex items-center gap-2"
      >
        Learn More
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
         </div>
  );
}
