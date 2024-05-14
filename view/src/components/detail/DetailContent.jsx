import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CustomSpinner } from "../loading/Loader";
import { ErrorAlert } from "../error/Error";
import { DetailCard } from "../card/DetailCard";
import sessionData from "../../helper/session";

export const DetailContent = () => {
  const [work, setWork] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { professionalId, workId } = useParams();

  useEffect(() => {
    const getDetailWork = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/allWorks/${workId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch work");
        }
        const data = await response.json();
        if (data && data.payload) {
          setWork(data.payload);
          setIsLoading(false);
        } else {
          throw new Error("Work not found");
        }
      } catch (error) {
        console.error("Error fetching work:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    if (workId && sessionData) {
      getDetailWork();
    }
  }, [workId]);

  const addToPreferWorks = async () => {
    if (sessionData) {
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
        if (!response.ok) {
          throw new Error("Failed to save work");
        }
        alert("Work successfully saved!");
      } catch (error) {
        console.error("Error saving work:", error);
        alert("Work allready saved");
      }
    }
  };

  return (
    <div className="flex-cols my-5">
      {isLoading && <CustomSpinner />}
      {!isLoading && error && (
        <ErrorAlert message="Ops! Qualcosa è andato storto" />
      )}
      {!isLoading && !error && work && (
        <div className="justify-center">
          <DetailCard
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


