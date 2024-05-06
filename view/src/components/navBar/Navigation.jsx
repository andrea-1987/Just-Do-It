import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Dialog,
} from "@material-tailwind/react";
import { LoginForm } from "../loginForm/LoginForm";
import { jwtDecode } from "jwt-decode";

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  
  const navigate = useNavigate();
  
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
    if(session !==""){
    return (
      
        <h2>{session ? `Welcome ${decodedSession.firstName.toUpperCase()} ${decodedSession.lastName.toUpperCase()}` : "Welcome"}</h2>
   
    );}else {<h2> "Welcome"</h2>}
  }
  
  return (
    <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 ">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            onClick={handleHome}
            as="a"
            href=" "
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            Just Do It
          </Typography>
          <div className="flex items-center gap-4">
            <div>
              <div>
                <h2 >
                  {Welcome()}
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-x-1">
              <div className="flex items-center gap-x-1">
                <Button onClick={handleLogOut} variant="gradient">
                  Log out
                </Button>
                <Button onClick={handleOpen} variant="gradient">
                  Log in
                </Button>
                <Dialog
                  open={open}
                  handler={handleOpen}
                  className="flex justify-center"
                >
                  <LoginForm />
                </Dialog>
              </div>
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
      </Navbar>
    </div>
  );
}
