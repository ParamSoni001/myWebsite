import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import AboutPage from "./pages/about";
import PortfolioPage from "./pages/portfolio";
import ResumePage from "./pages/resume";
import ContactPage from "./pages/contact";
import CertificationPage from "./pages/certification";
import Header from "./components/layout/Header";
import routes from "tempo-routes";

function App() {
  // Use routes from tempo if in tempo environment
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="min-h-screen w-full overflow-auto">
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home name="Param Soni" role="Software Engineer" />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/certification" element={<CertificationPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/contact" element={<ContactPage />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" element={<div />} />
          )}
        </Routes>
        {tempoRoutes}
      </div>
    </Suspense>
  );
}

export default App;
