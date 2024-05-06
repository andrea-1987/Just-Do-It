import React,{useState,useEffect} from "react";
import { MainLayout } from "../layout/MainLayout";
import { DefaultPagination } from "../components/pagination/Pagination";
import sessionData from "../helper/session";
import { UserCards } from "../components/card/UserCard";
import { isWorkLoading,worksError } from "../redux/WorkCardSlice";
import { useSelector } from "react-redux";
import useSession from "../hooks/useSession";
import { SidebarWithSearch } from "../components/sidebar/SideBar";
import { CustomSpinner } from "../components/loading/Loader";
import { ErrorAlert } from "../components/error/Error";

const MyWorks = () => {
  const isAuthenticated = useSession();
  const isLoading = useSelector(isWorkLoading);
  const error = useSelector(worksError);


  const [page, setPage] = useState(1);
  const [works, setWorks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);



  const getMyWorks = async (e) => {
      try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/${sessionData.role}/${sessionData._id}/myWorks?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: sessionData,
          },
        }
      );
      const data = await response.json();
      setWorks(data.payload.myWorks);
      setTotalPages(data.totalPages);
      console.log(works.myWorks)
    } catch (error) {
      alert("Error fetching works:", error);
    }
  };
  useEffect(() => {
    getMyWorks();
    window.scrollTo(0, 0);
  }, [page]);
  const onPageChange = (newPage) => {
    setPage(newPage);
  };
  
  return (
    <MainLayout>
      <SidebarWithSearch />
      {isLoading && <CustomSpinner />}
      {!isLoading && error && <ErrorAlert message="Ops! Qualcosa è andato storto" />}
      {isAuthenticated && !isLoading && !error && works && works.length > 0 && works[0].myWorks && (
        works[0].myWorks.map((work) => (
          <div key={work._id}>
            <UserCards
              author={work.author}
              description={work.description}
              title={work.title}
              img={work.img}
              location={work.location}
              pubDate={work.pubDate}
              _id={work._id}
            />
          </div>
        ))
      )}
      <DefaultPagination
        onPageChange={onPageChange}
        currentPage={page}
        totalPage={totalPages}
      />
    </MainLayout>
  );
  
};

export default MyWorks;
// import React, { useState, useEffect } from "react";
// import { MainLayout } from "../layout/MainLayout";
// import { DefaultPagination } from "../components/pagination/Pagination";
// import sessionData from "../helper/session";
// import { UserCards } from "../components/card/UserCard";
// import useSession from "../hooks/useSession";
// import { SidebarWithSearch } from "../components/sidebar/SideBar";
// import { CustomSpinner } from "../components/loading/Loader";
// import { ErrorAlert } from "../components/error/Error";

// const MyWorks = () => {
//   const isAuthenticated = useSession();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [works, setWorks] = useState([]);
//   const [totalPages, setTotalPages] = useState(0);

//   const fetchMyWorks = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_SERVER_BASE_URL}/${sessionData.role}/${sessionData._id}/myWorks?page=${page}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-type": "application/json",
//             authorization: sessionData,
//           },
//         }
//       );
//       const data = await response.json();
//       if(response.ok){
//         setWorks(data.payload);
//         setTotalPages(data.totalPages);
//         setError(null);
//         console.log(works)
//       }
//     } catch (error) {
//       setError("Error fetching works: " + error.message);
//     }
//     setIsLoading(false);
//   };
  
//   useEffect(() => {
//     fetchMyWorks();
//     window.scrollTo(0, 0);
//   }, [page]);

//   const onPageChange = (newPage) => {
//     setPage(newPage);
//   };

//   return (
//     <MainLayout>
//       <SidebarWithSearch />
//       {isAuthenticated && (
//         <>
//           {isLoading && <CustomSpinner />}
//           {error && <ErrorAlert message={error} />}
//           {works.myWorks && works.myWorks.length > 0 && (
//             <>
//               {works.myWorks.map((work) => (
//                 <div key={work._id}>
//                   <UserCards
//                     author={work.author}
//                     description={work.description}
//                     title={work.title}
//                     img={work.img}
//                     location={work.location}
//                     pubDate={work.pubDate}
//                     _id={work._id}
//                   />
//                 </div>
//               ))}
//               <DefaultPagination
//                 onPageChange={onPageChange}
//                 currentPage={page}
//                 totalPage={totalPages}
//               />
//             </>
//           )}
//         </>
//       )}
//     </MainLayout>
//   );
// };

// export default MyWorks;
