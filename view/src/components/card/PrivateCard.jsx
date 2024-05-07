import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import sessionData from "../../helper/session";
import { useLocation } from "react-router-dom";

export function PrivateCards({
  author,
  title,
  description,
  pubDate,
  img,
  location,
  _id,
}) {
  const local = useLocation();

  const handleRemove = async () => {
    try {
      let deleteEndpoint = "";
      if (local.pathname === "/myWorks") {
        deleteEndpoint = `${process.env.REACT_APP_SERVER_BASE_URL}/${sessionData.role}/${sessionData._id}/myWorks/${_id}`;
      } else if (local.pathname === "/preferWorks") {
        deleteEndpoint = `${process.env.REACT_APP_SERVER_BASE_URL}/${sessionData.role}/${sessionData._id}/preferWorks/${_id}`;
      } else {
        throw new Error("Unsupported route");
      }

      const response = await fetch(deleteEndpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionData.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete work with ID ${_id}`);
      }

      alert("Work successfully removed!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting work:", error);
    }
  };
  const shouldShowModifyButton = local.pathname === "/myWorks";

  return (
    <Card className="w-full max-w-[48rem] flex-row">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none aspect-ratio:16/9"
      >
        <img
          src={img}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          {author}
        </Typography>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          {location}
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {description}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {pubDate}
        </Typography>
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
      </CardBody>
    </Card>
  );
}
