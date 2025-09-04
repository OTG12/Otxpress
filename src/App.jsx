import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Hero from "./components/Hero";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import Tracking from "./pages/Tracking";
import BookDelivery from "./pages/BookDelivery";
import Team from "./components/Team";
import GallerySlideshow from "./components/GallerySlideshow";
import PricingPage from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";

import RiderLogin from "./pages/rider/Login";
import RiderSignup from "./pages/rider/Signup";
import RiderDashboard from "./pages/rider/Dashboard";

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
  const [rider, setRider] = useState(null);

  return (
    <>
      <Header />
      <main>
        <Routes>
          {/* Public site */}
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/track" element={<Tracking />} />
          <Route path="/bookdelivery" element={<BookDelivery />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/aboutus" element={<AboutUs />} />

          {/* Rider Section */}
          <Route
            path="/rider"
            element={
              rider ? (
                <Navigate to="/rider/dashboard" />
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
              rider ? <RiderDashboard user={rider} /> : <Navigate to="/rider" />
            }
          />
        </Routes>
      </main>
    </>
  );
};

export default App;


