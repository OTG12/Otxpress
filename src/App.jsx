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
  // Load rider from localStorage if available
  const [rider, setRider] = useState(() => {
    const savedRider = localStorage.getItem("rider");
    return savedRider ? JSON.parse(savedRider) : null;
  });

  // Sync localStorage whenever rider changes
  useEffect(() => {
    if (rider) {
      localStorage.setItem("rider", JSON.stringify(rider));
    } else {
      localStorage.removeItem("rider");
    }
  }, [rider]);

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
              rider ? (
                <Navigate to="/rider/dashboard" replace />
              ) : (
                <RiderLogin onLogin={setRider} />
              )
            }
          />
          <Route
            path="/rider/login"
            element={
              rider ? (
                <Navigate to="/rider/dashboard" replace />
              ) : (
                <RiderLogin onLogin={setRider} />
              )
            }
          />
          <Route
            path="/rider/signup"
            element={<RiderSignup onSignup={setRider} />}
          />
          <Route
            path="/rider/dashboard"
            element={
              rider ? (
                <RiderDashboard user={rider} onLogout={() => setRider(null)} />
              ) : (
                <Navigate to="/rider" replace />
              )
            }
          />
          
          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
};

export default App;



