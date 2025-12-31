import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { FaHeart } from "react-icons/fa";
import Footer from "../components/footer";
import Switch from "../components/switch";
const Layout = () => {
  const [categ, setCateg] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [data, setData] = useState<any>(null);
  async function getCategory() {
    try {
      const res = await fetch(
        "https://store-api.softclub.tj/Category/get-categories"
      );
      const data = await res.json();
      setCateg(data.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function getSubCategories(id: any) {
    try {
      const res = await fetch(
        `https://store-api.softclub.tj/Category/get-category-by-id?id=${id}`
      );
      const data = await res.json();
      setSubCategory(data?.data?.subCategories);
    } catch (error) {
      console.error(error);
    }
  }
  const getCart = async () => {
    if (localStorage.getItem("token")) {
      try {
        const res = await fetch(
          `https://store-api.softclub.tj/Cart/get-products-from-cart`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    getCategory();
    setInterval(() => {
      getCart();
    }, 1000);
  }, []);
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    return saved == "dark";
  };
  const [darkMode, setDarkMode] = useState<boolean>(getInitialTheme);
  const navigate = useNavigate();
  return (
    <div className={darkMode ? "white" : "dark"}>
      <div className="layout-container">
        <div className="navbar">
          <div
            className="h-29 nav-wb relative right-4"
            style={{ maxWidth: "1050px", margin: "auto" }}
          >
            <nav className="w-full muddmud px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <img
                    className="w-42 h-26 pt-2 rounded mt-1  object-contain cursor-pointer"
                    onClick={() => navigate("/")}
                    src="../../image copy.png"
                  />
                </div>
              </div>
              <div className="relative top-3">
                <Button
                  type="primary"
                  onClick={showDrawer}
                  icon={<MenuOutlined />}
                />
                <Drawer
                  title="Категории"
                  placement="left"
                  open={visible}
                  onClose={onClose}
                  size={700}
                  styles={{
                    header: {
                      background: darkMode ? "white" : "#0e0e11",
                      borderBottom: darkMode
                        ? "none"
                        : "1px solid rgba(255,255,255,0.08)",
                      color: darkMode ? "black" : "#fff",
                    },
                    body: {
                      background:  darkMode ? "white" : "#0e0e11",
                      color:  darkMode ?"black" : "#e6e6eb",
                      padding: 16,
                    },
                  }}
                >
                  <div style={{ display: "flex", gap: 16 }}>
                    <Menu
                      mode="vertical"
                      theme="dark"
                      style={{ background: "transparent" }}
                      items={categ.map((c: any) => ({
                        key: String(c.id),
                        label: (
                          <div
                            className="drawr"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                            }}
                          >
                            <img
                              src={`https://store-api.softclub.tj/images/${c.categoryImage}`}
                              style={{
                                width: 40,
                                objectFit: "contain",
                                borderRadius: "8px",
                              }}
                            />
                            <span style={{color:darkMode?"black":"white"}}>{c.categoryName}</span>
                          </div>
                        ),
                        onClick: () => getSubCategories(c.id),
                      }))}
                    />
                    <Menu
                      mode="vertical"
                      theme="dark"
                      style={{ background: "transparent" }}
                      items={subcategory?.map((sc: any) => ({
                        key: String(sc.id),
                        label: (
                          <span style={{color:darkMode?"gray":"#fff"}}>{sc.subCategoryName}</span>
                        ),
                        onClick: () => {
                          navigate(`/products/${sc.id}`);
                          onClose();
                        },
                      }))}
                    />
                  </div>
                </Drawer>
              </div>
              <div className="drawr flex-1 mx-4 pt-4">
                <input
                  type="text"
                  placeholder="Найти на Wildberries"
                  className="w-full px-6 py-4.25 rounded-xl bg-white text-black focus:outline-none"
                />
              </div>
              <div className="cursor-pointer flex items-center gap-6 text-white pt-6">
                <div
                  onClick={() => navigate(`/wishlist`)}
                  className="flex flex-col items-center"
                >
                  <FaHeart size={20} />
                  <p className="text-[#A0A0A0]">Избранное</p>
                </div>
                <div className="cursor-pointer flex flex-col items-center">
                  {localStorage.getItem("token") ? (
                    <>
                      <FaUser
                        onClick={() => navigate("profile")}
                        size={20}
                        title="Войти"
                      />
                      <p
                        onClick={() => navigate("profile")}
                        className="text-[#A0A0A0]"
                      >
                        Профиль
                      </p>
                    </>
                  ) : (
                    <>
                      <FaUser
                        onClick={() => navigate("/login")}
                        size={20}
                        title="Войти"
                      />
                      <p
                        onClick={() => navigate("/login")}
                        className="text-[#A0A0A0]"
                      >
                        Войти
                      </p>
                    </>
                  )}
                </div>
                <div className="cursor-pointer relative top-3 flex flex-col items-center">
                  <FaShoppingCart onClick={() => navigate("cart")} size={20} />
                  <p
                    onClick={() => navigate("cart")}
                    className="text-[#A0A0A0]"
                  >
                    Корзина
                  </p>
                  <p className="relative bottom-14 left-3 z-202 bg-red-400 w-6 text-center rounded-2xl h-6 text-white">
                    {data ? data[0]?.totalProducts : "0"}
                  </p>
                </div>
                <Switch
                  style={{ paddingBottom: "20px" }}
                  checked={darkMode}
                  onChange={(e: any) => setDarkMode(e.target.checked)}
                />
              </div>
            </nav>
          </div>
        </div>
        <div className="content" style={{ maxWidth: "1400px", margin: "auto" }}>
          <Outlet />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default Layout;
