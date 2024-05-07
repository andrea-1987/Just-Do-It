import React, { useState } from "react";
import {
  IconButton,
  Typography,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Input,
  Drawer,
  Card,
  Button,
  Dialog,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";
import { AddWorkModal } from "../addWorkModal/AddWorkModal";
import sessionData from "../../helper/session";

export function SidebarWithSearch() {
  const [open, setOpen] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [jobFilter, setJobFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [filtered, setFiltered] = useState({ job: "", location: "" });

  const location = useLocation();
  const navigate = useNavigate();

  const handleJobFilterChange = (e) => {
    const { value } = e.target;
    setJobFilter(value);
    setFiltered((prevFiltered) => ({
      ...prevFiltered,
      job: value,
    }));
  };

  const handleLocationFilterChange = (e) => {
    const { value } = e.target;
    setLocationFilter(value);
    setFiltered((prevFiltered) => ({
      ...prevFiltered,
      location: value,
    }));
  };

  const handleOpenModal = () => setOpenModal(!openModal);
  const shouldShowAddWorkButton = location.pathname.startsWith("/professional");
  const shouldShowMyWorks = sessionData.role === "professional";

  const showInput = location.pathname === "works";

  const handleMyWorks = async (e) => {
    e.preventDefault();
    try {
      const id = sessionData._id;
      if (id) {
        navigate(`/${sessionData.role}/${id}/myWorks`);
      } else {
        alert("No works to show");
      }
    } catch (error) {
      throw new Error("Failed to navigate my works");
    }
  };

  const handlePreferWorks = async (e) => {
    e.preventDefault();
    try {
      const role = sessionData.role;
      if (role === "user") {
        navigate(`/user/${sessionData._id}/preferWorks`);
      } else if (role === "professional") {
        navigate(`/professional/${sessionData._id}/preferWorks`);
      } else {
        alert("Unknown role");
      }
    } catch (error) {
      throw new Error("Failed to parse token");
    }
   };

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const handlerLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  };
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  return (
    <div className="flex-cols">
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray">
              Just Do It
            </Typography>
          </div>
          <div className="p-2">
            {showInput && (
              <div className="my-2">
                <Typography variant="h5" color="blue-gray">
                  Job
                </Typography>
                <Input
                  onChange={handleJobFilterChange}
                  value={jobFilter}
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  label="Search"
                />
              </div>
            )}
            {showInput && (
              <div className="my-2">
                <Typography variant="h5" color="blue-gray">
                  Location
                </Typography>
                <Input
                  onChange={handleLocationFilterChange}
                  value={locationFilter}
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  label="Search"
                />
              </div>
            )}
          </div>
          <ListItem className="my-2">
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem className="my-2" onClick={handlePreferWorks}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            My Saved
          </ListItem>

          {shouldShowMyWorks && (
            <ListItem onClick={handleMyWorks} className="my-2">
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              My Works
              <ListItemSuffix>
                <Chip
                  value=""
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
          )}

          {shouldShowAddWorkButton && (
            <Button
              className="mt-5"
              onClick={handleOpenModal}
              variant="gradient"
            >
              Add Work
            </Button>
          )}
          <Dialog
            open={openModal}
            handler={handleOpenModal}
            className="flex justify-center"
          >
            <AddWorkModal />
          </Dialog>
          <div className="mt-20">
            <ListItem onClick={handlerLogOut}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </div>
        </Card>
      </Drawer>
    </div>
  );
}
