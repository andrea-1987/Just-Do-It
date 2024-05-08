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
        console.log(work);
      } else {
        throw new Error("Lavoro non trovato");
      }
    } catch (error) {
      console.error("Errore nel trovare il lavoro", error);
    }
  };
  useEffect(() => {
    getDetailWork();
  }, [professionalId, workId]);

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
        alert("Work successfully saved");
      } else {
        console.error("Error to save:", response.statusText);
      }
    } catch (error) {
      console.error("Error to save:", error);
    }
  };

  return (
    <div class="flex-cols my-5">
      {isLoading && <CustomSpinner />}
      {!isLoading && error && (
        <ErrorAlert message="Ops! Qualcosa è andato storto" />
      )}
      {!isLoading && !error && work && (
        <div class="justify-center">
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
        </div>
      )}
    </div>
  );
};
