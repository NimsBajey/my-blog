"use client"

import { useAuth } from "@/lib/contexts/AuthContext"
import { useAdmin } from "@/lib/firebase/admin/read";
import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import Link from 'next/link'
import { useState, useEffect, useRef } from "react";
import { CLoadingButton } from '@coreui/react-pro'

export default function LoginButton() {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const {
        isLoading,
        user,
        handleSignInWithGoogle,
        handleSignInWithGithub,
        handleLogout,
    } = useAuth();

    const { data } = useAdmin({ uid: user?.uid })

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    if (isLoading) {
        return (
            <CLoadingButton timeout={2000}>
                Login
            </CLoadingButton>
        )
    }

    const handleImgLoadingError = (e) => {
        e.target.src = '/profile.jpg';
      };

    if (user) {
        if(data) {
            return <div className="flex gap-4 items-center" ref={dropdownRef}>
            {/* <button
                onClick={() => {
                    handleLogout();
                }}
                className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-lg"
            >
                Logout
            </button> */}
            <button onClick={toggleDropdown}>
                <div className="flex gap-2">
                    <img className="object-cover h-8 w-8 rounded-full" src={user?.photoURL} onError={(e) => handleImgLoadingError(e)} alt="User Profile" />
                    <div>
                        <span className="text-base font-medium flex gap-1 flex-row mt-1">{user?.displayName} <ChevronDown size={20} style={{ padding: 1, marginTop: 2 }} /></span>
                    </div>
                </div>
            </button>
            {isOpen && (
                <div className="origin-top-right z-40 absolute right-0 mt-48 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-2 px-2">
                        <div className="pb-2">
                            <Link
                                href="/profile"
                                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                            >
                                <img
                                    className="h-6 w-6 rounded-full"
                                    src={user?.photoURL} 
                                    onError={(e) => handleImgLoadingError(e)}
                                    alt="User Avatar"
                                />
                                <span className="ml-3">User Profile</span>
                            </Link>
                            <Link
                                href="/admin"
                                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                            >
                                <LayoutDashboard />
                                <span className="ml-3">Admin Dashboard</span>
                            </Link>
                        </div>
                        <hr className="p-1" />
                        <button
                            onClick={() => {
                                handleLogout();
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                        >
                            <LogOut />
                            <span className="ml-3">Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
        } else {
            return <div className="flex gap-4 items-center" ref={dropdownRef}>
            {/* <button
                onClick={() => {
                    handleLogout();
                }}
                className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-lg"
            >
                Logout
            </button> */}
            <button onClick={toggleDropdown}>
                <div className="flex gap-2">
                    <img className="object-cover h-8 w-8 rounded-full" src={user?.photoURL} onError={(e) => handleImgLoadingError(e)} alt="User Profile" />
                    <div>
                        <span className="text-base font-medium flex gap-1 flex-row mt-1">{user?.displayName} <ChevronDown size={20} style={{ padding: 1, marginTop: 2 }} /></span>
                    </div>
                </div>
            </button>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-48 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-2 px-2">
                        <div className="pb-2">
                            <Link
                                href="/profile"
                                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                            >
                                <img
                                    className="h-6 w-6 rounded-full"
                                    src={user?.photoURL} 
                                    onError={(e) => handleImgLoadingError(e)}
                                    alt="User Avatar"
                                />
                                <span className="ml-3">User Profile</span>
                            </Link>
                        </div>
                        <hr className="p-1" />
                        <button
                            onClick={() => {
                                handleLogout();
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                        >
                            <LogOut />
                            <span className="ml-3">Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
        }
    }

    return <section ref={dropdownRef}>
        {/* <button
            onClick={() => {
                handleSignInWithGoogle();
            }}
            className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-full">
            <img className='h-7' src="/google.png" alt="" />
            Login With Google
        </button> */}
        <button 
            onClick={toggleDropdown}
            className="flex items-center gap-3 bg-black text-white sm:px-4 py-2 rounded-lg px-16 sm:font-medium font-bold"
        >
            Login
        </button>
        {isOpen && (
            <div className="origin-top-right absolute right-0 mt-3 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-2 px-2">
                <div className="pb-2">
                    <button
                         onClick={() => {
                            handleSignInWithGoogle();
                        }}
                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                    >
                    <img className='h-7' src="/google.png" alt="Google" />
                    <span className="ml-3">Login with Google</span>
                    </button>
                    <button
                         onClick={() => {
                            handleSignInWithGithub();
                        }}
                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                    >
                    <img className='h-7' src="/github.png" alt="Google" />
                    <span className="ml-3">Login with Github</span>
                    </button>
                </div>
            </div>
            </div>
        )}
    </section>
}
