import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardData, setDashboardData] = useState('');
  const [message, setMessage] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('https://st-lab-backend.onrender.com/login', { username, password });
      setMessage(res?.data?.message || 'Login successful');
      setIsLoggedIn(true);
    } catch (err) {
      const errorMsg = err?.response?.data?.message || 'Login failed';
      setMessage(errorMsg);
      setIsLoggedIn(false);
    }
  };

  const getDashboard = async () => {
    try {
      const res = await axios.get('https://st-lab-backend.onrender.com/dashboard');
      setDashboardData(res?.data?.data || 'Dashboard loaded');
    } catch (err) {
      const errorMsg = err?.response?.data?.message || 'Failed to load dashboard';
      setDashboardData(errorMsg);
    }
  };

  return (
    <div className="container ">
      {!isLoggedIn ? (
        <div className="login-form">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <button onClick={login}>Login</button>
          <p>{message}</p>
        </div>
      ) : (
        <div className="dashboard">
          <h2>Dashboard</h2>
          <button onClick={getDashboard}>Fetch Dashboard Data</button>
          <p>{dashboardData}</p>
        </div>
      )}
    </div>
  );
}

export default App;