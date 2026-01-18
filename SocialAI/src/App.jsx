import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Shorts from './pages/Shorts';
import Subs from './pages/Subs';
import AIStudio from './pages/AIStudio';
import Settings from './pages/Settings';
import Upgrade from './pages/Upgrade';
import Notifications from './pages/Notifications';
import Billing from './pages/Billing';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Simple black screen while checking auth to avoid flash
  if (loading) return <div className="bg-black h-screen w-screen" />;

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/feed"
        element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:username"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shorts"
        element={
          <ProtectedRoute>
            <Shorts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/subs"
        element={
          <ProtectedRoute>
            <Subs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-studio"
        element={
          <ProtectedRoute>
            <AIStudio />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upgrade"
        element={
          <ProtectedRoute>
            <Upgrade />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/billing"
        element={
          <ProtectedRoute>
            <Billing />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
