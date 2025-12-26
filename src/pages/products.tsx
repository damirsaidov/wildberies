import useMessage from "antd/es/message/useMessage";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../services/api";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import axios from "axios";
import Loader from "../components/loader";
const Products = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  const [messageApi, context] = useMessage();
  const [categories, setCategories] = useState<any>([]);
  async function getCategory() {
    try {
      const res = await fetch(
        "https://store-api.softclub.tj/Category/get-categories"
      );
      const data = await res.json();
      setCategories(data.data);
    } catch (error) {
      console.error(error);
    }
  }
  function addToWish(id: string) {
    const idx = localStorage.getItem("id");
    let wishlist: string[] = [];
    try {
      wishlist = JSON.parse(idx ?? "[]");
    } catch {
      wishlist = [];
    }
    if (!wishlist.includes(id)) {
      wishlist.push(id);
      localStorage.setItem("id", JSON.stringify(wishlist));
      messageApi.success("Добавлено в избранные");
    } else {
      messageApi.info("Этот продукт уже есть в ваших избранных");
    }
  }
  function removeFromWishlist(deleteId: string) {
    const id = localStorage.getItem("id");
    let wishlist: string[] = [];
    try {
      const parsed = JSON.parse(id ?? "[]");
      wishlist = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      wishlist = id ? [id] : [];
    }
    const index = wishlist.findIndex((item) => item === deleteId);
    if (index !== -1) {
      wishlist.splice(index, 1);
      if (wishlist.length) {
        localStorage.setItem("id", JSON.stringify(wishlist));
      } else {
        localStorage.removeItem("id");
      }
      messageApi.success("Успешно удалено");
    }
  }
  const navigate = useNavigate();
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
      );
      messageApi.success("Добавлено в корзину.");
    } catch {
      messageApi.error("Чтото пошло не так.");
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  if (isLoading) return <Loader />;
  return (
    <div>
      {context}
      <div className="flex items-start max-w-350 justify-center gap-20">
        <aside className="asid hidden md:block w-74 bg-white rounded-lg shadow p-4 mt-12">
          {categories.map((category: any) => (
            <Link
              key={category.id}
              to={`/categoryPage/${category.id}`}
              className="group block mb-4"
            >
              <h3 className="text-base font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition">
                {category.categoryName}
              </h3>
              {category.subCategories.length > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  {category.subCategories.length} items
                </p>
              )}
            </Link>
          ))}
        </aside>
        <div className="carts justify-self-center">
          {data?.data?.products?.map((e: any) => {
            const discountPercent = Math.round(
              ((e.price - e.discountPrice) / e.price) * 100
            );
            const wishlistIds = JSON.parse(
              localStorage.getItem("id") ?? "[]"
            ) as string[];
            return (
              <div className="card relative mt-5" key={e.id}>
                <div className="absolute bottom-87 left-40 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {discountPercent}%
                </div>
                <div className="absolute left-3">
                  {wishlistIds.includes(e.id) ? (
                    <IoMdHeart
                      onClick={() => removeFromWishlist(e.id)}
                      size={30}
                    />
                  ) : (
                    <IoIosHeartEmpty
                      onClick={() => addToWish(e.id)}
                      size={30}
                    />
                  )}
                  <FaRegEye
                    size={30}
                    onClick={() => navigate(`/about/${e.id}`)}
                  />
                </div>
                <img
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    margin: "auto",
                  }}
                  src={`https://store-api.softclub.tj/images/${e.image}`}
                />
                <h1 className="card-title">{e.productName}</h1>
                <p className="card-price flex gap-2 items-center mt-1 justify-center">
                  <span className="price-current text-red-600 font-bold">
                    {e.price} $
                  </span>
                  <span className="price-old line-through text-gray-400">
                    {e.discountPrice} $
                  </span>
                </p>
                <p className="card-rating pb-2">★★★★☆ (4.5)</p>
                <button
                  onClick={() =>
                    localStorage.getItem("token")
                      ? addToCart(e.id)
                      : messageApi.error("Log in first!")
                  }
                  className="card-btn"
                >
                  🛒 В корзину
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Products;
