import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import HeroSection from '../HeroSection'
import CategoryCarousel from '../CategoryCarousel'

import Footer from '../shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UNavbar from '../shared/UserNav';

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <UNavbar />
      <HeroSection/>
      <CategoryCarousel/>
      <Footer />
    </div>
  )
}

export default Home