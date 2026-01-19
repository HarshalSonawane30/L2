import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './Navbar'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import Network from './pages/Network'
import Messages from './pages/Messages'
import Profile from './pages/Profile'
import UserProfile from './pages/UserProfile'
import About from './About'
import Contact from './Contact'
import CreateCommunity from './pages/CreateCommunity'
import ProfileCreate from './ProfileCreate'
import ProfileEdit from './ProfileEdit'
import Login from './pages/Login'
import Signup from './pages/Signup'
import BottomTabs from './components/BottomTabs/BottomTabs'

function App() {
  // For demo purposes. In a real app, you'd use proper auth state management
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <BrowserRouter>
      <Navbar />
<Routes>

  {/* Default route → Signup first */}
  {/* Default route → Home (read-only for guests) */}
  <Route path="/" element={<Navigate to="/home" replace />} />

  {/* Public routes */}
  <Route path="/signup" element={<Signup />} />
  <Route
    path="/login"
    element={!isAuthenticated ? <Login /> : <Navigate to="/home" />}
  />

  {/* Protected routes (only if logged in) */}
  {/* Home is publicly viewable; interactions require login */}
  <Route path="/home" element={<HomePage />} />
  <Route
    path="/connections"
    element={isAuthenticated ? <Network /> : <Navigate to="/login" />}
  />
  <Route
    path="/messages"
    element={isAuthenticated ? <Messages /> : <Navigate to="/login" />}
  />
  <Route
    path="/profile"
    element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
  />
  <Route
    path="/user/:userId"
    element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />}
  />
  <Route
    path="/about"
    element={isAuthenticated ? <About /> : <Navigate to="/login" />}
  />
  <Route
    path="/contact"
    element={isAuthenticated ? <Contact /> : <Navigate to="/login" />}
  />
  <Route
    path="/create-community"
    element={isAuthenticated ? <CreateCommunity /> : <Navigate to="/login" />}
  />
  <Route
    path="/profile/create"
    element={isAuthenticated ? <ProfileCreate /> : <Navigate to="/login" />}
  />
  <Route
    path="/profile/edit"
    element={isAuthenticated ? <ProfileEdit /> : <Navigate to="/login" />}
  />

</Routes>

      {/* Mobile bottom tabs (Home, Connections, Messages, Profile) */}
      {isAuthenticated && <BottomTabs />}

    </BrowserRouter>
  )
}

export default App
  
