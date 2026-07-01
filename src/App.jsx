import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory";
import Analytics from "./pages/Analytics";
import CalendarView from "./pages/CalendarView";
import AdminPanel from "./pages/AdminPanel";
import Settings from "./pages/Settings";
import Notifications from "./pages/notification";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>

        <Route path="/apply-leave" element={<ProtectedRoute><ApplyLeave /></ProtectedRoute>}/>

        <Route path="/leave-history" element={<ProtectedRoute><LeaveHistory /></ProtectedRoute>}/>

        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>}/>

        <Route path="/calendar" element={<ProtectedRoute><CalendarView /></ProtectedRoute>}/>

        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminPanel /></ProtectedRoute>}/>

        <Route path="*" element={<Navigate to="/" replace/>}/>
        
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>}/>

        <Route path="/notifications" element={<Notifications />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;