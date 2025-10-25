import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./assets/styles/main.scss";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Campaigns from "./pages/Campaigns";
import CampaignView from "./pages/CampaignView";
import Admin from "./pages/Admin";

function Nav() {
  return (
    <div className="card" style={{ display: "flex", gap: 12 }}>
      <Link to="/campaigns">Campañas</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Registro</Link>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:id" element={<CampaignView />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Campaigns />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}