import  { useState, useEffect } from "react";
import { Button, message, Space } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Wishlist = () => {
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const getData = async () => {
    const id = localStorage.getItem("id");
    let wishlist = [];
    if (!id) {
      setData([]);
      return;
    }
    try {
      const parsed = JSON.parse(id);
      wishlist = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      setData([]);
      return;
    }
    if (wishlist.length == 0) {
      setData([]);
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const requests = wishlist.map((id) =>
        axios.get(
          `https://store-api.softclub.tj/Product/get-product-by-id?id=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      );
      const responses = await Promise.all(requests);
      const products = responses
        .map((res) => res?.data?.data)
        .filter(Boolean);
      setData(products);
    } catch (error) {
      console.error("Error fetching wishlist products:", error);
      setData([]); 
    }
  }
  useEffect(() => {
    getData();
  }, []);
  const removeFromWishlist = (deleteId) => {
    const id = localStorage.getItem("id");
    let wishlist = [];
    try {
      const parsed = JSON.parse(id);
      wishlist = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      if (id) wishlist = [id];
    }
    const index = wishlist.findIndex((item) => item == deleteId);
    if (index !== -1) {
      wishlist.splice(index, 1);
      if (wishlist.length) {
        localStorage.setItem("id", JSON.stringify(wishlist));
      } else {
        localStorage.removeItem("id");
      }
    }
    setData((prev) => prev.filter((product) => product.id != deleteId));
    messageApi.success("Deleted successfully");
  };
  const addToCart = async (id) => {
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
  const navigate = useNavigate()
  return (
    <div className="flx" style={{ display: "flex", justifySelf: "center", gap: 12, padding: 12 }}>
      {contextHolder}
      {data.length == 0 ? (
        <div className="m-auto">
        <p className="text-4xl pt-20">Your wishlist is empty!</p>
        <button className="wb-btn flex justify-self-center m-auto p-2 px-4 mt-4" onClick={() => navigate(-1)}>Go back</button>
        </div>
      ) : (
        data.map((e) => (
          <div key={e.id} className="card">
            <div className="product-image">
              <img
                src={`https://store-api.softclub.tj/images/${e?.images[0]?.images}`}
                alt={e.productName}
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{e.productName}</h3>
              <div className="price-row">
                <Space style={{ justifyContent:"center", padding:"10px" }}>
                  <span className="card-price">${e.discountPrice}</span>
                  <span className="price-old">${e.price}</span>
                </Space>
              </div>
              <Space>
                <button className="bg-blue-600 text-white p-3 rounded-2xl" onClick={() => addToCart(e.id)}>
                  + Add to cart
                </button>
                <button className="bg-red-600 text-white p-3 rounded-2xl"  onClick={() => removeFromWishlist(e.id)}>
                  Delete
                </button>
              </Space>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default Wishlist;