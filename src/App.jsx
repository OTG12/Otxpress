import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Hero from "./components/Hero";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import BookDelivery from "./pages/BookDelivery";
import Team from "./components/Team";
import GallerySlideshow from "./components/GallerySlideshow";
import PricingPage from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";

import RiderLogin from "./pages/rider/Login";
import RiderSignup from "./pages/rider/Signup";
import RiderDashboard from "./pages/rider/Dashboard";
import DispatchTracker from "./pages/DispatchTracker";
import KYCComponent from "./pages/rider/kyc";

import { getUserFromToken, isAuthenticated } from "./services/auth";

const HomePage = () => (
  <>
    <Hero />
    <Features />
    <CTA />
    <GallerySlideshow />
    <Testimonials />
    <Team />
    <Footer />
    
  </>
);

const App = () => {
  const [user, setUser] = useState(null);

  // On app load, check if access_token + refresh_token exist
  useEffect(() => {
    if (isAuthenticated()) {
      const userFromToken = getUserFromToken();
      setUser(userFromToken);
    }
  }, []);

  return (
    <>
      <Header />
      <main>
      
        <Routes>
          {/* Public site */}
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dispatchtracker" element={<DispatchTracker />} />
          <Route path="/bookdelivery" element={<BookDelivery />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/aboutus" element={<AboutUs />} />

          {/* Rider Section */}
          <Route
            path="/rider"
            element={
              isAuthenticated() ? (
                <Navigate to="/rider/dashboard" replace />
              ) : (
                <RiderLogin onLogin={setUser} />
              )
            }
          />
          <Route
            path="/rider/login"
            element={
              isAuthenticated() ? (
                <Navigate to="/rider/dashboard" replace />
              ) : (
                <RiderLogin onLogin={setUser} />
              )
            }
          />
          <Route
            path="/rider/signup"
            element={<RiderSignup onSignup={setUser} />}
          />
          <Route 
            path="rider/kyc"
            element={<KYCComponent />}
          />
          <Route
            path="/rider/dashboard"
            element={
              isAuthenticated() ? (
                <RiderDashboard user={user} onLogout={() => setUser(null)} />
              ) : (
                <Navigate to="/rider/login" replace />
              )
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
