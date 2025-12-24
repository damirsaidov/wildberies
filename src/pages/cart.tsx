import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';
import { FaRegEye } from 'react-icons/fa';
import axios from 'axios';
import useMessage from 'antd/es/message/useMessage';
interface Product {
    product: {
        id: number;
        productName: string;
        price: number;
        discountPrice: number;
        image: string;
    }
}
interface CartData {
    productsInCart: Product[];
}
const Cart = () => {
    const [data, setData] = useState<CartData | null>(null)
    const [messageApi, context] = useMessage()
    const navigate = useNavigate()
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
            setData({ productsInCart: data?.data[0]?.productsinCart || [] })
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
        } catch { }
        const index = wishlist.findIndex((item) => item == deleteId);
        if (index != -1) {
            wishlist.splice(index, 1);
            if (wishlist.length) {
                localStorage.setItem("id", JSON.stringify(wishlist));
            } else {
                localStorage.removeItem("id");
            }
        }
    }
    function addToWish(id: number) {
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
            messageApi.success("Added to wishlist");
        } else {
            messageApi.info("This product is already in your wishlist");
        }
    }
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
            messageApi.success("Added to cart");
        } catch (error) {
            messageApi.error("Something went wrong.");
            console.error(error);
        }
    };
    async function deleteFromCart(id: number) {
        try {
            await fetch(`https://store-api.softclub.tj/Product/delete-product?id=${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            getCart()
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getCart()
    }, [])
    return (
        <div>
            {context}
            <table className="w-full border-collapse mt-5">
                <thead>
                    <tr className="border-b">
                        <th className="p-3 text-left">Wishlist</th>
                        <th className="p-3 text-left">Image</th>
                        <th className="p-3 text-left">Product</th>
                        <th className="p-3 text-left">Price</th>
                        <th className="p-3 text-left">Rating</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.productsInCart?.map((e: Product) => (
                        <tr key={e.product.id} className="border-b text-center">
                            <td className="p-3">
                                {localStorage.getItem("id")?.includes(String(e.product.id)) ? (
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
                                <span className="text-red-600 font-bold">
                                </span>
                                <br />
                                <span className="line-through text-gray-400 text-sm">
                                    {e.product.discountPrice} $
                                </span>
                            </td>
                            <td className="p-3">★★★★☆ (4.5)</td>
                            <td className="p-3 flex gap-3 justify-center">
                                <FaRegEye
                                    size={22}
                                    className="cursor-pointer"
                                    onClick={() => navigate(`/about/${e.product.id}`)}
                                />
                                <button
                                    onClick={() => addToCart(e.product.id)}
                                    className="px-3 py-1 bg-black text-white rounded"
                                >
                                    🛒 Add
                                </button>
                                <button
                                    onClick={() => deleteFromCart(e.product.id)}
                                    className="px-3 py-1 bg-red-600 text-white rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Cart