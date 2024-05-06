import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function DefaultPagination({ currentPage, totalPage, onPageChange }) {

  const prev = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  const next = () => {
    if (currentPage === totalPage) return;
    onPageChange(currentPage + 1);
  };
  console.log(currentPage);
  console.log(totalPage);

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPage }, (_, index) => (
          <IconButton
            key={index + 1}
            variant={currentPage === index + 1 ? "filled" : "text"}
            color="gray"
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={currentPage === totalPage}
      >
        Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}