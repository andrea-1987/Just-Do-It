import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProtectedRoutes } from "./middlewares/ProtectedRoutes";
import { UserPage } from "./pages/UserPage";
import { DetailPage } from "./pages/DetailPage";
import LoggedPage from "./pages/LoggedPage";
import MyWorks from "./pages/MyWorks";
import { PersonalContent } from "./components/personal/PersonalContent";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/works" element={<LoggedPage />} />
          <Route path="/user/:_id" element={<UserPage />} />
            <Route path="/user/:_id/preferWorks" element={<PersonalContent/>} />
            <Route path="/professional/:_id/preferWorks" element={<PersonalContent/>} />
            <Route path="/professional/:_id/myWorks" element={<MyWorks/>} />
          <Route path="/works/:_id" element={<DetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
