import { useGetProductsQuery } from '../services/api'
import Loader from '../components/loader'
import Error from '../components/error'
import { useState } from 'react'

interface Product {
  id: string
  productName: string
  image: string
  price: number        
  discountPrice: number 
}

const Home = () => {
  const [value, setValue] = useState("₽")
  const { data, isLoading, error } = useGetProductsQuery()
  if (isLoading) return <div style={{position:"relative", top:"250px"}}> <Loader/></div>
  if (error) return <div style={{position:"relative", top:"250px"}}><Error /> </div>
  return (
    <div>
      <div className='flex justify-end'>
      <select onChange={(e) => setValue(e.target.value)}>
        <option value="₽">🇷🇺RUB</option>
        <option value="p">🇧🇾BYN</option>
        <option value="₸">🇰🇿KZT</option>
        <option value="драм">🇦🇲AMD</option>
        <option value="сум">🇺🇿UZS</option>
        <option value="c">🇹🇯TJS</option>
        </select>
        </div>
    <div className='carts'>
      {data?.data?.products?.slice(0,6)?.map((e: Product) => {
        const discountPercent = Math.round(((e.price - e.discountPrice) / e.price) * 100)
        return (
          <div className='card relative mt-5' key={e.id}>
              <div className="absolute bottom-87  left-40 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {discountPercent}%
              </div>
            <img 
              style={{height:"200px", objectFit:"cover", margin:"auto"}} 
              src={`http://37.27.29.18:8002/images/${e.image}`} 
            />
            <h1 className='card-title'>{e.productName}</h1>
            <p className="card-price flex gap-2 items-center mt-1 pl-10">
              <span className="price-current text-red-600 font-bold">{e.price} {value}</span>              
              <span className="price-old line-through text-gray-400">{e.discountPrice} { value}</span>
            </p>
            <p className='card-rating pb-2'>★★★★☆ (4.5)</p>
            <button className="card-btn">🛒 28 декабря</button>
          </div>
        )
      })}
        {data?.data?.products?.slice(0,6)?.map((e: Product) => {
        const discountPercent = Math.round(((e.price - e.discountPrice) / e.price) * 100)
        return (
          <div className='card relative mt-5' key={e.id}>
              <div className="absolute bottom-87  left-40 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {discountPercent}%
              </div>
            <img 
              style={{height:"200px", objectFit:"cover", margin:"auto"}} 
              src={`http://37.27.29.18:8002/images/${e.image}`} 
            />
            <h1 className='card-title'>{e.productName}</h1>
            <p className="card-price flex gap-2 items-center mt-1 pl-10">
              <span className="price-current text-red-600 font-bold">{e.price} {value}</span>              
              <span className="price-old line-through text-gray-400">{e.discountPrice} { value}</span>
            </p>
            <p className='card-rating pb-2'>★★★★☆ (4.5)</p>
            <button className="card-btn">🛒 28 декабря</button>
          </div>
        )
        })}
        {data?.data?.products?.slice(0,6)?.map((e: Product) => {
        const discountPercent = Math.round(((e.price - e.discountPrice) / e.price) * 100)
        return (
          <div className='card relative mt-5' key={e.id}>
              <div className="absolute bottom-87  left-40 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {discountPercent}%
              </div>
            <img 
              style={{height:"200px", objectFit:"cover", margin:"auto"}} 
              src={`http://37.27.29.18:8002/images/${e.image}`} 
            />
            <h1 className='card-title'>{e.productName}</h1>
            <p className="card-price flex gap-2 items-center mt-1 pl-10">
              <span className="price-current text-red-600 font-bold">{e.price} {value}</span>              
              <span className="price-old line-through text-gray-400">{e.discountPrice} { value}</span>
            </p>
            <p className='card-rating pb-2'>★★★★☆ (4.5)</p>
            <button className="card-btn">🛒 28 декабря</button>
          </div>
        )
      })}
      </div>
      </div>
  )
}
export default Home