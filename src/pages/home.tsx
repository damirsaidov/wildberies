import { useGetProductsQuery } from "../services/api";
import Loader from "../components/loader";
import Error from "../components/error";
import { useNavigate } from "react-router-dom";
import useMessage from "antd/es/message/useMessage";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import axios from "axios";
import { Carousel } from "antd";
interface Product {
  id: string;
  productName: string;
  image: string;
  price: number;
  discountPrice: number;
}
const Home = () => {
  const [messageApi, context] = useMessage();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetProductsQuery();
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
  return (
    <div>
      {isLoading && (
        <div style={{ paddingTop: "20px" }}>
          <Loader />
        </div>
      )}
      {error && (
        <div style={{ paddingTop: "20px" }}>
          <Error />
        </div>
      )}
      {!isLoading && !error && (
        <div className="pt-6 max-w-375 m-auto">
          {context}
          <Carousel
            className="car"
            style={{
              width: "1000px",
              height: "374px",
              borderRadius: "8px",
              margin: "auto",
            }}
            autoplay
            infinite
            dots
            arrows
            speed={900}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src="../../сфкгыуд(2).jpeg"
                width="100%"
                height="100%"
                style={{
                  borderRadius: "12px",
                  objectFit: "fill",
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src="../../image.png"
                width="100%"
                height="100%"
                style={{
                  borderRadius: "12px",
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </Carousel>
          <div className="carts">
            {data?.data?.products?.slice(2, 6).map((e: Product) => {
              const discountPercent = Math.round(
                ((e.price - e.discountPrice) / e.price) * 100
              );
              const wishlistIds = JSON.parse(
                localStorage.getItem("id") ?? "[]"
              ) as string[];
              return (
                <div className="card relative mt-5" key={e.id}>
                  <div className="absolute bottom-87 left-41 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {discountPercent}%
                  </div>
                  <div className="absolute left-1">
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
                        : messageApi.error("Сначала зарегистрируйтесь!")
                    }
                    className="card-btn"
                  >
                    🛒 В корзину
                  </button>
                </div>
              );
            })}
          </div>
          <div className="carts">
            {data?.data?.products?.slice(0, 4).map((e: Product) => {
              const discountPercent = Math.round(
                ((e.price - e.discountPrice) / e.price) * 100
              );
              const wishlistIds = JSON.parse(
                localStorage.getItem("id") ?? "[]"
              ) as string[];
              return (
                <div className="card relative mt-5" key={e.id}>
                  <div className="absolute bottom-87 left-41 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
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
      )}
    </div>
  );
};
export default Home;
