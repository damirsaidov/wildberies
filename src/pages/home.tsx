import { useGetProductsQuery } from '../services/api'
import Loader from '../components/loader'
import Error from '../components/error'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useMessage from 'antd/es/message/useMessage'
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import axios from 'axios'

interface Product {
  id: string
  productName: string
  image: string
  price: number
  discountPrice: number
}

const Home = () => {
  const [messageApi, context] = useMessage()
  const navigate = useNavigate()
  const [value, setValue] = useState('₽')
  const { data, isLoading, error } = useGetProductsQuery()
  
  function addToWish(id: string) {
    const idx = localStorage.getItem("id")
    let wishlist: string[] = []
    try {
      wishlist = JSON.parse(idx ?? "[]")
    } catch {
      wishlist = []
    }
    if (!wishlist.includes(id)) {
      wishlist.push(id)
      localStorage.setItem("id", JSON.stringify(wishlist))
      messageApi.success("Added to wishlist")
    } else {
      messageApi.info("This product is already in your wishlist")
    }
  }

  function removeFromWishlist(deleteId: string) {
    const id = localStorage.getItem("id")
    let wishlist: string[] = []
    try {
      const parsed = JSON.parse(id ?? "[]")
      wishlist = Array.isArray(parsed) ? parsed : [parsed]
    } catch {
      wishlist = id ? [id] : []
    }
    const index = wishlist.findIndex((item) => item === deleteId)
    if (index !== -1) {
      wishlist.splice(index, 1)
      if (wishlist.length) {
        localStorage.setItem("id", JSON.stringify(wishlist))
      } else {
        localStorage.removeItem("id")
      }
      messageApi.success("Removed successfully")
    }
  }

  const addToCart = async (id: string) => {
    try {
      await axios.post(
        `https://store-api.softclub.tj/Cart/add-product-to-cart?id=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
          },
        }
      )
      messageApi.success("Added to cart")
    } catch {
      messageApi.error("Something went wrong.")
    }
  }

return (
    <div>
      {isLoading && (
        <div style={{ position: 'relative', top: '250px' }}>
          <Loader />
        </div>
      )}

      {error && (
        <div style={{ position: 'relative', top: '250px' }}>
          <Error />
        </div>
      )}

      {!isLoading && !error && (
        <>
          {context}
          <div className="flex justify-end">
            <select onChange={(e) => setValue(e.target.value)}>
              <option value="₽">🇷🇺 RUB</option>
              <option value="p">🇧🇾 BYN</option>
              <option value="₸">🇰🇿 KZT</option>
              <option value="драм">🇦🇲 AMD</option>
              <option value="сум">🇺🇿 UZS</option>
              <option value="c">🇹🇯 TJS</option>
            </select>
          </div>
          <div className="carts">
            {data?.data?.products?.slice(0, 6).map((e: Product) => {
              const discountPercent = Math.round(((e.price - e.discountPrice) / e.price) * 100)
              const wishlistIds = JSON.parse(localStorage.getItem("id") ?? "[]") as string[]
              return (
                <div className="card relative mt-5" key={e.id}>
                  <div className="absolute bottom-87 left-40 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {discountPercent}%
                  </div>
                  <div className='absolute'>
                    {wishlistIds.includes(e.id) ? (
                      <IoMdHeart onClick={() => removeFromWishlist(e.id)} size={30} />
                    ) : (
                      <IoIosHeartEmpty onClick={() => addToWish(e.id)} size={30} />
                    )}
                    <FaRegEye size={30} onClick={() => navigate(`/about/${e.id}`)} />
                  </div>
                  <img
                    style={{ height: '200px', objectFit: 'cover', margin: 'auto' }}
                    src={`https://store-api.softclub.tj/images/${e.image}`}
                  />
                  <h1 className="card-title">{e.productName}</h1>
                  <p className="card-price flex gap-2 items-center mt-1 justify-center">
                    <span className="price-current text-red-600 font-bold">{e.price} {value}</span>
                    <span className="price-old line-through text-gray-400">{e.discountPrice} {value}</span>
                  </p>
                  <p className="card-rating pb-2">★★★★☆ (4.5)</p>
                  <button onClick={() => localStorage.getItem("token") ? addToCart(e.id) : messageApi.error("Log in first!")} className="card-btn">🛒 В корзину</button>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default Home
