import React from 'react'
import Hero from '../components/Hero'
import Recipes from '../components/Recipes'
import Stats from '../components/Stats'
import HeroAd from './HeroAd'

function Home() {
  return (
    <>
     <Hero />
    <Recipes />
    <HeroAd />
    <Stats />
    </>
  )
}

export default Home