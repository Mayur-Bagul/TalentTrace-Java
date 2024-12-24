import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import Companies from './admin/Companies'
const Home = () => {
  // Check if user is already logged in and redirect to dashboard if they are
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'user') {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Companies /> <br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer />
    </div>
  )
}

export default Home