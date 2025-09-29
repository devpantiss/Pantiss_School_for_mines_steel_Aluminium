import "./App.css";
import Header from "./components/common/Header";
import JobSearchHeader from "./components/common/JobSearchHeader";
import Footer from "./components/common/Footer";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AllProgramsPage from "./pages/AllProgramsPage";
import ContactPage from "./pages/ContactPage";
import EventsPage from "./pages/EventsPage";

function LayoutWrapper() {
  const location = useLocation();
  const HIDE_LAYOUT_ROUTES = [
    "/job-search-engine/business/auth",
    "/job-search-engine/job-seekers/auth",
  ];
  const hideLayout = HIDE_LAYOUT_ROUTES.includes(location.pathname);
  const isJobSearchRoute = location.pathname.startsWith("/job-search-engine");

  return (
    <>
      {!hideLayout && (isJobSearchRoute ? <JobSearchHeader /> : <Header />)}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/all-programmes" element={<AllProgramsPage />} />
        <Route path="/contact-us" element={<ContactPage/>} />
        <Route path="/events" element={<EventsPage/>} />



      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;