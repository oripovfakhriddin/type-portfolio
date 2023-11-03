import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/layout/admin";
import SkillsPage from "./pages/public/skills";
import EducationPage from "./pages/public/education";
import HomePage from "./pages/public/home";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/education" element={<EducationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
