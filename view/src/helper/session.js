import { jwtDecode } from "jwt-decode";

let sessionData = {};

const session = localStorage.getItem("auth");

if (session) {
  const decodedSession = jwtDecode(session);

  sessionData = {
    firstName: decodedSession.firstName,
    lastName: decodedSession.lastName,
    email: decodedSession.email,
    role: decodedSession.role,
    _id: decodedSession._id,
    token:decodedSession.token,
    preferWorks: decodedSession.preferWorks ? decodedSession.preferWorks : undefined,
    myWorks: decodedSession.myWorks ? decodedSession.myWorks : undefined,
  };
}

export default sessionData;
