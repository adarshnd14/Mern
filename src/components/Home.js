import React from 'react'
import { imageData } from '../data'
import Carousel from './homeComp/Carousel'
import Footer from './homeComp/Footer'

function Home() {
  return (
    <div className='row'>
      <Carousel />
      <div>
        {imageData.map((val, ind) => {
          return <img
            className='m-3'
            src={val.img} alt='' />
        })}
      </div>
    </div>
  )
}

export default Home