import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProtectedRoutes } from "./middlewares/ProtectedRoutes";
import { DetailPage } from "./pages/DetailPage";
import LoggedPage from "./pages/LoggedPage";
import MyWorks from "./pages/MyWorks";
import PreferWorks from "./pages/PreferWorks";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/allWorks" element={<LoggedPage />} />
                   <Route path="/user/:_id/preferWorks" element={<PreferWorks/>} />
            <Route path="/professional/:_id/preferWorks" element={<PreferWorks/>} />
            <Route path="/professional/:_id/myWorks" element={<MyWorks/>} />
            <Route path="/allWorks/:workId" element={<DetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
