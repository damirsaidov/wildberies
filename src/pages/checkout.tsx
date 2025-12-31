import useMessage from "antd/es/message/useMessage";
import axios from "axios";
import { useState } from "react";
import type { FormEvent } from "react";
interface Order {
  name: string;
  phone: string;
  address: string;
  items: string;
  total: string;
}
export default function Checkout() {
  const token = "8108946436:AAF1GdOrWpyLa5eMYXFXFpiYfXwJQ9ugoWY";
  const CHAT_ID = "-1003667396512";
  const [messageApi, context] = useMessage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const submitOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const order: Order = {
      name,
      phone,
      address,
      items: "Shoes",
      total: "120$",
    };
    const message = `
Name: ${order.name}
Phone: ${order.phone}
Address: ${order.address}
Items: ${order.items}
Total: ${order.total}
`;
    try {
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
      });
      messageApi.info("Заявка была отправлена администраторам, ожидайте");
      setAddress("");
      setName("");
      setPhone("");
    } catch (error) {
      console.error("Telegram error:", error);
    }
    setLoading(false);
  };
  return (
    <form
      className="flex flex-col mt-5 gap-4 shadow-2xl p-6 rounded-2xl pt-8 w-100 max-w-md mx-auto"
      onSubmit={submitOrder}
    >
      {context}
      <h1 className="text-center text-2xl">Оплата</h1>
      <input
        className="p-4 w-80 gg rounded-2xl shadow-lg border border-gray-400"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="p-4 w-80  gg rounded-2xl shadow-lg border border-gray-400"
        placeholder="Номер"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        className="p-4 w-80 gg rounded-2xl shadow-lg border border-gray-400"
        placeholder="Адрес"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <button
        className="p-4 w-80  cursor-pointer rounded-2xl bg-blue-600 text-white gg font-bold shadow-lg hover:bg-blue-700 disabled:opacity-50"
        type="submit"
        disabled={loading}
      >
        {loading ? "Отправляем..." : "Подтвердить"}
      </button>
    </form>
  );
}
