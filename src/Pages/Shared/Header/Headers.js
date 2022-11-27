import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import icon from '../../../assets/drawer.svg'
import { UserIcon } from '@heroicons/react/24/solid'
const Headers = () => {
    const navigate=useNavigate()

    const { user ,logOut} = useContext(AuthContext)


    const handleLogout = () => {
        logOut()
        .then(()=>{
            toast.info('Logout Successful')
            navigate('/')
        })
        .then(error=>console.log(error))
    }
    const menuItem = <>
        <li><Link title='Home' to='/home'>Home</Link></li>
        <li><Link title='Blog' to='/blog'>Blog</Link></li>

        {
            user?.uid ?
                <>
                  
                    <li><Link title='My Wishlist' to='/wishlist'>My Wishlist</Link></li>
                    <li><Link title='Dashboard' to='/dashboard'>Dashboard</Link></li>
                  
                </> :
                <>
                    <li><Link title='Login' to='/login'>Login</Link></li>
                   
                </>
        }

    </>

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItem}


                    </ul>
                </div>
                <Link to='/' className="btn btn-primary normal-case text-xl">Mobile Bazar</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">

                    {menuItem}

                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {
                                user?.email ?<img alt='' src={user?.photoURL} /> : <>
                                <span className='disabled:'> <UserIcon /></span>
                               
                                </>
                            }
                            
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li className='ml-5'>
                        <label htmlFor="dashboard-drawer" className=" px-10 lg:hidden navbar-end">
                
                       <img src={icon} alt="" />
                       <span>Drawer</span>
                   </label>
                        </li>
                        {
                            user?.uid &&   <li><button onClick={handleLogout}>Logout</button></li>
                        }

                      
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Headers;