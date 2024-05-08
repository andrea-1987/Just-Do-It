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

// export const DetailContent = () => {
//   const [work, setWork] = useState(null);
//   const dispatch = useDispatch();
//   const isLoading = useSelector(isWorkLoading);
//   const error = useSelector(worksError);
//   const { _id } = useParams();

//   const getDetailWork = async () => {
//     try {
//       if (!_id) {
//         throw new Error("ID del lavoro non fornito");
//       }

//       const response = await fetch(
//         `${process.env.REACT_APP_SERVER_BASE_URL}/detailWork/${_id}`
//       );
//       const data = await response.json();
//       if (data) {
//         setWork(data.payload);
//         console.log(work)
//             } else {
//         throw new Error("works not found");
//       }
//     } catch (error) {
//       console.error("Error to find work", error);
//     }
//   };
//   useEffect(() => {
//     getDetailWork();
//   }, [_id]);

//   const handleCardClick = (work) => {
//     setWork(work);
//   };

//   const addToPreferWorks = async () => {
//        try {
//       const response = await fetch(
//         `${process.env.REACT_APP_SERVER_BASE_URL}/${sessionData.role}/${sessionData._id}/preferWorks`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${sessionData}`,
//           },
//           body: JSON.stringify({
//             author: work.payload.author,
//             title: work.payload.title,
//             description: work.payload.description,
//             img: work.payload.img,
//             pubDate: work.payload.pubDate,
//             location: work.payload.location,
//             _id: work.payload._id,
//           }),
//         }
//       );

//       if (response.ok) {
//         alert("Work successfully saved");
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

//   return (
//     <div className={`flex ${styles.content}`}>
//       <SidebarWithSearch />
//       {isLoading && <CustomSpinner />}
//       {!isLoading && error && (
//         <ErrorAlert message="Ops! Qualcosa è andato storto" />
//       )}
//       {!isLoading && !error && work && work.payload && (
//         <DetailCard
//           onClick={handleCardClick}
//           className={`${styles.card}`}
//           author={work.payload.author}
//           description={work.payload.description}
//           title={work.payload.title}
//           img={work.payload.img}
//           location={work.payload.location}
//           pubDate={work.payload.pubDate}
//           _id={work.payload._id}
//           addToPreferWorks={addToPreferWorks}
//         />
//       )}
//     </div>
//   );
// };
export const DetailContent = () => {
  const [work, setWork] = useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector(isWorkLoading);
  const error = useSelector(worksError);
  const { professionalId, workId } = useParams();

  const getDetailWork = async () => {
    try {
      if (!workId) {
        throw new Error("ID del lavoro non fornito");
      }

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/allWorks/${workId}`
      );
      const data = await response.json();
      if (data && data.payload) {
        setWork(data.payload);
        console.log(work)
      } else {
        throw new Error("Lavoro non trovato");
      }
    } catch (error) {
      console.error("Errore nel trovare il lavoro", error);
    }
  };
  useEffect(() => {
    getDetailWork();
  }, [professionalId,workId]);

  const addToPreferWorks = async () => {
    try {
      if (!work) {
        throw new Error("Lavoro non trovato");
      }

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/${sessionData.role}/${sessionData._id}/preferWorks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionData}`,
          },
          body: JSON.stringify(work),
        }
      );

      if (response.ok) {
        alert("Lavoro salvato con successo");
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
      {!isLoading && !error && work && (
        <DetailCard
          className={`${styles.card}`}
          author={work.author}
          description={work.description}
          title={work.title}
          img={work.img}
          location={work.location}
          pubDate={work.pubDate}
          _id={work.workId}
          addToPreferWorks={addToPreferWorks}
        />
      )}
    </div>
  );
};
