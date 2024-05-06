// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { isWorkLoading,worksError } from "../../redux/WorkCardSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { CustomSpinner } from "../loading/Loader";
// import { ErrorAlert } from "../error/Error";
// import { DetailCard } from "../card/DetailCard";
// import { SidebarWithSearch } from "../sidebar/SideBar";
// import styles from "./detailContent.module.css";
// import sessionData from "../../helper/session";


// export const DetailContent = () => {
//     const [work, setWork] = useState(null);
//     const [selectedWork, setSelectedWork] = useState({});
//     const dispatch = useDispatch();
//     const isLoading = useSelector(isWorkLoading);
//     const error = useSelector(worksError);
//     const { _id } = useParams();

  
//     const getDetailWork = async () => {
//       try {
//         if (!_id) {
//           throw new Error("ID del lavoro non fornito");
//         }
  
//         const response = await fetch(
//           `${process.env.REACT_APP_SERVER_BASE_URL}/works/${_id}`
//         );
//         const data = await response.json();
//         if (data) {
//           setWork(data); 
//         } else {
//           throw new Error("works not found");
//         }
//       } catch (error) {
//         console.error("Error to find work", error);
//       }
//     };
  
//     useEffect(() => {
//       getDetailWork();
//     }, [_id]);
//     const handleCardClick = async (work) => {
//       console.log("ciao")
//       setSelectedWork(work);
        
      
//       if (selectedWork) {
        
//         await addToPreferWorks();
//       }
      
//     }
//     const addToPreferWorks = async () => {
//       console.log(sessionData)
//       try {
//         const response = await fetch(
//           `${process.env.REACT_APP_SERVER_BASE_URL}/${sessionData.role}/${sessionData._id}/preferWorks`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${sessionData}`,
//             },
//             body: JSON.stringify({
//               author: selectedWork.author,
//               title: selectedWork.title,
//               description: selectedWork.description,
//               img: selectedWork.img,
//               pubDate: selectedWork.pubDate,
//               location: selectedWork.location,
//               _id: selectedWork._id,
//             }),
//           }
//         );
  
//         if (response.ok) {
       
//         } else {
//           console.error(
//             "Errore durante il salvataggio del lavoro:",
//             response.statusText
//           );
//         }
//       } catch (error) {
//         console.error("Errore durante il salvataggio del lavoro:", error);
//       }
//     };
  
//     return (
//       <div className={`flex ${styles.content}`}>
//         <SidebarWithSearch/>
//         {isLoading && <CustomSpinner />}
//         {!isLoading && error && (
//           <ErrorAlert message="Ops! Qualcosa è andato storto" />
//         )}
//         {!isLoading && !error && work && work.payload && (
//           <DetailCard
//           onClick={handleCardClick}
//             className={`${styles.card}`}
//             author={work.payload.author}
//             description={work.payload.description}
//             title={work.payload.title}
//             img={work.payload.img}
//             location={work.payload.location}
//             pubDate={work.payload.pubDate}
//             _id={work.payload._id}
//           />
//         )}
//       </div>
//     );
//   };
  
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isWorkLoading, worksError } from "../../redux/WorkCardSlice";
import { CustomSpinner } from "../loading/Loader";
import { ErrorAlert } from "../error/Error";
import { DetailCard } from "../card/DetailCard";
import { SidebarWithSearch } from "../sidebar/SideBar";
import styles from "./detailContent.module.css";
import sessionData from "../../helper/session";

export const DetailContent = () => {
  const [work, setWork] = useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector(isWorkLoading);
  const error = useSelector(worksError);
  const { _id } = useParams();

  const getDetailWork = async () => {
    try {
      if (!_id) {
        throw new Error("ID del lavoro non fornito");
      }

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/works/${_id}`
      );
      const data = await response.json();
      if (data) {
        setWork(data);
      } else {
        throw new Error("works not found");
      }
    } catch (error) {
      console.error("Error to find work", error);
    }
  };

  useEffect(() => {
    getDetailWork();
  }, [_id]);

  const handleCardClick = (work) => {
    setWork(work);
  };

  const addToPreferWorks = async () => {
    console.log(work)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/${sessionData.role}/${sessionData._id}/preferWorks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionData}`,
          },
          body: JSON.stringify({
            author: work.payload.author,
            title: work.payload.title,
            description: work.payload.description,
            img: work.payload.img,
            pubDate: work.payload.pubDate,
            location: work.payload.location,
            _id: work.payload._id,
          }),
        }
      );

      if (response.ok) {
        alert("Work successfully saved");
      } else {
        console.error(
          "Errore durante il salvataggio del lavoro:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Errore durante il salvataggio del lavoro:", error);
    }
  };

  return (
    <div className={`flex ${styles.content}`}>
      <SidebarWithSearch />
      {isLoading && <CustomSpinner />}
      {!isLoading && error && (
        <ErrorAlert message="Ops! Qualcosa è andato storto" />
      )}
      {!isLoading && !error && work && work.payload && (
        <DetailCard
          onClick={handleCardClick}
          className={`${styles.card}`}
          author={work.payload.author}
          description={work.payload.description}
          title={work.payload.title}
          img={work.payload.img}
          location={work.payload.location}
          pubDate={work.payload.pubDate}
          _id={work.payload._id}
          addToPreferWorks={addToPreferWorks}
        />
      )}
    </div>
  );
};
