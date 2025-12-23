import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductsByCategQuery } from '../services/api'
const GetProduct = () => {
  const { id } = useParams()
  const { data } = useGetProductsByCategQuery(id)
  const navigate = useNavigate()
  return (
    <div className='carts'>
      {data?.data?.products ?
        (data?.data?.products?.map((e: any) => {
          const discountPercent = Math.round(((e.price - e.discountPrice) / e.price) * 100)
          return (
            <div className='card relative mt-5' key={e.id}>
              <div className="absolute bottom-87 left-40 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {discountPercent}%
              </div>
              <img
                style={{ height: "200px", objectFit: "cover", margin: "auto" }}
                src={`https://store-api.softclub.tj/images/${e.image}`}
              />
              <h1 className='card-title'>{e.productName}</h1>
              <div className="justify-center card-price flex gap-2 items-center mt-1 ">
                <span className="price-current text-red-600 font-bold">{e.price} $</span>
                <span className="price-old line-through text-gray-400">{e.discountPrice} $</span>
              </div>
              <p className='card-rating pb-2'>★★★★☆ (4.5)</p>
              <button className="card-btn">🛒 28 декабря</button>
            </div>
          )
        })) : (
          <div className='flex flex-col justify-center m-auto'>
            <h1 className='text-red-600 text-5xl text-center p-5'>404</h1>
            <h1 className='text-red-600 text-5xl text-center'>Hе найдено таких товаров!</h1>
            <button className='wb-btn w-62.5 p-5 text-center m-auto' onClick={() => navigate("/")}>На главную страницу </button>
          </div>
        )}

    </div>
  )
}
export default GetProduct