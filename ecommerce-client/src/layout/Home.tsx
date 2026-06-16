import React, { useState } from 'react'
import HomeSearch from '../components/HomeSearch'

interface Review{
    rating:number 
    comment:string 
    date:string
    reviewerName:string 
    reviewerEmail:string
}

interface Product{
    id:number 
    title:string
    category:string 
    price:number
    rating:number
    description:string 
    reviews:Review[]
    stock:number 
    tags:string[]
    brand:string
    images:string[]
}

const Home = () => {
    const [products,setProducts]=useState<Product[]>([])
  return (
    <div className='w-2/3 h-screen flex bg-amber-300 h-screen'>
        <HomeSearch/>
        <h2>Home</h2>
    </div>
  )
}

export default Home