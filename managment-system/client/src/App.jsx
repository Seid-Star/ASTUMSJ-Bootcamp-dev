import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Attendance from "./pages/Attendance";
import Settings from "./pages/Settings";
import AccessDenied from "./pages/AccessDenied";
import MainLayout from "./layouts/MainLayout";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/members" element={<Members />} />
              <Route
                element={
                  <ProtectedRoute allowedRoles={["admin", "supervisor"]} />
                }
              >
                <Route path="/attendance" element={<Attendance />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
