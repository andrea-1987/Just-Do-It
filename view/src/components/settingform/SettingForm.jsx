import React, { useState } from "react";
import { Card, Input, Button, Typography, Checkbox } from "@material-tailwind/react";
import sessionData from "../../helper/session";
import { useNavigate } from "react-router-dom";

const SettingForm = () => {
    const [formData, setFormData] = useState({});
    const [checked,setChecked]=useState(false)
    const [showRemove,setShowRemove]=useState(false)

    const navigate=useNavigate();
   
    const onSubmit = async (e) => {
        e.preventDefault();
        if(sessionData._id){
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER_BASE_URL}/${sessionData.role}/update/${sessionData._id}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('auth')}`, // Include il token JWT nell'header Authorization
                        },
                        body: JSON.stringify(formData),
                    }
                );
                if (response.ok) {
                    alert(`${sessionData.role} successfully change`)
                    window.location.reload();
                    return response.json()
                } else{
                    throw new Error("Error to change settings")
                }
            } catch (e) {
                alert(e.message);
            }
        }
    };
      const deleteAccount = async (e) => {
        e.preventDefault();
        if(sessionData){
        try {
          let response = await fetch(
            `${process.env.REACT_APP_SERVER_BASE_URL}/${sessionData.role}/delete/${sessionData._id}`,
            {
              method: 'DELETE',
              headers: {
                Authorization: sessionData,
              },
            }
          );
          if (response.ok) {
            alert('Your Account successfully removed');
         localStorage.clear();
         navigate("/")
          } else {
            const errorData = await response.json();
            throw new Error('Can t remove your account '+ errorData.message);
          }
        } catch (error) {
          alert(error.message);
        }
    }
      };
    const onChageInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleChecked=()=>{
        if(setChecked!==checked){
            setShowRemove(!showRemove)
        }
    }

    return (
            <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Manage or Remove Your Account
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Enter your details you want to Change , or Remove your Account
            </Typography>
            <form
              onSubmit={onSubmit}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Name
                </Typography>
                <Input
                  onChange={onChageInput}
                  name="firstName"
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Lastname
                </Typography>
                <Input
                  onChange={onChageInput}
                  name="lastName"
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Email
                </Typography>
                <Input
                  onChange={onChageInput}
                  name="email"
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Password
                </Typography>
                <Input
                  onChange={onChageInput}
                  name="password"
                  type="password"
                  size="lg"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
             
              <Button type="submit" className="mt-6" fullWidth>
                Change
              </Button>
              <Checkbox
            onChange={handleChecked}
              label={
                    <Typography
                      variant="small"
                      color="gray"
                      className="flex items-center font-normal"
                    >
                      I agree to
                      <a
                        href=" "
                        className="font-medium transition-colors hover:text-gray-900"
                      >
                        &nbsp;Remove my Account
                      </a>
                    </Typography>
                  }
                  containerProps={{ className: "-ml-2.5" }}
                />
              {showRemove &&(<Button 
              onClick={deleteAccount}
              type="submit" className="mt-6" fullWidth >
                Remove Account
              </Button>)}
            </form>
          </Card>
          )
        }

export default SettingForm;
