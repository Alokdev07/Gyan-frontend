import React from 'react'
import { useSelector } from 'react-redux'
import HeroSection from '../../components/home/Herosection.jsx'
import Ranking from '../../components/home/Ranking.jsx'
import Footer from '../../components/home/Footer.jsx'
import HistoryPage from '../quest/HistoryPage.jsx'
import Aboutus from '../../components/home/Aboutus.jsx'


function Home() {
  const data = useSelector((state) => state.user.user)
  console.log(data)
  return (
    <>
      <section id="hero">
        <HeroSection />
      </section>

      <section id="ranking">
        <Ranking />
      </section>


         <section id="about">
        <Aboutus />
      </section>
      

      <section id="contact">
        <Footer />
      </section>
    </>

  )
}

export default Home
