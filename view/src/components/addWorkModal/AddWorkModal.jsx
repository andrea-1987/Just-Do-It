import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import sessionData from "../../helper/session";

export const AddWorkModal = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});


  const onChangeHandleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onChangeHandleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const uploadFile = async () => {
    const fileData = new FormData();
    fileData.append("uploadImg", file);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/works/cloudUploadImg`,
        {
          method: "POST",
          body: fileData,
        }
      );
      if (response.ok) {
        return await response.json();
         
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (e) {
      alert("Upload file failed: " + e.message);
    }
      };

  const submitWork = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("No file selected");
      return;
    }

    try {
      const uploadedFile = await uploadFile();
      
      const bodyToSendProfessional = {
        ...formData,
        img: uploadedFile.source,
      };

      const professionalWorkResponse = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/professional/${sessionData._id}/myWorks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyToSendProfessional),
        }
      );

      if (!professionalWorkResponse.ok) {
        throw new Error("Failed to create work in the professional area");
      }
    } catch (error) {
      alert("Submit work failed: " + error.message);
    }
    alert("Work successfully create!")
    window.location.reload()
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Add Your Work
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to add a work.
      </Typography>
      <form
        encType="multipart/form-data"
        onSubmit={submitWork}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            onChange={onChangeHandleInput}
            name="author"
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Job Title
          </Typography>
          <Input
            onChange={onChangeHandleInput}
            name="title"
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Location
          </Typography>
          <Input
            onChange={onChangeHandleInput}
            name="location"
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Description
          </Typography>
          <div class="w-96">
            <div class="relative w-full min-w-[200px]">
              <textarea
                onChange={onChangeHandleInput}
                name="description"
                className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              ></textarea>
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Message
              </label>
            </div>
          </div>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Image
          </Typography>
          <Input
            onChange={onChangeHandleFile}
            type="file"
            name="uploadImg"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          confirm
        </Button>
      </form>
    </Card>
  );
};
