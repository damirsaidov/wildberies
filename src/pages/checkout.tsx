import { useEffect, useState } from "react";
import type { FormEvent } from "react";
interface Order {
  name: string;
  phone: string;
  address: string;
  items: string;
  total: string;
}

export default function Checkout() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null)
  const submitOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const order: Order = {
      name,
      phone,
      address,
      items: data[0]?.productsInCart.map((e:any) => e.productName),
      total: data[0]?.totalProducts,
    };
    try {
      const response = await fetch("http://localhost:3001/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      const data: { success: boolean } = await response.json();
      if (data.success) {
        alert("Запрос был отправлен модераторам, ожидайте ответа.");
        setName("");
        setPhone("");
        setAddress("");
      } else {
        alert("Чтото пошло не так.");
      }
    } catch (err) {
      alert("Проблемы с сервером, попробуйте позже");
    }
const getCart = async () => {
        try {
            let res = await fetch(
                `https://store-api.softclub.tj/Cart/get-products-from-cart`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            let data = await res.json()
            setData(data.data)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
      getCart()
    },[])
    setLoading(false);
  };
  return (
    <form
      className="flex flex-col mt-5 gap-4 w-full max-w-md mx-auto"
      onSubmit={submitOrder}
    >
      <input
        className="p-4 rounded-2xl shadow-lg border border-gray-400"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="p-4 rounded-2xl shadow-lg border border-gray-400"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        className="p-4 rounded-2xl shadow-lg border border-gray-400"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <button
        className="p-4 rounded-2xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 disabled:opacity-50"
        type="submit"
        disabled={loading}
      >
        {loading ? "Sending..." : "Checkout"}
      </button>
    </form>
  );
}