import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';

import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import JobList from './pages/JobList';
import AddJob from './pages/AddJob';
import JobDetail from './pages/JobDetail';
import Analytics from './pages/Analytics';
import Notes from './pages/Notes';

export default function App() {
  const darkMode = useSelector((state) => state.ui.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const muiTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: darkMode ? '#ffffff' : '#09090b' },
      background: {
        default: darkMode ? '#09090b' : '#ffffff',
        paper:   darkMode ? '#18181b' : '#ffffff',
      },
      text: {
        primary:   darkMode ? '#fafafa' : '#09090b',
        secondary: darkMode ? '#a1a1aa' : '#52525b',
      },
    },
    typography: {
      fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
      h1: { fontWeight: 600 },
      h2: { fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: 8,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: darkMode ? '#ffffff' : '#09090b',
              borderWidth: 2,
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: '8px',
            fontSize: '14px',
            background: darkMode ? '#18181b' : '#fff',
            color: darkMode ? '#fafafa' : '#09090b',
            border: darkMode ? '1px solid #27272a' : '1px solid #e4e4e7',
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jobs" element={<JobList />} />
          <Route path="jobs/:jobId" element={<JobDetail />} />
          <Route path="jobs/:jobId/edit" element={<AddJob />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="notes" element={<Notes />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ThemeProvider>
  );
}
