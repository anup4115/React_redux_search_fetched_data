import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from './features/searchSlice'

const App = () => {
  const searchTerm=useSelector((state)=>state.search.searchTerm)
  const dispatch=useDispatch()
  const [product,setProduct]=useState([])
  const fetchData=async()=>{
    try{
      const response=await fetch('https://dummyjson.com/products');
      const data=await response.json()
      setProduct(data.products)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchData()
  },[])
  const filteredProduct=product.filter(prod=>
    prod.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <>
    <div className="container">
      <input type="text"
    placeholder='search products'
    value={searchTerm}
    onChange={(e)=>dispatch(setSearchTerm(e.target.value))} />
    </div>
        <ul>
      <div className="item-container">
        {filteredProduct.length === 0 ? (
          <p>No product found for "{searchTerm}"</p>
        ) : (filteredProduct.map((item)=>(
          <div key={item.id} className='product-container' >
            <img src={item.images[0]} alt={item.title} />
            <p>{item.title}</p>
          </div>
        )))}
        </div>  
        </ul>    
    </>
  )
}

export default App
