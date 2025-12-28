import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
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
    <div className="container mx-auto px-5 py-8">
      {context}
      {data && data[0]?.productsInCart.length > 0 ? (
        <div id="table">
          <table  className="w-full rounded-2xl border-collapse mt-5 table-auto bg-white shadow-lg">
            <thead className="thad">
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-4 text-left">Избранное</th>
                <th className="p-4 text-center">Фото</th>
                <th className="p-4 text-center">Продукт</th>
                <th className="p-4 text-center">Цена</th>
                <th className="p-4 text-center">Рейтинг</th>
                <th className="p-4 text-center">Действия</th>
              </tr>
            </thead>
            <tbody>
              {data[0]?.productsInCart.map((e: any) => (
                <tr key={e.product.id} className="border-b">
                  <td className="p-4">
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
                  <td className="p-4">
                    <img
                      src={`https://store-api.softclub.tj/images/${e.product.image}`}
                      className="h-26  object-cover rounded-sm shadow-md"
                    />
                  </td>
                  <td className="p-4">{e.product.productName}</td>
                  <td className="p-4">
                    <div>{e.product.price} $</div>
                    <span className="line-through text-gray-500 text-sm">
                      {e.product.discountPrice} $
                    </span>
                  </td>
                  <td className="p-4">★★★★☆ (4.5)</td>
                  <td className="p-4 flex gap-3 justify-center items-center">
                    <FaRegEye
                      size={22}
                      className="cursor-pointer text-blue-500 hover:text-blue-700"
                      onClick={() => navigate(`/about/${e.product.id}`)}
                    />
                    <button
                      onClick={() => deleteFromCart(e.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg transition-colors hover:bg-red-700"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => navigate("/checkout")}
              className="rounded-lg px-6 py-3 bg-purple-600 text-white text-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Оплатить
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-center text-4xl p-20 flex flex-col items-center  gap-4">
          Ваша Корзина пуста! <br />
          <span
            className="text-lg border-b-2 border-amber-300  p-4 bg-amber-600 rounded-2xl text-white cursor-pointer"
            onClick={() =>
              navigate(localStorage.getItem("token") ? "/products" : "/login")
            }
          >
            {localStorage.getItem("token")
              ? "Добавить продукты"
              : "Зарегистрируйтесь для добавление продуктов"}
          </span>
        </h1>
      )}
    </div>
  );
};
export default Cart;