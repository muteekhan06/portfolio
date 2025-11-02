import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoadingScreen from './components/LoadingScreen';

// Lazy load pages for better performance
const Portfolio = lazy(() => import('./pages/Portfolio'));
const AdminLogin = lazy(() => import('./admin/pages/Login'));
const AdminDashboard = lazy(() => import('./admin/pages/Dashboard'));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Public Portfolio */}
          <Route path="/" element={<Portfolio />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
