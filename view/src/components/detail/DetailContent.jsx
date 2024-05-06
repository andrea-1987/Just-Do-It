import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isWorkLoading,worksError } from "../../redux/WorkCardSlice";
import { useDispatch, useSelector } from "react-redux";
import { CustomSpinner } from "../loading/Loader";
import { ErrorAlert } from "../error/Error";
import { DetailCard } from "../card/DetailCard";
import { SidebarWithSearch } from "../sidebar/SideBar";
import styles from "./detailContent.module.css"


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
  
    return (
      <div className={`flex ${styles.content}`}>
        <SidebarWithSearch/>
        {isLoading && <CustomSpinner />}
        {!isLoading && error && (
          <ErrorAlert message="Ops! Qualcosa è andato storto" />
        )}
        {!isLoading && !error && work && work.payload && (
          <DetailCard
            className={`${styles.card}`}
            author={work.payload.author}
            description={work.payload.description}
            title={work.payload.title}
            img={work.payload.img}
            location={work.payload.location}
            pubDate={work.payload.pubDate}
            _id={work.payload._id}
          />
        )}
      </div>
    );
  };
  
