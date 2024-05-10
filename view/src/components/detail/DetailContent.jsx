import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isWorkLoading, worksError } from "../../redux/WorkCardSlice";
import { CustomSpinner } from "../loading/Loader";
import { ErrorAlert } from "../error/Error";
import { DetailCard } from "../card/DetailCard";
import styles from "./detailContent.module.css";
import sessionData from "../../helper/session";

export const DetailContent = () => {
  const [work, setWork] = useState(null);
  const [preferWorks,setPreferWorks]=useState([])
  const dispatch = useDispatch();
  const isLoading = useSelector(isWorkLoading);
  const error = useSelector(worksError);
  const { professionalId, workId } = useParams();

  const getDetailWork = async () => {
    try {
      if (!workId) {
        throw new Error("ID of work not found");
      }

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/allWorks/${workId}`
      );
      const data = await response.json();
      if (data && data.payload) {
        setWork(data.payload);
      } else {
        throw new Error("Work not found");
      }
    } catch (error) {
      alert("error to find work", error);
    }
  };
  useEffect(() => {
    getDetailWork();
  }, [professionalId, workId]);

 const addToPreferWorks = async () => {
   console.log(sessionData.role,sessionData._id)
   if (!work || !sessionData.role || !sessionData._id) {
     throw new Error("Work or session undefined");
   }else{
  try {
       const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/${sessionData.role}/${sessionData._id}/preferWorks`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionData,
        },
        body: JSON.stringify(work), 
      }
    );

    if (response.ok) {
      alert("Work successfully saved!");
    } else {
      const errorData = await response.json(); 
        throw new Error("Error to save work: " + errorData.message);
    }
  } catch (error) {
    alert(error.message);
  }}
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
