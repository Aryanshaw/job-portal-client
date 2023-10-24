import "./App.css";
import ExploreJobs from "./pages/Explore/ExploreJobs";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import MyApplication from "./pages/MyApplications/MyApplication";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/explorejobs" element={<ExploreJobs />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/myapplications" element={<MyApplication />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
