import React from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'

function Layout() {
    const navigate = useNavigate()
    const LogOut = () => {
        localStorage.removeItem('accessToken')
        navigate('/login')
    }
    return (
        <div>
            <header className='text-right text-3xl font-bold'>
                <button
                    onClick={LogOut}
                >
                    Log Out
                </button>
            </header>
            <div className='gap-[20px] flex items-center justify-around'>
                <div>
                    <NavLink to={"/category"}>Category</NavLink>
                </div>
                <div>
                    <NavLink to={"/product"}>Product</NavLink>
                </div>
                <div>
                    <NavLink to={"/brands"}>Brands</NavLink>
                </div>
                <div>
                    <NavLink to={"/brands"}>404 Not File</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Layout