import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function LoginForm() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem("auth", data.token);
  
          const decodedToken = jwtDecode(data.token);
  
          navigate("/allWorks");
        } else {
          alert("Unknown User");
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      alert("Failed to login: " + error.message);
    }
  };
  
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Log in
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Welcome back. Enter your details to log in.
      </Typography>
      <form
        onSubmit={onSubmit}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            onChange={onChangeInput}
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
            onChange={onChangeInput}
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
          Sign in
        </Button>
      </form>
    </Card>
  );
}
