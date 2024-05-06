import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";

export function UserCards({
  author,
  title,
  description,
  pubDate,
  img,
  location,
  _id,
  addToPreferWorks,
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {

addToPreferWorks()
  }
    
    // console.log(selectedWork)
 
  // const addToPreferWorks = async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_SERVER_BASE_URL}/${sessionData.role}/${sessionData._id}/preferWorks`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${sessionData}`,
  //         },
  //         body: JSON.stringify({
  //           author: selectedWork.author,
  //           title: selectedWork.title,
  //           description: selectedWork.description,
  //           img: selectedWork.img,
  //           pubDate: selectedWork.pubDate,
  //           location: selectedWork.location,
  //           _id: selectedWork._id,
  //         }),
  //       }
  //     );

  //     if (response.ok) {
  //       alert("Lavoro aggiunto con successo ai preferiti");
  //     } else {
  //       console.error(
  //         "Errore durante il salvataggio del lavoro:",
  //         response.statusText
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Errore durante il salvataggio del lavoro:", error);
  //   }
  // };
  const handleDetailPage = () => {
    navigate(`/works/${_id}`); 
  };

  return (
    <Card className="w-full max-w-[48rem] flex-row">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none aspect-ratio:16/9"
      >
        <img src={img} alt="card-image" className="h-full w-full object-cover" />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          {author}
        </Typography>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          {location}
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {description}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {pubDate}
        </Typography>
        <Button
          onClick={handleDetailPage}
          variant="text"
          className="flex items-center gap-2"
        >
          Learn More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Button>
        <Button
            onClick={() =>
              handleCardClick({
                author,
                title,
                description,
                img,
                pubDate,
                location,
                _id,
              })
            }
          variant="text"
          className="flex items-center gap-2"
        >
          Save
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Button>
      </CardBody>
    </Card>
  );
}
