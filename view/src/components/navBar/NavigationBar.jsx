import React, { useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Dialog
} from "@material-tailwind/react";
import { LoginForm } from "../loginForm/LoginForm";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openLogin,setOpenLogin]=useState(false)
  
  const navigate = useNavigate();
  
  const handleOpenLogin = () => setOpenLogin(!openLogin);
  const handleOpen = () => setOpen(!open);
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleHome = () => {
    navigate("/");
  };
  
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const session = localStorage.getItem('auth');
  const decodedSession = session ? jwtDecode(session) : null;
  const Welcome = () => {
    if(session !== ""){
      return (
        session ? `Welcome ${decodedSession.firstName.toUpperCase()} ${decodedSession.lastName.toUpperCase()}` : "Welcome"
      );
    } else {
      return "Welcome";
    }
  };
  const handleToLoggedPage=(e)=>{
    e.preventDefault();
    if(session !== ""){
      navigate("/allWorks");
    }
  };
  
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/aboutUs" className="flex items-center">
          About Us
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/allWorks" className="flex items-center">
          <Welcome  onClick={handleToLoggedPage}/>
        </a>
      </Typography>
    </ul>
  );
  
  return (
    <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            onClick={handleHome}
            as="a"
            className="mx-4 cursor-pointer py-1.5 font-medium"
          >
            <Button variant="text">
            Just Do It
            </Button>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
            <Button onClick={handleLogOut} variant="text">
                  Log out
                </Button>
                <Button onClick={handleOpen} variant="gradient">
                  Log in
                </Button>
                <Dialog
                  open={open}
                  handler={handleOpenLogin}
                  className="flex justify-center"
                >
                  <LoginForm />
                </Dialog>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button onClick={handleLogOut} fullWidth variant="text" size="sm" className="">
              <span>Log out</span>
            </Button>
            <Button onClick={handleOpenLogin} fullWidth variant="gradient" size="sm" className="">
              <span>Log in</span>
            </Button>
            <Dialog
              open={open}
              handler={handleOpen}
              className="flex justify-center"
            >
              <LoginForm />
            </Dialog>
          </div>
        </MobileNav>
      </Navbar>
          </div>
  );
}
