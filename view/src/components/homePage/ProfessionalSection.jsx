import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Dialog,
} from "@material-tailwind/react";
import { ProfessionalRegistrationForm } from "../signUpForm/ProfessionalSignUpForm";


export function ProfessionalSection() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <Card
      shadow={false}
      className="transition delay-150 duration-300 ease-in-out hover:scale-110 relative grid h-[40rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://www.studiocataldi.it/guide_legali/rapporto_di_lavoro/lavoratori.jpg')] bg-cover bg-center"
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody className="relative py-14 px-6 md:px-12">
        <Typography
          variant="h2"
          color="white"
          className="mb-6 font-medium leading-[1.5]"
        >
          Are You a Professional ? Show your Skill
        </Typography>
        <div>
          <Button onClick={handleOpen} variant="gradient">
            Sign Up
          </Button>
          <Dialog
            open={open}
            handler={handleOpen}
            className="flex justify-center"
          >
            <ProfessionalRegistrationForm/>
          </Dialog>
        </div>
      </CardBody>
    </Card>
  );
}
