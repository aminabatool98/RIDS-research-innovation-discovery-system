import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NewsFeed from "./pages/NewsFeed";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import ResearchList from "./pages/Research/ResearchList";
import ResearchDetail from "./pages/Research/ResearchDetail";

import DepartmentsList from "./pages/Departments/DepartmentsList";
import DepartmentDetail from "./pages/Departments/DepartmentDetail";

import FieldsList from "./pages/Fields/FieldsList";
import FieldDetail from "./pages/Fields/FieldDetail";

import FacultyList from "./pages/Faculty/FacultyList";
import FacultyProfile from "./pages/Faculty/FacultyProfile";

import MediaList from "./pages/Media/MediaList";
import EventsList from "./pages/Events/EventsList";

import UserDashboard from "./pages/Dashboard/UserDashboard";

import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageResearch from "./pages/Admin/ManageResearch";
import ManageDepartments from "./pages/Admin/ManageDepartments";
import ManageFields from "./pages/Admin/ManageFields";
import ManageFaculty from "./pages/Admin/ManageFaculty";
import ManageMedia from "./pages/Admin/ManageMedia";
import ManageEvents from "./pages/Admin/ManageEvents";
import ManageAchievements from "./pages/Admin/ManageAchievements";
import ManageNews from "./pages/Admin/ManageNews";
import ManageUsers from "./pages/Admin/ManageUsers";

function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-32 text-center">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-wheat/70">404</span>
      <h1 className="mt-3 font-display text-3xl text-parchment">Page not found</h1>
      <p className="mt-2 text-parchment/50">The page you're looking for doesn't exist.</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<NewsFeed />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/research" element={<ResearchList />} />
        <Route path="/research/:id" element={<ResearchDetail />} />

        <Route path="/departments" element={<DepartmentsList />} />
        <Route path="/departments/:id" element={<DepartmentDetail />} />

        <Route path="/fields" element={<FieldsList />} />
        <Route path="/fields/:id" element={<FieldDetail />} />

        <Route path="/faculty" element={<FacultyList />} />
        <Route path="/faculty/:id" element={<FacultyProfile />} />

        <Route path="/media" element={<MediaList />} />
        <Route path="/events" element={<EventsList />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="research" element={<ManageResearch />} />
          <Route path="departments" element={<ManageDepartments />} />
          <Route path="fields" element={<ManageFields />} />
          <Route path="faculty" element={<ManageFaculty />} />
          <Route path="media" element={<ManageMedia />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="achievements" element={<ManageAchievements />} />
          <Route path="news" element={<ManageNews />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
