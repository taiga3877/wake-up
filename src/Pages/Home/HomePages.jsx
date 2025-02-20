import React, { useState, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { div } from "framer-motion/client";


const { Sider, Header, Content } = Layout;

const App = () => {
  const [models, setModels] = useState([])
  const [brand, setBrands] = useState([])
  const [name, setName] = useState('')
  const [brandId, setBrandId] = useState(null)
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const getModels = () => {
    axios.get('https://realauto.limsa.uz/api/models').then(res => {
      setModels(res?.data?.data)
    })
  }
  const getBrands = () => {
    axios.get('https://realauto.limsa.uz/api/brands').then(res => {
      setModels(res?.data?.data)
    })
  }
  useEffect(() => {
    getModels()
    getBrands()
  })
  const addModels = () => {
    const formdata = new FormData()
    formdata.append('name', name)
    formdata.append('brand_id', brandId)
    axios({
      url: "https://realauto.limsa.uz/api/models",
      method: "POST",
      data: formdata,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      toast.success("Add Models")
      getModels()
    })
  }
  const LogOut = () => {
    localStorage.removeItem('accessToken')
    navigate('/login')
  }

  // Обработчик изменения ширины экрана
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout className="h-full">
      {/* Боковое меню */}
      <Sider
        collapsible
        collapsed={collapsed}
        width={200}
        className={`transition-all duration-300 ${isMobile ? "fixed left-0 top-0 h-full z-50" : ""}`}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}><NavLink to={'/'}>Home</NavLink></Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}><NavLink to={'/product'}>Products</NavLink></Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}><NavLink to={'/category'}>Category</NavLink></Menu.Item>
          <Menu.Item key="4" icon={<UploadOutlined />}><NavLink to="/404file">404 Not File</NavLink></Menu.Item>

        </Menu>
      </Sider>

      <Layout>
        {/* Верхний хедер с кнопкой */}
        <Header className="bg-white flex items-center px-4 shadow-md flex items-center justify-between">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            size="large"
            onClick={() => setCollapsed(!collapsed)}
            className="transition-all duration-300"
          />
          <button className="appearance-none h-[40px] text-center flex items-center justify-center   bg-black border-2 border-[#1A1A1A] rounded-xl box-border text-white cursor-pointer inline-block font-semibold text-base leading-normal m-0 min-h-[60px] min-w-0 outline-none px-3 text-center transition-all duration-300 ease-in-out select-none sm:w-full max-w-[100px] mx-auto hover:bg-[#333333] hover:shadow-xl hover:translate-y-[-2px] active:transform-none active:shadow-none focus:outline-none focus:ring-4 focus:ring-[#FF5733]"
            onClick={LogOut}
          >

            <h1 className="text-white text-2  xl font-bold">
              Log Out
            </h1>
          </button>
        </Header>

        <Content className="m-6 p-6 bg-white rounded-lg shadow-md text-white">
          <input type="text" placeholder="name "
            onChange={(e) => setName(e?.target?.value)}
          /> 
          <select name="" id="" onChange={(e) => setBrandId(e?.target?.value)}>
            <option value="" disabled></option>
            {
              brand.map((item) => {
                <option value={item.id}>{item.title}</option>
              })
            }
          </select>
          <button onClick={addModels}>Save</button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
