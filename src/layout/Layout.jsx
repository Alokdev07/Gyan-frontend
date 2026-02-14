import { Outlet } from "react-router-dom";
import Navigation from "../components/home/Navigation.jsx";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#F2E3BB] relative overflow-x-hidden">
      <Navigation />

      <main className="transition-all duration-500">
        <Outlet />
      </main>
    </div>
  );
}
