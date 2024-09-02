"use client"

import { Home, List, MessageCircle } from 'lucide-react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import LoginButton from './LoginButton'
import AuthContextProvider from '@/lib/contexts/AuthContext'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MobileMenu } from './MobileMenu'

export const navigationItems = [
    {
        name: 'Home',
        href: "/",
        icon: <Home />,
    },
    {
        name: 'Categories',
        href: "/categories",
        icon: <List />,
    },
    {
        name: 'Contact Us',
        href: "/contact",
        icon: <MessageCircle />,
    },
];

export default function Header() {
    const pathName = usePathname();
    return (
        <nav className="flex justify-between items-center px-7 py-3 border-b">
        <Link href={'/'}>
            <img className="h-12" src="/light-logo.png" alt="" />
        </Link>
        <div className="hidden sm:flex justify-center items-center col-span-6">
                <NavigationMenu>
                    <NavigationMenuList>
                        {navigationItems.map((item, index) => (
                            <NavigationMenuItem key={index}>
                                <Link href={item.href} legacyBehavior passHref>
                                    <NavigationMenuLink 
                                        active={pathName === item.href} 
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        {item.icon} 
                                        {item.name}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        <AuthContextProvider>
            <div className='hidden sm:flex'>
                <LoginButton />
            </div>
        </AuthContextProvider>
        <div className="sm:hidden">
            <MobileMenu />
        </div>
    </nav>
    )
}