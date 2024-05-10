import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustomSpinner } from "../loading/Loader";
import { ErrorAlert } from "../error/Error";
import { UserCards } from "../card/UserCard";
import { isWorkLoading, worksError } from "../../redux/WorkCardSlice";
import { DefaultPagination } from "../pagination/Pagination";
import useSession from "../../hooks/useSession";
import sessionData from "../../helper/session";
import { useParams } from "react-router-dom";

export const WorksContent = () => {
  const isAuthenticated = useSession();

  const isLoading = useSelector(isWorkLoading);
  const error = useSelector(worksError);
  const [page, setPage] = useState(1);
  const [works, setWorks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { professionalId, workId } = useParams();

  const getAllWorks = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/allWorks?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${sessionData}`,
          },
        }
      );
      const data = await response.json();
      setWorks(data.payload);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching works:", error);
    }
  };

  useEffect(() => {
    getAllWorks();
    window.scrollTo(0, 0);
  }, [page]);

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
            <div class=" m-5">
              <UserCards
                key={work._id}
                author={work.author}
                description={work.description}
                title={work.title}
                img={work.img}
                location={work.location}
                pubDate={work.pubDate}
                _id={work._id}
                professionalId={professionalId}
                workId={workId}
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
