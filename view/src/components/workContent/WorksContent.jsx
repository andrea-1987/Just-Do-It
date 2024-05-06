// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { CustomSpinner } from "../loading/Loader";
// import { ErrorAlert } from "../error/Error";
// import { UserCards } from "../card/UserCard";
// import { isWorkLoading, worksError } from "../../redux/WorkCardSlice";
// import styles from "./workContent.module.css";
// import { DefaultPagination } from "../pagination/Pagination";
// import useSession from "../../hooks/useSession";
// import sessionData from "../../helper/session";

// export const WorksContent = () => {
//   const isAuthenticated = useSession();

//   const isLoading = useSelector(isWorkLoading);
//   const error = useSelector(worksError);
//   const [page, setPage] = useState(1);
//   const [works, setWorks] = useState([]);
//   const [selectedWork, setSelectedWork] = useState({});
//   const [totalPages, setTotalPages] = useState(0);

//   const getAllWorks = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_SERVER_BASE_URL}/works?page=${page}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-type": "application/json",
//             authorization: sessionData,
//           },
//         }
//       );
//       const data = await response.json();
//       setWorks(data.payload);
//       setTotalPages(data.totalPages);
//         } catch (error) {
//       alert("Error fetching works:", error);
//     }
//   };
//   const handleCardClick = (work) => {
//     setSelectedWork(work);
//   };
//   const addToPreferWorks = async () => {
//     console.log(sessionData)
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_SERVER_BASE_URL}/${sessionData.role}/${sessionData._id}/preferWorks`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${sessionData}`,
//           },
//           body: JSON.stringify({
//             author: selectedWork.author,
//             title: selectedWork.title,
//             description: selectedWork.description,
//             img: selectedWork.img,
//             pubDate: selectedWork.pubDate,
//             location: selectedWork.location,
//             _id: selectedWork._id,
//           }),
//         }
//       );

//       if (response.ok) {

//       } else {
//         console.error(
//           "Errore durante il salvataggio del lavoro:",
//           response.statusText
//         );
//       }
//     } catch (error) {
//       console.error("Errore durante il salvataggio del lavoro:", error);
//     }
//   };
//   useEffect(() => {
//     getAllWorks();
//     window.scrollTo(0, 0);
//   }, [page]);

//   const onPageChange = (newPage) => {
//     setPage(newPage);
//   };
//   return (
//     <div className={`${styles.content}`}>
//       {isLoading && <CustomSpinner />}
//       {!isLoading && error && (
//         <ErrorAlert message="Ops! Qualcosa è andato storto" />
//       )}
//       {isAuthenticated &&
//         !isLoading &&
//         !error &&
//         works.map((work) => (
//           <div key={work._id}>
//             <UserCards
//             onClick={handleCardClick}
//               className={`${styles.card}`}
//               author={work.author}
//               description={work.description}
//               title={work.title}
//               img={work.img}
//               location={work.location}
//               pubDate={work.pubDate}
//               _id={work._id}
//             />
//           </div>
//         ))}

//       <DefaultPagination
//         onPageChange={onPageChange}
//         currentPage={page}
//         totalPage={totalPages}
//       />
//     </div>
//   );
// };
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustomSpinner } from "../loading/Loader";
import { ErrorAlert } from "../error/Error";
import { UserCards } from "../card/UserCard";
import { isWorkLoading, worksError } from "../../redux/WorkCardSlice";
import styles from "./workContent.module.css";
import { DefaultPagination } from "../pagination/Pagination";
import useSession from "../../hooks/useSession";
import sessionData from "../../helper/session";

export const WorksContent = () => {
  const isAuthenticated = useSession();

  const isLoading = useSelector(isWorkLoading);
  const error = useSelector(worksError);
  const [page, setPage] = useState(1);
  const [works, setWorks] = useState([]);
  const [selectedWork, setSelectedWork] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  
  const getAllWorks = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/works?page=${page}`,
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
    <div className={styles.content}>
      {isLoading && <CustomSpinner />}
      {!isLoading && error && (
        <ErrorAlert message="Ops! Qualcosa è andato storto" />
      )}
      {isAuthenticated &&
        !isLoading &&
        !error &&
        works.map((work) => (
          <UserCards
          key={work._id}
                  className={styles.card}
          author={work.author}
          description={work.description}
          title={work.title}
          img={work.img}
          location={work.location}
          pubDate={work.pubDate}
          _id={work._id}
         
          />
        ))}
      <DefaultPagination
        onPageChange={onPageChange}
        currentPage={page}
        totalPage={totalPages}
        />
    </div>
  );
};
