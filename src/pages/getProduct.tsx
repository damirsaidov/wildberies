import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetProductsByCategQuery } from "../services/api";
import Loader from "../components/loader";
import { useEffect, useState } from "react";
const GetProduct = () => {
  const { id } = useParams<{ id: string }>(); 
  const { data, isLoading, error } = useGetProductsByCategQuery(id ?? "");  
  const navigate = useNavigate();  
  if (isLoading) return <Loader />;  
  if (error) {
    return (
      <div className="error-container">
        <h1 className="text-red-600">Error fetching data. Try again later.</h1>
        <button
          className="wb-btn w-62.5 p-5 text-center m-auto"
          onClick={() => navigate("/")}
        >
          Go back to Home
        </button>
      </div>
    );
  }
  const [categories, setCategories] = useState<any[]>([]);
  async function getCategory() {
    try {
      const res = await fetch("https://store-api.softclub.tj/Category/get-categories");
      const data = await res.json();      
      if (data && data.data) {
        setCategories(data.data);
      } else {
        console.error("Invalid response structure:", data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div className="flex items-start max-w-375 justify-center gap-20">
      <aside className="asid hidden md:block w-100 bg-white rounded-lg shadow p-4 mt-12">
        {categories.length > 0 ? (
          categories.map((category: any) => (
            <Link
              key={category.id}
              to={`/subCategories/${category.id}`}
              className="group block mb-4"
            >
              <h3 className="text-base vit font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition">
                {category.categoryName}
              </h3>
              {category.subCategories && category.subCategories.length > 0 && (
                <p className="text-xs text-gray-400 mt-2">
                  {category.subCategories.length} продуктов
                </p>
              )}
            </Link>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </aside>
      <div className="carts w-375 justify-end">
        {data?.data?.products?.length ? (
          data.data.products.map((e: any) => {
            const discountPercent = Math.round(
              ((e.price - e.discountPrice) / e.price) * 100
            );

            return (
              <div className="card relative mt-5 p-8 px-12" key={e.id}>
                <div className="absolute bottom-96 left-49 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {discountPercent}%
                </div>
                <img
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    margin: "auto",
                  }}
                  src={`https://store-api.softclub.tj/images/${e.image}`}
                  className="rounded"
                />
                <h1 className="card-title">{e.productName}</h1>
                <div className="justify-center card-price flex gap-2 items-center mt-1">
                  <span className="price-current text-red-600 font-bold">
                    {e.price} $
                  </span>
                  <span className="price-old line-through text-gray-400">
                    {e.discountPrice} $
                  </span>
                </div>
                <p className="card-rating pb-2">★★★★☆ (4.5)</p>
                <button className="card-btn">🛒 28 декабря</button>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col justify-center m-auto">
            <h1 className="text-red-600 text-5xl text-center p-5">404</h1>
            <h1 className="text-red-600 text-5xl text-center">
              Не найдено таких товаров!
            </h1>
            <button
              className="wb-btn w-62.5 p-5 text-center m-auto"
              onClick={() => navigate("/")}
            >
              На главную страницу
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default GetProduct;