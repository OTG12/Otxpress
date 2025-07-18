import React from 'react'
import { Routes, Route } from 'react-router-dom' // ✅ import routing tools
import Hero from './components/Hero'
import Features from './components/Features'
import CTA from './components/CTA'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import Header from './components/Header'
import Contact from './pages/Contact' // ✅ import Contact page
import Tracking from './pages/Tracking'
import BookDelivery from './pages/BookDelivery'
import Team from './components/Team'
import GallerySlideshow from './components/GallerySlideshow'
import PricingPage from './pages/Pricing'
import AboutUs from './pages/AboutUs'



const HomePage = () => (
  <>
    <Hero />
    <Features />
    <CTA />
    <GallerySlideshow/>
    <Testimonials />
    <Team/>
    <Footer />
  </>
)

const App = () => {
  return (
    <>
      <Header />
      <main >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />}  />
          <Route path="/track" element={<Tracking />} /> 
          <Route path='/bookdelivery' element={<BookDelivery/>} />
           <Route path='/pricing' element={<PricingPage/>}/>
           <Route path='/aboutus' element={<AboutUs/>}/>
          {/* Add more routes like /track, /book, etc. later */}
        </Routes>
      </main>
    </>
  )
}

export default App

