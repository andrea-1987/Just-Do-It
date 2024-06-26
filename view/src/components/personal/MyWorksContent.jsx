import React, { useState, useEffect } from "react";
import { CustomSpinner } from "../loading/Loader";
import { ErrorAlert } from "../error/Error";
import { DefaultPagination } from "../pagination/Pagination";
import useSession from "../../hooks/useSession";
import { worksError, isWorkLoading } from "../../redux/WorkCardSlice";
import { useSelector } from "react-redux";
import sessionData from "../../helper/session";
import { PrivateCards } from "../card/PrivateCard";

export const MyWorksContent = () => {
  const isAuthenticated = useSession();
  const isLoading = useSelector(isWorkLoading);
  const error = useSelector(worksError);

  const [page, setPage] = useState(1);
  const [works, setWorks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const getMyWorks = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/professional/${sessionData._id}/myWorks?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${sessionData.token}`,
          },
        }
      );
      const data = await response.json();
      setWorks(data.payload.myWorks);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching works:", error);
    }
  };

  useEffect(() => {
    getMyWorks();
  }, [page]);

  const handleRemove = async (workId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/professional/${sessionData._id}/myWorks/${workId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionData.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete work with ID ${workId}`);
      }
      alert("Work successfully removed!");
       getMyWorks();
    } catch (error) {
      console.error("Error deleting work:", error);
    }
  };

  const onPageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="flex-cols my-5">
      <div className="flex flex-wrap m-5">
        {isLoading && <CustomSpinner />}
        {!isLoading && error && (
          <ErrorAlert message="Ops! Qualcosa è andato storto" />
        )}
        {isAuthenticated &&
          !isLoading &&
          !error &&
          works &&
          works.map((work) => (
            <div className="m-5" key={work._id}>
              <PrivateCards
                author={work.author}
                description={work.description}
                title={work.title}
                img={work.img}
                location={work.location}
                pubDate={work.pubDate}
                workId={work._id}
                handleRemove={handleRemove}
              />
            </div>
          ))}
      </div>
      <div className="flex justify-center">
        <DefaultPagination
          onPageChange={onPageChange}
          currentPage={page}
          totalPage={totalPages}
        />
      </div>
    </div>
  );
};
