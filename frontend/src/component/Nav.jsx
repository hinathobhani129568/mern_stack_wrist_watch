import React, { useContext, useState, useEffect, useRef } from 'react'
import logo from '../assets/logo.png'
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { shopDataContext } from '../context/ShopContext';
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";

function Nav() {
  const { userData, setUserData } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)
  const { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)
  const [showProfile, setShowProfile] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showCollectionMenu, setShowCollectionMenu] = useState(false) 
  const navigate = useNavigate()
  const collectionRef = useRef()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      console.log(result.data)
      localStorage.removeItem("userToken")
      setUserData(null)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className='w-[100vw] h-[70px] bg-[burlywood]/70 backdrop-blur-md z-10 fixed flex items-center justify-between px-[30px] shadow-md shadow-black transition-all duration-300'
      style={{ top: showNav ? '0' : '-100px' }}
    >
      {/* Logo */}
      <div className='w-[20%] lg:w-[30%] flex items-center justify-start gap-[10px] '>
        <img src={logo} alt="" className='w-[30px]' />
        <h1 className='text-[25px] text-[black] font-sans '>Wrist Watch</h1>
      </div>

      {/* Right Icons */}
      <div className='w-[30%] flex items-center justify-end gap-[20px]'>
        {!showSearch && <IoSearchCircleOutline className='w-[38px] h-[38px] text-[#000000] cursor-pointer' onClick={() => { setShowSearch(prev => !prev); navigate("/collection") }} />}
        {showSearch && <IoSearchCircleSharp className='w-[38px] h-[38px] text-[#000000] cursor-pointer' onClick={() => setShowSearch(prev => !prev)} />}
        {!userData && <FaCircleUser className='w-[29px] h-[29px] text-[#000000] cursor-pointer' onClick={() => setShowProfile(prev => !prev)} />}
        {userData && <div className='w-[30px] h-[30px] bg-[#080808] text-[white] rounded-full flex items-center justify-center cursor-pointer' onClick={() => setShowProfile(prev => !prev)}>{userData?.name.slice(0, 1)}</div>}
        <MdOutlineShoppingCart className='w-[30px] h-[30px] text-[#000000] cursor-pointer hidden md:block' onClick={() => navigate("/cart")} />
        <p className='absolute w-[18px] h-[18px] items-center justify-center bg-black px-[5px] py-[2px] text-white rounded-full text-[9px] top-[10px] right-[23px] hidden md:block'>{getCartCount()}</p>
      </div>

      {/* Search Box */}
      {showSearch && (
        <div className='w-[100%] h-[80px] bg-[burlywood] absolute top-[100%] left-0 right-0 flex items-center justify-center'>
          <input type="text" className='lg:w-[50%] w-[80%] h-[60%] bg-[burlywood] rounded-[30px] px-[50px] placeholder:text-white text-[white] text-[18px] border-2 border-black' placeholder='Search Here' onChange={(e) => { setSearch(e.target.value) }} value={search} />
        </div>
      )}

      {/* Profile Dropdown with links */}
      {showProfile && (
        <div className='absolute w-[220px] bg-[white] top-[110%] right-[4%] border-[1px] border-[black] rounded-[10px] z-10'>
          <ul className='w-[100%] flex flex-col text-[17px] py-[10px] text-[black]'>
            {!userData && <li className='w-[100%] hover:bg-[burlywood] px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/login"); setShowProfile(false) }}>Login</li>}
            {userData && <li className='w-[100%] hover:bg-[burlywood] px-[15px] py-[10px] cursor-pointer' onClick={() => { handleLogout(); setShowProfile(false) }}>LogOut</li>}

            <li className='w-[100%] hover:bg-[burlywood] px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/"); setShowProfile(false) }}>Home</li>

            <li className='relative w-[100%] hover:bg-[burlywood] px-[15px] py-[10px] cursor-pointer'
              onClick={() => setShowCollectionMenu(prev => !prev)}>
              Collections
              {showCollectionMenu && (
                <ul className='absolute right-[100%] top-0 w-[180px] bg-white border border-black rounded-md shadow-md'>
                  <li className='px-[15px] py-[8px] hover:bg-[burlywood] cursor-pointer' onClick={() => { navigate("/collection/men"); setShowProfile(false); setShowCollectionMenu(false) }}>Men</li>
                  <li className='px-[15px] py-[8px] hover:bg-[burlywood] cursor-pointer' onClick={() => { navigate("/collection/women"); setShowProfile(false); setShowCollectionMenu(false) }}>Women</li>
                  <li className='px-[15px] py-[8px] hover:bg-[burlywood] cursor-pointer' onClick={() => { navigate("/collection/kids"); setShowProfile(false); setShowCollectionMenu(false) }}>Kids</li>
                </ul>
              )}
            </li>

            <li className='w-[100%] hover:bg-[burlywood] px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/contact"); setShowProfile(false) }}>Contact</li>
            <li className='w-[100%] hover:bg-[burlywood] px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/order"); setShowProfile(false) }}>Orders</li>
            <li className='w-[100%] hover:bg-[burlywood] px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/about"); setShowProfile(false) }}>About</li>
          </ul>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <div className='w-[100vw] h-[90px] flex items-center justify-between px-[20px] text-[12px] fixed bottom-0 left-0 bg-[burlywood]/70 backdrop-blur-md md:hidden'>
        <button className='text-[black] flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("/")}><IoMdHome className='w-[28px] h-[28px] text-[black] md:hidden' /> Home</button>
        <button className='text-[black] flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("collection")}><HiOutlineCollection className='w-[28px] h-[28px] text-[black] md:hidden' /> Collections</button>
        <button className='text-[black] flex items-center justify-center flex-col gap-[2px] ' onClick={() => navigate("/contact")}><MdContacts className='w-[28px] h-[28px] text-[black] md:hidden' />Contact</button>
        <button className='text-[black] flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("/cart")}><MdOutlineShoppingCart className='w-[28px] h-[28px] text-[black] md:hidden' /> Cart</button>
        <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-burlywood px-[5px] py-[2px] text-black font-semibold rounded-full text-[9px] top-[8px] right-[18px]'>{getCartCount()}</p>
      </div>
    </div>
  )
}

export default Nav
