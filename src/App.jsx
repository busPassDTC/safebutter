import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { ThemeContext } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
// import LoginPage from './pages/LoginPage';
// import PrivateRoute from './components/PrivateRoute';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`bg-white dark:bg-gray-900 text-black dark:text-white w-full md:w-6xl`}>
      <Router>
        <Routes>
          <Route 
            path="/"
            element={
                <HomePage />
              // <PrivateRoute>
              //   <HomePage />
              // </PrivateRoute>
            }
          />
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </Router>
        <Toaster
         toastOptions={{
    className: '',
    style: {
      border: '1px solid #713200',
      padding: '8px',
      color: '#451320',
    },
  }}
        />
        
    </div>
  );
}

export default App;