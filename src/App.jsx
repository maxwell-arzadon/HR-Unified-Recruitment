import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import JobDetail from "./pages/JobDetail";
import Apply from "./pages/Apply";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
      <Route path="/apply/:id" element={<Apply />} />
    </Routes>
  );
}
