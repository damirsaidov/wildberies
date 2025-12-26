import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import axios from "axios";
import useMessage from "antd/es/message/useMessage";

const Cart = () => {
  const [data, setData] = useState<any>(null);
  const [messageApi, context] = useMessage();
  const navigate = useNavigate();

  const getCart = async () => {
    try {
      const res = await fetch(
        `https://store-api.softclub.tj/Cart/get-products-from-cart`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      setData(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromWishlist = (deleteId: number) => {
    const id = localStorage.getItem("id");
    let wishlist: number[] = [];
    try {
      const parsed = id ? JSON.parse(id) : [];
      wishlist = Array.isArray(parsed) ? parsed : [parsed];
    } catch {}
    const index = wishlist.findIndex((item) => item == deleteId);
    if (index !== -1) {
      wishlist.splice(index, 1);
      if (wishlist.length) {
        localStorage.setItem("id", JSON.stringify(wishlist));
      } else {
        localStorage.removeItem("id");
      }
    }
  };

  const addToWish = (id: number) => {
    const idx = localStorage.getItem("id");
    let wishlist: number[] = [];
    try {
      wishlist = idx ? JSON.parse(idx) : [];
    } catch {
      wishlist = [];
    }
    if (!wishlist.includes(id)) {
      wishlist.push(id);
      localStorage.setItem("id", JSON.stringify(wishlist));
      messageApi.success("Добавлено в избранное");
    } else {
      messageApi.info("Этот продукт уже есть в ваших избранных");
    }
  };

  const addToCart = async (id: number) => {
    try {
      await axios.post(
        `https://store-api.softclub.tj/Cart/add-product-to-cart?id=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      messageApi.success("Добавлено в корзину");
    } catch (error) {
      messageApi.error("Чтото пошло не так.");
      console.error(error);
    }
  };

  const deleteFromCart = async (id: number) => {
    try {
      await fetch(
        `https://store-api.softclub.tj/Cart/delete-product-from-cart?id=${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      getCart();
      messageApi.success("Успешно удалено");
    } catch (error) {
      console.error(error);
      messageApi.error("Чтото пошло не так");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div>
      {context}
      {data && data[0]?.productsInCart.length > 0 ? (
        <>
          <table className="w-full border-collapse mt-5">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">Избранное</th>
                <th className="p-3 text-center">Фото</th>
                <th className="p-3 text-center">Продукт</th>
                <th className="p-3 text-center">Цена</th>
                <th className="p-3 text-center">Рейтинг</th>
                <th className="p-3 text-center">Действия</th>
              </tr>
            </thead>
            <tbody>
              {data[0]?.productsInCart.map((e: any) => (
                <tr key={e.product.id} className="border-b text-center">
                  <td className="p-3">
                    {localStorage
                      .getItem("id")
                      ?.includes(String(e.product.id)) ? (
                      <IoMdHeart
                        size={24}
                        className="cursor-pointer text-red-500"
                        onClick={() => removeFromWishlist(e.product.id)}
                      />
                    ) : (
                      <IoIosHeartEmpty
                        size={24}
                        className="cursor-pointer"
                        onClick={() => addToWish(e.product.id)}
                      />
                    )}
                  </td>
                  <td className="p-3">
                    <img
                      src={`https://store-api.softclub.tj/images/${e.product.image}`}
                      alt={e.product.productName}
                      className="h-20 mx-auto object-cover"
                    />
                  </td>
                  <td className="p-3">{e.product.productName}</td>
                  <td className="p-3">
                    {e.product.price} $
                    <br />
                    <span className="line-through text-gray-400 text-sm">
                      {e.product.discountPrice} $
                    </span>
                  </td>
                  <td>★★★★☆ (4.5)</td>
                  <td className="p-3 flex gap-3 justify-center items-center">
                    <FaRegEye
                      size={22}
                      className="cursor-pointer"
                      onClick={() => navigate(`/about/${e.product.id}`)}
                    />
                    <button
                      onClick={() => addToCart(e.product.id)}
                      className="px-3 py-1 bg-black text-white rounded"
                    >
                      🛒 Добавить
                    </button>
                    <button
                      onClick={() => deleteFromCart(e.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end">
            <button
              onClick={() => navigate("/checkout")}
              className="rounded-2xl w-53 flex justify-center mt-4 bg-purple-600 text-white p-2 px-5"
            >
              Оплатить
            </button>
          </div>
        </>
      ) : (
        <h1 className="text-center text-5xl p-20">
          Ваша Корзина пуста! <br />{" "}
          <span className="text-xl border-b-2 border-amber-300 p-2 text-amber-200" onClick={() => navigate("/")}>
            Добавить продуктов
          </span>
        </h1>
      )}
    </div>
  );
};
export default Cart;
