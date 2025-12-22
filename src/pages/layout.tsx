import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { FaUser, FaShoppingCart, FaMapMarkerAlt } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { Menu, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
const Layout = () => {
  const [categ, setCateg] = useState([])
  const [subcategory, setSubCategory] = useState([])
  async function getCategory() {
  try {
    const res = await fetch('http://37.27.29.18:8002/Category/get-categories')
    const data = await res.json()
    setCateg(data.data)
  } catch (error) {
    console.error(error)
  }
  }
    async function getSubCategories(id:any) {
  try {
    const res = await fetch(`http://37.27.29.18:8002/Category/get-category-by-id?id=${id}`)
    const data = await res.json()
    setSubCategory(data?.data?.subCategories)
  } catch (error) {
    console.error(error)
  }
}
  useEffect(() => { 
    getCategory()
  },[])
   const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const navigate = useNavigate()
  return (
    <div>
      <div className='navbar'>
      <div className='h-29' style={{maxWidth:"1400px", margin:"auto"}}>
    <nav className="w-full px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
        <div className="items-center text-2xl font-bold text-gray-300 flex" >
        <FaMapMarkerAlt size={20} title="Адреса" />
        <p className='gray text-xs'>Душанбе</p>
        </div>
        <img className='w-54' onClick={() => navigate("/")} src="/logo.webp" alt="" />
        </div>
      </div>
    <div className='relative top-3'>
      <Button
        type="primary"
        onClick={showDrawer}
        icon={<MenuOutlined />}
      />
              <Drawer
  title="Категории"
  placement="left"
  onClose={onClose}
  open={visible}
  width={700}
>
  <div style={{ display: 'flex', gap: 16 }}>    
    <Menu
      style={{ width: 480 }}
      mode="vertical"
      items={categ.map(c => ({
  key: String(c.id),
  label: (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <img
        src={`https://store-api.softclub.tj/images/${c.categoryImage}`}
        alt={c.categoryName}
        style={{ width: 40, objectFit: 'contain' }}
      />
      <span>{c.categoryName}</span>
    </div>
  ),
  onClick: () => getSubCategories(c.id),
}))}

    />
    <Menu
      style={{ width: 580 }}
      mode="vertical"
      items={subcategory?.map(sc => ({
        key: String(sc.id),
        label: sc.subCategoryName,
        onClick: () => {
          navigate(`/products/${sc.id}`)
          onClose()
        }
      }))}
    />

  </div>
</Drawer>

    </div>
      <div className="flex-1 mx-4">
        <div className="flex flex-col gap-2">
          <h1 className='text-[16px] white'>Бренды</h1>
        <input
          type="text"
          placeholder="Найти на Wildberries"
          className="w-full px-6 py-4.25 rounded-xl bg-white text-black focus:outline-none"
        />

        </div>
      </div>
      <div className="flex items-center gap-6 text-white pt-7">
        <div className="flex flex-col items-center">
        <FaMapMarkerAlt size={20} />
        <p className='text-[#A0A0A0]'>Адреса</p>
        </div>
        <div onClick={() => navigate("/login")} className="flex flex-col items-center">
                {localStorage.getItem("token") ? (
                  <>
             
             <FaUser size={20} title="Войти" />
        <p className='text-[#A0A0A0]'>Профиль</p>
             </>
                    ) : (
                  <>
                  <FaUser size={20} title="Войти" />
        <p className='text-[#A0A0A0]'>Войти</p>  
          </>
          )}
        </div>
        <div  className="flex flex-col items-center">
        <FaShoppingCart  size={20}  />
        <p className='text-[#A0A0A0]'>Корзина</p>
        </div>
      </div>
    </nav>
      </div>
      </div>
      <div style={{maxWidth:"1400px", margin:"auto"}}>
      <Outlet/>
      </div>
    </div>
  )
}

export default Layout
