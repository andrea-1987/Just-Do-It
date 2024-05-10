import React, { useState, useEffect } from "react";
import { CustomSpinner } from "../loading/Loader";
import { ErrorAlert } from "../error/Error";
import { DefaultPagination } from "../pagination/Pagination";
import useSession from "../../hooks/useSession";
import { worksError, isWorkLoading } from "../../redux/WorkCardSlice";
import { useSelector } from "react-redux";
import sessionData from "../../helper/session";
import { PrivateCards } from "../card/PrivateCard";

export const PreferWorksContent = () => {
  const isAuthenticated = useSession();
  const isLoading = useSelector(isWorkLoading);
  const error = useSelector(worksError);

  const [page, setPage] = useState(1);
  const [works, setWorks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const getPreferWorks = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/${sessionData.role}/${sessionData._id}/preferWorks?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${sessionData}`,
          },
        }
      );
      const data = await response.json();
      setWorks(data.payload.preferWorks);
      setTotalPages(data.totalPages);
       } catch (error) {
      console.error("Error fetching works:", error);
    }
  };

  useEffect(() => {
    getPreferWorks();
  }, [page]);

  const handleRemove = async (workId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/${sessionData.role}/${sessionData._id}/preferWorks/${workId}`,
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
      window.location.reload();
    } catch (error) {
      console.error("Error deleting work:", error);
    }
  };

  const onPageChange = (newPage) => {
    setPage(newPage);
  };
  return (
    <div class="flex-cols my-5">
      <div class="flex flex-wrap m-5">
        {isLoading && <CustomSpinner />}
        {!isLoading && error && (
          <ErrorAlert message="Ops! Qualcosa è andato storto" />
        )}
        {isAuthenticated &&
          !isLoading &&
          !error &&
          works &&
          works.map((work) => (
            <div class="m-5">
              <PrivateCards
                key={work._id}
                author={work.author}
                description={work.description}
                title={work.title}
                img={work.img}
                location={work.location}
                pubDate={work.pubDate}
                _id={work._id}
                handleRemove={() => handleRemove(work._id)}
              />
            </div>
          ))}
      </div>
      <div class="flex justify-center">
        <DefaultPagination
          onPageChange={onPageChange}
          currentPage={page}
          totalPage={totalPages}
        />
      </div>
    </div>
  );
};
